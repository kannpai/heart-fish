function momFruitsCollision(){
	//if(data.gameOver) return;
	if(!data.gameOver)
	{
		for(var i = 0; i < fruit.num; i++){
			if(fruit.alive[i]){
				var l = calLength2(mom.x, mom.y, fruit.x[i], fruit.y[i]);
				if(l < 900){// whick means the sqr(l)=30
					fruit.dead(i);//fruit dead
					data.fruitNum++;
					mom.bigBodyCount++;
					wave.born(fruit.x[i], fruit.y[i]);
					if(mom.bigBodyCount > 7){
						mom.bigBodyCount = 7;
					}
					if(fruit.fruitType[i] == "blue"){
						data.double = 2;
					}//blue
				}
			}
		}
	}
}

function momFeedBaby(){
	var l = calLength2(mom.x, mom.y, baby.x, baby.y);
	if(l < 900 && !data.gameOver){
		//if the mom has fruit
		//baby recover
		if(data.fruitNum > 0){
			baby.babyBodyCount = 0;
			mom.bigBodyCount = 0;
		//set data to 0
			data.addScore();
			data.reset();
		//halo
			halo.born(baby.x, baby.y);
		}	
	}
}