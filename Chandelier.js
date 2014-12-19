/**
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

	fscottChandelier.js
	Francys Scott and Susie Carovillano
	December 2014
	
	Builds a chandelier based on variables including number of branches (minimum 2, 
	maximum 6), material colors, size and shape of glass globe.  
	
	Chandelier origin is the center of the top plane of the mount from which hangs 
	the rest of the chandelier.  
	
	Bounding box is:
		xmin:  -height/2 	xmax: height/2
		ymin:  -height 		ymax: 0
		zmin:  -height/2 	zmax: height/2
		
		This makes placing the object into a scene very easy - simply use the ceiling 
		height to specify the chandelier.position.set.y.
	*/
	
/**
	createChandelier(inputHeight, numBranches, isLipped, inputGlassColor, inputMetalColor)
	Creates a chandelier based on user preference to height and width of object and 
	user-specified colors/textures for the materials.  Note that the height is always 
	even, or gets changed to an even integer, because this affects the ability to 
	calculate the sin wave for the branches.  (An odd integer breaks the equation.)
	int height the overall height of the chandelier including mount and chain.  Note that 
		if this number is even, the final height of the object is slightly adjusted in 
		order to prevent a fatal error when calculating the sin curve for the arm.
	int numBranches the number of lights and branches the user wants.  User should set 
		2-6 branches.  If user sets more, defaults to 6; if fewer, defaults to 2.
	bool isLipped whether the glass globes are lipped or spherical
	hex inputGlassColor  the glass color for the globes
	hex inputMetalColor the branch metal color for the arms
	int inputMetalShininess the amount of shininess on the arms, range 0-100.
	
*/               
function createChandelier(inputHeight, numBranches, isLipped,
							inputGlassColor, inputMetalColor, inputMetalShininess){					
	/** 
	getSimpleGlobePoints()
	Returns an array of values for the points to make a simple globe with open top.
	The globe is used in making each branch of a chandelier
	*/
	function getSimpleGlobePoints() {
		var points = [ [0, 0, 0],    //silhouette of globe
						[0.4, 0, 0],
						[0.5, 0, 0.05],
						[0.58, 0, 0.12],
						[0.65, 0, 0.2],
						[0.69, 0, 0.3],
						[0.72, 0, .4],
						[0.75, 0, .5],
						[0.74, 0, .6],
						[0.7, 0, .8],
						[0.6, 0, .9],
						[0.5, 0, .95],
						[0.35, 0, .95],
						[.4, 0, .9],
						[.55, 0, .8],
						[.6, 0, .55],
						[.5, 0, .3],
						[.4, 0, .2],
						[.3, 0, .15],
						[0, 0, .14] ];  // closes off the bottom of the lathe
		return points;
	}

	/** 
		getLippedGlobePoints()
		Returns the points for the lipped globe with open top.  Used to create the glass globes
		for the chandelier.
	*/
	function getLippedGlobePoints() {
		var points = [ [0, 0, 0],    //silhouette of globe
						[.4, 0, 0],
						[.5, 0, .05],
						[.58, 0, .12],
						[.65, 0, .2],
						[.69, 0, .3],
						[.72, 0, .4],
						[.75, 0, .5],
						[.77, 0, .6],
						[.8, 0, .7],
						[.82, 0, .75],
						[.89, 0, .9],
						[.9, 0, .92],
						[.95, 0, .97],
						[.96, 0, .98],
						[.95, 0, .99],
						[.93, 0, .98],
						[.9, 0, .97],
						[.85, 0, .95],
						[.8, 0, .9],
						[.7, 0, .8],
						[.6, 0, .55],
						[.5, 0, .3],
						[.4, 0, .2],
						[.3, 0, .15],
						[0, 0, .14] ];  // closes off the bottom of the lathe
		return points;
	}										
							
	/**
	createGlobeGeom(globeHeight, globeRad, isLipped)
	Creates a geometry for a globe with open top for the chandelier.  The shape of said 
	globe is determined by the boolean isLipped.  
	*/
	function createGlobeGeom(globeHeight, globeRad, isLipped)  {
		// Type of chandelier is based on whether user wants simple round or fluted style
		var points;
		if (isLipped) 
			points = getLippedGlobePoints();
		else points = getSimpleGlobePoints();
					
		var alt = [];
		var size = globeHeight;
		for( var i=0; i<points.length; i++ ) { // Puts points in Vector3 form to use in lathe
			var p = new THREE.Vector3();
			p.x = globeRad * points[i][0];	// scale width of globe to match width param
			p.z = size * points[i][2];		// scale length of globe to match height param
			p.y = points[i][1];;
			alt.push(p);
		}
		var geom = new THREE.LatheGeometry( alt, 18 ); 
		// 18 segments make it look like an generally rounded globe without using 
		// too much processor resources.
	
		return geom;
	}						
							
	/**
	Partially derived from Threejs website, this returns the geometry of the
	curved arm of the branch.
	*/
	function createBranchGeom(height, width)  {

		var CustomSinCurve = THREE.Curve.create(
			function ( scale ) { //custom curve constructor
				// if no scale is specified, default scale is 1:1.
				this.scale = (scale === undefined) ? 1 : scale;
			},
	
			function ( t ) { //getPoint: t is between 0-1
				var tx = t * 3 - 1.5,
					ty = Math.sin( 2 * Math.PI * t ),
					tz = 0;
				return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
			}
		);

		// Build curve and return the values of the 2D curve.
		var path = new CustomSinCurve( width/4 );
		var geometry = new THREE.TubeGeometry(
			path,  				//path
			width * 1.5,    	//segments
			width * 0.0425,     //radius of tube
			width/2,     		//radiusSegments
			false  				//not closed
		);
		return geometry;
	}
												
	/**
	Creates whole branch including globe and arm.  Returns the branch object mesh.
	*/
	function createBranch(height, width, glassTexture, branchTexture, isLipped)  {
		var branch = new THREE.Object3D();

		// glass globe in which is a light                               		
		var globeGeom = createGlobeGeom(height/3, width/4, isLipped);
		var globe1 = new THREE.Mesh(globeGeom,glassTexture);
	
		// wood base for each globe, always lipped
		var baseGeom = createGlobeGeom(height/8, width/5, true);
		var base1 = new THREE.Mesh(baseGeom,branchTexture);
	
		// arm that attaches globe to base and ceiling
		var armGeom = createBranchGeom(height, width);
		var arm1 = new THREE.Mesh(armGeom,branchTexture);
	
		// position arm
		arm1.rotateY(-Math.PI/2);
		arm1.rotateZ(-Math.PI/6);
		arm1.position.set(0,height/6,width/6);
	
		// position globe
		globe1.rotateX(-Math.PI/2);
		globe1.position.set(0,0,width/2);
	
		//position base
		base1.rotateX(-Math.PI/2);
		base1.position.set(0,-height/20,width/2);
	
		branch.add(globe1);
		branch.add(arm1);
		branch.add(base1);
	
		return branch;
	}						
							
	// Local functions finished.
	// Begin code to create chandelier.  
	
	var chandelier = new THREE.Object3D();	// frame in which all pieces are placed
	
	// Basic materials for testing, amber glass and brass metal fixture
	// additional interesting materials at 
	// http://devernay.free.fr/cours/opengl/materials.html
	var glassM = new THREE.MeshPhongMaterial({color: inputGlassColor,
    										 ambient: inputGlassColor,
                                             shininess: 65,
                                             transparent: true,
                                             opacity: 0.7
                                    		});
	var metalM = new THREE.MeshPhongMaterial({color: inputMetalColor,
    										 ambient: inputMetalColor,
                                             shininess: inputMetalShininess,
                                    		});
    // Make sure the user's input values make sense for this object.  Otherwise fix them.                              		                                    		
	// make sure the number of branches is within reason, else limit it.
	var actualNumBranches = numBranches;
	if (actualNumBranches > 6) {
		actualNumBranches = 6;
	}
	if (actualNumBranches < 2) {
		actualNumBranches = 2;
	}
	// make sure that the size of the object is even (because the sin function needs it)
	// otherwise set height for user as slightly smaller
	var height = inputHeight;
	if (height%2 === 1) {
		height--;
	}
	var width = height;	// keep relationship the same between width and height
						// so the proportion stays reasonable.
	var degree = 2*Math.PI/actualNumBranches;  // angle around the chandelier of each branch
	
	// Create basic branch
	var branch1 = createBranch(height, width, glassM, metalM, isLipped);
	// Add new branches to chandelier, number of branches as specified by user
	for (i = 0; i < actualNumBranches; i++)  {
		var branch2 = branch1.clone();
		branch2.rotateY(i*degree);
		branch2.position.set(0,-height,0);
		chandelier.add(branch2);
	}
	
	//Build and add suspension chain and ceiling mount
	var mountGeom = new THREE.CylinderGeometry(width/4, width/4.5, width/10, numBranches*4);
	var mount = new THREE.Mesh(mountGeom,metalM);
	mount.position.y = -width/20;
	chandelier.add(mount);
	var chainGeom = new THREE.CylinderGeometry(width/30, width/30, height/2);
	var chain = new THREE.Mesh(chainGeom,metalM);
	chain.position.y = -height/4;
	chandelier.add(chain);
	
	//create a spotlight for the chandelier
    var spotLight = new THREE.SpotLight( 0xFFEFEF,
                                         1,
                                         0,
                                         Math.PI/2.3,
                                         1 );
    spotLight.name = "chandelierlight";
    // position and add light
	spotLight.position.set(0, -3*height/4, 0); 
	spotLight.target = mount;
    chandelier.add(spotLight);

	return chandelier;

	
}   



