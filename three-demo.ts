import * as THREE from 'three';
import * as NOISE from './noise_generator';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';

const clock = new THREE.Clock();

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

let controls = new FlyControls(camera, renderer.domElement);
controls.dragToLook = true;
controls.rollSpeed = Math.PI / 12;

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshToonMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;

let noise_params = { size: 40, horz_scale : 0.01, vert_scale: 250.0, 
    noiseParams: {noiseScale : 0.001, octaves: 1, persistence: 0.25, lacunarity: 3.0}};

const proc_geometry = NOISE.generate_mesh(noise_params);
const proc_mesh = new THREE.Mesh(proc_geometry, material);

scene.add(proc_mesh);
proc_mesh.position.z = -1;


const light = new THREE.DirectionalLight( 0xffffff, 3);
light.position.set(-1, 0, 1).normalize();
scene.add(light);


function animate() {
    let delta = clock.getDelta();
    
    renderer.render(scene, camera);
    controls.update(delta);
}
renderer.setAnimationLoop(animate);