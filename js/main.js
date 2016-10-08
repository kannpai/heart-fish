var con1;
var can2;

var canWidth;
var canHeight;

var ctx1;
var ctx2;

var lastTime;
var deltaTime;

var bgPic = new Image();

var ane;

var fruit;

var mom;
var baby;

var mouseX;
var mouseY;

var momEye = [];
var momBodyOra = [];
var momBodyBlue =[];
var momTail = [];

var babyTail = [];
var babyEye = [];
var babyBody = [];

var data;

var dust;
var dustPic = [];

var wave;
var halo;

document.body.onload = game;

function game(){
    init();
    console.log("onload");
    lastTime = Date.now();
    gameloop();
}

function init(){
    //get canvas context
    can1 = document.getElementById("canvas1");
    ctx1 = can1.getContext("2d");
    can2 = document.getElementById("canvas2");
    ctx2 = can2.getContext("2d");
    
    //monseMove
    can1.addEventListener("mousemove", onMouseMove, false)

    bgPic.src = "./img/background.jpg";
    canWidth = can1.width;
    canHeight = can1.height;

    data = new dataObj();

    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    for(var i = 0; i < 8; i++){
    	babyTail[i] =  new Image();
    	babyTail[i].src = "./img/babyTail" + i +".png";
    }
    for(var i = 0; i < 2 ; i++){
    	babyEye[i] = new Image();
    	babyEye[i].src = "./img/babyEye" + i + ".png";
    }
    for(var i = 0; i < 20; i++){
        babyBody[i] = new Image();
        babyBody[i].src = "./img/babyFade" + i +".png";
    }

    for(var i = 0; i < 8; i++){
        momTail[i] = new Image();
        momTail[i].src = "./img/bigTail" + i +".png"; 
    }
    for(var i = 0; i < 2; i++){
        momEye[i] = new Image();
        momEye[i].src = "./img/bigEye" + i + ".png";
    }
    for(var i = 0; i < 8; i++){
        momBodyBlue[i] = new Image();
        momBodyOra[i] = new Image();
        momBodyBlue[i].src = "./img/bigSwimBlue" + i + ".png"
        momBodyOra[i].src = "./img/bigSwim" + i + ".png"
    }

    wave = new waveObj();
    wave.init();

    halo = new haloObj();
    halo.init();

    for (var i = 0; i < 7; i++) {
        dustPic[i] = new Image();
        dustPic[i].src = "./img/dust" + i + ".png";
    }
    
    dust = new dustObj();
    dust.init();

    baby = new babyObj();
    baby.init();
    mouseX = canWidth * 0.5;
    mouseY = canHeight * 0.5;

    ctx1.font = "30px Verdana";
    ctx1.textAlign = "center";


    console.log("go on");
}

function gameloop(){
    //this is what drives the game to move
    window.requestAnimFrame(gameloop);
    // better than setInterval, setTimeout; auto; varible fps
    var now = Date.now();
    drawBackground();
    deltaTime = now - lastTime;
    lastTime = Date.now();

    ane.draw();
    fruitMonitor();
    momFruitsCollision()
    momFeedBaby();
    fruit.draw();
    //! png one over another to make it thick so:
    ctx1.clearRect(0, 0, canWidth, canHeight);
    wave.draw();
    halo.draw();
    dust.draw();
    mom.draw();
    baby.draw();
    data.draw();

}

function onMouseMove(e){
    if(!data.gameOver){
        if(e.offSetX || e.layerX){
            mouseX = e.offSetX == undefined ? e.layerX : e.offSetX;
            mouseY = e.offSetY == undefined ? e.layerY : e.offSetY;
    
        }
    }

}