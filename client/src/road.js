import * as THREE from 'three';
import Physijs from './js/physi.js'

var loader = new THREE.TextureLoader();

var ground_material = Physijs.createMaterial(
    new THREE.MeshLambertMaterial({ map: loader.load( 'client/src/material/rocks.jpg' ) }),
    .8, // high friction
    .4 // low restitution
);
ground_material.map.wrapS = ground_material.map.wrapT = THREE.RepeatWrapping;
ground_material.map.repeat.set( 3, 3 );

var ground_geometry = new THREE.PlaneGeometry( 300, 300, 100, 100 );
for ( var i = 0; i < ground_geometry.vertices.length; i++ ) {
    var vertex = ground_geometry.vertices[i];
    //vertex.y = NoiseGen.noise( vertex.x / 30, vertex.z / 30 ) * 1;
}
ground_geometry.computeFaceNormals();
ground_geometry.computeVertexNormals();
var road = new Physijs.HeightfieldMesh(
    ground_geometry,
    ground_material,
    0 // mass
);
road.rotation.x = -Math.PI / 2;
road.receiveShadow = true;

// var planeGeometry = new THREE.PlaneBufferGeometry( 200, 200, 32, 32 );
// var planeMaterial = new THREE.MeshStandardMaterial( { color: 0xffff00 } )
// var plane = new THREE.Mesh( planeGeometry, planeMaterial );
// plane.receiveShadow = true;
// plane.castShadow = false;
// //snúa 90 gráður um x ás.
// plane.rotateOnAxis(new THREE.Vector3(1, 0, 0).normalize(), -Math.PI/2);
// plane.position.y = -1;

export default road;
