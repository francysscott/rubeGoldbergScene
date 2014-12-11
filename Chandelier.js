/**
	createChandelier(height, numBranches, glassTexture, branchTexture, isLipped)
	Creates a chandelier based on user preference to height and width of object and 
	user-specified colors/textures for the materials.
	int height the overall height of the chandelier including mount and chain
	int numBranches the number of lights and branches the user wants.  User should set 
		2-6 branches.  If user sets more, defaults to 6; if fewer, defaults to 2.
	bool isLipped whether the glass globes are lipped or spherical
	String glassTexture the glass texture (if wanted)
	String branchTexture the branch texture (if wanted)
	
*/               
function createChandelier(inputHeight, numBranches, isLipped,
							inputGlassTexture, inputBranchTexture){
	var chandelier = new THREE.Object3D();	// frame in which all pieces are placed
	
	// Basic materials for testing, amber glass and brass metal fixture
	// additional interesting materials at 
	// http://devernay.free.fr/cours/opengl/materials.html
	var amberM = new THREE.MeshPhongMaterial({color: 0xFFBF00,
    										 ambient: 0xFF4400,
                                             shininess: 60,
                                             transparent: true,
                                             opacity: 0.7
                                    		});
	var brownM = new THREE.MeshPhongMaterial({color: 0xA52A2A,
    										 ambient: 0x888822,
                                             shininess: 20,
                                    		});
                                    		
    // Here is where we would interpret the textures IF the user input some
	// var renderedGlassTexture
    // var finalGlassTexture = (scale === undefined) ? 1 : scale;
                                    		                                    		
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
		
	// Create basic branch
	var branch1 = createBranch(height, width, amberM, brownM, isLipped);
	// Add new branches to chandelier, number of branches as specified by user
	for (i = 0; i < actualNumBranches; i++)  {
		var branch2 = branch1.clone();
		branch2.rotateY(i*(2*Math.PI/actualNumBranches));
		branch2.position.set(0,-height,0);
		chandelier.add(branch2);
	}
	
	// Add lights for branches
	// Note that names for lights must be identical to the names of lights
	// within the main!
	// SpotLight(hex, intensity, distance, angle, exponent)
	// spotLight1 = new THREE.SpotLight(0xFFFF00,
//                                          0.9,
//                                          30,
//                                          Math.PI/2,
//                                          5);
//     spotLight1.position.set(0, -height*5/6, width/4);
//     spotLight1.rotateX(Math.PI/4);
//     spotLight2 = spotLight1.clone();
	
	//Build and add suspension chain and ceiling mount
	var mountGeom = new THREE.CylinderGeometry(width/4, width/4.5, width/10, numBranches*4);
	var mount = new THREE.Mesh(mountGeom,brownM);
	mount.position.y = -width/20;
	chandelier.add(mount);
	var chainGeom = new THREE.CylinderGeometry(width/30, width/30, height/2);
	var chain = new THREE.Mesh(chainGeom,brownM);
	chain.position.y = -height/4;
	chandelier.add(chain);

	return chandelier;
}   


/**
	Creates whole branch including globe and arm.
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

/**
	Partially derived from Threejs website
*/
function createBranchGeom(height, width)  {

	var CustomSinCurve = THREE.Curve.create(
		function ( scale ) { //custom curve constructor
			this.scale = (scale === undefined) ? 1 : scale;
		},
	
		function ( t ) { //getPoint: t is between 0-1
			var tx = t * 3 - 1.5,
				ty = Math.sin( 2 * Math.PI * t ),
				tz = 0;
		
			return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
		}
	);

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
	createGlobeGeom(globeHeight, globeRad, isLipped)
	Creates a globe with open top for the chandelier.
*/
function createGlobeGeom(globeHeight, globeRad, isLipped)  {
	
	// Type of chandelier is based on whether user wants simple or fluted style
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
    
    var geom = new THREE.LatheGeometry( alt, 20 ); 
    // 20 segments make it look like an generally rounded globe without using 
    // too much processor resources.
    
	return geom;
}


/** 
	getSimpleGlobePoints()
	Returns the points for the simple globe with open top.
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
	Returns the points for the lipped globe with open top.
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
          