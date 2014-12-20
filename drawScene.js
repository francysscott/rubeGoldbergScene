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
	shelf1.name = "shelf1";
	shelf1.position.set(150, 140, -100);
	scene.add(shelf1);
	
	var shelf2 = shelf1.clone();
	shelf2.rotateY(Math.PI/2);
	shelf2.position.set(100, 100, -150);
	shelf2.name = "shelf2";
	scene.add(shelf2);
		
	//Create and place teapot
	var teapot = createTeapot(sceneParams.teapotDiffuse, sceneParams.teapotAmbient, 
							  sceneParams.teapotSpecular, sceneParams.teapotShininess,
							  sceneParams.teapotSize, function(teapot) {
							  	teapot.position.set(130, 140, -80); //set on tabletop
    							teapot.rotateY(-Math.PI/3); 
    							teapot.name = "teapot";
    							scene.add(teapot); }
    							);		

    //Create small marble and its camera
    var marbleSet = createShinyBall(sceneParams.marbleColor, sceneParams.marbleSpecular,
    						 sceneParams.marbleShininess, sceneParams.marbleRadius );
	marble = marbleSet[0];
	marbleCam = marbleSet[1];
    
    //add the marble					 
    marble.position.set(sceneParams.marbleInitialX, sceneParams.tableHeight + sceneParams.marbleRadius, -70 );
    marble.name = "marble";
	scene.add(marble);	
	
	//add the camera that makes the marble reflective
	marbleCam.position.set(20, (sceneParams.tableHeight + sceneParams.marbleRadius), -70);
	marbleCam.name = "marbleCam";
	scene.add(marbleCam);
    
    //Create large shiny ball and its camera
    var ballSet = createShinyBall(sceneParams.shinyBallColor, sceneParams.shinyBallSpecular,
    						 sceneParams.shinyBallShininess, sceneParams.shinyBallRadius, '../images/scratches.jpg');
	shinyBall = ballSet[0];
	shinyBallCam = ballSet[1];
    
    //add the large marble		
    shinyBall.position.set(sceneParams.shinyBallInitialX, sceneParams.shinyBallRadius, sceneParams.shinyBallInitialZ);
    shinyBall.name = "shinyBall";
	scene.add(shinyBall);	
	
	//add the camera that makes the large ball reflective
	shinyBallCam.position.set(-40, sceneParams.shinyBallRadius, -43.5 );
	shinyBallCam.name = "shinyBallCam";
	scene.add(shinyBallCam);
	
	//Create and place the chandelier
	chand = createChandelier(sceneParams.chandelierHeight, 
					sceneParams.chandelierNumBranches,
					sceneParams.chandelierIsLipped,
					sceneParams.chandelierGlassColor,
					sceneParams.chandelierMetalColor,
					sceneParams.chandelierMetalShininess);
	chand.position.set(0,sceneParams.roomH, 0);
	chand.name = "chandelier";
	scene.add(chand);	 
  
    //Create and place blocks
    var blockSize = sceneParams.blockSize; //its own local variable because blockSize is used so often
    
    
    //Arrange blocks in a pyramid shape
    
    //bottom left block
    var block1 = createBlock(sceneParams.blockColor, sceneParams.blockSpecular,
     						 sceneParams.blockShininess, blockSize,
     						 sceneParams.blockTexture );  
    block1.position.set(-30, sceneParams.tableHeight, -90);  
    block1.rotateY(Math.PI/2); 						 
    scene.add(block1);
    
    //center bottom block
    var block2 = block1.clone();
    block2.position.x += (blockSize + 0.1 * blockSize);
    scene.add(block2);
    
    //right bottom block
    var block3 = block2.clone();
    block3.position.x += blockSize;
    scene.add(block3);
    
    //left bottom horizontal block
    var block4 = block3.clone();
    block4.position.x -= (blockSize - 0.05 * blockSize);
    block4.position.y += blockSize;
    block4.rotateX(-Math.PI/2);
    scene.add(block4);
    
    // right bottom horizontal block
    var block5 = block4.clone();
    block5.position.x += (blockSize + 0.1 * blockSize);
    scene.add(block5);
    
    //left middle vertical block
    var block6 = block1.clone();
    block6.position.x += (blockSize/2);
    block6.position.y += (blockSize + 0.25 * blockSize);
    scene.add(block6);
    
    //right middle vertical block
    var block7 = block6.clone();
    block7.position.x += blockSize;
    scene.add(block7);
    
    //top horizontal block
    var block8 = block4.clone();
    block8.position.x += (blockSize/2);
    block8.position.y += (blockSize + 0.25 * blockSize);
    scene.add(block8);
    
    //top vertical block
    var block9 = block2.clone();
    block9.position.y += (blockSize * 2 + 0.5 * blockSize);
    scene.add(block9);
    
    //on table
    var block10 = block3.clone();
    //place at an angle on the table in front of the other blocks
    block10.position.x -= (blockSize / 6);
    block10.position.z += (blockSize * 2);
    block10.rotateX(-Math.PI/2);
    block10.rotateZ(Math.PI/6);
    scene.add(block10);

    // create little slide using Slide function
    // (height, length, width, inputColor, inputShininess, isLipped)
    var slide = createSlide (sceneParams.slideHeight,
                    sceneParams.slideLength,
                    sceneParams.slideWidth,
                    sceneParams.slideColor,
                    sceneParams.slideShininess,
                    sceneParams.slideLip);
    slide.position.set(-80, sceneParams.tableHeight, -120);
    slide.rotateY(Math.PI/5);
    slide.name = "slide";
    scene.add(slide);
    
    // create ramp using Slide function
    // (height, length, width, inputColor, inputShininess, isLipped)
    var ramp = createSlide (sceneParams.rampHeight,
                    sceneParams.rampLength,
                    sceneParams.rampWidth,
                    sceneParams.rampColor,
                    sceneParams.rampShininess,
                    sceneParams.rampLip);
    ramp.position.set(100, 0, -50);
    ramp.rotateY(-Math.PI/4);
    ramp.name = "ramp";
    scene.add(ramp);
    
    // Add small ornaments to shelves, referencing other CS307 projects.
    // Sarah Bailin's penguin
    var toyPenguin = sbailinPenguin(false, false, 10, 0x444444); 
    toyPenguin.position.set(130, 100, -130);
    toyPenguin.name = "toyPenguin";
    scene.add(toyPenguin);
    
    // Laura Shih's (?) rocket
    var toyRocket = createRocket(sceneParams.toyRocketBodyColor,
    							sceneParams.toyRocketNoseColor, 
    							sceneParams.toyRocketFinColor, 
    							sceneParams.toyRocketThrusterColor, 
    							sceneParams.toyRocketCabinColor);
    toyRocket.scale.set(.33, .33, .33);
    toyRocket.rotateX(Math.PI/2.25);
    //toyRocket.position.set(130, 150, -130);
    toyRocket.name = "toyRocket";
    //scene.add(toyRocket);
    
    // Testing snowglobe with rocket
    //var toyRocket2 = toyRocket.clone();
    // 
    var snowglobe = createSnowglobe(toyRocket, 
    								sceneParams.snowglobeHeight, 
    								sceneParams.snowglobeGlassColor, 
    								sceneParams.snowglobeGlassOpacity, 
    								sceneParams.snowglobeBaseColor);
    snowglobe.name = "snowglobe";
    snowglobe.position.set(130, 140, -130);
    
    scene.add(snowglobe);
    
    // Rebecca Scanlon and Cecille Yang's apple, from apple tree
    var toyApple = makeFullApple(sceneParams.appleHeight);
    toyApple.position.set(115, 112.5, -140);
    toyApple.name = "toyApple";
    scene.add(toyApple);
    
    // Note:  objects that don't hold up and cannot be included without significant effort:  
    // Emily's Christmas tree, Emily Q's koi, Mary Beth Kery's house,
    
    
    //Create and place window
	var window = createWindow(sceneParams.windowWidth, sceneParams.windowframeColor, sceneParams.windowVideo);
	window.name="window";
	window.position.set(-(w2 * 1.5), w2, -(w2/3));
	window.rotateY(Math.PI/2); //rotate to be in the wall's plane
	scene.add(window);
	
	
	// Add the curtain.
	var curtain = createCurtain();
	curtain.name="curtain";
	scene.add(curtain);
	
	
    TW.render();
  }