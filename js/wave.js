//define a pool to resture the object
var waveObj = function(){
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
}

waveObj.prototype.num = 10;
waveObj.prototype.init = function(){
	console.log("init");
	for(var i = 0; i < this.num; i++){
		this.alive[i] = false;
		this.r[i] = 0;
	}
} 

waveObj.prototype.draw = function(){
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 8;
	ctx1.shadowColor = "white";
	for(var i = 0; i < this.num; i++){
		if(this.alive[i]){
			this.r[i] += deltaTime * 0.036;
			   // console.log(this.r[i]);
			if(this.r[i] > 54){
				this.alive[i] = false;
				break;
			}
			var alpha = 1 - this.r[i] / 54
			//canvas api
			ctx1.beginPath();
			ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI * 2);
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(255, 255, 255,"+ alpha +")";
			ctx1.stroke();
			
			//draw
		}
	}
	ctx1.restore();
}

waveObj.prototype.born = function(x, y){
	for(var i = 0; i < this.num; i++){
		if(!this.alive[i]){
			this.alive[i] = true;
			this.r[i] = 20;
			this.x[i] = x;
			this.y[i] = y;
			//born
			return;
		}
	}
}