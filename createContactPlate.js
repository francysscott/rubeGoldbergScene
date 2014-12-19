/*
	createContactPlate.js
	Francys Scott and Susie Carovillano
	November 2014
	
	Creates a contact plate based on size (radius), color and shininess.
	
*/

function createContactPlate(plateRad, plateColor, plateShininess) {
	var plate = new THREE.Object3D();
	var plateG = new THREE.CylinderGeometry(plateRad, plateRad, 1, 30, 30);
    var plateM = new THREE.MeshPhongMaterial({color: plateColor,
    										 ambient: plateColor,
                                             shininess: plateShininess
                                    		});
    var plte = new THREE.Mesh(plateG,plateM);
    plte.position.y = plateRad;
    
    plate.add(plte);

	return plate;
}