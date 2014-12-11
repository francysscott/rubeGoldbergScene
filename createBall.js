/*
	createBall.js
	Francys Scott and Susie Carovillano
	November 2014
	
	Simple function to create a ball based on size (radius), color and shininess.
	Note that the ambient color is default set to the surface color.
*/

function createBall(ballRad, ballColor, ballShininess) {
	var ballG = new THREE.SphereGeometry(ballRad,30,30);
    var ballM = new THREE.MeshPhongMaterial({color: ballColor,
    										 ambient: ballColor,
                                             shininess: ballShininess
                                    		});
    var ball = new THREE.Mesh(ballG,ballM);

	return ball;
}