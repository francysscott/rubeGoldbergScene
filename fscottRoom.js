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
    
	fscottRoom.js
	Francys Scott and Susie Carovillano
	November 2014
	
	Simple function to create a room based on size (height), color and shininess.
	Note that the ambient color is default set to the surface color.
	
*/
function createRoom(height, wallTexture, ceilingTexture, floorTexture)  {
           
	var roomGeometry = new THREE.BoxGeometry(height * 1.5, // width 
											height ,		// height 
											height * 1.5);	// length 
											
	// Create floor and wall textures for the room.
	var wallpaper = THREE.ImageUtils.loadTexture( wallTexture ,//   "beige_wallpaper.jpg"
                                                new THREE.UVMapping(),
                                                TW.render );
	
	var ceiling = THREE.ImageUtils.loadTexture( ceilingTexture , // "stucco.jpg" or something similar
                                                new THREE.UVMapping(),
                                                TW.render );
	
	var floor = THREE.ImageUtils.loadTexture( floorTexture ,  // "wood-pattern.jpg"
                                                new THREE.UVMapping(),
                                                TW.render );
	// Build the materials array
	var materialArray = [];
	// [+X, -X, +Y, -Y, -Z, +Z]
	// [right, left, ceiling, floor, back, front]
	//var faceColors = [0xDDDDDD, 0xDDDDDD, 0xDDDDDD, 0xDDDDDD, 0xDDDDDD, 0xDDDDDD, 0xDDDDDD ];

	for(var i = 0; i < 6; i++) {
    	materialArray.push(new THREE.MeshPhongMaterial({
    	color: 0xDDDDDD, // basic color underneath
    	ambient: 0xCCCCCC, // basic ambient
     	map: wallpaper,
        side: THREE.BackSide}));  // face only on the inside
	}
	
	materialArray[2].map = ceiling;
	materialArray[3].map = floor;
	
	var roomMaterial = new THREE.MeshFaceMaterial(materialArray);
	var room = new THREE.Mesh(roomGeometry, roomMaterial);
	
	return room;
}

