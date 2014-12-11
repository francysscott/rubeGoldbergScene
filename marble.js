function createMarble(marbleColor, marbleSpecular, marbleShininess, marbleSize) {
	// phong material translucence
	
	// create additional camera
        var mSphereCamera = new THREE.CubeCamera(0.1, 1000, 512);
         mSphereCamera.position.set(10, 50, 25 );
         scene.add(mSphereCamera);
	
	var marbleMat = new THREE.MeshPhongMaterial( { color: marbleColor, refractionRatio: .5,
						envMap: mSphereCamera.renderTarget,
						shininess: marbleShininess} );
	var sphereGeom =  new THREE.SphereGeometry( marbleSize, 32, 16 );
	var marble = new THREE.Mesh( sphereGeom, marbleMat );
	
	var obArray = [marble, mSphereCamera];
	return obArray;
}
 
 