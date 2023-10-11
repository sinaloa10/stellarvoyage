import './style_menu.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
 
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

// Esferas
const textureLoader = new THREE.TextureLoader();
const sphereTextures = ['../images/moon.jpg', '../images/marte-min.jpg', '../images/mercurio-min.jpg', '../images/venus-min.jpg'];

const geometry = new THREE.SphereGeometry();
const sphereMaterials = sphereTextures.map(texturePath => {
    const texture = textureLoader.load(texturePath);
    return new THREE.MeshStandardMaterial({ map: texture });
});

const sphereCount = 4;
const separation = 7  ;

for (let i = 0; i < sphereCount; i++) {
    const sphere = new THREE.Mesh(geometry, sphereMaterials[i]); // Usa el material correspondiente a cada esfera
    sphere.position.x = (i - (sphereCount - 1) / 2) * separation;
    scene.add(sphere);
}

camera.position.z = 10;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.002);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 4, 2);
scene.add(directionalLight);



const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Función para manejar el evento cuando el mouse se mueve
function onMouseMove(event) {
    // Calcula las coordenadas normalizadas del mouse (-1 a 1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Actualiza el rayo con las nuevas coordenadas del mouse
    raycaster.setFromCamera(mouse, camera);

    // Calcula intersecciones entre el rayo y los objetos en la escena
    const intersects = raycaster.intersectObjects(scene.children);

    // Restaura el tamaño original de todas las esferas
    scene.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
            child.scale.set(1, 1, 1);
        }
    });

    // Escala la esfera apuntada por el mouse
    if (intersects.length > 0) {
        const targetSphere = intersects[0].object;
        targetSphere.scale.set(1.2, 1.2, 1.2); // Escala la esfera a un tamaño más grande
    }
}

// Agrega el event listener al documento para el evento 'mousemove'
document.addEventListener('mousemove', onMouseMove, false);

const enlaces = [
    '../luna/plantilla.html', // Enlace para el primer planeta
    '../luna/plantilla.html', // Enlace para el segundo planeta
    '../marte/marte.html', // Enlace para el tercer planeta
    '../mercurio/mercurio.html',  // Enlace para el cuarto planeta
    '../venus/venus.html'  // Enlace para el cuarto planeta
];

// Función para manejar el evento cuando se hace clic en el mouse
function onMouseClick(event) {
    // Calcula las coordenadas normalizadas del mouse (-1 a 1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Actualiza el rayo con las nuevas coordenadas del mouse
    raycaster.setFromCamera(mouse, camera);

    // Calcula intersecciones entre el rayo y los objetos en la escena
    const intersects = raycaster.intersectObjects(scene.children);

    // Escala la esfera apuntada por el mouse y redirige a la página correspondiente
    if (intersects.length > 0) {
        const targetSphere = intersects[0].object;
        targetSphere.scale.set(1.2, 1.2, 1.2); // Escala la esfera a un tamaño más grande

        // Obtiene el índice de la esfera en el array de esferas de la escena
        const index = scene.children.indexOf(targetSphere);

        // Redirige a la página correspondiente al planeta clickeado
        if (enlaces[index]) {
            window.location.href = enlaces[index];
        }
    }
}

// Agrega el event listener al documento para el evento 'click'
document.addEventListener('click', onMouseClick, false);

















function animate() {
    requestAnimationFrame(animate);

    // Rotar las esferas
    scene.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
            child.rotation.z += 0.006;
            child.rotation.x += 0.008;
        }
    });

    renderer.render(scene, camera);
}

animate();

const miBoton1 = document.getElementById("btn1");
const miBoton2= document.getElementById("btn2");
const miBoton3 = document.getElementById("btn3");
const miBoton4 = document.getElementById("btn4");

// Agrega un event listener para el evento click
miBoton1.addEventListener("click", function() {
    // Redirige al usuario a otra página
    window.location.href = "../luna/plantilla.html";
    // Puedes reemplazar "otra_pagina.html" con la URL de la página a la que quieres redirigir al usuario
});

miBoton2.addEventListener("click", function() {
    // Redirige al usuario a otra página
    window.location.href = "../marte/marte.html";
    // Puedes reemplazar "otra_pagina.html" con la URL de la página a la que quieres redirigir al usuario
});

miBoton3.addEventListener("click", function() {
    // Redirige al usuario a otra página
    window.location.href = "../mercurio/mercurio.html";
    // Puedes reemplazar "otra_pagina.html" con la URL de la página a la que quieres redirigir al usuario
});

miBoton4.addEventListener("click", function() {
    // Redirige al usuario a otra página
    window.location.href = "../venus/venus.html";
    // Puedes reemplazar "otra_pagina.html" con la URL de la página a la que quieres redirigir al usuario
});
