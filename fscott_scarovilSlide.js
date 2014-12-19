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
	// get the correct amount of rotation for the slide so it touches the ground
	var degree = /*(Math.PI/4)- */ Math.atan((height-diff)/length); 	
	slideTop.position.set(0,height,0);
	slideTop.rotateX(degree);
	
	var slideBottomGeom = buildBaseGeom(width - 2.5*diff, diff);
	var slideBottomRung = new THREE.Mesh( slideBottomGeom, slideMaterial );
	slideBottomRung.position.set(0,height/3,diff/2);
	slideBottomRung.rotateZ(Math.PI/2);
	
	var slideMidRung = slideBottomRung.clone();
	slideMidRung.position.set(0,2*height/3,diff/2);
	
	var slideSupportGeom = buildBaseGeom(height-(diff), diff);
	var slideLeftSupport = new THREE.Mesh( slideSupportGeom, slideMaterial );
	slideLeftSupport.position.set((width/2)-diff,(height-diff)/2,diff/2);
	
	var slideRightSupport = slideLeftSupport.clone();
	slideLeftSupport.position.x = -(width/2)+diff;
	
	slide.add(slideTop);
	console.log("now adding slide bottom");
	slide.add(slideBottomRung);
	slide.add(slideMidRung);
	slide.add(slideLeftSupport);
	slide.add(slideRightSupport);
	
	
	return slide;

}

function buildBaseGeom(height, lw)  {
	
	return new THREE.BoxGeometry( lw, height, lw);

}

function buildSlideGeom(height, length, width, isLipped)  {
	var slideLength = Math.sqrt((height*height) + (length * length)); 
	console.log("hypotenuse of "+height+" and "+length+" is "+slideLength);
	var extrusionSettings = { 
		amount: slideLength, 
		bevelEnabled: false,
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
		
	return new THREE.Shape(origPoints);
}