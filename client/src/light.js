//todo athuga hvort það sé sniðugara að importa bara ljósunum frá three.
import * as THREE from 'three';

var light1 = new THREE.PointLight( 0xffffff, 1, 500 );
light1.position.set(50,50,50);
light1.castShadow = true;
light1.shadow.mapSize.width = light1.shadow.mapSize.height = 1024*2;


var light2 = new THREE.PointLight( 0xffffff, 1, 200 );
light2.position.set(-20,30,-30);
light2.castShadow = true;
light2.shadow.mapSize.width = light2.shadow.mapSize.height = 512*2;


var ambientLight = new THREE.AmbientLight( 0x707070 );


var dirLight = new THREE.DirectionalLight( 0xffffff, 1
dirLight.position.set( -10, 18, 5 );
dirLight.castShadow = true;
var d = 14;
dirLight.shadow.camera.left = -d;
dirLight.shadow.camera.right = d;
dirLight.shadow.camera.top = d;
dirLight.shadow.camera.bottom = -d;

dirLight.shadow.camera.near = 2;
dirLight.shadow.camera.far = 50;

dirLight.shadow.mapSize.x = 1024;
dirLight.shadow.mapSize.y = 1024;

export {light1, light2, ambientLight, dirLight}
