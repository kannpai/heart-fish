var babyObj = function(){
	this.x;
	this.y;
	this.angle;

	this.babyTailTimer;
	this.babyTailCount;

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;

	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;

	this.babyEye = new Image();
	this.babyBody = new Image();
	this.babyTail = new Image();
}

babyObj.prototype.init = function(){
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
	this.babyTailCount = 0;
	this.babyTailTimer = 0;
	this.babyEye.src = "./img/babyEye0.png";
	this.babyBody.src = "./img/babyFade0.png";
	this.babyTail.src = "./img/babyTail0.png";

}

babyObj.prototype.draw = function(){
	//lerp x,y move baby to come to the mouse
	//if the mom.x and mom.y are not initiated, they will go as NaN
	//if(mom.x != undefined && mom.y != undefined){
		this.x = lerpDistance(mom.x, this.x, 0.995);
		this.y = lerpDistance(mom.y, this.y, 0.995);
	//}
	var deltaX = mom.x - this.x;
	var deltaY = mom.y - this.y;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI; //-pai,pai;get the angle whose tan is deltaY/deltaX；
	//lerp angle

	this.angle = lerpAngle(beta, this.angle, 0.8)
	// timer
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50){
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer = this.babyTailTimer % 50;
	}

	//baby eye
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval){
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeTimer;

		if(this.babyEyeCount == 0){
			// now its eye is close
			this.babyEyeInterval = Math.random() * 1500 + 2000;
		}
		else{
			this.babyEyeInterval = 200;
		}
	}

	//babybody
	this.babyBodyTimer += deltaTime;
	if(this.babyBodyTimer > 300){
		this.babyBodyCount = this.babyBodyCount + 1;
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount > 19){
			this.babyBodyCount = 19;
			//gameover
			data.gameOver = true;
		}
	}

	ctx1.save(); //this function with restore() make sure the functions below only affect baby
	ctx1.translate(this.x, this.y); // set a position so the below setting can leave out the this.x and this.y
	ctx1.rotate(this.angle);
	var babyTailCount = this.babyTailCount;
	ctx1.drawImage(babyTail[babyTailCount], - this.babyTail.width * 0.5 + 20, - this.babyTail.height * 0.5);
	var babyBodyCount = this.babyBodyCount;
	ctx1.drawImage(babyBody[babyBodyCount], - this.babyBody.width * 0.5, - this.babyBody.height * 0.5);
	var babyEyeCount = this.babyEyeCount;
	ctx1.drawImage(babyEye[babyEyeCount], - this.babyEye.width * 0.5, - this.babyEye.height * 0.5);	
	ctx1.restore();
}