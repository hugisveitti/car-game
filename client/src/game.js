import * as THREE from "three"

console.log("game");

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

var cpx = 0.1;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.005;
    camera.position.y += cpx;
    if(camera.position.y > 10 || camera.position.y < -10){
        cpx = -cpx;
    }

}
animate();