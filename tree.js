import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

const scene=new THREE.Scene();scene.background=new THREE.Color(0xcbd7c5);scene.fog=new THREE.FogExp2(0xcbd7c5,.0030);
const camera=new THREE.PerspectiveCamera(39,innerWidth/innerHeight,.03,260);camera.position.set(24,13.2,31);
const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.4));renderer.setSize(innerWidth,innerHeight);renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.04;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;document.body.prepend(renderer.domElement);
const controls=new OrbitControls(camera,renderer.domElement);controls.target.set(0,7.4,0);controls.enableDamping=true;controls.dampingFactor=.06;controls.minDistance=.25;controls.maxDistance=75;controls.zoomToCursor=true;
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

    // Mature open-grown oak: suppress vertical spikes as fine branching approaches the crown surface.
    // The allowable top height falls gradually away from the trunk, giving a broad broken dome rather than a cone.
    if(order>=2){
      const radial=Math.hypot(p.x,p.z),ceiling=13.7-.032*radial*radial,pressure=THREE.MathUtils.clamp((p.y-(ceiling-1.65))/1.65,0,1);
      if(pressure>0){d.y-=pressure*(.16+.34*pressure);if(radial>.35)d.addScaledVector(new THREE.Vector3(p.x,0,p.z).normalize(),pressure*.055)}
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
  const cont=growAxis(tp,t,dirAround(tp,t,phase+jit(.10),rr(.10,.25),rr(-.04,.04)),tp.length*rr(.32,.44)*density,r*rr(.68,.78),Math.max(.003,r*rr(.15,.21)),5,{wander:.14,elbow:rr(-.022,.022)});made.push(cont);
  const lateralCount=3+(rnd()<.62?1:0);
  for(let j=0;j<lateralCount;j++){const tt=rr(.28,.91),jr=radiusAt(tp,tt),az=phase+(j-(lateralCount-1)/2)*rr(.58,.95)+rr(-.24,.24),vb=rr(-.065,.055);made.push(growAxis(tp,tt,dirAround(tp,tt,az,rr(.26,.56),vb),tp.length*rr(.21,.34)*density,jr*rr(.27,.38),Math.max(.003,jr*rr(.065,.11)),5,{droop:vb<0?.007:0,wander:.14,elbow:rr(-.018,.018)}))}
  for(const p of made){const count=1+(rnd()<.66?1:0);for(let j=0;j<count;j++){const tt=rr(.43,.95),jr=radiusAt(p,tt),az=phase+(rnd()<.5?-1:1)*rr(.48,1.42)+rr(-.18,.18),vb=rr(-.055,.045);growAxis(p,tt,dirAround(p,tt,az,rr(.20,.46),vb),p.length*rr(.20,.31)*density,jr*rr(.22,.32),.0025,6,{droop:vb<0?.004:0,wander:.11,elbow:rr(-.010,.010)})}}
  return made;
}

function growTerminalCluster(axis,phase,density=1){
  const next=4,t=.968,r=radiusAt(axis,t),terminals=[];
  const major=growAxis(axis,t,dirAround(axis,t,phase+jit(.06),rr(.12,.25),rr(-.02,.035)),axis.length*rr(.40,.51)*density,r*rr(.82,.90),r*rr(.32,.40),next,{wander:.22,elbow:rr(-.04,.04)});terminals.push(major);
  terminals.push(growAxis(axis,t,dirAround(axis,t,phase+(rnd()<.5?-1:1)*rr(1.15,1.80),rr(.42,.68),rr(-.07,.055)),axis.length*rr(.29,.39)*density,r*rr(.52,.62),r*rr(.17,.24),next,{droop:.004,wander:.23,elbow:rr(-.05,.05)}));
  terminals.push(growAxis(axis,t,dirAround(axis,t,phase+(rnd()<.5?-1:1)*rr(2.00,2.75),rr(.34,.58),rr(-.075,.045)),axis.length*rr(.23,.33)*density,r*rr(.42,.52),r*rr(.13,.20),next,{droop:.006,wander:.22,elbow:rr(-.04,.04)}));
  const extras=13+(rnd()<.70?2:0);
  for(let j=0;j<extras;j++){const jt=rr(.22,.97),jr=radiusAt(axis,jt),spread=j-(extras-1)/2,az=phase+spread*rr(.20,.38)+jit(.26)+(rnd()<.5?-1:1)*rr(.02,.14),ang=rr(.18,.54),vb=rr(-.085,.075);terminals.push(growAxis(axis,jt,dirAround(axis,jt,az,ang,vb),axis.length*rr(.16,.28)*density,jr*rr(.26,.39),Math.max(.004,jr*rr(.065,.11)),next,{droop:vb<0?.008:0,wander:.17,elbow:rr(-.028,.028)}))}
  terminals.forEach((tp,i)=>{if(i===0||rnd()<.76)growTwigSpray(tp,phase+i*.19,density*.94)});
  return terminals;
}

