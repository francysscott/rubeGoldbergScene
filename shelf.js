/*
	createShelf.js
	Francys Scott and Susie Carovillano
	November 2014
	
	Create shelf based on user parameters for width, height, length, color, 
	specular, and shininess.
	
	Origin is at the center of the top, back edge of the shelf.
	This makes placement of the shelf against the wall and objects on the shelf easier.
*/

function createShelf(width, height, length, texture, shelfColor, shelfSpecular, shelfShininess) {
	var shelf = new THREE.Object3D();
	var wood = THREE.ImageUtils.loadTexture(texture, new THREE.UVMapping(), TW.render);
	
	var shelfGeom = new THREE.BoxGeometry(width, height, length);
	var shelfMat = new THREE.MeshPhongMaterial({color: shelfColor,
												ambient: shelfColor,
												specular: shelfSpecular,
												map: wood, 
												shininess: shelfShininess
                                    		});
    var shlf = new THREE.Mesh(shelfGeom, shelfMat);

    shlf.position.y = -height/2;
    shlf.position.x = -width/2;
    shelf.add(shlf);
    
    return shelf;
}