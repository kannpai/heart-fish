var fruitObj = function(){
	this.alive = [];
	this.x = [];
	this.y = [];
	this.l = [];
	this.v = [];
	this.aneId = [];
	this.fruitType = [];
	this.orange = new Image();
	this.blue = new Image();
}

fruitObj.prototype.num = 30;

fruitObj.prototype.init = function(){
	for(var i = 0; i < this.num; i++){
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.l[i] = 0;
		this.v[i] = Math.random() * 0.007 +0.005
		this.fruitType[i] = "";
		//this.born(i);

	}
	this.orange.src = "./img/fruit.png";
	this.blue.src = "./img/blue.png";
	
}

fruitObj.prototype.draw = function(){
	for(var i = 0; i < this.num; i++){
		//draw
		//find an ane, grow, fly up
		if(this.alive[i]){
			if(this.l[i] <= 15){
				deltaTime = deltaTime < 40 ? deltaTime : 40;
				this.l[i] += this.v[i] * deltaTime;
				this.x[i] = ane.headx[this.aneId[i]];
				this.y[i] = canHeight - ane.heady[this.aneId[i]];
			}
			else{
				this.y[i] -= deltaTime * this.v[i] * 10
			}
			ctx2.drawImage(this[this.fruitType[i]], this.x[i] - this.l[i], this.y[i] - this.l[i], this.l[i], this.l[i]);
		}
		
		//minus the width * 0.5 (same to height) to match the fruit with ane
	}
	

}

fruitObj.prototype.born = function(i){
	this.aneId[i] = Math.floor(Math.random() * ane.num);
    this.x[i] = ane.headx[this.aneId[i]];
    this.y[i] = canHeight - ane.heady[this.aneId[i]];
    this.l[i] = 0;
    this.alive[i] = true;
    this.fruitType[i] = Math.random() < 0.05 ? "blue" : "orange";
}

fruitObj.prototype.update = function(){
	var num = 0;
	for(var i = 0;i < this.num; i++){
		if(this.alive[i]){
			num++;
		}
	}
}

function fruitMonitor(){
	var num = 0;
	for(var i = 0; i < fruit.num; i++){
		if(fruit.alive[i]){
			num++;
		}
		if(fruit.y[i] < 0){
			fruit.alive[i] = false;

		}
	}
	if(num < 15){
		sendFruit();
return;
	}
	
}

function sendFruit(){
	for(var i = 0; i < fruit.num; i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}

fruitObj.prototype.dead = function(i){
	fruit.alive[i] = false;
}