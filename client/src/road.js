import * as THREE from 'three';

var planeGeometry = new THREE.PlaneBufferGeometry( 200, 200, 32, 32 );
var planeMaterial = new THREE.MeshStandardMaterial( { color: 0xffff00 } )
var plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
plane.castShadow = false;
//snúa 90 gráður um x ás.
plane.rotateOnAxis(new THREE.Vector3(1, 0, 0).normalize(), -Math.PI/2);
plane.position.y = -1;

export default plane;
