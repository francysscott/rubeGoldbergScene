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
	
	scarovilShinyBall.js
	Susie Carovillano and Francys Scott
	11/14/14 
	CS 307

	Creates a shiny ball using a cube camera to create the reflections.

	The ball's origin is at its center.
 
 	Variables are:
  		shinyBallColor - color of ball in ambient light
  		shinyBallSpecular - color of specular light against ball
  		shinyBallShininess - shininess of ball
  		shinyBallSize	- scaling factor of ball
  		
  	It returns an array of size two.
  		First element of array is the ball object.
  		Second element is the ball camera.
 */

function createShinyBall(shinyBallColor, shinyBallSpecular, shinyBallShininess, shinyBallSize, bumpMapImage) {
	// Create additional camera for reflections
    var sphereCamera = new THREE.CubeCamera(0.1, 1000, 512);
	
	// Create the ball
	if (bumpMapImage == undefined) {
		var shinyBallMat = new THREE.MeshPhongMaterial( { color: shinyBallColor,
												ambient: shinyBallColor,
												specular: shinyBallSpecular, 
												envMap: sphereCamera.renderTarget, //this makes the shinyBall reflective
												shininess: shinyBallShininess} );
	}
	else {
		var shinyBallMat = new THREE.MeshPhongMaterial( { color: shinyBallColor,
												ambient: shinyBallColor,
												specular: shinyBallSpecular, 
												envMap: sphereCamera.renderTarget, //this makes the shinyBall reflective
												shininess: shinyBallShininess,
												bumpMap: THREE.ImageUtils.loadTexture(bumpMapImage),
												bumpScale: 0.05} );
	}
	var sphereGeom =  new THREE.SphereGeometry(shinyBallSize, 32, 16);
	
	var shinyBall = new THREE.Mesh(sphereGeom, shinyBallMat);
	
	var shinyBallFrame = new THREE.Object3D();
	shinyBallFrame.add(shinyBall);
	
	// Can only return a single object so we put the two needed objects into an array
	var objectArray = [shinyBallFrame, sphereCamera];
	// Returns an array
	return objectArray; 
}