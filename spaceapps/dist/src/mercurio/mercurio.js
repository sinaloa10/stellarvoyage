import * as THREE from "/spaceapps/node_modules/three/build/three.module.js";

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff,100);
pointLight.position.set(5, 5, 5);
pointLight.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x000000,15);
scene.add(pointLight, ambientLight);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

/*function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);*/

// Background
function createStars() {
  const starsGeometry = new THREE.BufferGeometry();
  const starsVertices = [];

  // Crea un gran número de estrellas dispersas aleatoriamente en el espacio
  for (let i = 0; i < 2000; i++) {
    const x = (Math.random() - 0.5) * 2000; // Posición X aleatoria
    const y = (Math.random() - 0.5) * 2000; // Posición Y aleatoria
    const z = (Math.random() - 0.5) * 2000; // Posición Z aleatoria

    starsVertices.push(x, y, z);
  }

  starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));

  // Material para las estrellas (puedes personalizar el color y el tamaño aquí)
  const starsMaterial = new THREE.PointsMaterial({
    color: 0xffffff, // Color de las estrellas
    size: 0.1, // Tamaño de las estrellas
  });

  // Crea el objeto de estrellas
  const stars = new THREE.Points(starsGeometry, starsMaterial);
  scene.add(stars);
}

// Llama a la función para crear las estrellas
createStars();

// Avatar

const jeffTexture = new THREE.TextureLoader().load('/spaceapps/dist/assets/images/mercurio-min.jpg');

const jeff = new THREE.Mesh(new THREE.SphereGeometry(2, 40, 20), new THREE.MeshStandardMaterial({ map: jeffTexture }));
jeff.castShadow = true;
scene.add(jeff);


jeff.position.z = -5;
jeff.position.x = 2.5;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  jeff.rotation.y -= 0.001;
  // controls.update();

  renderer.render(scene, camera);
}

animate();