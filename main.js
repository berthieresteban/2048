$(document).ready(function () {
	var score=0;


	$('body').append("<div id='mygame'></div>");

	$.fn.mygame = function(size) {

		var gameObject = $(this).attr('id');
		var boardSize = size+16;
		var blockSize = size/4;
		
		var i=0;

		$("<style id='squarecss' type='text/css'> .square-container{ width:"+blockSize+"px; height:"+blockSize+"px;display:inline; float:left;margin:1px;border:1px solid black; text-align:center;line-height:100px;box-sizing:border-box;} </style>").appendTo("head");
		
		$("<style id ='boardcss' type='text/css'> .board{  width:"+boardSize+"px; height:"+boardSize+"px; } </style>").appendTo("head");


		$("<style type='text/css'> .c2{ background-color: #D8D8D8 ; } </style>").appendTo("head");
		$("<style type='text/css'> .c4{ background-color: #F2F5A9 ; } </style>").appendTo("head");
		$("<style type='text/css'> .c8{ background-color: #FAAC58  ; } </style>").appendTo("head");
		$("<style type='text/css'> .c16{ background-color: #DF7401 ;} </style>").appendTo("head");
		$("<style type='text/css'> .c32{ background-color: #DF3A01 ; } </style>").appendTo("head");
		$("<style type='text/css'> .c64{ background-color: #DF0101 ; } </style>").appendTo("head");
		$("<style type='text/css'> .c128{ background-color: #F5F6CE ; } </style>").appendTo("head");
		$("<style type='text/css'> .c256{ background-color: #F4FA58 ; } </style>").appendTo("head");
		$("<style type='text/css'> .c512{ background-color: #D7DF01 ; } </style>").appendTo("head");
		$("<style type='text/css'> .c1024{ background-color: #64FE2E ; } </style>").appendTo("head");
		$("<style type='text/css'> .c2048{ background-color: #04B404 ; } </style>").appendTo("head");


		$(this).append("<div class='board'></div>" );
		$(this).append("<div class='score'></div>" );
		$(this).append("<div class='endgame'></div>" );
		$(this).append("<input type='range'class='changesize'min='400' step='10' value='400' max='800'>CHANGE THE SIZE OF THE 2048</input>");


		$('input.changesize').on('input', function(){
			$(this).trigger('change');
		});
		$('input.changesize').change(function(){
			var size=$(this).val();
			console.log(size);
			var boardSize = parseInt(size)+16;
			var blockSize = parseInt(size)/4;
			document.getElementById('boardcss').innerHTML=" .board{  width:"+boardSize+"px; height:"+boardSize+"px; } ";

			document.getElementById('squarecss').innerHTML=".square-container{ width:"+blockSize+"px; height:"+blockSize+"px;display:inline; float:left;margin:1px;border:1px solid black; text-align:center;line-height:100px;box-sizing:border-box;} ";
		});
		

		for(i=0;i<16;i++){
			$('.board').append("<div class='square-container'></div>");	
		}


		randomtile(2);
	};
	$("#mygame").mygame(400);



//FUNCTION ON ARROW KEY PRESSED CALL DEPLACEMENT
$(document).keydown(function(e) {
	switch(e.which) {
        case 37: // left =0
        console.log('left');
        deplacements(0);

        break;

        case 38: // up =1
        console.log('up');
        deplacements(1);

        break;

        case 39: // right =2
        console.log('right');
        deplacements(2);

        break;

        case 40: // down =3
        console.log('down');
        deplacements(3);

        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

//FUNCTION WICH ADD PARAM TIMES A RANDOM 2 OR 4 TO A RANDOM EMPTY CASE
function randomtile(param){
	$("div.endgame").text("YOU CAN PLAY !");
	var y,x;
	var boule=false;
	for(y=0;y<param;y++){
		var empty=false;

		for(x=0;x<16;x++)
		{
			if(!$("div.square-container").eq(x).text())
				boule=true;
		}

		if(boule)
		{
			while(!empty)
			{
				var rando = Math.floor(Math.random()*16);
				if(!$("div.square-container").eq(rando).text())
				{
					empty=true;
				}
			}
			var rand = Math.floor(Math.random()*4);
			if(rand<2)
				rand=2;
			else
				rand=4;
			$("div.square-container").eq(rando).text(rand);
		}
		else
		{
			$("div.endgame").text("YOU LOOSE!");
		}
		setcolors();

	}
}; 

// FUNCTION DEPLACEMENT OF CASES IN PARAM DIRECTION (0=LEFT 1=UP 2=RIGHT 3=DOWN)
function deplacements(param)
{
	if(param===0)//LEFT
	{
		var p=0,k=0,j=0;pp=0,ppp=0,added=false;

		for(k=0;k<4;k++){
		//EACH CELL OF THE FIRST LINE FROM RIGHT TO LEFT
		var added=false;
		for(p=0;p<=3;p++)
		{
			var cell=p+(4*k);
			//IF CELL PP ISNT EMPTY
			if($("div.square-container").eq(cell).text())
			{
				console.log("TARGET CELL "+cell);
				var pp=cell;
				//PP IS THE TARGETED CELL 
				//THE TARGETED CELL SHIFT TO RIGHT IF ITS POSSIBLE
				for(j=0;j<p;j++)
				{
					console.log('TOURS :'+j);
					console.log(added);
					var ppp=pp-1;
					//IF CELL PP+1  IS EMPTY WE JUST SHIFT
					if(!$("div.square-container").eq(ppp).text())
					{
						//WE PUT PP IN PPP
						$("div.square-container").eq(ppp).text($("div.square-container").eq(pp).text());
						$("div.square-container").eq(pp).text("");
					}
					else 
					{
						//IF NEXT CELL HAS THE SAME VALUE JUST ADD THEM
						if(($("div.square-container").eq(ppp).text()===$("div.square-container").eq(pp).text()) && (added===false))
						{	
							score+=parseInt($("div.square-container").eq(ppp).text())+parseInt($("div.square-container").eq(pp).text());

							console.log('next cell has same value so add and delete previous');
							added=true;
							console.log(added);
							var add=parseInt($("div.square-container").eq(ppp).text())+parseInt($("div.square-container").eq(pp).text());
							$("div.square-container").eq(ppp).text(add);
							$("div.square-container").eq(pp).text("");

						}
					}
					pp-=1;
				}
			}
		}
	}
}



else if(param===1)//UP
{
	var p=0,k=0,j=0;pp=0,ppp=0,added=false;

	for(k=0;k<4;k++){
		//EACH CELL OF THE FIRST LINE FROM RIGHT TO LEFT
		var added=false;
		for(p=0;p<=3;p++)
		{
			var cell=k+(4*p);
			console.log("TARGET CELL "+cell);

			//IF CELL PP ISNT EMPTY
			if($("div.square-container").eq(cell).text())
			{
				var pp=cell;
				//PP IS THE TARGETED CELL 
				//THE TARGETED CELL SHIFT TO RIGHT IF ITS POSSIBLE
				for(j=0;j<p;j++)
				{
					console.log('TOURS :'+j);
					console.log(added);
					var ppp=pp-4;

					//IF CELL PP+1  IS EMPTY WE JUST SHIFT
					if(!$("div.square-container").eq(ppp).text())
					{
						console.log('CELL '+ppp+" IS EMPTY LETS COPY CELL "+pp+" IN CELL "+ppp);
						console.log('CELL PP' + pp+ " = " + $("div.square-container").eq(pp).text());
						console.log('CELL PP' + ppp+ " = " + $("div.square-container").eq(ppp).text());

						//WE PUT PP IN PPP
						$("div.square-container").eq(ppp).text($("div.square-container").eq(pp).text());
						$("div.square-container").eq(pp).text("");

						console.log('CELL PP' + pp+ " = " + $("div.square-container").eq(pp).text());
						console.log('CELL PP' + ppp+ " = " + $("div.square-container").eq(ppp).text());					
					}
					else 
					{
						//IF NEXT CELL HAS THE SAME VALUE JUST ADD THEM
						if(($("div.square-container").eq(ppp).text()===$("div.square-container").eq(pp).text()) && (added===false))
						{	
							score+=parseInt($("div.square-container").eq(ppp).text())+parseInt($("div.square-container").eq(pp).text());

							console.log('next cell has same value so add and delete previous');
							added=true;
							console.log(added);
							var add=parseInt($("div.square-container").eq(ppp).text())+parseInt($("div.square-container").eq(pp).text());
							$("div.square-container").eq(ppp).text(add);
							$("div.square-container").eq(pp).text("");
						}
					}
					pp-=4;
				}
			}
		}
	}
}



else if(param===2)//right
{
	var p=0,k=0,j=0;pp=0,ppp=0,added=false;

	for(k=0;k<4;k++){
	//EACH CELL OF THE FIRST LINE FROM RIGHT TO LEFT
	var added=false;

	for(p=3;p>=0;p--)
	{
		var cell=p+(4*k);
		//IF CELL PP ISNT EMPTY
		if($("div.square-container").eq(cell).text())
		{
			console.log("TARGET CELL "+cell);
			var pp=cell;
			//PP IS THE TARGETED CELL 
			//THE TARGETED CELL SHIFT TO RIGHT IF ITS POSSIBLE
			for(j=(3-p);j>0;j--)
			{
				console.log('TOURS :'+j);
				console.log(added);
				var ppp=pp+1;
				//IF CELL PP+1  IS EMPTY WE JUST SHIFT
				if(!$("div.square-container").eq(ppp).text())
				{
					//WE PUT PP IN PPP
					$("div.square-container").eq(ppp).text($("div.square-container").eq(pp).text());
					$("div.square-container").eq(pp).text("");
				}
				else 
				{
					//IF NEXT CELL HAS THE SAME VALUE JUST ADD THEM
					if(($("div.square-container").eq(ppp).text()===$("div.square-container").eq(pp).text()) && (added===false))
					{	
						score+=parseInt($("div.square-container").eq(ppp).text())+parseInt($("div.square-container").eq(pp).text());

						console.log('next cell has same value so add and delete previous');
						added=true;
						console.log(added);
						var add=parseInt($("div.square-container").eq(ppp).text())+parseInt($("div.square-container").eq(pp).text());
						$("div.square-container").eq(ppp).text(add);
						$("div.square-container").eq(pp).text("");

					}
				}
				pp+=1;

			}
		}
	}
}
}



else if(param===3)//DOWN
{
	var p=0,k=0,j=0;pp=0,ppp=0,added=false;

	for(k=0;k<4;k++){
		//EACH CELL OF THE FIRST LINE FROM RIGHT TO LEFT
		var added=false;
		for(p=3;p>=0;p--)
		{
			var cell=k+(4*p);
			console.log("TARGET CELL "+cell);

			//IF CELL PP ISNT EMPTY
			if($("div.square-container").eq(cell).text())
			{
				var pp=cell;
				//PP IS THE TARGETED CELL 
				//THE TARGETED CELL SHIFT TO RIGHT IF ITS POSSIBLE
				for(j=(3-p);j>0;j--)
				{
					console.log('TOURS :'+j);
					console.log(added);
					var ppp=pp+4;

					//IF CELL PP+1  IS EMPTY WE JUST SHIFT
					if(!$("div.square-container").eq(ppp).text())
					{
						console.log('CELL '+ppp+" IS EMPTY LETS COPY CELL "+pp+" IN CELL "+ppp);
						console.log('CELL PP' + pp+ " = " + $("div.square-container").eq(pp).text());
						console.log('CELL PP' + ppp+ " = " + $("div.square-container").eq(ppp).text());

						//WE PUT PP IN PPP
						$("div.square-container").eq(ppp).text($("div.square-container").eq(pp).text());
						$("div.square-container").eq(pp).text("");

						console.log('CELL PP' + pp+ " = " + $("div.square-container").eq(pp).text());
						console.log('CELL PP' + ppp+ " = " + $("div.square-container").eq(ppp).text());					
					}
					else 
					{
						//IF NEXT CELL HAS THE SAME VALUE JUST ADD THEM
						if(($("div.square-container").eq(ppp).text()===$("div.square-container").eq(pp).text()) && (added===false))
						{	
							score+=parseInt($("div.square-container").eq(ppp).text())+parseInt($("div.square-container").eq(pp).text());

							console.log('next cell has same value so add and delete previous');
							added=true;
							console.log(added);
							var add=parseInt($("div.square-container").eq(ppp).text())+parseInt($("div.square-container").eq(pp).text());
							$("div.square-container").eq(ppp).text(add);
							$("div.square-container").eq(pp).text("");

						}
					}
					pp+=4;
				}
			}
		}
	}
}

randomtile(1);

}
function setcolors(){
	var m;
	for(m=0;m<16;m++)
	{
		$("div.square-container").eq(m).removeClass("c2 c4 c8 c16 c32 c64 c128 c256 c512 c1024 c2048");
		$("div.square-container").eq(m).addClass("square-container");

		var value = ""+$("div.square-container").eq(m).text()+"";
		console.log("value"+value);
		$("div.square-container").eq(m).addClass("c"+value);

	}
	$("div.score").text("YOUR SCORE : "+score);

}
});
