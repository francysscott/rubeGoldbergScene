/*
	createShelf.js
	Francys Scott and Susie Carovillano
	November 2014
	
	Simple function to create a ball based on size (radius), color and shininess.
	Note that the ambient color is default set to the surface color.
*/

function createShelf(width, height, length, texture, shelfColor, shelfSpecular, shelfShininess) {
	var shelf = new THREE.Object3D();
	var wood = THREE.ImageUtils.loadTexture(texture, new THREE.UVMapping(), TW.render);
	wood.wrapS = THREE.RepeatWrapping;
	wood.wrapT = THREE.RepeatWrapping;
	wood.repeat.set(1, 1);
	
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