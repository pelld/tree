import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

// 00. PERFORMANCE PROFILE ----------------------------------------------------
// The previous version created hundreds of thousands of woody axes before it
// even started drawing leaves. That could exhaust memory on a phone. This
// version keeps a detailed visible crown but caps the structural complexity.
const mobileMode=matchMedia('(pointer:coarse)').matches||innerWidth<900;
const PROFILE=mobileMode?{
  pixelRatio:1,
  antialias:false,
  shadows:false,
  primaryCount:14,
  secondaryCount:5,
  tertiaryCount:3,
  twigCount:2,
  maxLeaves:18000,
  tubeSegments:[32,16,8],
  tubeSides:[10,7,5]
}:{
  pixelRatio:Math.min(devicePixelRatio,1.25),
  antialias:true,
  shadows:true,
  primaryCount:16,
  secondaryCount:7,
  tertiaryCount:4,
  twigCount:2,
  maxLeaves:42000,
  tubeSegments:[44,22,11],
  tubeSides:[12,8,6]
};

// 01. SCENE ------------------------------------------------------------------
const scene=new THREE.Scene();
scene.background=new THREE.Color(0xcbd7c5);
scene.fog=new THREE.FogExp2(0xcbd7c5,.0028);

const camera=new THREE.PerspectiveCamera(39,innerWidth/innerHeight,.05,180);
camera.position.set(21,12.7,29);

const renderer=new THREE.WebGLRenderer({antialias:PROFILE.antialias,powerPreference:'high-performance'});
renderer.setPixelRatio(PROFILE.pixelRatio);
renderer.setSize(innerWidth,innerHeight);
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.03;
renderer.shadowMap.enabled=PROFILE.shadows;
if(PROFILE.shadows)renderer.shadowMap.type=THREE.PCFSoftShadowMap;
document.body.prepend(renderer.domElement);

const controls=new OrbitControls(camera,renderer.domElement);
controls.target.set(0,7.5,0);
controls.enableDamping=true;
controls.dampingFactor=.06;
controls.minDistance=3;
controls.maxDistance=70;
controls.zoomToCursor=true;

scene.add(new THREE.HemisphereLight(0xdce8d5,0x4a4237,1.55));
const sun=new THREE.DirectionalLight(0xffefd0,2.7);
sun.position.set(-18,29,14);
sun.castShadow=PROFILE.shadows;
if(PROFILE.shadows){
  sun.shadow.mapSize.set(768,768);
  sun.shadow.camera.left=-24;sun.shadow.camera.right=24;
  sun.shadow.camera.top=26;sun.shadow.camera.bottom=-8;
  sun.shadow.bias=-.00015;
}
scene.add(sun);

const ground=new THREE.Mesh(
  new THREE.CircleGeometry(50,64),
  new THREE.MeshLambertMaterial({color:0x788861})
);
ground.rotation.x=-Math.PI/2;
ground.receiveShadow=PROFILE.shadows;
scene.add(ground);

// 02. MATERIALS / STATE ------------------------------------------------------
const woodMats=[0x40342b,0x493a30,0x514033,0x564536,0x4a3b30].map(c=>new THREE.MeshLambertMaterial({color:c}));
const leafMat=new THREE.MeshLambertMaterial({color:0x315b27,side:THREE.DoubleSide});
const treeRoot=new THREE.Group();
scene.add(treeRoot);

let meshes=[];
let branches=[];
let seed=88231;
let randomness=.18;

function reset(v){seed=Math.max(1,Math.floor(v)||1)%2147483647;if(!seed)seed=1}
function rnd(){seed=seed*16807%2147483647;return(seed-1)/2147483646}
function rr(a,b){return a+(b-a)*rnd()}
function jit(a){return(rnd()-.5)*a*randomness}

