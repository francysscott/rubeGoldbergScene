

function createDomino(dominoColor, dominoSpecular, dominoShininess, size) {
		
	var dominoMat = new THREE.MeshPhongMaterial( { color: 0x333333} );
	var blockGeom = new THREE.BoxGeometry( size * 0.53, size, 0.25 * size);
	var block = new THREE.Mesh( blockGeom, dominoMat );
	
	var domino = block;
	
	return domino;
}
 
 