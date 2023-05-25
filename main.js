import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';
//import {OrbitControls} from 'https://unpkg.com/three@0.137.0/examples/jsm/controls/OrbitControls.js';

// Create the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

// Add lighting
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Add a background
const spaceTexture = new THREE.TextureLoader().load('./images/aspace.jpg');
scene.background = spaceTexture;

// Add a torus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

// Add donut from Everything Everywhere All At Once
const donutTexture = new THREE.TextureLoader().load('./images/donut.jpg');
const normalDonutTexture = new THREE.TextureLoader().load('./images/normal.jpg');
const donut = new THREE.Mesh(
  new THREE.TorusGeometry(3, 2, 100, 100),
  new THREE.MeshStandardMaterial({map: donutTexture, normal: normalDonutTexture, color: 0x222222})
);
donut.position.x = 0;
donut.position.y = 0;
donut.position.z = -30;
scene.add(donut);

// Add a project
const proj1Texture = new THREE.TextureLoader().load('./images/bellwether.jpg');
const proj1 = new THREE.Mesh(
  new THREE.BoxGeometry(20, 18, 0.1),
  new THREE.MeshBasicMaterial({map: proj1Texture})
);
proj1.position.x = -20;
proj1.position.y = 0;
proj1.position.z = 30;
scene.add(proj1);

// Add a project
const proj2Texture = new THREE.TextureLoader().load('./images/consulting.jpg');
const proj2 = new THREE.Mesh(
  new THREE.BoxGeometry(20, 18, 0.1),
  new THREE.MeshBasicMaterial({map: proj2Texture})
);
proj2.position.x = 20;
proj2.position.y = 0;
proj2.position.z = 60;
scene.add(proj2);

// Add a project
const proj3Texture = new THREE.TextureLoader().load('./images/exoplanet.jpg');
const proj3 = new THREE.Mesh(
  new THREE.BoxGeometry(20, 18, 0.1),
  new THREE.MeshBasicMaterial({map: proj3Texture})
);
proj3.position.x = -20;
proj3.position.y = 0;
proj3.position.z = 90;
scene.add(proj3);

// Add a project
const proj4Texture = new THREE.TextureLoader().load('./images/videogame.jpg');
const proj4 = new THREE.Mesh(
  new THREE.BoxGeometry(20, 18, 0.1),
  new THREE.MeshBasicMaterial({map: proj4Texture})
);
proj4.position.x = 20;
proj4.position.y = 0;
proj4.position.z = 120;
scene.add(proj4);

// Add a project
const proj5Texture = new THREE.TextureLoader().load('./images/web.jpg');
const proj5 = new THREE.Mesh(
  new THREE.BoxGeometry(20, 18, 0.1),
  new THREE.MeshBasicMaterial({map: proj5Texture})
);
proj5.position.x = -20;
proj5.position.y = 0;
proj5.position.z = 150;
scene.add(proj5);

// Add a project
const proj6Texture = new THREE.TextureLoader().load('./images/3Dportfolio.jpg');
const proj6 = new THREE.Mesh(
  new THREE.BoxGeometry(20, 18, 0.1),
  new THREE.MeshBasicMaterial({map: proj6Texture})
);
proj6.position.x = 20;
proj6.position.y = 0;
proj6.position.z = 180;
scene.add(proj6);

// Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper);

// const controls = new OrbitControls(camera, renderer.domElement);

// Add randomly positioned stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(300).fill().forEach(addStar);

// Add a jeffCube
const jeffTexture = new THREE.TextureLoader().load('./images/jeff.png');
const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({map: jeffTexture})
);
// scene.add(jeff);

// Add a moon
const moonTexture = new THREE.TextureLoader().load('./images/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./images/normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({map: moonTexture, normalMap: normalTexture})
);
moon.position.x = -60;
moon.position.y = 20;
moon.position.z = 30;
scene.add(moon);

// Move camera function
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera;

// Main animate function
function animate() {
  requestAnimationFrame(animate);

  donut.rotation.x += 0.005;
  donut.rotation.y += 0.01;
  donut.rotation.z += 0.005;

  // proj1.rotation.y += 0.001;
  // proj2.rotation.y += 0.001;
  // proj3.rotation.y += 0.001;
  // proj4.rotation.y += 0.001;
  // proj5.rotation.y += 0.001;

  // controls.update();

  renderer.render(scene, camera);
}

animate();