// 03. BRANCH HELPERS ---------------------------------------------------------
function makeBranch(points,r0,r1,order,parent=null){
  const curve=new THREE.CatmullRomCurve3(points,false,'centripetal');
  const b={points,r0,r1,order,parent,curve,length:curve.getLength(),children:[]};
  if(parent)parent.children.push(b);
  branches.push(b);
  return b;
}
function pointAt(b,t){return b.curve.getPointAt(THREE.MathUtils.clamp(t,0,1))}
function tangentAt(b,t){return b.curve.getTangentAt(THREE.MathUtils.clamp(t,0,1)).normalize()}
function radiusAt(b,t){return b.r1+(b.r0-b.r1)*Math.pow(1-t,.72)}
function frameAt(b,t){
  const tan=tangentAt(b,t);
  const ref=Math.abs(tan.y)<.88?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0);
  const u=new THREE.Vector3().crossVectors(tan,ref).normalize();
  const v=new THREE.Vector3().crossVectors(u,tan).normalize();
  return{tan,u,v};
}
function worldDir(az,elev){
  const ce=Math.cos(elev);
  return new THREE.Vector3(Math.cos(az)*ce,Math.sin(elev),Math.sin(az)*ce).normalize();
}

// Explicit crown envelope. Everything from secondary branching onward is
// steered toward this broad elliptical dome.
function crownTop(radial){
  const R=11.6,H=6.9,base=7.55,q=THREE.MathUtils.clamp(radial/R,0,1);
  return base+H*Math.sqrt(Math.max(0,1-q*q));
}
function crownTarget(radial,order){
  const inset=order===2?2.15:order===3?1.25:.62;
  return crownTop(radial)-inset;
}

function growFrom(parent,t,azimuth,angle,len,r0,r1,order,verticalBias=0){
  const start=pointAt(parent,t);
  const {tan,u,v}=frameAt(parent,t);
  const radial=u.clone().multiplyScalar(Math.cos(azimuth)).add(v.clone().multiplyScalar(Math.sin(azimuth))).normalize();
  let d=tan.clone().multiplyScalar(Math.cos(angle)).add(radial.multiplyScalar(Math.sin(angle))).normalize();
  d.y+=verticalBias;
  d.normalize();

  const steps=order===1?10:order===2?7:order===3?5:4;
  const pts=[start.clone()];
  let p=start.clone();

  for(let i=1;i<=steps;i++){
    const f=i/steps;
    const nowRadial=Math.hypot(p.x,p.z);

    if(order>=2){
      const target=crownTarget(nowRadial,order);
      const err=THREE.MathUtils.clamp(target-p.y,-2.4,2.4);
      const attraction=order===2?.060:order===3?.095:.13;
      d.y+=err*attraction;

      // Near the outer crown, turn growth slightly downward and inward so the
      // profile closes rather than ending in horizontal spokes.
      if(nowRadial>8.8){
        const edge=THREE.MathUtils.clamp((nowRadial-8.8)/2.8,0,1);
        d.y-=edge*.09;
        if(nowRadial>.1)d.addScaledVector(new THREE.Vector3(-p.x,0,-p.z).normalize(),edge*.018);
      }
    }

    const wander=(order===1?.018:order===2?.028:order===3?.040:.052)*randomness;
    d.x+=rr(-wander,wander);
    d.z+=rr(-wander,wander);
    d.y+=rr(-wander*.35,wander*.35);
    d.normalize();

    // A gentle arch in main wood and a little terminal droop in fine wood.
    if(order<=2)d.y+=Math.sin(Math.PI*f)*.012;
    if(order>=3)d.y-=Math.max(0,f-.72)*.018;
    d.normalize();

    p=p.clone().add(d.clone().multiplyScalar(len/steps));
    pts.push(p.clone());
  }
  return makeBranch(pts,r0,r1,order,parent);
}

