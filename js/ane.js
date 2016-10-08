var aneObj = function(){
    this.rootx = [];
    this.headx = [];
    this.heady = [];
    this.amp = [];
    this.gamma = 0;
}

aneObj.prototype.num = 50;
aneObj.prototype.init = function(){
	for(var i = 0; i < this.num; i++){
		this.rootx[i] = i * 17 + Math.random() * 20;
        this.headx[i] = this.rootx[i];
		this.heady[i] = 180 + Math.random() * 50;
        this.amp[i] = Math.random() * 36 + 36;
	}

	console.log("a");
}

aneObj.prototype.draw = function(){
    
    this.gamma += deltaTime * 0.0008;
    var l = Math.sin(this.gamma);
    ctx2.save();
    ctx2.globalAlpha = 0.6;
    ctx2.lineWidth = 20;
    ctx2.lineCap = "round";
    ctx2.strokeStyle = "#3b154e";
    for(var i = 0; i < this.num; i++){
    	//beginPath, moveTo, lineTo, stroke, strokeStyle, lineWidth, lineCap, glob
    	ctx2.beginPath();
    	ctx2.moveTo(this.rootx[i], canHeight);
        this.headx[i] = this.rootx[i] + l * this.amp[i]
    	ctx2.quadraticCurveTo(this.rootx[i], canHeight - 150, this.headx[i], canHeight - this.heady[i]);
    	ctx2.stroke();

    }
    ctx2.restore();
}