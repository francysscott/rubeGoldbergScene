function drawScene(sceneParams) {

    // Create and place the room in which the objects appear
    var w2 = sceneParams.roomH / 2;		// one-half the room length
	var room = createRoom(sceneParams.roomH, 
							sceneParams.wallTexture, 
							sceneParams.ceilingTexture, 
							sceneParams.floorTexture);
	room.name="room";
	room.position.set(0, w2, 0);  // Increase y so that the origin is at the right spot
	scene.add(room);
	
	// Create and place table
	var table = createTexturedTable(sceneParams.tableHeight, // for woodgrain table
							sceneParams.tableWidth, 
							sceneParams.tableTexture, 
							sceneParams.tableShininess);
	table.name = "table";
	table.position.set(-30,sceneParams.tableHeight, -90);  // Put in back of room
	table.rotation.y = Math.PI * 0.5; //rotate 90 degrees
	scene.add(table);
	
	// Create and place ball in room
	var ball = createBall(sceneParams.ballRad, 
							sceneParams.ballColor, 
							sceneParams.ballShininess);
    ball.name = "ball";         // give it a name, so we can remove it next time.
	// Put ball in front left corner of room    
    ball.position.set(-130, 0, 70);
    scene.add(ball);
    
    //Create and place Umbrella in room
    var umbrella = createUmbrella(sceneParams.umbrellaColor, 
							sceneParams.umbrellaSpecular, 
							sceneParams.umbrellaShininess,
							sceneParams.umbrellaSize, 
							sceneParams.umbrellaTexture,
							sceneParams.handleColor);
	umbrella.name = "umbrella";
	umbrella.position.set(-100, 36, 90);  // Place in room on floor in front left corner
	umbrella.rotateX(Math.PI/2);		// rotate top of umbrella so two spokes rest on floor
	umbrella.rotateY(-Math.PI/3.55);	// rotate umbrella so spokes and cane rest on floor
	umbrella.rotateZ(-Math.PI/8);
	scene.add(umbrella);
	
	//Create and place shelves
	var shelf1 = createShelf(sceneParams.shelfWidth, sceneParams.shelfHeight, sceneParams.shelfLength,
							sceneParams.shelfTexture, sceneParams.shelfColor, sceneParams.shelfSpecular,
							sceneParams.shelfShininess);
	shelf1.position.set(150, 140, -100);
	scene.add(shelf1);
	
	var shelf2 = shelf1.clone();
	shelf2.rotateY(Math.PI/2);
	shelf2.position.set(100, 100, -150);
	scene.add(shelf2);
	
	//Create and place teapot
	var teapot = createTeapot(sceneParams.teapotDiffuse, sceneParams.teapotAmbient, 
							  sceneParams.teapotSpecular, sceneParams.teapotShininess,
							  sceneParams.teapotSize, function(teapot) {
							  	teapot.position.set(130, 140, -80); //set on tabletop
    							teapot.rotateY(-Math.PI/3); 
    							scene.add(teapot); }
    							);		

    //Create small marble and its camera
    var marbleSet = createShinyBall(sceneParams.marbleColor, sceneParams.marbleSpecular,
    						 sceneParams.marbleShininess, sceneParams.marbleRadius );
	marble = marbleSet[0];
	marbleCam = marbleSet[1];
    
    //add the marble					 
    marble.position.set(-80, sceneParams.tableHeight + sceneParams.slideHeight, -90 );
	scene.add(marble);	
	
	//add the camera that makes the marble reflective
	marbleCam.position.set(40, (sceneParams.tableHeight + sceneParams.slideHeight + sceneParams.marbleRadius), -60);
	scene.add(marbleCam);
    
    //Create bowling ball and its camera
    var ballSet = createShinyBall(sceneParams.bowlingBallColor, sceneParams.bowlingBallSpecular,
    						 sceneParams.bowlingBallShininess, sceneParams.bowlingBallRadius );
	bowlingBall = ballSet[0];
	bowlingBallCam = ballSet[1];
    
    //add the bowling ball					 
    bowlingBall.position.set(10, sceneParams.tableHeight, -43.5 );
	scene.add(bowlingBall);	
	
	//add the camera that makes the bowling ball reflective
	bowlingBallCam.position.set(10, (sceneParams.tableHeight + sceneParams.bowlingBallRadius), -43.5 );
	scene.add(bowlingBallCam);
	
	//Create and place the chandelier
	chand = createChandelier(sceneParams.chandelierHeight, 
					sceneParams.chandelierNumBranches,
					sceneParams.chandelierIsLipped,
					sceneParams.chandelierGlassColor,
					sceneParams.chandelierMetalColor,
					sceneParams.chandelierMetalShininess);
	chand.position.set(0,sceneParams.roomH, 0);
	scene.add(chand);	 
  
    //Create and place blocks
    var block1 = createBlock(sceneParams.blockColor, sceneParams.blockSpecular,
     						 sceneParams.blockShininess, sceneParams.blockSize,
     						 sceneParams.blockTexture );  
    block1.position.set(-30, sceneParams.tableHeight, -90);  
    block1.rotateY(Math.PI/2); 						 
    scene.add(block1);
    
    var block2 = block1.clone();
    block2.position.x += 8;
    scene.add(block2);
    
    var block3 = block2.clone();
    block3.position.x += 8;
    scene.add(block3);
    
    var block4 = block3.clone();
    block4.position.x += 8;
    scene.add(block4);
    
    var block5 = block4.clone();
    block5.position.x += 7;
    block5.position.z += 2;
    block5.rotateY(-Math.PI/6); 
    scene.add(block5);
    
    var block6 = block5.clone();
    block6.position.x += 6;
    block6.position.z += 3;
    block6.rotateY(-Math.PI/6); 
    scene.add(block6);
    
    var block7 = block6.clone();
    block7.position.x = 10;
    block7.position.z += 4;
    block7.rotateY(-Math.PI/6); 
    scene.add(block7);
    
    var block8 = block7.clone();
    block8.position.z += 7;
    scene.add(block8);
    
    var block9 = block8.clone();
    block9.position.z += 7;
    scene.add(block9);
    
    var block10 = block9.clone();
    block10.position.z += 7;
    scene.add(block10);

    // create little slide using Slide function
    // (height, length, width, inputColor, inputShininess, isLipped)
    var slide = createSlide (sceneParams.slideHeight,
                    sceneParams.slideLength,
                    sceneParams.slideWidth,
                    sceneParams.slideColor,
                    sceneParams.slideShininess,
                    sceneParams.slideLip);
    slide.position.set(-80, sceneParams.tableHeight, -90);
    slide.rotateY(Math.PI/2);
    scene.add(slide);
    
    // create ramp using Slide function
    // (height, length, width, inputColor, inputShininess, isLipped)
    var ramp = createSlide (sceneParams.rampHeight,
                    sceneParams.rampLength,
                    sceneParams.rampWidth,
                    sceneParams.rampColor,
                    sceneParams.rampShininess,
                    sceneParams.rampLip);
    ramp.position.set(10, 0, -43.5);
    scene.add(ramp);
    
    // Add small ornaments to shelves, referencing other CS307 projects.
    // Sarah Bailin's penguin
    var toyPenguin = sbailinPenguin(false, false, 10, 0x444444); 
    toyPenguin.position.set(130, 100, -130);
    //toyPenguin.scale.set(0.8,0.8,0.8);
    scene.add(toyPenguin);
    
    // Laura Shih's (?) rocket
    var toyRocket = createRocket(sceneParams.toyRocketBodyColor,
    							sceneParams.toyRocketNoseColor, 
    							sceneParams.toyRocketFinColor, 
    							sceneParams.toyRocketThrusterColor, 
    							sceneParams.toyRocketCabinColor);
    toyRocket.scale.set(.5, .5, .5);
    toyRocket.rotateX(Math.PI/2.25);
    toyRocket.position.set(130, 150, -130);
    scene.add(toyRocket);
    
    // Rebecca Scanlon and Cecille Yang's apple, from apple tree
    var toyApple = makeFullApple(sceneParams.appleHeight);
    toyApple.position.set(115, 112.5, -140);
    scene.add(toyApple);
    
    // Rebecca Scanlon and Cecille Yang's apple, from apple tree
    var toyApple = makeFullApple(sceneParams.appleHeight);
    //toyApple.fruit.mat1.side = THREE.DoubleSide;
    toyApple.position.set(110, 112.5, -140);
    scene.add(toyApple);
    
    // Note:  objects that don't hold up and cannot be included without significant effort:  
    // Emily's Christmas tree, Emily Q's koi, Mary Beth Kery's house,
    
    
    //Create and place window
	var window = createWindow(sceneParams.windowWidth, sceneParams.windowframeColor, sceneParams.windowVideo);
	window.name="window";
	window.position.set(-(w2 * 1.5), w2, -(w2/3));
	window.rotateY(Math.PI/2); //rotate to be in the wall's plane
	scene.add(window);
	
	
    TW.render();
  }