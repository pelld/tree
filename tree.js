import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

const scene=new THREE.Scene();scene.background=new THREE.Color(0xcbd7c5);scene.fog=new THREE.FogExp2(0xcbd7c5,.0030);
const camera=new THREE.PerspectiveCamera(39,innerWidth/innerHeight,.03,260);camera.position.set(22,12.5,28);
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.4));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.04;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;document.body.prepend(renderer.domElement);
const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,7.2,0);controls.enableDamping=true;controls.dampingFactor=.06;controls.minDistance=.25;controls.maxDistance=75;controls.zoomToCursor=true;
scene.add(new THREE.HemisphereLight(0xdce8d5,0x4a4237,1.45));
const sun=new THREE.DirectionalLight(0xffefd0,3.1);sun.position.set(-18,29,14);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-28;sun.shadow.camera.right=28;sun.shadow.camera.top=30;sun.shadow.camera.bottom=-10;sun.shadow.bias=-.00012;scene.add(sun);
const ground=new THREE.Mesh(new THREE.CircleGeometry(55,80),new THREE.MeshStandardMaterial({color:0x788861,roughness:1}));ground.rotation.x=-Math.PI/2;ground.receiveShadow=true;scene.add(ground);

const woodMats=[0x43362d,0x49392f,0x514035,0x584738,0x44372c,0x4b3b30,0x514033].map(c=>new THREE.MeshStandardMaterial({color:c,roughness:1}));
const treeRoot=new THREE.Group();scene.add(treeRoot);let meshes=[];const branches=[];let seed=88231,randomness=.18;
function reset(v){seed=Math.max(1,Math.floor(v)||1)%2147483647;if(!seed)seed=1}
function rnd(){seed=seed*16807%2147483647;return(seed-1)/2147483646}
function rr(a,b){return a+(b-a)*rnd()}
function jit(a){return(rnd()-.5)*a*randomness}
function branch(points,r0,r1,order,parent=null){const curve=new THREE.CatmullRomCurve3(points,false,'centripetal'),b={points,r0,r1,order,parent,children:[],curve,length:curve.getLength(),phase:rnd()*6.283};if(parent)parent.children.push(b);branches.push(b);return b}
function pointAt(b,t){return b.curve.getPointAt(THREE.MathUtils.clamp(t,0,1))}
function tangentAt(b,t){return b.curve.getTangentAt(THREE.MathUtils.clamp(t,0,1)).normalize()}
function radiusAt(b,t){return b.r1+(b.r0-b.r1)*Math.pow(1-t,.76)}
function frameAt(parent,t){const tan=tangentAt(parent,t),ref=Math.abs(tan.y)<.9?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0),u=new THREE.Vector3().crossVectors(tan,ref).normalize(),v=new THREE.Vector3().crossVectors(u,tan).normalize();return{tan,u,v}}
function dirAround(parent,t,azimuth,angle,verticalBias=0){const {tan,u,v}=frameAt(parent,t),radial=u.clone().multiplyScalar(Math.cos(azimuth)).add(v.clone().multiplyScalar(Math.sin(azimuth))).normalize(),d=tan.clone().multiplyScalar(Math.cos(angle)).add(radial.multiplyScalar(Math.sin(angle)));d.y+=verticalBias;return d.normalize()}
function worldDir(az,elev){const ce=Math.cos(elev);return new THREE.Vector3(Math.cos(az)*ce,Math.sin(elev),Math.sin(az)*ce).normalize()}