// 04. TREE ARCHITECTURE ------------------------------------------------------
function buildTree(density){
  branches=[];
  const golden=2.399963229728653;

  const trunkPts=[
    new THREE.Vector3(0,0,0),new THREE.Vector3(.10,1.25,.02),new THREE.Vector3(.02,2.55,.08),
    new THREE.Vector3(-.09,3.85,.04),new THREE.Vector3(.05,5.15,-.05),new THREE.Vector3(-.11,6.45,.02),
    new THREE.Vector3(.02,7.55,-.06),new THREE.Vector3(-.07,8.35,.02)
  ];
  const trunk=makeBranch(trunkPts,1.50,.36,0,null);

  // Short buttress/root hints.
  for(let i=0;i<7;i++){
    const az=i/7*Math.PI*2+rr(-.16,.16);
    growFrom(trunk,.015,az,1.20,rr(1.35,2.10),rr(.22,.30),.035,1,-.10);
  }

  // Main crown: low limbs are longest, upper limbs progressively shorter.
  const primaries=[];
  const pc=PROFILE.primaryCount;
  for(let i=0;i<pc;i++){
    const u=i/(pc-1);
    const t=.43+u*.46+rr(-.014,.014);
    const az=i*golden+rr(-.10,.10);
    const len=9.7-u*4.0+rr(-.30,.30);
    const elev=.15+u*.42+rr(-.018,.018);
    const r=radiusAt(trunk,t);
    const p=growFrom(trunk,t,az,elev,len,r*(.63-u*.19),r*rr(.13,.19),1,.015+u*.025);
    primaries.push({b:p,phase:az,u});
  }

  const secBase=Math.max(4,Math.round(PROFILE.secondaryCount*density/1.25));
  const tertBase=Math.max(2,Math.round(PROFILE.tertiaryCount*density/1.25));

  for(const item of primaries){
    const primary=item.b;
    const secondary=[];
    const sc=secBase;

    for(let j=0;j<sc;j++){
      const f=j/(sc-1);
      const t=.20+f*.66+rr(-.018,.018);
      const az=item.phase+(j+.4)*golden+rr(-.16,.16);
      const len=primary.length*rr(.20,.30)*(1-.12*f);
      const r=radiusAt(primary,t);
      secondary.push(growFrom(primary,t,az,rr(.42,.66),len,r*rr(.38,.50),r*rr(.10,.15),2,rr(-.02,.06)));
    }

    // A short continuation closes each primary into the crown rather than
    // leaving a bare spoke at the end.
    {
      const t=.91,r=radiusAt(primary,t);
      secondary.push(growFrom(primary,t,item.phase+.7,.30,primary.length*.22,r*.57,r*.16,2,.035));
    }

    for(let si=0;si<secondary.length;si++){
      const sec=secondary[si];
      const tertiary=[];
      const tc=tertBase;

      for(let k=0;k<tc;k++){
        const f=k/(tc-1);
        const t=.28+f*.58+rr(-.020,.020);
        const az=item.phase+(si*.73+k)*golden+rr(-.20,.20);
        const len=sec.length*rr(.32,.48);
        const r=radiusAt(sec,t);
        tertiary.push(growFrom(sec,t,az,rr(.45,.72),len,r*rr(.34,.46),r*rr(.09,.13),3,rr(-.015,.055)));
      }

      for(let ti=0;ti<tertiary.length;ti++){
        const ter=tertiary[ti];
        const twigs=PROFILE.twigCount;
        for(let m=0;m<twigs;m++){
          const t=.50+m*.34+rr(-.035,.035);
          const az=item.phase+(si+ti+m*.8)*golden+rr(-.23,.23);
          const len=ter.length*rr(.34,.50);
          const r=radiusAt(ter,t);
          growFrom(ter,t,az,rr(.38,.66),len,r*rr(.28,.38),Math.max(.003,r*.07),4,rr(-.025,.045));
        }
      }
    }
  }
}

// 05. WOOD RENDERING --------------------------------------------------------
function tubeFor(b,segments,sides){
  const g=new THREE.TubeGeometry(b.curve,segments,1,sides,false);
  const pos=g.attributes.position,uv=g.attributes.uv,c=new THREE.Vector3(),v=new THREE.Vector3();
  for(let i=0;i<pos.count;i++){
    const t=uv.getX(i);
    b.curve.getPointAt(t,c);
    v.set(pos.getX(i),pos.getY(i),pos.getZ(i)).sub(c).multiplyScalar(radiusAt(b,t));
    pos.setXYZ(i,c.x+v.x,c.y+v.y,c.z+v.z);
  }
  g.computeVertexNormals();
  return g;
}

