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

	fscott_scarovilWindow.js
	Francys Scott and Susie Carovillano
	November 2014
	
	Create a window based on size (width and color).

	The window's dimensions are:
		 width = entered value
		 height = (9/16) * width
		 depth = (0.02) * width
		 
	The window's origin is at the center of the window.
 
 	Variables are:
 	 width - size of the window is based solely on this value
	 frameColor - color of the window's frame
	 fileName - the name of the video file to be played in the window
*/

// custom global variables
var video, videoImage, videoImageContext, videoTexture;


function createWindow(width, frameColor, fileName)  {
	var window = new THREE.Object3D();
	// Create geometry for the window frame.
	var height = width * 9/16;		// 16:9 frame ratio for window
	var depth = width * 0.02; 		// amount the frame projects into the room from wall.
	var thickness = width * 0.05;	// width of each bar of the window frame.
	
	var windowGeometry = createWindowFrameGeom(height, width, depth, thickness);
	
	var basicMat = new THREE.MeshPhongMaterial({color: frameColor, //0x5E2612 is good
    										 ambient: 0xDDDDDD,
                                             shininess: 10
                                    		});
									
	var frame = new THREE.Mesh(windowGeometry, basicMat);
	window.add(frame);
	
	var view = createView(height, width, fileName);
	window.add(view);
	
	return window;
}

/*	Creates the geometry for the window frame.  
	depth is the distance the window frame projects out into the room from the wall.
	thickness is the width of each piece of the frame.
*/
function createWindowFrameGeom (height, width, depth, thickness)  {
	var geom = new THREE.Geometry();
	// Create vars for easy calculation of window frame coordinates.
    var w2 = 0.5*width;
    var h2 = 0.5*height;
    var d = depth;
    var th = thickness;
    var th1 = 0.2 * thickness;
    var th8 = 0.6 * thickness;
    
    // add the base vertice points, points 0..3 (back side of window)
    geom.vertices.push(new THREE.Vector3(+w2, h2, 0));
    geom.vertices.push(new THREE.Vector3(-w2, h2, 0));
    geom.vertices.push(new THREE.Vector3(-w2, -h2, 0));
    geom.vertices.push(new THREE.Vector3(+w2, -h2, 0));
    
    // add the first four corners projected into room, points 4..7 
    // (front side outside coords of main frame)
    geom.vertices.push(new THREE.Vector3(w2-th1, h2-th1, d));
    geom.vertices.push(new THREE.Vector3(-w2+th1, h2-th1, d));
    geom.vertices.push(new THREE.Vector3(-w2+th1, -h2+th1, d));
    geom.vertices.push(new THREE.Vector3(w2-th1, -h2+th1, d));
    
    // add the inside coords for the left inner frame, 8..15
    // (inner portion of left window frame)
    geom.vertices.push(new THREE.Vector3(-(th8/2), h2-th1-th8, d));
    geom.vertices.push(new THREE.Vector3(-w2+th1+th8, h2-th1-th8, d));
    geom.vertices.push(new THREE.Vector3(-w2+th1+th8, -h2+th1+th8, d));
    geom.vertices.push(new THREE.Vector3(-(th8/2), -h2+th1+th8, d));
    
    geom.vertices.push(new THREE.Vector3(-(th/2), h2-th, 0));
    geom.vertices.push(new THREE.Vector3(-w2+th, h2-th, 0));
    geom.vertices.push(new THREE.Vector3(-w2+th, -h2+th, 0));
    geom.vertices.push(new THREE.Vector3(-(th/2), -h2+th, 0));
    
    // add the inside coords for the right inner frame, 16..23
    // (inner portion of right window frame)
    geom.vertices.push(new THREE.Vector3(w2-th1-th8, h2-th1-th8, d));
    geom.vertices.push(new THREE.Vector3((th8/2), h2-th1-th8, d));
    geom.vertices.push(new THREE.Vector3((th8/2), -h2+th1+th8, d));
    geom.vertices.push(new THREE.Vector3(w2-th1-th8, -h2+th1+th8, d));
    
    geom.vertices.push(new THREE.Vector3(w2-th, h2-th, 0));
    geom.vertices.push(new THREE.Vector3((th/2), h2-th, 0));
    geom.vertices.push(new THREE.Vector3((th/2), -h2+th, 0));
    geom.vertices.push(new THREE.Vector3(w2-th, -h2+th, 0));
    
    
    // now that we've got the vertices we need to define the faces.
	// Note:  the faces are one-sided.
    // outer faces
    geom.faces.push(new THREE.Face3(0, 1, 5));
    geom.faces.push(new THREE.Face3(5, 4, 0));
    geom.faces.push(new THREE.Face3(1, 2, 5));
    geom.faces.push(new THREE.Face3(2, 6, 5));
    geom.faces.push(new THREE.Face3(2, 3, 6));
    geom.faces.push(new THREE.Face3(3, 7, 6));
    geom.faces.push(new THREE.Face3(3, 0, 7));
    geom.faces.push(new THREE.Face3(0, 4, 7));
    
    // top faces
    geom.faces.push(new THREE.Face3(17, 8, 11));
    geom.faces.push(new THREE.Face3(11, 18, 17));
    geom.faces.push(new THREE.Face3(5, 9, 4));
    geom.faces.push(new THREE.Face3(9, 16, 4));
    geom.faces.push(new THREE.Face3(9, 5, 6));
    geom.faces.push(new THREE.Face3(6, 10, 9));
    geom.faces.push(new THREE.Face3(10, 6, 7));
    geom.faces.push(new THREE.Face3(7, 19, 10));
    geom.faces.push(new THREE.Face3(19, 7, 4));
    geom.faces.push(new THREE.Face3(4, 16, 19));
    
    // inner left faces
    geom.faces.push(new THREE.Face3(9, 13, 8));
    geom.faces.push(new THREE.Face3(13, 12, 8));
    geom.faces.push(new THREE.Face3(13, 9, 10));
    geom.faces.push(new THREE.Face3(10, 14, 13));
    geom.faces.push(new THREE.Face3(14, 10, 11));
    geom.faces.push(new THREE.Face3(11, 15, 14));
    geom.faces.push(new THREE.Face3(15, 11, 8));
    geom.faces.push(new THREE.Face3(8, 12, 15));
    
    // inner right faces
	geom.faces.push(new THREE.Face3(20, 16, 17));
	geom.faces.push(new THREE.Face3(17, 21, 20));
	geom.faces.push(new THREE.Face3(21, 17, 18));
	geom.faces.push(new THREE.Face3(18, 22, 21));
	geom.faces.push(new THREE.Face3(22, 18, 19));
	geom.faces.push(new THREE.Face3(19, 23, 22));
	geom.faces.push(new THREE.Face3(23, 19, 16));
	geom.faces.push(new THREE.Face3(16, 20, 23));
	
    // calculate the normals for shading
    geom.computeFaceNormals();
    geom.computeVertexNormals(true);

    return geom;
}