function growAxis(parent,t,targetDir,len,r0,r1,order,{rise=0,lateRise=0,droop=0,wander=1,elbow=0}={}){
  const start=pointAt(parent,t),parentTan=tangentAt(parent,t),steps=order===1?24:order===2?18:order===3?15:order===4?10:7,pts=[start.clone()],ref=Math.abs(targetDir.y)<.9?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0),side=new THREE.Vector3().crossVectors(targetDir,ref).normalize().multiplyScalar(elbow);let p=start.clone();
  for(let i=1;i<=steps;i++){
    const f=i/steps,endTurn=order===1?.72:order===2?.84:order===3?.79:.72,ease=THREE.MathUtils.smoothstep(f,order===1?.025:.045,endTurn),d=parentTan.clone().lerp(targetDir,ease);
    d.addScaledVector(side,Math.sin(Math.PI*Math.max(0,(f-.26)/.74))*.32);
    const wig=(order===1?.006:order===2?.009:order===3?.015:order===4?.021:.026)*wander;
    d.x+=jit(wig);d.z+=jit(wig);d.y+=jit(wig*.48)+rise*Math.sin(Math.PI*f)+lateRise*THREE.MathUtils.smoothstep(f,.48,.95)-droop*f*f;

    // Fine axes are gently pulled toward a broad oak crown shell. This creates a broken dome:
    // higher near the centre, progressively lower at the edge, without a single pointed leader.
    if(order>=2){
      const radial=Math.hypot(p.x,p.z),targetY=12.35-.038*radial*radial,error=targetY-p.y;
      d.y+=THREE.MathUtils.clamp(error,-1.8,1.8)*(order===2?.025:.038);
      const pressure=THREE.MathUtils.clamp((p.y-(targetY-.95))/.95,0,1);
      if(pressure>0){
        d.y-=pressure*(.18+.36*pressure);
        if(radial>.35)d.addScaledVector(new THREE.Vector3(p.x,0,p.z).normalize(),pressure*.060);
      }
    }

    d.normalize();p=p.clone().add(d.multiplyScalar(len/steps*(.994+rr(-.010,.013))));pts.push(p.clone())
  }
  return branch(pts,r0,r1,order,parent)
}

function renderWood(){
  const bigBuckets=Array.from({length:4},()=>[]),fine=[];
  for(const b of branches){
    if(b.order<=3){
      const seg=b.order===0?60:b.order===1?48:b.order===2?34:22,sides=b.order===0?16:b.order===1?12:b.order===2?9:7,g=new THREE.TubeGeometry(b.curve,seg,1,sides,false),pos=g.attributes.position,uv=g.attributes.uv,c=new THREE.Vector3(),v=new THREE.Vector3();
      for(let i=0;i<pos.count;i++){const t=uv.getX(i);b.curve.getPointAt(t,c);v.set(pos.getX(i),pos.getY(i),pos.getZ(i)).sub(c);const collar=b.parent&&t<.18?1+(b.order===1?.16:b.order===2?.34:.22)*(1-t/.18):1,r=radiusAt(b,t)*collar*(1+.003*Math.sin(15*t+b.phase));v.multiplyScalar(r);pos.setXYZ(i,c.x+v.x,c.y+v.y,c.z+v.z)}
      g.computeVertexNormals();bigBuckets[b.order].push(g);
    }else{
      const n=b.order===4?4:b.order===5?3:2;
      for(let i=0;i<n;i++){const t0=i/n,t1=(i+1)/n,p0=pointAt(b,t0),p1=pointAt(b,t1),d=p1.clone().sub(p0),len=d.length();if(len>.002)fine.push({order:b.order,p0,p1,len,r:Math.max(.003,radiusAt(b,t0))})}
    }
  }
  bigBuckets.forEach((gs,o)=>{if(!gs.length)return;const merged=mergeGeometries(gs,false);gs.forEach(g=>g.dispose());const m=new THREE.Mesh(merged,woodMats[o]);m.castShadow=true;m.receiveShadow=true;treeRoot.add(m);meshes.push(m)});
  for(let order=4;order<=6;order++){
    const segs=fine.filter(s=>s.order===order);if(!segs.length)continue;
    const geo=new THREE.CylinderGeometry(.68,1,1,order===4?5:4,1,false),inst=new THREE.InstancedMesh(geo,woodMats[order],segs.length),dummy=new THREE.Object3D(),up=new THREE.Vector3(0,1,0),dir=new THREE.Vector3(),q=new THREE.Quaternion();
    segs.forEach((s,i)=>{dir.copy(s.p1).sub(s.p0).normalize();q.setFromUnitVectors(up,dir);dummy.position.copy(s.p0).add(s.p1).multiplyScalar(.5);dummy.quaternion.copy(q);dummy.scale.set(s.r,s.len,s.r);dummy.updateMatrix();inst.setMatrixAt(i,dummy.matrix)});
    inst.instanceMatrix.needsUpdate=true;inst.castShadow=false;inst.receiveShadow=true;treeRoot.add(inst);meshes.push(inst);
  }
}