function renderWood(){
  const major=[[],[],[]];
  const fine=[];

  for(const b of branches){
    if(b.order<=2){
      const idx=b.order;
      major[idx].push(tubeFor(b,PROFILE.tubeSegments[idx],PROFILE.tubeSides[idx]));
    }else{
      const samples=b.order===3?3:2;
      for(let i=0;i<samples;i++){
        const t0=i/samples,t1=(i+1)/samples;
        const p0=pointAt(b,t0),p1=pointAt(b,t1);
        const len=p1.distanceTo(p0);
        if(len>.01)fine.push({order:b.order,p0,p1,len,r:Math.max(.003,radiusAt(b,t0))});
      }
    }
  }

  major.forEach((arr,order)=>{
    if(!arr.length)return;
    const merged=mergeGeometries(arr,false);
    arr.forEach(g=>g.dispose());
    const mesh=new THREE.Mesh(merged,woodMats[Math.min(order,woodMats.length-1)]);
    mesh.castShadow=PROFILE.shadows&&order<=1;
    mesh.receiveShadow=PROFILE.shadows;
    treeRoot.add(mesh);meshes.push(mesh);
  });

  for(const order of [3,4]){
    const segs=fine.filter(s=>s.order===order);
    if(!segs.length)continue;
    const geo=new THREE.CylinderGeometry(.72,1,1,order===3?5:4,1,false);
    const inst=new THREE.InstancedMesh(geo,woodMats[Math.min(order,woodMats.length-1)],segs.length);
    const dummy=new THREE.Object3D(),up=new THREE.Vector3(0,1,0),dir=new THREE.Vector3(),q=new THREE.Quaternion();
    segs.forEach((s,i)=>{
      dir.copy(s.p1).sub(s.p0).normalize();
      q.setFromUnitVectors(up,dir);
      dummy.position.copy(s.p0).add(s.p1).multiplyScalar(.5);
      dummy.quaternion.copy(q);
      dummy.scale.set(s.r,s.len,s.r);
      dummy.updateMatrix();
      inst.setMatrixAt(i,dummy.matrix);
    });
    inst.instanceMatrix.needsUpdate=true;
    inst.castShadow=false;inst.receiveShadow=false;
    treeRoot.add(inst);meshes.push(inst);
  }
}

// 06. LEAVES ---------------------------------------------------------------
function oakLeafGeometry(){
  const s=new THREE.Shape();
  s.moveTo(0,-.10);s.lineTo(.018,0);s.lineTo(.10,.08);s.lineTo(.16,.16);s.lineTo(.10,.23);
  s.lineTo(.21,.32);s.lineTo(.13,.41);s.lineTo(.23,.50);s.lineTo(.13,.59);s.lineTo(.19,.69);
  s.lineTo(.09,.78);s.lineTo(.10,.88);s.lineTo(0,1.0);s.lineTo(-.10,.88);s.lineTo(-.09,.78);
  s.lineTo(-.19,.69);s.lineTo(-.13,.59);s.lineTo(-.23,.50);s.lineTo(-.13,.41);s.lineTo(-.21,.32);
  s.lineTo(-.10,.23);s.lineTo(-.16,.16);s.lineTo(-.10,.08);s.lineTo(-.018,0);s.closePath();
  return new THREE.ShapeGeometry(s);
}

