import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

const scene=new THREE.Scene();scene.background=new THREE.Color(0xcbd7c5);scene.fog=new THREE.FogExp2(0xcbd7c5,.0030);
const camera=new THREE.PerspectiveCamera(39,innerWidth/innerHeight,.03,260);camera.position.set(22,12.5,28);
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.4));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.04;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;document.body.prepend(renderer.domElement);
const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,7.5,0);controls.enableDamping=true;controls.dampingFactor=.06;controls.minDistance=.25;controls.maxDistance=75;controls.zoomToCursor=true;
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

// Crown envelope for an open-grown English oak. The upper surface is an elliptical dome,
// broad enough that the tree reads as a single crown rather than a wheel of radial branches.
function crownTop(radial){const R=11.4,H=7.1,base=7.65,q=THREE.MathUtils.clamp(radial/R,0,1);return base+H*Math.sqrt(Math.max(0,1-q*q))}
function crownTarget(radial,order){const inset=order<=2?1.55:order===3?1.15:order===4?.82:.65;return crownTop(radial)-inset}

function growAxis(parent,t,targetDir,len,r0,r1,order,{rise=0,lateRise=0,droop=0,wander=1,elbow=0}={}){
  const start=pointAt(parent,t),parentTan=tangentAt(parent,t),steps=order===1?26:order===2?18:order===3?15:order===4?10:7,pts=[start.clone()],ref=Math.abs(targetDir.y)<.9?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0),side=new THREE.Vector3().crossVectors(targetDir,ref).normalize().multiplyScalar(elbow);let p=start.clone();
  for(let i=1;i<=steps;i++){
    const f=i/steps,endTurn=order===1?.72:order===2?.84:order===3?.79:.72,ease=THREE.MathUtils.smoothstep(f,order===1?.025:.045,endTurn),d=parentTan.clone().lerp(targetDir,ease);
    d.addScaledVector(side,Math.sin(Math.PI*Math.max(0,(f-.26)/.74))*.32);
    const wig=(order===1?.006:order===2?.009:order===3?.015:order===4?.021:.026)*wander;
    d.x+=jit(wig);d.z+=jit(wig);d.y+=jit(wig*.48)+rise*Math.sin(Math.PI*f)+lateRise*THREE.MathUtils.smoothstep(f,.48,.95)-droop*f*f;

    if(order>=2){
      const radial=Math.hypot(p.x,p.z),targetY=crownTarget(radial,order),error=targetY-p.y;
      // Pull small axes into a shell below the crown surface. This is deliberately strong:
      // the screenshot should show a continuous dome, not upright tufts between flat limbs.
      d.y+=THREE.MathUtils.clamp(error,-2.2,2.2)*(order===2?.060:order===3?.085:.105);
      const ceiling=crownTop(radial)-.18,pressure=THREE.MathUtils.clamp((p.y-(ceiling-.80))/.80,0,1);
      if(pressure>0)d.y-=pressure*(.30+.52*pressure);
      if(radial>8.8){const edge=THREE.MathUtils.clamp((radial-8.8)/2.6,0,1);d.y-=edge*.10;d.addScaledVector(new THREE.Vector3(-p.x,0,-p.z).normalize(),edge*.018)}
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
  const cont=growAxis(tp,t,dirAround(tp,t,phase+jit(.10),rr(.08,.18),rr(-.020,.030)),tp.length*rr(.24,.33)*density,r*rr(.65,.74),Math.max(.003,r*rr(.13,.18)),5,{wander:.13,elbow:rr(-.020,.020)});made.push(cont);
  const lateralCount=5+(rnd()<.48?1:0);
  for(let j=0;j<lateralCount;j++){const tt=rr(.23,.93),jr=radiusAt(tp,tt),az=phase+j*2.3999632297+rr(-.20,.20),vb=rr(-.045,.045);made.push(growAxis(tp,tt,dirAround(tp,tt,az,rr(.20,.43),vb),tp.length*rr(.14,.23)*density,jr*rr(.22,.31),Math.max(.003,jr*rr(.055,.09)),5,{droop:vb<0?.005:0,wander:.13,elbow:rr(-.016,.016)}))}
  for(const p of made){const count=1+(rnd()<.48?1:0);for(let j=0;j<count;j++){const tt=rr(.42,.96),jr=radiusAt(p,tt),az=phase+j*2.40+(rnd()<.5?-1:1)*rr(.42,1.18),vb=rr(-.040,.035);growAxis(p,tt,dirAround(p,tt,az,rr(.16,.36),vb),p.length*rr(.15,.23)*density,jr*rr(.18,.27),.0025,6,{droop:vb<0?.003:0,wander:.10,elbow:rr(-.009,.009)})}}
  return made;
}

function growTerminalCluster(axis,phase,density=1){
  const next=4,t=.968,r=radiusAt(axis,t),terminals=[];
  const major=growAxis(axis,t,dirAround(axis,t,phase+jit(.05),rr(.08,.18),rr(-.015,.025)),axis.length*rr(.28,.37)*density,r*rr(.76,.84),r*rr(.25,.32),next,{wander:.19,elbow:rr(-.035,.035)});terminals.push(major);
  const extras=15+(rnd()<.65?2:0),golden=2.399963229728653;
  for(let j=0;j<extras;j++){
    const jt=rr(.16,.98),jr=radiusAt(axis,jt),az=phase+j*golden+rr(-.22,.22),ang=rr(.16,.43),vb=rr(-.060,.055);
    terminals.push(growAxis(axis,jt,dirAround(axis,jt,az,ang,vb),axis.length*rr(.085,.17)*density,jr*rr(.18,.29),Math.max(.0032,jr*rr(.045,.082)),next,{droop:vb<0?.006:0,wander:.15,elbow:rr(-.020,.020)}));
  }
  terminals.forEach((tp,i)=>{if(i===0||rnd()<.86)growTwigSpray(tp,phase+i*.27,density*.90)});
  return terminals;
}

function growSystem(axis,phase,density=1){
  if(axis.order>=3)return growTerminalCluster(axis,phase,density);
  const next=axis.order+1,children=[],golden=2.399963229728653;
  const count=axis.order===2?7:8;
  for(let j=0;j<count;j++){
    const tt=.16+j*(.69/(count-1))+rr(-.018,.018),r=radiusAt(axis,tt),az=phase+j*golden+rr(-.16,.16),ang=rr(.30,.55),bias=rr(-.035,.055),len=rr(.18,.29)*(1-.10*j/(count-1));
    children.push(growAxis(axis,tt,dirAround(axis,tt,az,ang,bias),axis.length*len*density,r*rr(.31,.43),r*rr(.095,.145),next,{droop:bias<0?.003:0,wander:.22,elbow:rr(-.050,.050)}));
  }
  const t=.968,r=radiusAt(axis,t),cont=growAxis(axis,t,dirAround(axis,t,phase+jit(.04),rr(.08,.17),rr(-.005,.030)),axis.length*rr(.38,.48),r*rr(.72,.80),r*rr(.25,.31),next,{wander:.18,elbow:rr(-.040,.040)});children.push(cont);
  children.forEach((child,i)=>growSystem(child,phase+i*.43+rr(-.14,.14),(child===cont?density*.92:density*rr(.82,.90))));
}

function decoratePrimary(primary,phase,density=1,upperness=0){
  const systems=[],golden=2.399963229728653,count=8;
  for(let j=0;j<count;j++){
    const t=.14+j*(.68/(count-1)),r=radiusAt(primary,t),az=phase+j*golden+rr(-.14,.14),ang=rr(.34,.55),bias=rr(-.025,.055)+upperness*.010,len=rr(.20,.32)*(1-.12*j/(count-1));
    systems.push(growAxis(primary,t,dirAround(primary,t,az,ang,bias),primary.length*len*density,r*rr(.35,.48),r*rr(.11,.16),2,{droop:bias<-.015?.004:0,wander:.24,elbow:rr(-.055,.055)}));
  }
  const t=.93,r=radiusAt(primary,t);
  systems.push(growAxis(primary,t,dirAround(primary,t,phase+.72,.30,.015+upperness*.012),primary.length*.22,r*.58,r*.19,2,{wander:.20,elbow:-.03}));
  systems.forEach((s,i)=>growSystem(s,phase+i*.47,density));
}

function addPrimary(trunk,primaries,{t,az,e,len,base,u,droop}){
  const r=radiusAt(trunk,t),dir=worldDir(az+jit(.06),e+jit(.025)),p=growAxis(trunk,t,dir,len*rr(.96,1.04),r*base,r*rr(.14,.20),1,{lateRise:.010+u*.012,droop,wander:.30,elbow:rr(-.085,.085)});
  primaries.push({p,phase:az,u});
}

function buildTree(density){
  branches.length=0;

  const trunkPts=[new THREE.Vector3(0,0,0),new THREE.Vector3(.08,1.3,.02),new THREE.Vector3(.02,2.6,.08),new THREE.Vector3(-.08,3.9,.05),new THREE.Vector3(.04,5.2,-.04),new THREE.Vector3(-.12,6.5,.02),new THREE.Vector3(.02,7.7,-.06),new THREE.Vector3(-.10,8.7,.02),new THREE.Vector3(.04,9.35,.00)],trunk=branch(trunkPts,1.48,.30,0,null);
  for(let i=0;i<7;i++){const az=i/7*Math.PI*2+rr(-.18,.18),dir=worldDir(az,rr(-.06,-.015));growAxis(trunk,.02,dir,rr(1.4,2.3),rr(.20,.28),.035,1,{droop:.06,wander:.25,elbow:rr(-.05,.05)})}

  // Build the crown in three overlapping rotated layers. The outer layer supplies width,
  // the shoulder layer supplies the curved sides, and the upper layer fills the dome.
  const primaries=[],golden=2.399963229728653;

  // 7 long lower scaffolds: rise gently before spreading to the wide crown edge.
  for(let i=0;i<7;i++){
    const u=i/6;
    addPrimary(trunk,primaries,{t:.30+u*.22+rr(-.012,.012),az:i*golden,e:.13+u*.07,len:9.45-u*.55,base:.63-u*.06,u:.10+u*.08,droop:.010-u*.006});
  }

  // 6 middle scaffolds rotated between the lower ones. These create the rounded shoulders.
  for(let i=0;i<6;i++){
    const u=i/5;
    addPrimary(trunk,primaries,{t:.46+u*.22+rr(-.012,.012),az:(i+.52)*golden,e:.32+u*.10,len:7.35-u*.70,base:.52-u*.05,u:.34+u*.10,droop:0});
  }

  // 5 shorter steep limbs close the top. They point in different azimuths, never as a leader.
  for(let i=0;i<5;i++){
    const u=i/4;
    addPrimary(trunk,primaries,{t:.65+u*.25+rr(-.010,.010),az:(i+1.15)*golden,e:.58+u*.13,len:4.75-u*.65,base:.42-u*.05,u:.68+u*.12,droop:0});
  }

  primaries.forEach(x=>decoratePrimary(x.p,x.phase,density,x.u));
}

function oakLeafGeometry(){const s=new THREE.Shape();s.moveTo(0,-.12);s.lineTo(.018,0);s.lineTo(.10,.07);s.lineTo(.16,.15);s.lineTo(.10,.22);s.lineTo(.22,.31);s.lineTo(.13,.40);s.lineTo(.24,.50);s.lineTo(.13,.59);s.lineTo(.20,.69);s.lineTo(.09,.78);s.lineTo(.11,.88);s.lineTo(0,1.0);s.lineTo(-.10,.88);s.lineTo(-.08,.78);s.lineTo(-.20,.69);s.lineTo(-.13,.59);s.lineTo(-.25,.50);s.lineTo(-.14,.40);s.lineTo(-.22,.31);s.lineTo(-.11,.22);s.lineTo(-.17,.15);s.lineTo(-.09,.07);s.lineTo(-.018,0);s.closePath();const g=new THREE.ShapeGeometry(s);g.computeVertexNormals();return g}

function renderLeaves(mult){
  const terminals=branches.filter(b=>b.order>=4&&b.children.length===0),maxLeaves=110000;if(!terminals.length)return;
  const capacity=Math.min(maxLeaves,Math.max(54000,Math.floor(104000*mult/1.35))),perTerminal=Math.max(1,Math.min(12,Math.floor(capacity/terminals.length)));
  const g=oakLeafGeometry(),mat=new THREE.MeshStandardMaterial({color:0x355f29,roughness:.86,side:THREE.DoubleSide}),inst=new THREE.InstancedMesh(g,mat,capacity),dummy=new THREE.Object3D(),q=new THREE.Quaternion(),spinQ=new THREE.Quaternion(),up=new THREE.Vector3(0,1,0),center=new THREE.Vector3(),pos=new THREE.Vector3(),offset=new THREE.Vector3(),outward=new THREE.Vector3(),leafDir=new THREE.Vector3(),col=new THREE.Color();let k=0;
  const ordered=[...terminals].sort((a,b)=>pointAt(b,.9).y-pointAt(a,.9).y);
  for(let bi=0;bi<ordered.length&&k<capacity;bi++){
    const b=ordered[bi],remaining=capacity-k,branchesLeft=ordered.length-bi,target=Math.max(1,Math.min(perTerminal+((bi%7===0)?1:0),Math.floor(remaining/Math.max(1,branchesLeft))+1)),branchWeight=THREE.MathUtils.clamp(b.length/.50,.68,1.12);
    for(let i=0;i<target&&k<capacity;i++,k++){
      const t=THREE.MathUtils.clamp(.36+(i/Math.max(1,target-1))*.62+rr(-.04,.04),.30,.998),tan=tangentAt(b,t),{u,v}=frameAt(b,t),a=rr(0,Math.PI*2),rad=rr(.050,.135)*mult*branchWeight,shell=rad*Math.pow(rnd(),.74);
      center.copy(pointAt(b,t));offset.copy(u).multiplyScalar(Math.cos(a)*shell).addScaledVector(v,Math.sin(a)*shell*rr(.72,1.12)).addScaledVector(tan,rr(-rad*.12,rad*.28));pos.copy(center).add(offset);outward.copy(offset).normalize();leafDir.copy(tan).multiplyScalar(rr(.18,.38)).addScaledVector(outward,rr(.62,.94)).add(new THREE.Vector3(0,rr(-.02,.11),0)).normalize();q.setFromUnitVectors(up,leafDir);spinQ.setFromAxisAngle(leafDir,rr(0,Math.PI*2));q.premultiply(spinQ);dummy.position.copy(pos);dummy.quaternion.copy(q);const sc=rr(.13,.195);dummy.scale.set(sc*rr(.86,1.14),sc*rr(.94,1.18),sc);dummy.updateMatrix();inst.setMatrixAt(k,dummy.matrix);const light=rr(.88,1.16);col.setRGB(.18*light,.38*light,.15*light);inst.setColorAt(k,col)
    }
  }
  inst.count=k;inst.instanceMatrix.needsUpdate=true;if(inst.instanceColor)inst.instanceColor.needsUpdate=true;inst.castShadow=false;inst.receiveShadow=true;treeRoot.add(inst);meshes.push(inst);
}

function clear(){for(const m of meshes){if(m.geometry)m.geometry.dispose();treeRoot.remove(m)}meshes=[];while(treeRoot.children.length)treeRoot.remove(treeRoot.children[0])}
function generate(){document.querySelector('#status').style.display='block';setTimeout(()=>{clear();randomness=+document.querySelector('#randomInput').value;reset(+document.querySelector('#seedInput').value);buildTree(+document.querySelector('#densityInput').value);renderWood();renderLeaves(+document.querySelector('#leafInput').value);document.querySelector('#status').style.display='none';console.log(`oak: ${branches.length} woody axes`)},20)}
document.querySelector('#gear').onclick=()=>document.querySelector('#panel').classList.toggle('show');document.querySelector('#regen').onclick=generate;document.querySelector('#newSeed').onclick=()=>{document.querySelector('#seedInput').value=Math.floor(1+Math.random()*999999999);generate()};function animate(){controls.update();renderer.render(scene,camera);requestAnimationFrame(animate)}animate();generate();addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});setTimeout(()=>document.querySelector('#hint').style.opacity=.24,6000);