function growTwigSpray(tp,phase,density=1){
  const made=[],t=.965,r=radiusAt(tp,t);
  const cont=growAxis(tp,t,dirAround(tp,t,phase+jit(.10),rr(.10,.22),rr(-.035,.035)),tp.length*rr(.27,.37)*density,r*rr(.66,.76),Math.max(.003,r*rr(.14,.20)),5,{wander:.14,elbow:rr(-.022,.022)});made.push(cont);
  const lateralCount=4+(rnd()<.55?1:0);
  for(let j=0;j<lateralCount;j++){const tt=rr(.25,.92),jr=radiusAt(tp,tt),az=phase+(j-(lateralCount-1)/2)*rr(.50,.78)+rr(-.20,.20),vb=rr(-.060,.045);made.push(growAxis(tp,tt,dirAround(tp,tt,az,rr(.23,.49),vb),tp.length*rr(.17,.27)*density,jr*rr(.24,.34),Math.max(.003,jr*rr(.060,.10)),5,{droop:vb<0?.007:0,wander:.14,elbow:rr(-.018,.018)}))}
  for(const p of made){const count=1+(rnd()<.56?1:0);for(let j=0;j<count;j++){const tt=rr(.40,.95),jr=radiusAt(p,tt),az=phase+(rnd()<.5?-1:1)*rr(.46,1.30)+rr(-.16,.16),vb=rr(-.050,.040);growAxis(p,tt,dirAround(p,tt,az,rr(.18,.42),vb),p.length*rr(.17,.26)*density,jr*rr(.20,.30),.0025,6,{droop:vb<0?.004:0,wander:.11,elbow:rr(-.010,.010)})}}
  return made;
}

function growTerminalCluster(axis,phase,density=1){
  const next=4,t=.968,r=radiusAt(axis,t),terminals=[];
  const major=growAxis(axis,t,dirAround(axis,t,phase+jit(.06),rr(.10,.22),rr(-.025,.030)),axis.length*rr(.34,.44)*density,r*rr(.78,.86),r*rr(.28,.35),next,{wander:.21,elbow:rr(-.04,.04)});terminals.push(major);
  terminals.push(growAxis(axis,t,dirAround(axis,t,phase+(rnd()<.5?-1:1)*rr(1.05,1.62),rr(.35,.58),rr(-.070,.045)),axis.length*rr(.24,.32)*density,r*rr(.47,.57),r*rr(.15,.21),next,{droop:.004,wander:.22,elbow:rr(-.05,.05)}));
  terminals.push(growAxis(axis,t,dirAround(axis,t,phase+(rnd()<.5?-1:1)*rr(1.85,2.55),rr(.30,.51),rr(-.080,.035)),axis.length*rr(.19,.27)*density,r*rr(.37,.47),r*rr(.11,.17),next,{droop:.006,wander:.21,elbow:rr(-.04,.04)}));
  const extras=12+(rnd()<.65?2:0);
  for(let j=0;j<extras;j++){const jt=rr(.18,.97),jr=radiusAt(axis,jt),spread=j-(extras-1)/2,az=phase+spread*rr(.17,.29)+jit(.22)+(rnd()<.5?-1:1)*rr(.02,.11),ang=rr(.16,.46),vb=rr(-.090,.060);terminals.push(growAxis(axis,jt,dirAround(axis,jt,az,ang,vb),axis.length*rr(.11,.20)*density,jr*rr(.21,.32),Math.max(.0035,jr*rr(.052,.09)),next,{droop:vb<0?.008:0,wander:.16,elbow:rr(-.024,.024)}))}
  terminals.forEach((tp,i)=>{if(i===0||rnd()<.82)growTwigSpray(tp,phase+i*.17,density*.92)});
  return terminals;
}

