import * as THREE from "three";
import Player from './player.js';
import { light1, light2, ambientLight } from './light.js';
import road from './road.js';

import Physijs from './js/physi.js';

'use strict';

Physijs.scripts.worker = 'client/src/js/physijs_worker.js'
Physijs.scripts.ammo = 'ammo.js';


var renderer = new THREE.WebGLRenderer( { antialias: true } );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
renderer.shadowMap.enabled = true;

var input, vehicle;

var scene = new Physijs.Scene;
scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
		scene.addEventListener(
			'update',
			function() {

				if ( input && vehicle ) {
					if ( input.direction !== null ) {
						input.steering += input.direction / 50;
						if ( input.steering < -.6 ) input.steering = -.6;
						if ( input.steering > .6 ) input.steering = .6;
					}
					vehicle.setSteering( input.steering, 0 );
					vehicle.setSteering( input.steering, 1 );

					if ( input.power === true ) {
						vehicle.applyEngineForce( 300 );
					} else if ( input.power === false ) {
						vehicle.setBrake( 20, 2 );
						vehicle.setBrake( 20, 3 );
					} else {
						vehicle.applyEngineForce( 0 );
					}
				}

				scene.simulate( undefined, 2 );
			}
		);


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


initVehicle();
initCubes();


scene.add(light1);
scene.add(light2);
scene.add(ambientLight)
scene.add(road);




function initCubes(){
	var loader = new THREE.TextureLoader();
	var box_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ map: loader.load( 'client/src/material/plywood.jpg' ) }),
			.4, // low friction
			.6 // high restitution
		);
		box_material.map.wrapS = THREE.RepeatWrapping;
		box_material.map.repeat.set( .25, .25 );
	for(var i=0; i<10; i++){

		// var xcube = Math.random()*4 - 1;
		// var ycube = Math.random()*4 - 1;
		// var zcube = Math.random()*4 - 1;
		// // console.log(xcube)
		//
		//
		// var geometry = new THREE.BoxGeometry( 1,1,1 );
		// var material = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
		// // material.lights = true;
		// // var material = new THREE.MeshDepthMaterial( );
		// var cube = new THREE.Mesh( geometry, material );
		// cube.castShadow = true; //default is false
		// cube.receiveShadow = true; //default
		//
		//
		// cube.position.set(1,(i*2),-i*2);
		// scene.add( cube );
		//
		// allCubes.push(cube);
		var size = Math.random() * 2 + .5;
			var box = new Physijs.BoxMesh(
				new THREE.BoxGeometry( size, size, size ),
				box_material
			);
			box.castShadow = box.receiveShadow = true;
			box.position.set(
				Math.random() * 25 ,
				5,
				Math.random() * 25
			);
			scene.add( box )
	}
	scene.simulate();
}


function animate() {
	requestAnimationFrame( animate );
    renderer.render(scene, myPlayer.camera);
}
animate();


// document.addEventListener('keydown', (e) => {
// 	console.log('keydown')
// 	console.log(e.keyCode)
// 	console.log('x ' + xpos);
// 	console.log('y ' + ypos);
// 	console.log('z ' + zpos);
//
//
// 	if(e.keyCode === 37){
// 		//left
// 		xpos -= 0.1;
// 	} else if(e.keyCode === 39){
// 		//right
// 		xpos += 0.1;
// 	} else if(e.keyCode === 38){
// 		//up
// 		ypos += 0.1;
// 	} else if(e.keyCode === 40){
// 		//down
// 		ypos -= 0.1;
// 	} else if(e.keyCode === 90){
// 		//z
// 		zpos += 0.1;
// 	} else if(e.keyCode === 88){
// 		//x
// 		zpos -= 0.1;
// 	}
//
//     myPlayer.update(xpos, ypos, zpos);
// })


function initVehicle(){


					var loader = new THREE.TextureLoader();
					var box_material = Physijs.createMaterial(
							new THREE.MeshLambertMaterial({ map: loader.load( 'client/src/material/plywood.jpg' ) }),
							.4, // low friction
							.6 // high restitution
						);
						box_material.map.wrapS = THREE.RepeatWrapping;
						box_material.map.repeat.set( .25, .25 );


					var size = Math.random() * 2 + .5;
						var box = new Physijs.BoxMesh(
							new THREE.BoxGeometry( size, size, size ),
							box_material
						);
						box.castShadow = box.receiveShadow = true;
						box.position.set(
							Math.random() * 25 - 50,
							5,
							Math.random() * 25 - 50
						);

						var vehicle = new Physijs.Vehicle(box, new Physijs.VehicleTuning(
							10.88,
							1.83,
							0.28,
							500,
							10.5,
							6000
						));

						// console.log(vehicle)
						scene.add(vehicle);

				input = {
					power: null,
					direction: null,
					steering: 0
				};
				document.addEventListener('keydown', function( ev ) {
					switch ( ev.keyCode ) {
						case 37: // left
							input.direction = 1;
							break;

						case 38: // forward
							input.power = true;
							break;

						case 39: // right
							input.direction = -1;
							break;

						case 40: // back
							input.power = false;
							break;
					}
				});
				document.addEventListener('keyup', function( ev ) {
					switch ( ev.keyCode ) {
						case 37: // left
							input.direction = null;
							break;

						case 38: // forward
							input.power = null;
							break;

						case 39: // right
							input.direction = null;
							break;

						case 40: // back
							input.power = null;
							break;
					}
				});

}
