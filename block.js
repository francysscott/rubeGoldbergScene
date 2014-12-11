/*
	Copyright 2014 Francys Scott and Susie Carovillano
	
	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
	
	block.js
	Susie Carovillano and Francys Scott
	12/11/14 
	CS 307

	Creates a block with a height of 1 unit, a width of 0.5 units, and a 
 	depth of 0.25 units, before scaling.
	The block's origin is at the center of its base with y increasing along
	the height of the block.
 
 	Variables are:
  		blockColor - color of block in ambient and directional light 
  		blockSpecular - color of specular light against block
  		blockShininess - shininess of block
  		size - scaling factor of block
  		blockTexture - texture map for block

 */

function createBlock(blockColor, blockSpecular, blockShininess, size, blockTexture) {
	var block = new THREE.Object3D();
	
	if(blockTexture  === undefined) {
    	var blockMat = new THREE.MeshPhongMaterial( { color: blockColor,
												   ambient: blockColor,
												   specular: blockSpecular,
												   shininess: blockShininess} );
    } else {
    	var wood = THREE.ImageUtils.loadTexture( blockTexture,
                                                new THREE.UVMapping(),
                                                TW.render );
		wood.wrapS = THREE.RepeatWrapping;
		wood.wrapT = THREE.RepeatWrapping;
		wood.repeat.set( 1, 1 );
	
		var blockMat = new THREE.MeshPhongMaterial( { color: blockColor,
												   ambient: blockColor,
												   specular: blockSpecular,
												   shininess: blockShininess,
												   map: wood} );
	}
												   
	var blockGeom = new THREE.BoxGeometry( size * 0.5, size, 0.25 * size);
	 blck = new THREE.Mesh( blockGeom, blockMat );
	blck.position.set(0, size * 0.5, 0);
	block.add(blck);
	
	return block;
}
 
 