function renderLeaves(mult){
  // Prefer fine branches as leaf-bearing anchors. A fixed cap avoids mobile OOM.
  const anchors=branches.filter(b=>b.order>=3);
  if(!anchors.length)return;
  const requested=Math.floor(PROFILE.maxLeaves*THREE.MathUtils.clamp(mult/1.35,.65,1.35));
  const capacity=Math.min(PROFILE.maxLeaves,Math.max(mobileMode?9000:18000,requested));
  const geo=oakLeafGeometry();
  const inst=new THREE.InstancedMesh(geo,leafMat,capacity);
  const dummy=new THREE.Object3D(),q=new THREE.Quaternion(),spinQ=new THREE.Quaternion();
  const up=new THREE.Vector3(0,1,0),pos=new THREE.Vector3(),offset=new THREE.Vector3(),out=new THREE.Vector3(),leafDir=new THREE.Vector3();
  const col=new THREE.Color();

  let k=0;
  const per=Math.max(3,Math.ceil(capacity/anchors.length));
  for(let bi=0;bi<anchors.length&&k<capacity;bi++){
    const b=anchors[bi];
    const n=Math.min(per+(bi%5===0?1:0),capacity-k);
    for(let i=0;i<n;i++,k++){
      const t=THREE.MathUtils.clamp(.30+(i/Math.max(1,n-1))*.68+rr(-.07,.07),.20,.998);
      const p=pointAt(b,t),tan=tangentAt(b,t),{u,v}=frameAt(b,t);
      const a=rr(0,Math.PI*2),rad=rr(.07,.23)*(b.order===3?1.25:1);
      offset.copy(u).multiplyScalar(Math.cos(a)*rad).addScaledVector(v,Math.sin(a)*rad*rr(.75,1.18)).addScaledVector(tan,rr(-.04,.10));
      pos.copy(p).add(offset);

      // Keep foliage close to the dome surface at the top and shoulders.
      const radial=Math.hypot(pos.x,pos.z),top=crownTop(radial);
      if(pos.y>top)pos.y=top-rr(.03,.18);

      out.copy(offset).normalize();
      leafDir.copy(tan).multiplyScalar(.28).addScaledVector(out,.72).add(new THREE.Vector3(0,rr(-.02,.10),0)).normalize();
      q.setFromUnitVectors(up,leafDir);
      spinQ.setFromAxisAngle(leafDir,rr(0,Math.PI*2));
      q.premultiply(spinQ);
      dummy.position.copy(pos);dummy.quaternion.copy(q);
      const sc=rr(.14,.205);
      dummy.scale.set(sc*rr(.88,1.12),sc*rr(.95,1.15),sc);
      dummy.updateMatrix();
      inst.setMatrixAt(k,dummy.matrix);
      const light=rr(.85,1.15);
      col.setRGB(.17*light,.36*light,.14*light);
      inst.setColorAt(k,col);
    }
  }
  inst.count=k;
  inst.instanceMatrix.needsUpdate=true;
  if(inst.instanceColor)inst.instanceColor.needsUpdate=true;
  inst.castShadow=false;inst.receiveShadow=false;
  treeRoot.add(inst);meshes.push(inst);
}

// 07. GENERATION / UI -------------------------------------------------------
function clearTree(){
  for(const m of meshes){
    if(m.geometry)m.geometry.dispose();
    treeRoot.remove(m);
  }
  meshes=[];
  while(treeRoot.children.length)treeRoot.remove(treeRoot.children[0]);
}

let generationToken=0;
function generate(){
  const token=++generationToken;
  const status=document.querySelector('#status');
  status.textContent=mobileMode?'Growing oak · mobile detail…':'Growing oak…';
  status.style.display='block';

  // Give the browser one frame to paint the loading message before doing work.
  requestAnimationFrame(()=>setTimeout(()=>{
    if(token!==generationToken)return;
    clearTree();
    randomness=+document.querySelector('#randomInput').value;
    reset(+document.querySelector('#seedInput').value);
    const density=+document.querySelector('#densityInput').value;
    const leafMult=+document.querySelector('#leafInput').value;
    buildTree(density);
    renderWood();
    renderLeaves(leafMult);
    status.style.display='none';
    console.log(`oak: ${branches.length} axes · ${mobileMode?'mobile':'desktop'} profile`);
  },24));
}

document.querySelector('#gear').onclick=()=>document.querySelector('#panel').classList.toggle('show');
document.querySelector('#regen').onclick=generate;
document.querySelector('#newSeed').onclick=()=>{document.querySelector('#seedInput').value=Math.floor(1+Math.random()*999999999);generate()};

function animate(){controls.update();renderer.render(scene,camera);requestAnimationFrame(animate)}
animate();
generate();

addEventListener('resize',()=>{
  camera.aspect=innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});
setTimeout(()=>document.querySelector('#hint').style.opacity=.24,6000);
