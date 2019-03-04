/*
**  Module for player
    Has geometry of player and camera that follows him around
*/
import * as THREE from 'three';
const OrbitControls = require('three-orbit-controls')(THREE)



class Player{
    constructor(newX){
        this.xpos = 0;
        this.ypos = 0;
        this.zpos = 0;
        this.playerGeometry = new THREE.BoxGeometry(2,2,1);
        this.playerMaterial = new THREE.MeshStandardMaterial({color: 0xddff22});
        this.player = new THREE.Mesh(this.playerGeometry, this.playerMaterial);
        this.player.receiveShadow = true;
        this.player.castShadow = true;
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        this.camera.rotation.x = -0.7;
        this.controls = new OrbitControls( this.camera );
        this.camera.position.set(3,3,3);
    }

    update(x, y, z){
        this.player.position.set(x, y, z);
        // this.camera.position.set(x, y + 3, z + 3)
    }
}



export default Player;
