
/*
	Curtain.js
	Francys Scott and Susie Carovillano
	December 2014
	
	Simple function that creates a curtain with rod.
	
	Currently has no parameters so it is not customizable unless the user changes the code.
*/	
	
function createCurtain() {	
	var curtain = new THREE.Object3D();
	
	// cloth material
	var clothTexture = THREE.ImageUtils.loadTexture( sceneParams.umbrellaTexture );
	clothTexture.wrapS = clothTexture.wrapT = THREE.RepeatWrapping;
	clothTexture.anisotropy = 16;

	var clothMaterial = new THREE.MeshPhongMaterial( { alphaTest: 0.5, 
													ambient: 0xffffff, 
													color: 0xffffff, 
													specular: 0x030303, 
													emissive: 0x111111, 
													shininess: 10, 
													map: clothTexture, 
													side: THREE.DoubleSide } );
	// cloth geometry
	clothGeometry = new THREE.ParametricGeometry( clothFunction, cloth.w, cloth.h );
	clothGeometry.dynamic = true;
	clothGeometry.computeFaceNormals();

	var uniforms = { texture:  { type: "t", value: clothTexture } };
	var vertexShader = document.getElementById( 'vertexShaderDepth' ).textContent;
	var fragmentShader = document.getElementById( 'fragmentShaderDepth' ).textContent;

	// cloth mesh
	objectC = new THREE.Mesh( clothGeometry, clothMaterial );
	objectC.position.set( -135, 0, -100 );
	objectC.scale.set(0.25, 0.4, 0.4);
	objectC.rotateY(Math.PI/2);
	objectC.name = "curtain";
	curtain.add( objectC );

	objectC.customDepthMaterial = new THREE.ShaderMaterial( { uniforms: uniforms, vertexShader: vertexShader, fragmentShader: fragmentShader } );

	//Curtain rods for the curtains
	// poles
	var poleGeo = new THREE.BoxGeometry( 20, 30, 3 );
	var poleMat = new THREE.MeshPhongMaterial( { color: 0xffffff, specular: 0x111111, shiness: 30 } );

	var mesh = new THREE.Mesh( new THREE.BoxGeometry( 20, 2, 80 ), poleMat );
	mesh.position.set( -140, 150, -100 );
	curtain.add(mesh);
	
	return curtain;
}
	