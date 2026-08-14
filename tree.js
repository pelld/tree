import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

// 00. MOBILE-FIRST PERFORMANCE ----------------------------------------------
const mobileMode=matchMedia('(pointer:coarse)').matches||innerWidth<900;
const PROFILE=mobileMode?{pixelRatio:1,antialias:false,shadows:false,maxStems:52,budsPerStem:12}:{pixelRatio:Math.min(devicePixelRatio,1.3),antialias:true,shadows:true,maxStems:76,budsPerStem:16};

// 01. SCENE ------------------------------------------------------------------
const scene=new THREE.Scene();
scene.background=new THREE.Color(0xcfdcc4);
scene.fog=new THREE.FogExp2(0xcfdcc4,.022);

const camera=new THREE.PerspectiveCamera(40,innerWidth/innerHeight,.03,80);
camera.position.set(5.2,3.1,7.4);

const renderer=new THREE.WebGLRenderer({antialias:PROFILE.antialias,powerPreference:'high-performance'});
renderer.setPixelRatio(PROFILE.pixelRatio);
renderer.setSize(innerWidth,innerHeight);
renderer.outputColorSpace=THREE.SRGBColorSpace;
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure=1.05;
renderer.shadowMap.enabled=PROFILE.shadows;
if(PROFILE.shadows)renderer.shadowMap.type=THREE.PCFSoftShadowMap;
document.body.prepend(renderer.domElement);

const controls=new OrbitControls(camera,renderer.domElement);
controls.target.set(0,1.45,0);
controls.enableDamping=true;
controls.dampingFactor=.06;
controls.minDistance=.7;
controls.maxDistance=18;
controls.zoomToCursor=true;

scene.add(new THREE.HemisphereLight(0xeaf0df,0x4b4437,1.65));
const sun=new THREE.DirectionalLight(0xffefd8,2.6);
sun.position.set(-8,12,8);
sun.castShadow=PROFILE.shadows;
if(PROFILE.shadows){sun.shadow.mapSize.set(768,768);sun.shadow.camera.left=-8;sun.shadow.camera.right=8;sun.shadow.camera.top=8;sun.shadow.camera.bottom=-5;sun.shadow.bias=-.0002}
scene.add(sun);

const ground=new THREE.Mesh(new THREE.CircleGeometry(16,64),new THREE.MeshLambertMaterial({color:0x8d9f6e}));
ground.rotation.x=-Math.PI/2;
ground.receiveShadow=PROFILE.shadows;
scene.add(ground);

const plantRoot=new THREE.Group();
scene.add(plantRoot);
let generated=[];
let seed=88231,randomness=.18;

// 02. SEEDED RANDOM ----------------------------------------------------------
function reset(v){seed=Math.max(1,Math.floor(v)||1)%2147483647;if(!seed)seed=1}
function rnd(){seed=seed*16807%2147483647;return(seed-1)/2147483646}
function rr(a,b){return a+(b-a)*rnd()}
function jit(a){return(rnd()-.5)*a*randomness}

function clearPlant(){
  for(const m of generated){plantRoot.remove(m);m.geometry?.dispose();m.material?.dispose?.()}
  generated=[];
}
function addGenerated(m){plantRoot.add(m);generated.push(m);return m}

// 03. GEOMETRY HELPERS -------------------------------------------------------
const UP=new THREE.Vector3(0,1,0);
const dummy=new THREE.Object3D();
const q=new THREE.Quaternion();
const dir=new THREE.Vector3();

function placeSegment(inst,index,a,b,radius){
  dir.copy(b).sub(a);
  const len=dir.length();
  dir.normalize();
  q.setFromUnitVectors(UP,dir);
  dummy.position.copy(a).add(b).multiplyScalar(.5);
  dummy.quaternion.copy(q);
  dummy.scale.set(radius,len,radius);
  dummy.updateMatrix();
  inst.setMatrixAt(index,dummy.matrix);
}

