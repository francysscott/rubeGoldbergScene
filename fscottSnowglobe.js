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
	
	fscottSnowglobe.js
	Susie Carovillano and Francys Scott
	12/18/14 
	CS 307

	Creates a snowglobe using a given object and size specified by the user.

	The globe's origin is at the center of the bottom plane of the base.
 
 	Variables are:
  		Object3D() insideObject 	whatever the user wants inside the globe.  Any mesh 
  									object. Make sure to scale the object appropriately 
  									beforehand.
  		int height					the size of the overall object, including globe and base
  		hex glassColor				color of the globe glass
  		glassOpacity	
 */

function createSnowglobe(insideObject, height, glassColor, glassOpacity, baseColor) {

	// create the overall snowglobe
	var snowglobe = new THREE.Object3D();
	
	// create the materials of the glass and base using user params
	var glassM = new THREE.MeshPhongMaterial({color: glassColor,
    										 ambient: glassColor,
    										 specular: 0xDDDDDD,
                                             shininess: 75,
                                             transparent: true,
                                             opacity: glassOpacity
                                    		});
	var baseM = new THREE.MeshPhongMaterial({color: baseColor,
    										 ambient: baseColor,
    										 specular: 0xDDDDDD,
                                             shininess: 10
                                    		});
	
	var sphereGeom =  new THREE.SphereGeometry(height, 32, 16);
	var globe = new THREE.Mesh(sphereGeom, glassM);
	globe.position.set(0, height, 0);
	insideObject.position.set(0,height,0);
	
	// Build base for snowglobe
	var baseGeom = new THREE.CylinderGeometry(height*0.7, height*0.8, height*0.3, 16);
	var base = new THREE.Mesh(baseGeom, baseM);
	base.position.set(0, height*0.15, 0);
	
	snowglobe.add(globe);
	snowglobe.add(insideObject);
	snowglobe.add(base);
	
	return snowglobe; 
}