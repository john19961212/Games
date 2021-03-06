var game={
	data:[[],[],[],[]],
	highestScore:0,
	currScore:0,
	maxTileValue:2,
	start:function(){
		this.init();
	},
	hitScore:function(score){
		this.currScore+=score;
		$("#score").html(this.currScore);
		if(this.currScore>this.highestScore){
			$("#highestScore").html(this.currScore);
			this.highestScore=this.currScore;
		}
	},
	init:function(){
		var thisObj=this,clickNumber=0;
		$("#start").click(function(){
		    if(this.value=="开始游戏"){
				$("#start").val("暂停游戏");
				thisObj.addKeyMapping();
				thisObj.addMouseMapping();
				if(clickNumber==0){
				    thisObj.produceNewTile(2,1,0);
				   thisObj.produceNewTile(2,1,1);
				   clickNumber++;
				}
			}else{
			   $("#start").val("开始游戏");
			   thisObj.removeKeyMapping();
			   thisObj.removeMouseMapping();
			}
		});
		$("#newGame").click(function(){
			if($("#start").val()=="暂停游戏")
		    thisObj.restart();
		});
	},
	restart:function(){
		for(var i=0;i<4;i++){
		   for(var j=0;j<4;j++){
		      if(this.data[i][j]){
			  $(this.data[i][j].dom).remove();
			  }
		   }
		}
		this.addKeyMapping();
		this.addMouseMapping();
		this.data=[[],[],[],[]];
	    this.currScore=0;
		$("#score").html(0);
		this.produceNewTile(2);
	},
	addKeyMapping:function(){
		thisObj=this;
		document.onkeydown=function(e){
		   var currKey=0,e=e||event; 
　　 　      currKey=e.keyCode||e.which||e.charCode; 
　　 　　     var keyName = String.fromCharCode(currKey); 
           switch(currKey){
		     case 37:
			 thisObj.left();
			 break;
			 case 38:
			 thisObj.up();
			 break;
			 case 39:
			 thisObj.right();
			 break;
			 case 40:
			 thisObj.down();
			 break;
		   }
		}
	},
	removeKeyMapping:function(){
		document.onkeydown=undefined;
	},
	addMouseMapping:function(){
		
	},
	removeMouseMapping:function(){
		
	},
	/*
	  参数为3个时，可在特定下x，y位置生成特定tileValue的瓷片
	  参数为1个tileValue时，生成2个随机空白位置的特定的tileValue的瓷片
	  没参数时，在空白位置随机生成tileValue为2或4的一个瓷片
	*/
	produceNewTile:function(tileValue,x,y){
		var tile,color=["#7AD0B5","#328BC3","#D37272","#B5E61D","#73CBE3","#CCC772","#83C195","#90A7B1"],
		colorChoose=0;
		if(typeof tileValue!="undefined")
		while(Math.pow(2,colorChoose+1)!=tileValue){
		   colorChoose++;
		}
		colorChoose=colorChoose%color.length;
		if(typeof x!=="undefined"){
			tile=document.createElement("div");
			tile.className="tile";
			tile.style.marginLeft=(x*70+(x+1)*5)+"px";
			tile.style.marginTop=(y*70+(y+1)*5)+"px";
			tile.style.backgroundColor=color[colorChoose];
			if(tileValue>100&&tileValue<1000)
			tile.style.fontSize="36px";
			else if(tileValue>1000&&tileValue<10000)
			tile.style.fontSize="30px";
			else if(tileValue>10000)
			tile.style.fontSize="24px";
			tile.innerHTML=tileValue;
			this.data[x][y]={value:tileValue,dom:tile};
			$("#gameBody").append(tile);
			$(tile).animate({opacity:1},100);
			if(tileValue==2048)
			alert("Bravo!");
			if(tileValue>this.maxTileValue)
			this.maxTileValue=tileValue;
			return;
		}
		var avaliable=[],cursor,xy;
		for(var j=0;j<4;j++){
			  for(var k=0;k<4;k++){
				 if(!this.data[j][k]){
					 avaliable.push(j+"-"+k);
				 }
			  }
		}
		cursor=Math.round(Math.random()*20)%avaliable.length;
		if(typeof tileValue!="undefined"){
			var last="";
		   for(var i=0;i<2;i++){
		    tile=document.createElement("div");
			tile.className="tile";
			while(avaliable[cursor]==last){
			   cursor=Math.round(Math.random()*20)%avaliable.length;
			}
			last=avaliable[cursor];
			xy=last.split("-");
			x=parseInt(xy[0]);
			y=parseInt(xy[1]);
			tile.style.marginLeft=(x*70+(x+1)*5)+"px";
			tile.style.marginTop=(y*70+(y+1)*5)+"px";
			tile.style.backgroundColor=color[colorChoose];
			tile.innerHTML=tileValue;
			$("#gameBody").append(tile);
			$(tile).animate({opacity:1},100);
			this.data[x][y]={value:tileValue,dom:tile};
		   }
		   return;
		}
		var twoOrFour=[2],str;
		if(this.maxTileValue>=128){
			twoOrFour=[2,2,2,2,2,4];
			tileValue=twoOrFour[Math.round(Math.random()*10)%twoOrFour.length];
		}else
		   tileValue=twoOrFour[0];
		
		tile=document.createElement("div");
		tile.className="tile";
		str=avaliable[cursor];
		xy=str.split("-");
		x=parseInt(xy[0]);
		y=parseInt(xy[1]);
		tile.style.marginLeft=(x*70+(x+1)*5)+"px";
		tile.style.marginTop=(y*70+(y+1)*5)+"px";
		tile.innerHTML=tileValue;
		tile.style.backgroundColor=color[tileValue==2?0:1];
		$("#gameBody").append(tile);
		$(tile).animate({opacity:1},100);
		this.data[x][y]={value:tileValue,dom:tile};
	},
	up:function(){
		var k=0,str,number,enterNumber,allowNumber,posSwitch=false,ifProduce=false;
		for(var i=0;i<4;i++){
			number=0;
			allowNumber=1;
			for(var j=0;j<4;j++){
				if(this.data[i][j]){
				  number++;
				}
			}
			if(number==4){
				if(this.data[i][0].value==this.data[i][1].value&&this.data[i][1].value==this.data[i][2].value&&this.data[i][2].value==this.data[i][3].value			                 ){
					allowNumber=2;
				}else if(this.data[i][0].value==this.data[i][1].value&&this.data[i][2].value==this.data[i][3].value&&this.data[i][1].value!=this.data[i][2].          value){
					allowNumber=3;
					if(this.data[i][0].value*2==this.data[i][2].value){
						posSwitch=true;
					}
				}
				
			}
			enterNumber=0;
		   for(var j=1;j<4;j++){
		      if(this.data[i][j]){
				 k=j;
			     while(k-1>=0&&!this.data[i][k-1]){
					k--;
				 }
				 if(k>0){
				       if(this.data[i][k-1].value==this.data[i][j].value){
						   if(enterNumber<allowNumber){
							   if(posSwitch&&j==2){
								  this.data[i][k]=this.data[i][j];
								  str=(k*70+(k+1)*5)+"px";
								  $(this.data[i][j].dom).animate({marginTop:str},100);
								  this.data[i][j]=undefined;
							   }else{
								   if(posSwitch&&j==3){
							       str=(1*70+1*5)+"px";
								   $(this.data[i][j].dom).animate({marginTop:str},100);
								   $(this.data[i][1].dom).remove();
								   $(this.data[i][j].dom).remove();
								   this.hitScore(this.data[i][1].value*2);
								   this.produceNewTile(this.data[i][1].value*2,i,1);
								   this.data[i][j]=undefined;
							      }else{
								   str=((k-1)*70+k*5)+"px";
								   $(this.data[i][j].dom).animate({marginTop:str},100);
								   $(this.data[i][k-1].dom).remove();
								   $(this.data[i][j].dom).remove();
								   this.hitScore(this.data[i][k-1].value*2);
								   this.produceNewTile(this.data[i][k-1].value*2,i,k-1);
								   this.data[i][j]=undefined;
								  }
							   }
							   enterNumber++;
						   }else{
						       if(number==3&&enterNumber==1){
							      this.data[i][k]=this.data[i][j];
								  str=(k*70+(k+1)*5)+"px";
								  $(this.data[i][j].dom).animate({marginTop:str},100);
								  this.data[i][j]=undefined;
							   }
							   if(number==4&&allowNumber==1){
							      this.data[i][k]=this.data[i][j];
								  str=(k*70+(k+1)*5)+"px";
								  $(this.data[i][j].dom).animate({marginTop:str},100);
								  this.data[i][j]=undefined;
							   }
						   }
						   ifProduce=true;
					   }else{
						   if(k<j){
						      this.data[i][k]=this.data[i][j];
							  str=(k*70+(k+1)*5)+"px";
							  $(this.data[i][j].dom).animate({marginTop:str},100);
							  this.data[i][j]=undefined;
							  ifProduce=true;  
						   }
					   }
				 }else{
				          this.data[i][k]=this.data[i][j];
					      str=(k*70+(k+1)*5)+"px";
						  $(this.data[i][j].dom).animate({marginTop:str},100);
						  this.data[i][j]=undefined;
						  ifProduce=true; 
				 }
			  }
		   }
		}
		this.checkIsLose();
		this.checkIfProduceNewTile(ifProduce);
	},
	down:function(){
		var k=0,str,number,enterNumber,allowNumber,posSwitch=false,ifProduce=false;
		for(var i=0;i<4;i++){
			number=0;
			allowNumber=1;
			for(var j=3;j>=0;j--){
				if(this.data[i][j]){
				  number++;
				}
			}
			if(number==4){
				if(this.data[i][0].value==this.data[i][1].value&&this.data[i][1].value==this.data[i][2].value&&this.data[i][2].value==this.data[i][3].value			                 ){
					allowNumber=2;
				}else if(this.data[i][0].value==this.data[i][1].value&&this.data[i][2].value==this.data[i][3].value&&this.data[i][1].value!=this.data[i][2].          value){
					allowNumber=3;
					if(this.data[i][0].value==this.data[i][2].value*2){
						posSwitch=true;
					}
				}
			}
			enterNumber=0;
		   for(var j=2;j>=0;j--){
		      if(this.data[i][j]){
				 k=j;
			     while(k+1<=3&&!this.data[i][k+1]){
					k++;
				 }
				 if(k<3){
				       if(this.data[i][k+1].value==this.data[i][j].value){
						   if(enterNumber<allowNumber){
							   if(posSwitch&&j==1){
								  this.data[i][k]=this.data[i][j];
								  str=(k*70+(k+1)*5)+"px";
								  $(this.data[i][j].dom).animate({marginTop:str},100);
								  this.data[i][j]=undefined;
							   }else{
								   if(posSwitch&&j==0){
							       str=(2*70+2*5)+"px";
								   $(this.data[i][j].dom).animate({marginTop:str},100);
								   $(this.data[i][2].dom).remove();
								   $(this.data[i][j].dom).remove();
								   this.hitScore(this.data[i][2].value*2);
								   this.produceNewTile(this.data[i][2].value*2,i,2);
								   this.data[i][j]=undefined;
							      }else{
									   str=((k+1)*70+(k+2)*5)+"px";
									   $(this.data[i][j].dom).animate({marginTop:str},100);
									   $(this.data[i][k+1].dom).remove();
									   $(this.data[i][j].dom).remove();
									   this.hitScore(this.data[i][k+1].value*2);
									   this.produceNewTile(this.data[i][k+1].value*2,i,k+1);
									   this.data[i][j]=undefined;
								  }
							   }
							   enterNumber++;
						   }else{
						       if(number==3&&enterNumber==1){
							      this.data[i][k]=this.data[i][j];
								  str=(k*70+(k+1)*5)+"px";
								  $(this.data[i][j].dom).animate({marginTop:str},100);
								  this.data[i][j]=undefined;
							   }
							   if(number==4&&allowNumber==1){
							      this.data[i][k]=this.data[i][j];
								  str=(k*70+(k+1)*5)+"px";
								  $(this.data[i][j].dom).animate({marginTop:str},100);
								  this.data[i][j]=undefined;
							   }
						   }
						   ifProduce=true;
					   }else{
						   if(k>j){
						      this.data[i][k]=this.data[i][j];
							  str=(k*70+(k+1)*5)+"px";
							  $(this.data[i][j].dom).animate({marginTop:str},100);
							  this.data[i][j]=undefined;
							  ifProduce=true;  
						   }
					   }
				 }else{
				         this.data[i][k]=this.data[i][j];
						 str=(k*70+(k+1)*5)+"px";
						 $(this.data[i][j].dom).animate({marginTop:str},100);
						 this.data[i][j]=undefined;
						 ifProduce=true;  
				 }
			  }
		   }
		}
		this.checkIsLose();
		this.checkIfProduceNewTile(ifProduce);
	},
	left:function(){
		var k=0,str,number,enterNumber,allowNumber,posSwitch=false,ifProduce=false;
		for(var i=0;i<4;i++){
			number=0;
			allowNumber=1;
			for(var j=0;j<4;j++){
				if(this.data[j][i]){
				  number++;
				}
			}
			if(number==4){
				if(this.data[0][i].value==this.data[1][i].value&&this.data[1][i].value==this.data[2][i].value&&this.data[2][i].value==this.data[3][i].value		                 ){
					allowNumber=2;
				}else if(this.data[0][i].value==this.data[1][i].value&&this.data[2][i].value==this.data[3][i].value&&this.data[1][i].value!=this.data[2][i].          value){
					allowNumber=3;
					if(this.data[0][i].value*2==this.data[2][i].value){
						posSwitch=true;
					}
				}
			}
			enterNumber=0;
		   for(var j=1;j<4;j++){
		      if(this.data[j][i]){
				 k=j;
			     while(k-1>=0&&!this.data[k-1][i]){
					k--;
				 }
				 if(k>0){
				       if(this.data[k-1][i].value==this.data[j][i].value){
						   if(enterNumber<allowNumber){
							   if(posSwitch&&j==2){
								  this.data[k][i]=this.data[j][i];
								  str=(k*70+(k+1)*5)+"px";
								  $(this.data[j][i].dom).animate({marginLeft:str},100);
								  this.data[j][i]=undefined;
							   }else{
								   if(posSwitch&&j==3){
							       str=(1*70+1*5)+"px";
								   $(this.data[j][i].dom).animate({marginLeft:str},100);
								   $(this.data[1][i].dom).remove();
								   $(this.data[j][i].dom).remove();
								   this.hitScore(this.data[1][i].value*2);
								   this.produceNewTile(this.data[1][i].value*2,1,i);
								   this.data[j][i]=undefined;
							      }else{
									   str=((k-1)*70+k*5)+"px";
									   $(this.data[j][i].dom).animate({marginLeft:str},100);
									   $(this.data[k-1][i].dom).remove();
									   $(this.data[j][i].dom).remove();
									   this.hitScore(this.data[k-1][i].value*2);
									   this.produceNewTile(this.data[k-1][i].value*2,k-1,i);
									   this.data[j][i]=undefined;
								  }
							   }
							   enterNumber++;
						   }else{
						       if(number==3&&enterNumber==1){
							      this.data[k][i]=this.data[j][i];
								  str=(k*70+(k+1)*5)+"px";
								  $(this.data[j][i].dom).animate({marginLeft:str},100);
								  this.data[j][i]=undefined;
							   }
							   if(number==4&&allowNumber==1){
							      this.data[k][i]=this.data[j][i];
								  str=(k*70+(k+1)*5)+"px";
								  $(this.data[j][i].dom).animate({marginLeft:str},100);
								  this.data[j][i]=undefined;
							   }
						   }
						   ifProduce=true;
					   }else{
						   if(k<j){
						      this.data[k][i]=this.data[j][i];
							  str=(k*70+(k+1)*5)+"px";
							  $(this.data[j][i].dom).animate({marginLeft:str},100);
						      this.data[j][i]=undefined;
							  ifProduce=true;   
						   }
					   }
				 }else{
				         this.data[k][i]=this.data[j][i];
						 str=(k*70+(k+1)*5)+"px";
						 $(this.data[j][i].dom).animate({marginLeft:str},100);
						 this.data[j][i]=undefined;
						 ifProduce=true;  
				 }
			  }
		   }
		}
		this.checkIsLose();
		this.checkIfProduceNewTile(ifProduce);
	},
	right:function(){
		var k=0,str,number,enterNumber,allowNumber,posSwitch=false,ifProduce=false;
		for(var i=0;i<4;i++){
			number=0;
			allowNumber=1;
			for(var j=3;j>=0;j--){
				if(this.data[j][i]){
				  number++;
				}
			}
			if(number==4){
				if(this.data[0][i].value==this.data[1][i].value&&this.data[1][i].value==this.data[2][i].value&&this.data[2][i].value==this.data[3][i].value		                 ){
					allowNumber=2;
				}else if(this.data[0][i].value==this.data[1][i].value&&this.data[2][i].value==this.data[3][i].value&&this.data[1][i].value!=this.data[2][i].          value){
					allowNumber=3;
					if(this.data[0][i].value==this.data[2][i].value*2){
						posSwitch=true;
					}
				}
			}
			enterNumber=0;
		   for(var j=2;j>=0;j--){
		      if(this.data[j][i]){
				 k=j;
			     while(k+1<=3&&!this.data[k+1][i]){
					k++;
				 }
				 if(k<3){
				       if(this.data[k+1][i].value==this.data[j][i].value){
						   if(enterNumber<allowNumber){
							   if(posSwitch&&j==1){
								  this.data[k][i]=this.data[j][i];
								  str=(k*70+(k+1)*5)+"px";
								  $(this.data[j][i].dom).animate({marginLeft:str},100);
								  this.data[j][i]=undefined;
							   }else{
								   if(posSwitch&&j==0){
							       str=(2*70+(2+1)*5)+"px";
								   $(this.data[j][i].dom).animate({marginLeft:str},100);
								   $(this.data[2][i].dom).remove();
								   $(this.data[j][i].dom).remove();
								   this.hitScore(this.data[2][i].value*2);
								   this.produceNewTile(this.data[2][i].value*2,2,i);
								   this.data[j][i]=undefined;
							      }else{
									   str=((k+1)*70+k*5)+"px";
									   $(this.data[j][i].dom).animate({marginLeft:str},100);
									   $(this.data[k+1][i].dom).remove();
									   $(this.data[j][i].dom).remove();
									   this.hitScore(this.data[k+1][i].value*2);
									   this.produceNewTile(this.data[k+1][i].value*2,k+1,i);
									   this.data[j][i]=undefined;
								  }
							   }
							   enterNumber++;
						   }else{
						       if(number==3&&enterNumber==1){
							      this.data[k][i]=this.data[j][i];
								  str=(k*70+(k+1)*5)+"px";
								  $(this.data[j][i].dom).animate({marginLeft:str},100);
								  this.data[j][i]=undefined;
							   }
							   if(number==4&&allowNumber==1){
							      this.data[k][i]=this.data[j][i];
								  str=(k*70+(k+1)*5)+"px";
								  $(this.data[j][i].dom).animate({marginLeft:str},100);
								  this.data[j][i]=undefined;
							   }
						   }
						   ifProduce=true;
					   }else{
						   if(k>j){
						      this.data[k][i]=this.data[j][i];
							  str=(k*70+(k+1)*5)+"px";
							  $(this.data[j][i].dom).animate({marginLeft:str},100);
						      this.data[j][i]=undefined;
							  ifProduce=true;
						   }
					   }
				 }else{
				         this.data[k][i]=this.data[j][i];
						 str=(k*70+(k+1)*5)+"px";
						 $(this.data[j][i].dom).animate({marginLeft:str},100);
						 this.data[j][i]=undefined;
						 ifProduce=true; 
				 }
			  }
		   }
		}
		this.checkIsLose();
		this.checkIfProduceNewTile(ifProduce);
	},
	checkIfProduceNewTile:function(yes){
		if(yes)
		this.produceNewTile();
	},
	checkIsLose:function(){
		var number=0,isLose=true;
	    for(var i=0;i<4;i++){
		   for(var j=0;j<4;j++){
			   if(this.data[i][j])
			   number++;
		   }
		}
		if(number==16){
			for(var i=0;i<4;i++){
			   if(this.data[i][0].value==this.data[i][1].value||this.data[i][1].value==this.data[i][2].value||this.data[i][2].value==this.data[i][3].value){
				   isLose=false;
			   }
			}
			for(var i=0;i<4;i++){
			   if(this.data[0][i].value==this.data[1][i].value||this.data[1][i].value==this.data[2][i].value||this.data[2][i].value==this.data[3][i].value){
				   isLose=false;
			   }
			}
			
		}else{
		   isLose=false;
		}
		if(isLose)
		this.gameOver();
	},
	gameOver:function(){
		alert("GameOver!");
		this.removeKeyMapping();
		this.removeMouseMapping();
	}
};
game.start();