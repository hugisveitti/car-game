import * as THREE from "three";
import Player from './player.js';
import { light1, light2, ambientLight } from './light.js';
import plane from './road.js';


var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;



var xpos = 0;
var ypos = 0;
var zpos = 0;
var allCubes = [];


var path = new THREE.Path();

	path.lineTo( 0, 0.8 );
	path.quadraticCurveTo( 0, 1, 0.2, 1 );
	path.lineTo( 1, 1 );

	var points = path.getPoints();

	var geometry = new THREE.BufferGeometry().setFromPoints( points );
	var material = new THREE.LineBasicMaterial( { color: 0xffffff } );

	var line = new THREE.Line( geometry, material );
	scene.add( line );


var myPlayer = new Player(1);


// scene.add(myPlayer.player);
scene.add(light1);
scene.add(light2);
scene.add(ambientLight)
// scene.add(plane);

//initCubes();



function initCubes(){
	for(var i=0; i<10; i++){

		var xcube = Math.random()*4 - 1;
		var ycube = Math.random()*4 - 1;
		var zcube = Math.random()*4 - 1;
		// console.log(xcube)


		var geometry = new THREE.BoxGeometry( 1,1,1 );
		var material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
		// material.lights = true;
		// var material = new THREE.MeshDepthMaterial( );
		var cube = new THREE.Mesh( geometry, material );
		cube.castShadow = true; //default is false
		cube.receiveShadow = true; //default


		cube.position.set(1,(i*2),-i*2);
		scene.add( cube );

		allCubes.push(cube);
	}
}


function animate() {
	requestAnimationFrame( animate );
    renderer.render(scene, myPlayer.camera);
}
animate();


document.addEventListener('keydown', (e) => {
	console.log('keydown')
	console.log(e.keyCode)
	console.log('x ' + xpos);
	console.log('y ' + ypos);
	console.log('z ' + zpos);


	if(e.keyCode === 37){
		//left
		xpos -= 0.1;
	} else if(e.keyCode === 39){
		//right
		xpos += 0.1;
	} else if(e.keyCode === 38){
		//up
		ypos += 0.1;
	} else if(e.keyCode === 40){
		//down
		ypos -= 0.1;
	} else if(e.keyCode === 90){
		//z
		zpos += 0.1;
	} else if(e.keyCode === 88){
		//x
		zpos -= 0.1;
	}

    myPlayer.update(xpos, ypos, zpos);
})