function growSystem(axis,phase,density=1){
  if(axis.order>=3)return growTerminalCluster(axis,phase,density);
  const next=axis.order+1,children=[];
  const addChild=(tt,az,ang,bias,len,base,tip,opts={})=>{const r=radiusAt(axis,tt),c=growAxis(axis,tt,dirAround(axis,tt,az,ang,bias),axis.length*len*density,r*base,r*tip,next,opts);children.push(c);return c};

  // Repeated small branch units spiral around each parent rather than all sitting in one plane.
  const childSpecs=[
    {t:.20,az:phase-2.05,ang:.38,bias:-.060,len:.24,base:.38,tip:.13},
    {t:.32,az:phase-1.02,ang:.46,bias:-.035,len:.29,base:.43,tip:.14},
    {t:.45,az:phase+.02,ang:.54,bias:-.015,len:.32,base:.46,tip:.15},
    {t:.58,az:phase+1.08,ang:.52,bias:-.020,len:.30,base:.43,tip:.14},
    {t:.70,az:phase+2.14,ang:.44,bias:-.035,len:.26,base:.38,tip:.12},
    {t:.81,az:phase+3.18,ang:.35,bias:-.045,len:.21,base:.32,tip:.10}
  ];
  for(const s of childSpecs)addChild(s.t+rr(-.025,.025),s.az+jit(.20),s.ang+jit(.06),s.bias+rr(-.025,.040),s.len*rr(.90,1.08),s.base*rr(.94,1.06),s.tip*rr(.92,1.08),{droop:s.bias<-.03?.004:0,wander:.24,elbow:rr(-.055,.055)});

  const t=.968,r=radiusAt(axis,t),cont=growAxis(axis,t,dirAround(axis,t,phase+jit(.05),rr(.10,.21),rr(-.015,.030)),axis.length*rr(.45,.56),r*rr(.76,.84),r*rr(.29,.36),next,{wander:.20,elbow:rr(-.045,.045)});children.push(cont);
  children.forEach((child,i)=>growSystem(child,phase+(i-(children.length-1)/2)*.31+rr(-.18,.18),(child===cont?density*.94:density*rr(.85,.93))));
}

function decoratePrimary(primary,phase,density=1,upperness=0){
  const systems=[],specs=[
    {t:.12,az:phase-1.75,ang:.34,bias:-.040+upperness*.008,len:.19,base:.34,tip:.12},
    {t:.21,az:phase-1.08,ang:.39,bias:-.030+upperness*.010,len:.23,base:.38,tip:.13},
    {t:.30,az:phase-.38,ang:.46,bias:-.020+upperness*.012,len:.28,base:.43,tip:.14},
    {t:.39,az:phase+.34,ang:.53,bias:-.012+upperness*.014,len:.33,base:.48,tip:.16},
    {t:.48,az:phase+1.08,ang:.56,bias:-.010+upperness*.016,len:.35,base:.50,tip:.17},
    {t:.57,az:phase+1.82,ang:.53,bias:-.012+upperness*.018,len:.33,base:.47,tip:.16},
    {t:.66,az:phase+2.55,ang:.48,bias:-.010+upperness*.019,len:.29,base:.43,tip:.14},
    {t:.75,az:phase-2.98,ang:.42,bias:-.004+upperness*.020,len:.25,base:.39,tip:.13},
    {t:.84,az:phase-2.23,ang:.35,bias:.004+upperness*.022,len:.20,base:.34,tip:.11}
  ];
  for(const s of specs){const r=radiusAt(primary,s.t),d=dirAround(primary,s.t,s.az+jit(.16),s.ang+jit(.05),s.bias+jit(.025));systems.push(growAxis(primary,s.t,d,primary.length*s.len*rr(.93,1.07),r*s.base,r*s.tip,2,{droop:s.bias<-.025?.006:0,wander:.26,elbow:rr(-.06,.06)}))}
  const t=.93,r=radiusAt(primary,t);
  systems.push(growAxis(primary,t,dirAround(primary,t,phase-.55,.36,.008+upperness*.014),primary.length*.25,r*.64,r*.22,2,{wander:.22,elbow:-.04}));
  systems.push(growAxis(primary,t,dirAround(primary,t,phase+1.65,.34,-.010+upperness*.012),primary.length*.22,r*.57,r*.20,2,{wander:.22,elbow:.05}));
  systems.forEach((s,i)=>growSystem(s,phase+i*.39,density));
}

