var momObj = function(){
	this.x;
	this.y;
	this.angle;
	this.bigEye = new Image();
	this.bigBody = new Image();
	this.bigTail = new Image();

	this.bigEyeTimer = 0;
	this.bigEyeCount = 0;
	this.bigEyeInterval = 1000;

	this.bigTailTimer = 0;
	this.bigTailCount = 0;

	this.bigBodyTimer = 0;
	this.bigBodyCount = 0;
}

momObj.prototype.init = function(){
	this.x = canWidth * 0.5;
	this.y = canHeight * 0.5;
	this.angle = 0;
	this.bigEye.src = "./img/bigEye0.png";
	this.bigBody.src = "./img/bigSwim0.png";
	this.bigTail.src = "./img/bigTail0.png";

}

momObj.prototype.draw = function(){
	//lerp x,y move mom to come to the mouse
	//if the mouseX and mouseY are not initiated, they will go as NaN
	//if(mouseX != undefined && mouseY != undefined){
		this.x = lerpDistance(mouseX, this.x, 0.95);
		this.y = lerpDistance(mouseY, this.y, 0.95);
	//}
	var deltaX = mouseX - this.x;
	var deltaY = mouseY - this.y;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI; //-pai,pai;get the angle whose tan is deltaY/deltaX；
	//lerp angle

	//momtail
	this.bigTailTimer += deltaTime;
	if(this.bigTailTimer > 50){
		this.bigTailCount = (this.bigTailCount + 1) % 8;
		this.bigTailTimer %= 50; //smoothly set to zero
	}

	//momeye
	this.bigEyeTimer += deltaTime;
	if(this.bigEyeTimer > this.bigEyeInterval){
		this.bigEyeCount = (this.bigEyeCount + 1) % 2;
		this.bigEyeTimer %= 300;
		if(this.bigEyeCount == 0){
			this.bigEyeInterval = Math.random() * 1500 +2000;
		}
		else{
			this.bigEyeInterval = 200;
		}
	}
	this.angle = lerpAngle(beta, this.angle, 0.8)

	ctx1.save(); //this function with restore() make function below only affect mom
	ctx1.translate(this.x, this.y); // set a position so the below setting can leave out the this.x and this.y
	ctx1.rotate(this.angle);
	var bigEyeCount =this.bigEyeCount;
	ctx1.drawImage(momEye[bigEyeCount], - this.bigEye.width * 0.5, - this.bigEye.height * 0.5);
	var bigBodyCount = this.bigBodyCount;
	if(data.double == 1){
		ctx1.drawImage(momBodyOra[bigBodyCount], - this.bigBody.width * 0.5, - this.bigBody.height * 0.5);
	}
	else{
		ctx1.drawImage(momBodyBlue[bigBodyCount], - this.bigBody.width * 0.5, - this.bigBody.height * 0.5);
	}
	
	var bigTailCount = this.bigTailCount
	ctx1.drawImage(momTail[bigTailCount], - this.bigTail.width * 0.5 + 26, - this.bigTail.height * 0.5);
	
	ctx1.restore();
}