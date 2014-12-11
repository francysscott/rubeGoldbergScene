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

	fscott_scarovilSlide.js
	Francys Scott and Susie Carovillano
	December 2014
	
	Create a extruded slide based on desired height, length, width and 
	  whether the slide is lipped on each side.

	The slide's dimensions are:
	  height 	as specified by user, the top of the slide not including any lip
	  length	the length of the slide(x displacement).  The actual slide may be longer
	  			measured diagonally
	  width		width of the slide - must be wider for larger objects
	  
		 
	The slide's origin is at the center of the base 
	  just under the highest point of the slide.
 
 	Variables are:
 	  height 	as specified by user, the top of the slide not including any lip
	  length	the length of the slide(x displacement).  The actual slide may be longer
	  			measured diagonally
	  width		width of the slide - must be wider for larger objects
	  color		hex value for slide color (not a texture mapping)
	  shininess	integer value for shininess factor
	  isLipped	whether the slide has rims on either side to keep objects on the slide; 
	  			proportionate to the specified width
*/


function createSlide (height, length, width, inputColor, inputShininess, isLipped) {
	
	var diff = 0.1 * width;  	// needed for calculating the fits of the base and slide
	var slideMaterial = new THREE.MeshPhongMaterial({color: inputColor,
    										 ambient: inputColor,
                                             shininess: inputShininess,
                                    		 specular: 0xCCCCCC
                                    		});
                                    		
    var slide = new THREE.Object3D();  // frame into which all pieces are placed.
                                    		
	var slideTopGeom = buildSlideGeom(height, length, width, isLipped);
	var slideTop = new THREE.Mesh( slideTopGeom, slideMaterial );
	var degree = (Math.PI/4)- Math.atan(length / (height-diff)); 	// get the correct amount of rotation
	slideTop.position.set(0,diff,0);
	slideTop.rotateX(degree);
	
	var slideBottomGeom = buildBaseGeom(height, length, width, diff);
	var slideBottom = new THREE.Mesh( slideBottomGeom, slideMaterial );
	
	slideBottom.position.set(0,0,0);
	
	slide.add(slideTop);
	console.log("now adding slide bottom");
	slide.add(slideBottom);
	
	return slide;

}

function buildBaseGeom(height, length, width, diff)  {
	
	var min = new THREE.Vector3( 0, 0, 0 );
	var max = new THREE.Vector3( diff, height - diff, diff );
	
	return new THREE.Box3(min, max);
	
	
	
	
	
	
	
	
	
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


function buildSlideGeom(height, length, width, isLipped)  {
	var slideLength = Math.sqrt(height*height + length*length);

	var extrusionSettings = {
		size: slideLength, height: width, curveSegments: 3,
		bevelThickness: 1, bevelSize: 2, bevelEnabled: false,
		material: 0, extrudeMaterial: 1
	};
	
	var slideShape = getSlideShape(width, isLipped);
	
	var slideGeom = new THREE.ExtrudeGeometry( slideShape, extrusionSettings );

	return slideGeom;
}



function getSlideShape(scale, isLipped)  {
	
	if (scale < 0)
		scale = 1;
	
	var origPoints = [];
	
	if (isLipped) {
		origPoints.push( new THREE.Vector2 (   scale * 0,  scale * 0 ) );
		origPoints.push( new THREE.Vector2 (   scale * 0.4,  scale * 0 ) );
		origPoints.push( new THREE.Vector2 (   scale * 0.425,  scale * 0.1 ) );
		origPoints.push( new THREE.Vector2 (   scale * 0.45,  scale * 0.275 ) );
		origPoints.push( new THREE.Vector2 (   scale * 0.475,  scale * 0.3 ) );
		origPoints.push( new THREE.Vector2 (   scale * 0.5,  scale * 0.275 ) );
		origPoints.push( new THREE.Vector2 (   scale * 0.5,  scale * 0 ) );
		origPoints.push( new THREE.Vector2 (   scale * 0.4,  scale * -0.1 ) );
		origPoints.push( new THREE.Vector2 (   scale * -0.4,  scale * -0.1 ) );
		origPoints.push( new THREE.Vector2 (   scale * -0.5,  scale * 0 ) );
		origPoints.push( new THREE.Vector2 (   scale * -0.5,  scale * 0.275 ) );
		origPoints.push( new THREE.Vector2 (   scale * -0.475,  scale * 0.3 ) );
		origPoints.push( new THREE.Vector2 (   scale * -0.45,  scale * 0.275 ) );
		origPoints.push( new THREE.Vector2 (   scale * -0.425,  scale * 0.1 ) );
		origPoints.push( new THREE.Vector2 (   scale * -0.4, scale *  0 ) );
	} 
	else
	{
		origPoints.push( new THREE.Vector2 (   scale * 0,  scale * 0 ) );
		origPoints.push( new THREE.Vector2 (   scale * 0.5,  scale * 0 ) );
		origPoints.push( new THREE.Vector2 (   scale * 0.4,  scale * -0.1 ) );
		origPoints.push( new THREE.Vector2 (   scale * -0.4,  scale * -0.1 ) );
		origPoints.push( new THREE.Vector2 (   scale * -0.5,  scale * 0 ) );
	}
		
// 	var scaledPoints = [];
//     for( var i=0; i<origPoints.length; i++ ) { // Puts points in new Vector2 array
//         var p = new THREE.Vector2();
//         p.x = origPoints[i][0];
//         p.y = origPoints[i][1];;
//         scaledPoints.push(p);
//     }	
		
	return new THREE.Shape(origPoints);

}