function stemPoints(base,az,height,lean){
  const out=[];
  const bendAz=az+rr(-.35,.35);
  const dx=Math.cos(bendAz)*lean,dz=Math.sin(bendAz)*lean;
  const sway=rr(-.10,.10);
  for(let i=0;i<=6;i++){
    const t=i/6;
    const ease=t*t*(3-2*t);
    out.push(new THREE.Vector3(
      base.x+dx*ease+Math.sin(t*Math.PI)*sway+jit(.025),
      height*t,
      base.z+dz*ease+Math.sin(t*Math.PI*.9)*sway*.45+jit(.025)
    ));
  }
  return out;
}

function frameFromTangent(tan){
  const ref=Math.abs(tan.y)<.92?new THREE.Vector3(0,1,0):new THREE.Vector3(1,0,0);
  const u=new THREE.Vector3().crossVectors(tan,ref).normalize();
  const v=new THREE.Vector3().crossVectors(u,tan).normalize();
  return{u,v};
}

// 04. LAVENDER ---------------------------------------------------------------
function buildLavender(density,bloom,spread){
  const stemCount=Math.max(18,Math.min(PROFILE.maxStems,Math.round(PROFILE.maxStems*density)));
  const segmentsPerStem=6;
  const stems=new THREE.InstancedMesh(new THREE.CylinderGeometry(1,1,1,5,1,false),new THREE.MeshLambertMaterial({color:0x66834d}),stemCount*segmentsPerStem);
  const leafCount=stemCount*7;
  const leaves=new THREE.InstancedMesh(new THREE.PlaneGeometry(.14,.62,1,1),new THREE.MeshLambertMaterial({color:0x7f9466,side:THREE.DoubleSide}),leafCount);
  const maxBuds=Math.ceil(stemCount*PROFILE.budsPerStem*Math.max(.7,bloom));
  const buds=new THREE.InstancedMesh(new THREE.SphereGeometry(1,mobileMode?5:6,mobileMode?4:5),new THREE.MeshLambertMaterial({color:0xffffff}),maxBuds);

  stems.castShadow=PROFILE.shadows;stems.receiveShadow=PROFILE.shadows;
  leaves.castShadow=false;leaves.receiveShadow=false;
  buds.castShadow=false;buds.receiveShadow=false;

  let si=0,li=0,bi=0;
  const colour=new THREE.Color();
  const golden=2.399963229728653;

  for(let i=0;i<stemCount;i++){
    const ring=Math.sqrt((i+.45)/stemCount);
    const az=i*golden+rr(-.18,.18);
    const baseR=ring*rr(.08,.66)*spread;
    const base=new THREE.Vector3(Math.cos(az)*baseR,0,Math.sin(az)*baseR);
    const edge=THREE.MathUtils.clamp(baseR/(.66*spread),0,1);
    const height=rr(2.35,3.20)*(1-.12*edge)+rr(-.12,.12);
    const lean=rr(.28,.72)*spread*(.55+.70*edge);
    const pts=stemPoints(base,az,height,lean);

    for(let s=0;s<segmentsPerStem;s++){
      const r=.018*(1-s*.085)+rr(-.002,.002);
      placeSegment(stems,si++,pts[s],pts[s+1],Math.max(.009,r));
    }

    // Narrow grey-green leaves, concentrated in the lower half of the stem.
    for(let j=0;j<7;j++){
      const t=.07+j*.068+rr(-.018,.018);
      const f=t*6,idx=Math.min(5,Math.floor(f)),local=f-idx;
      const pos=pts[idx].clone().lerp(pts[idx+1],local);
      const tan=pts[idx+1].clone().sub(pts[idx]).normalize();
      const {u,v}=frameFromTangent(tan);
      const a=az+j*golden+rr(-.28,.28);
      const leafDir=u.multiplyScalar(Math.cos(a)).add(v.multiplyScalar(Math.sin(a))).multiplyScalar(.82).add(tan.clone().multiplyScalar(rr(.05,.22))).normalize();
      q.setFromUnitVectors(UP,leafDir);
      dummy.position.copy(pos).addScaledVector(leafDir,.12);
      dummy.quaternion.copy(q);
      dummy.rotateY(rr(-.8,.8));
      const ls=rr(.62,1.08)*(1-.055*j);
      dummy.scale.set(rr(.72,1.00),ls,1);
      dummy.updateMatrix();
      leaves.setMatrixAt(li++,dummy.matrix);
    }

    // Flower spike: many tiny buds wrapped helically around the upper stem.
    const wanted=Math.max(7,Math.round(PROFILE.budsPerStem*(.72+.45*bloom)*rr(.88,1.08)));
    for(let j=0;j<wanted&&bi<maxBuds;j++){
      const ft=.69+(j/Math.max(1,wanted-1))*.285;
      const f=ft*6,idx=Math.min(5,Math.floor(f)),local=f-idx;
      const centre=pts[idx].clone().lerp(pts[idx+1],local);
      const tan=pts[idx+1].clone().sub(pts[idx]).normalize();
      const {u,v}=frameFromTangent(tan);
      const a=j*golden+az+rr(-.24,.24);
      const taper=1-(j/Math.max(1,wanted-1))*.42;
      const radial=rr(.040,.075)*taper;
      centre.addScaledVector(u,Math.cos(a)*radial).addScaledVector(v,Math.sin(a)*radial);
      dummy.position.copy(centre);
      dummy.quaternion.setFromUnitVectors(UP,tan);
      const bs=rr(.80,1.18)*(.88+.16*bloom);
      dummy.scale.set(.045*bs,.070*bs,.045*bs);
      dummy.updateMatrix();
      buds.setMatrixAt(bi,dummy.matrix);
      const light=rr(.90,1.10),top=j/wanted;
      colour.setRGB(.47*light+.10*top,.31*light+.05*top,.73*light+.12*top);
      buds.setColorAt(bi,colour);
      bi++;
    }
  }

  stems.count=si;leaves.count=li;buds.count=bi;
  stems.instanceMatrix.needsUpdate=true;leaves.instanceMatrix.needsUpdate=true;buds.instanceMatrix.needsUpdate=true;
  if(buds.instanceColor)buds.instanceColor.needsUpdate=true;
  addGenerated(stems);addGenerated(leaves);addGenerated(buds);

  // Dense basal foliage fills the centre so it reads as a lavender mound, not bare sticks.
  const basalCount=mobileMode?150:230;
  const basal=new THREE.InstancedMesh(new THREE.PlaneGeometry(.16,.58),new THREE.MeshLambertMaterial({color:0x82966a,side:THREE.DoubleSide}),basalCount);
  for(let i=0;i<basalCount;i++){
    const a=i*golden+rr(-.25,.25),r=Math.sqrt(rnd())*.72*spread;
    const pos=new THREE.Vector3(Math.cos(a)*r,rr(.05,.42),Math.sin(a)*r);
    const out=new THREE.Vector3(Math.cos(a),rr(.16,.55),Math.sin(a)).normalize();
    q.setFromUnitVectors(UP,out);
    dummy.position.copy(pos);dummy.quaternion.copy(q);dummy.rotateY(rr(-1,1));dummy.scale.set(rr(.78,1.06),rr(.66,1.08),1);dummy.updateMatrix();
    basal.setMatrixAt(i,dummy.matrix);
  }
  basal.instanceMatrix.needsUpdate=true;basal.castShadow=false;
  addGenerated(basal);
}

// 05. UI / LOOP --------------------------------------------------------------
function generate(){
  const status=document.querySelector('#status');status.style.display='block';
  setTimeout(()=>{
    clearPlant();
    randomness=+document.querySelector('#randomInput').value;
    reset(+document.querySelector('#seedInput').value);
    buildLavender(+document.querySelector('#densityInput').value,+document.querySelector('#flowerInput').value,+document.querySelector('#spreadInput').value);
    status.style.display='none';
  },20);
}

document.querySelector('#gear').onclick=()=>document.querySelector('#panel').classList.toggle('show');
document.querySelector('#regen').onclick=generate;
document.querySelector('#newSeed').onclick=()=>{document.querySelector('#seedInput').value=Math.floor(1+Math.random()*999999999);generate()};

function animate(){controls.update();renderer.render(scene,camera);requestAnimationFrame(animate)}
animate();generate();

addEventListener('resize',()=>{camera.aspect=innerWidth/innerHeight;camera.updateProjectionMatrix();renderer.setSize(innerWidth,innerHeight)});
setTimeout(()=>document.querySelector('#hint').style.opacity=.24,6000);