function growSystem(axis,phase,density=1){
  if(axis.order>=3)return growTerminalCluster(axis,phase,density);
  const next=axis.order+1,children=[];
  const addChild=(tt,az,ang,bias,len,base,tip,opts={})=>{const r=radiusAt(axis,tt),c=growAxis(axis,tt,dirAround(axis,tt,az,ang,bias),axis.length*len*density,r*base,r*tip,next,opts);children.push(c);return c};
  addChild(rr(.20,.34),phase+(rnd()<.5?-1:1)*rr(.95,1.55),rr(.40,.66),rr(-.065,.055),rr(.27,.38),rr(.42,.54),rr(.13,.19),{wander:.31,elbow:rr(-.075,.075)});
  addChild(rr(.34,.48),phase+(rnd()<.5?-1:1)*rr(1.20,1.85),rr(.44,.70),rr(-.070,.060),rr(.30,.41),rr(.45,.56),rr(.14,.20),{wander:.32,elbow:rr(-.08,.08)});
  addChild(rr(.49,.64),phase+(rnd()<.5?-1:1)*rr(1.45,2.10),rr(.46,.72),rr(-.075,.060),rr(.31,.43),rr(.45,.57),rr(.15,.21),{wander:.32,elbow:rr(-.085,.085)});
  const t=.968,r=radiusAt(axis,t),cont=growAxis(axis,t,dirAround(axis,t,phase+jit(.05),rr(.12,.25),rr(-.015,.035)),axis.length*rr(.56,.69),r*rr(.84,.90),r*rr(.36,.44),next,{wander:.22,elbow:rr(-.05,.05)});children.push(cont);
  addChild(t,phase+(rnd()<.5?-1:1)*rr(1.40,2.10),rr(.48,.75),rr(-.065,.055),rr(.39,.51),rr(.56,.65),rr(.23,.31),{wander:.27,elbow:rr(-.07,.07)});
  addChild(rr(.58,.76),phase+(rnd()<.5?-1:1)*rr(2.00,2.82),rr(.40,.65),rr(-.095,.035),rr(.23,.35),rr(.31,.41),rr(.10,.16),{droop:.004,wander:.21,elbow:rr(-.05,.05)});
  addChild(rr(.70,.88),phase+(rnd()<.5?-1:1)*rr(.68,1.28),rr(.26,.50),rr(-.055,.045),rr(.21,.31),rr(.25,.35),rr(.08,.14),{wander:.19,elbow:rr(-.04,.04)});
  children.forEach((child,i)=>growSystem(child,phase+rr(-.40,.40)+i*.13,(child===cont?density*.98:density*rr(.88,.96))));
}

function decoratePrimary(primary,phase,density=1,upperness=0){
  const systems=[],specs=[
    {t:.12,az:phase-.55,ang:.42,bias:-.025+upperness*.012,len:.25,base:.40,tip:.15},
    {t:.20,az:phase+.70,ang:.44,bias:-.010+upperness*.012,len:.31,base:.45,tip:.17},
    {t:.30,az:phase+1.30,ang:.58,bias:.000+upperness*.016,len:.44,base:.57,tip:.21},
    {t:.40,az:phase-.95,ang:.62,bias:-.040+upperness*.018,len:.49,base:.59,tip:.22,droop:upperness<.2?.020:0},
    {t:.51,az:phase+2.15,ang:.58,bias:-.005+upperness*.020,len:.47,base:.55,tip:.21},
    {t:.62,az:phase-2.25,ang:.54,bias:.000+upperness*.020,len:.42,base:.50,tip:.19},
    {t:.73,az:phase+.85,ang:.50,bias:.005+upperness*.022,len:.38,base:.46,tip:.17},
    {t:.83,az:phase-1.45,ang:.46,bias:.010+upperness*.024,len:.33,base:.40,tip:.15}
  ];
  for(const s of specs){const r=radiusAt(primary,s.t),d=dirAround(primary,s.t,s.az+jit(.18),s.ang+jit(.05),s.bias+jit(.03));systems.push(growAxis(primary,s.t,d,primary.length*s.len*rr(.92,1.08),r*s.base,r*s.tip,2,{droop:s.droop||0,wander:.30,elbow:rr(-.08,.08)}))}
  const t=.93,r=radiusAt(primary,t);
  systems.push(growAxis(primary,t,dirAround(primary,t,phase-.55,.46,.018+upperness*.020),primary.length*.44,r*.80,r*.28,2,{wander:.26,elbow:-.05}));
  systems.push(growAxis(primary,t,dirAround(primary,t,phase+2.15,.48,-.010+upperness*.018),primary.length*.40,r*.69,r*.25,2,{wander:.27,elbow:.07}));
  systems.push(growAxis(primary,.82,dirAround(primary,.82,phase+.95,.42,.000+upperness*.020),primary.length*.34,radiusAt(primary,.82)*.56,radiusAt(primary,.82)*.20,2,{wander:.25,elbow:.03}));
  systems.forEach((s,i)=>growSystem(s,phase+i*.57,density));
}