function buildTree(density){
  branches.length=0;

  const trunkPts=[new THREE.Vector3(0,0,0),new THREE.Vector3(.08,1.3,.02),new THREE.Vector3(.02,2.6,.08),new THREE.Vector3(-.08,3.9,.05),new THREE.Vector3(.04,5.2,-.04),new THREE.Vector3(-.12,6.5,.02),new THREE.Vector3(.02,7.7,-.06),new THREE.Vector3(-.10,8.7,.02),new THREE.Vector3(.04,9.35,.00)],trunk=branch(trunkPts,1.48,.30,0,null);
  for(let i=0;i<7;i++){const az=i/7*Math.PI*2+rr(-.18,.18),dir=worldDir(az,rr(-.06,-.015));growAxis(trunk,.02,dir,rr(1.4,2.3),rr(.20,.28),.035,1,{droop:.06,wander:.25,elbow:rr(-.05,.05)})}

  // Twelve scaffold limbs are staggered vertically and rotated by the golden angle.
  // The lower limbs are longest; higher limbs shorten so the silhouette closes into a dome.
  const primaries=[],primaryCount=12,golden=2.399963229728653;
  for(let i=0;i<primaryCount;i++){
    const u=i/(primaryCount-1),t=.29+u*.43+rr(-.014,.014),az=i*golden+rr(-.11,.11),e=.025+u*.16+rr(-.018,.018),len=9.35-u*2.65+rr(-.35,.35),base=.62-u*.17;
    const r=radiusAt(trunk,t),dir=worldDir(az,e),p=growAxis(trunk,t,dir,len,r*base,r*rr(.15,.21),1,{lateRise:u*.010,droop:Math.max(0,.030-u*.034),wander:.32,elbow:rr(-.095,.095)});
    primaries.push({p,phase:az,u});
  }

  // Small centre fillers only: no tall central spear.
  const rt=radiusAt(trunk,.985),leader=growAxis(trunk,.985,worldDir(1.15,.38),2.65,rt*.76,rt*.16,1,{lateRise:.006,wander:.27,elbow:.06}),coleader=growAxis(trunk,.84,worldDir(3.75,.30),2.95,radiusAt(trunk,.84)*.50,.10,1,{lateRise:.006,wander:.29,elbow:-.07});
  primaries.push({p:leader,phase:1.15,u:.56},{p:coleader,phase:3.75,u:.48});
  primaries.forEach(x=>decoratePrimary(x.p,x.phase,density,x.u));
}

function oakLeafGeometry(){const s=new THREE.Shape();s.moveTo(0,-.12);s.lineTo(.018,0);s.lineTo(.10,.07);s.lineTo(.16,.15);s.lineTo(.10,.22);s.lineTo(.22,.31);s.lineTo(.13,.40);s.lineTo(.24,.50);s.lineTo(.13,.59);s.lineTo(.20,.69);s.lineTo(.09,.78);s.lineTo(.11,.88);s.lineTo(0,1.0);s.lineTo(-.10,.88);s.lineTo(-.08,.78);s.lineTo(-.20,.69);s.lineTo(-.13,.59);s.lineTo(-.25,.50);s.lineTo(-.14,.40);s.lineTo(-.22,.31);s.lineTo(-.11,.22);s.lineTo(-.17,.15);s.lineTo(-.09,.07);s.lineTo(-.018,0);s.closePath();const g=new THREE.ShapeGeometry(s);g.computeVertexNormals();return g}