function createView(height, width, fileName) {

/*	Creates the view from the window. */

	// create the video element
	video = document.createElement( 'video' );
	video.id = 'video';
	video.type = ' video/ogg; codecs="theora, vorbis" ';
	video.src = fileName; //this is the movie file
	video.load(); // must call after setting/changing source
	video.play();
	
	videoImage = document.createElement( 'canvas' );
	videoImage.width = 160;
	videoImage.height = 90;

	videoImageContext = videoImage.getContext( '2d' );
	// background color if no video present
	videoImageContext.fillStyle = '#000000';
	videoImageContext.fillRect( 0, 0, videoImage.width, videoImage.height );

	videoTexture = new THREE.Texture( videoImage );
	videoTexture.minFilter = THREE.LinearFilter;
	videoTexture.magFilter = THREE.LinearFilter;
	
	var movieMaterial = new THREE.MeshBasicMaterial( { map: videoTexture, overdraw: true, side:THREE.FrontSide } );
	// the geometry on which the movie will be displayed;
	// 	movie image will be scaled to fit these dimensions.
	var movieGeometry = new THREE.PlaneGeometry( width, height, 4, 4 );
	var movieScreen = new THREE.Mesh( movieGeometry, movieMaterial );
	movieScreen.position.set(0,0,0.02); //sets it away from the wall slightly so it renders cleanly

	return movieScreen;
};