function buildTree(density){
  branches.length=0;

  // Shorter central trunk and much longer low scaffold limbs are the defining silhouette of an old open-grown oak.
  const trunkPts=[new THREE.Vector3(0,0,0),new THREE.Vector3(.08,1.3,.02),new THREE.Vector3(.02,2.6,.08),new THREE.Vector3(-.08,3.9,.05),new THREE.Vector3(.04,5.2,-.04),new THREE.Vector3(-.12,6.5,.02),new THREE.Vector3(.02,7.7,-.06),new THREE.Vector3(-.10,8.7,.02),new THREE.Vector3(.04,9.45,.00)],trunk=branch(trunkPts,1.48,.31,0,null);
  for(let i=0;i<7;i++){const az=i/7*Math.PI*2+rr(-.18,.18),dir=worldDir(az,rr(-.06,-.015));growAxis(trunk,.02,dir,rr(1.4,2.3),rr(.20,.28),.035,1,{droop:.06,wander:.25,elbow:rr(-.05,.05)})}

  const primaries=[],specs=[
    {t:.32,az:3.28,e:.035,len:9.8,b:.61,u:0,d:.032},
    {t:.37,az:.12,e:.045,len:9.3,b:.58,u:0,d:.026},
    {t:.42,az:1.60,e:.055,len:8.7,b:.53,u:.04,d:.026},
    {t:.47,az:4.45,e:.075,len:9.0,b:.55,u:.08,d:.020},
    {t:.52,az:.78,e:.095,len:8.7,b:.53,u:.12,d:.016},
    {t:.57,az:5.55,e:.115,len:8.1,b:.49,u:.18,d:.010},
    {t:.62,az:2.45,e:.145,len:7.6,b:.47,u:.26,d:.006},
    {t:.68,az:.02,e:.175,len:7.2,b:.45,u:.34,d:.002}
  ];
  for(const s of specs){const r=radiusAt(trunk,s.t),dir=worldDir(s.az+jit(.18),s.e+jit(.04)),p=growAxis(trunk,s.t,dir,s.len*rr(.96,1.04),r*s.b,r*rr(.16,.22),1,{lateRise:s.u*.018,droop:s.d||0,wander:.34,elbow:rr(-.10,.10)});primaries.push({p,phase:s.az,u:s.u})}

  // Keep the centre broken and subordinate. These are crown-filling limbs, not a dominant conifer-like leader.
  const rt=radiusAt(trunk,.985),leader=growAxis(trunk,.985,worldDir(1.15,.43),3.15,rt*.84,rt*.18,1,{lateRise:.012,wander:.31,elbow:.07}),coleader=growAxis(trunk,.83,worldDir(3.75,.34),3.55,radiusAt(trunk,.83)*.56,.11,1,{lateRise:.010,wander:.32,elbow:-.08});primaries.push({p:leader,phase:1.15,u:.48},{p:coleader,phase:3.75,u:.42});
  primaries.forEach(x=>decoratePrimary(x.p,x.phase,density,x.u));
}

function oakLeafGeometry(){const s=new THREE.Shape();s.moveTo(0,-.12);s.lineTo(.018,0);s.lineTo(.10,.07);s.lineTo(.16,.15);s.lineTo(.10,.22);s.lineTo(.22,.31);s.lineTo(.13,.40);s.lineTo(.24,.50);s.lineTo(.13,.59);s.lineTo(.20,.69);s.lineTo(.09,.78);s.lineTo(.11,.88);s.lineTo(0,1.0);s.lineTo(-.10,.88);s.lineTo(-.08,.78);s.lineTo(-.20,.69);s.lineTo(-.13,.59);s.lineTo(-.25,.50);s.lineTo(-.14,.40);s.lineTo(-.22,.31);s.lineTo(-.11,.22);s.lineTo(-.17,.15);s.lineTo(-.09,.07);s.lineTo(-.018,0);s.closePath();const g=new THREE.ShapeGeometry(s);g.computeVertexNormals();return g}