function renderLeaves(mult){
  const terminals=branches.filter(b=>b.order>=4&&b.children.length===0),maxLeaves=110000;if(!terminals.length)return;
  const capacity=Math.min(maxLeaves,Math.max(50000,Math.floor(100000*mult/1.35))),perTerminal=Math.max(1,Math.min(12,Math.floor(capacity/terminals.length)));
  const g=oakLeafGeometry(),mat=new THREE.MeshStandardMaterial({color:0x355f29,roughness:.86,side:THREE.DoubleSide}),inst=new THREE.InstancedMesh(g,mat,capacity),dummy=new THREE.Object3D(),q=new THREE.Quaternion(),spinQ=new THREE.Quaternion(),up=new THREE.Vector3(0,1,0),center=new THREE.Vector3(),pos=new THREE.Vector3(),offset=new THREE.Vector3(),outward=new THREE.Vector3(),leafDir=new THREE.Vector3(),col=new THREE.Color();let k=0;
  const ordered=[...terminals].sort((a,b)=>pointAt(b,.9).y-pointAt(a,.9).y);
  for(let bi=0;bi<ordered.length&&k<capacity;bi++){
    const b=ordered[bi],remaining=capacity-k,branchesLeft=ordered.length-bi,target=Math.max(1,Math.min(perTerminal+((bi%7===0)?1:0),Math.floor(remaining/Math.max(1,branchesLeft))+1)),branchWeight=THREE.MathUtils.clamp(b.length/.50,.68,1.12);
    for(let i=0;i<target&&k<capacity;i++,k++){
      const t=THREE.MathUtils.clamp(.42+(i/Math.max(1,target-1))*.56+rr(-.04,.04),.34,.998),tan=tangentAt(b,t),{u,v}=frameAt(b,t),a=rr(0,Math.PI*2),rad=rr(.042,.118)*mult*branchWeight,shell=rad*Math.pow(rnd(),.78);
      center.copy(pointAt(b,t));offset.copy(u).multiplyScalar(Math.cos(a)*shell).addScaledVector(v,Math.sin(a)*shell*rr(.65,1.05)).addScaledVector(tan,rr(-rad*.10,rad*.24));pos.copy(center).add(offset);outward.copy(offset).normalize();leafDir.copy(tan).multiplyScalar(rr(.20,.42)).addScaledVector(outward,rr(.58,.90)).add(new THREE.Vector3(0,rr(-.03,.13),0)).normalize();q.setFromUnitVectors(up,leafDir);spinQ.setFromAxisAngle(leafDir,rr(0,Math.PI*2));q.premultiply(spinQ);dummy.position.copy(pos);dummy.quaternion.copy(q);const sc=rr(.13,.195);dummy.scale.set(sc*rr(.86,1.14),sc*rr(.94,1.18),sc);dummy.updateMatrix();inst.setMatrixAt(k,dummy.matrix);const light=rr(.88,1.16);col.setRGB(.18*light,.38*light,.15*light);inst.setColorAt(k,col)
    }
  }
  inst.count=k;inst.instanceMatrix.needsUpdate=true;if(inst.instanceColor)inst.instanceColor.needsUpdate=true;inst.castShadow=false;inst.receiveShadow=true;treeRoot.add(inst);meshes.push(inst);
}

function clear(){for(const m of meshes){if(m.geometry)m.geometry.dispose();treeRoot.remove(m)}meshes=[];while(treeRoot.children.length)treeRoot.remove(treeRoot.children[0])}
function generate(){document.querySelector('#status').style.display='block';setTimeout(()=>{clear();randomness=+document.querySelector('#randomInput').value;reset(+document.querySelector('#seedInput').value);buildTree(+document.querySelector('#densityInput').value);renderWood();renderLeaves(+document.querySelector('#leafInput').value);document.querySelector('#status').style.display='none';console.log(`oak: ${branches.length} woody axes`)},20)}
document.querySelector('#gear').onclick=()=>document.querySelector('#panel').classList.toggle('show');document.querySelector('#regen').onclick=generate;document.querySelector('#newSeed').onclick=()=>{document.querySelector('#seedInput').value=Math.floor(1+Math.random()*999999999);generate()};function animate(){controls.update();renderer.render(scene,camera);requestAnimationFrame(animate)}animate();generate();addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});setTimeout(()=>document.querySelector('#hint').style.opacity=.24,6000);