function renderLeaves(mult){
  const terminals=branches.filter(b=>b.order>=4&&b.children.length===0),maxLeaves=110000;if(!terminals.length)return;
  const capacity=Math.min(maxLeaves,Math.max(40000,Math.floor(92000*mult/1.35))),perTerminal=Math.max(1,Math.min(12,Math.floor(capacity/terminals.length)));
  const g=oakLeafGeometry(),mat=new THREE.MeshStandardMaterial({color:0x355f29,roughness:.86,side:THREE.DoubleSide}),inst=new THREE.InstancedMesh(g,mat,capacity),dummy=new THREE.Object3D(),q=new THREE.Quaternion(),spinQ=new THREE.Quaternion(),up=new THREE.Vector3(0,1,0),center=new THREE.Vector3(),pos=new THREE.Vector3(),offset=new THREE.Vector3(),outward=new THREE.Vector3(),leafDir=new THREE.Vector3(),col=new THREE.Color();let k=0;
  const ordered=[...terminals].sort((a,b)=>pointAt(b,.9).y-pointAt(a,.9).y);
  for(let bi=0;bi<ordered.length&&k<capacity;bi++){
    const b=ordered[bi],remaining=capacity-k,branchesLeft=ordered.length-bi,target=Math.max(1,Math.min(perTerminal+((bi%7===0)?1:0),Math.floor(remaining/Math.max(1,branchesLeft))+1)),branchWeight=THREE.MathUtils.clamp(b.length/.50,.68,1.12);
    for(let i=0;i<target&&k<capacity;i++,k++){
      const t=THREE.MathUtils.clamp(.42+(i/Math.max(1,target-1))*.56+rr(-.04,.04),.34,.998),tan=tangentAt(b,t),{u,v}=frameAt(b,t),a=rr(0,Math.PI*2),rad=rr(.045,.125)*mult*branchWeight,shell=rad*Math.pow(rnd(),.78);
      center.copy(pointAt(b,t));offset.copy(u).multiplyScalar(Math.cos(a)*shell).addScaledVector(v,Math.sin(a)*shell*rr(.65,1.05)).addScaledVector(tan,rr(-rad*.10,rad*.24));pos.copy(center).add(offset);outward.copy(offset).normalize();leafDir.copy(tan).multiplyScalar(rr(.20,.42)).addScaledVector(outward,rr(.58,.90)).add(new THREE.Vector3(0,rr(-.03,.13),0)).normalize();q.setFromUnitVectors(up,leafDir);spinQ.setFromAxisAngle(leafDir,rr(0,Math.PI*2));q.premultiply(spinQ);dummy.position.copy(pos);dummy.quaternion.copy(q);const sc=rr(.13,.195);dummy.scale.set(sc*rr(.86,1.14),sc*rr(.94,1.18),sc);dummy.updateMatrix();inst.setMatrixAt(k,dummy.matrix);const light=rr(.88,1.16);col.setRGB(.18*light,.38*light,.15*light);inst.setColorAt(k,col)
    }
  }
  inst.count=k;inst.instanceMatrix.needsUpdate=true;if(inst.instanceColor)inst.instanceColor.needsUpdate=true;inst.castShadow=false;inst.receiveShadow=true;treeRoot.add(inst);meshes.push(inst);
}

function clear(){for(const m of meshes){if(m.geometry)m.geometry.dispose();treeRoot.remove(m)}meshes=[];while(treeRoot.children.length)treeRoot.remove(treeRoot.children[0])}
function generate(){document.querySelector('#status').style.display='block';setTimeout(()=>{clear();randomness=+document.querySelector('#randomInput').value;reset(+document.querySelector('#seedInput').value);buildTree(+document.querySelector('#densityInput').value);renderWood();renderLeaves(+document.querySelector('#leafInput').value);document.querySelector('#status').style.display='none';console.log(`oak: ${branches.length} woody axes`)},20)}
document.querySelector('#gear').onclick=()=>document.querySelector('#panel').classList.toggle('show');document.querySelector('#regen').onclick=generate;document.querySelector('#newSeed').onclick=()=>{document.querySelector('#seedInput').value=Math.floor(1+Math.random()*999999999);generate()};function animate(){controls.update();renderer.render(scene,camera);requestAnimationFrame(animate)}animate();generate();addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});setTimeout(()=>document.querySelector('#hint').style.opacity=.24,6000);
