let ctx = $("#mycanvas")[0].getContext("2d");
let blackcanvas = $("#black")[0].getContext("2d");
let redcanvas = $("#red")[0].getContext("2d");
var currentchess = -1;
var clickchess = -1;
var currentplayer = "no";
var gamestart = false;
var ctrlbutton = false;


function ChessBackIn(){
	for(i = 0; i < table.length; i++)
	{
		ctx.save();
		ctx.beginPath();
		ctx.arc(table[i].circle[0],table[i].circle[1],32,0,Math.PI*2,true);
		ctx.closePath();
		ctx.fillStyle = "green";
		ctx.fill();
		ctx.lineWidth = 3;
		ctx.strokeStyle = "black";
		ctx.stroke();
	}
}

function ChessUp(item){
	let imgMain = new Image();
	imgMain.src = "chess.png";
	imgMain.onload = function(){
		ctx.save();
		ctx.beginPath();
		ctx.arc(table[item].circle[0],table[item].circle[1],34,0,Math.PI*2,true);
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(imgMain,chess[table[item].value][0],chess[table[item].value][1],chess[table[item].value][2],chess[table[item].value][3],table[item].location[0],table[item].location[1],table[item].location[2],table[item].location[3]);
		ctx.restore();
	}
	table[item].status = "open";
}

function GetRandomChess(){
	return Math.floor(Math.random()*(32));
}

function ChessRandom(){
	for(i = 0; i < 32; i++)
	{
		var index = GetRandomChess();
		let temp = table[index].value;
		table[index].value = table[i].value;
		table[i].value = temp;
	}
}

function Clear(){
	for(i = 0; i < 32; i++)
	{
		table[i].status = "close";
		table[i].value = allchess[i];
	}
	currentchess = -1;
	ClearClickChess();
	clickchess = -1;
	currentplayer = "no";
	ctrlbutton = false;
	blackcanvas.clearRect(0,0,70,300);
	redcanvas.clearRect(0,0,70,300);
	for(i = 0; i < 16; i++)
	{
		blackwintable[i][3] = null;
		redwintable[i][3] = null;
	}
}

function ClearClickChess(){
	if(clickchess != -1)
	{
		ctx.clearRect(table[clickchess].location[0]-1,table[clickchess].location[1]-1,table[clickchess].location[2]+2,table[clickchess].location[3]+2);
	}
}

function ChessClick(item){
	ctx.save();
	ctx.beginPath();
	ctx.arc(table[item].circle[0],table[item].circle[1],34,0,Math.PI*2,true);
	ctx.closePath();
	ctx.lineWidth = 3;
	ctx.strokeStyle = "green";
	ctx.stroke();
	ctx.restore();
	clickchess = item;
}

function ChessColor(item){
	for(j = 0; j < 7; j++)
	{
		if(table[item].value == blackchess[j])
		{
			return "black";
		}
		else if(table[item].value == redchess[j])
		{
			return "red";
		}
	}
}

function CheckWin(playerwintable){
	for(k = 0; k < 16; k++)
	{
		if(playerwintable[k][3] == null)
		{
			return false;
		}
	}
	return true;
}

function WinAlert(winplayer,playerwintable){
	if(CheckWin(playerwintable))
	{
		alert("["+winplayer+"] WIN !!!");
	}
}

function ChangePlayer(item){
	if(currentplayer == "black")
	{
		WinAlert(currentplayer,blackwintable);
		currentplayer = "red";
	}
	else if(currentplayer == "red")
	{
		WinAlert(currentplayer,redwintable);
		currentplayer = "black";
	}
	else
	{
		currentplayer = ChessColor(item);
		ChangePlayer(item);
	}
}



$(function(){
	
	$("input").on("click",function(e){
		$("input").attr("value","重新遊戲");
		Clear();
		ChessRandom();
		ChessBackIn();
		gamestart = true;
	});
	
	$("#mycanvas").on("click",function(e){
		if(gamestart)
		{
			let xPos = e.pageX - $(this).offset().left;
			let yPos = e.pageY - $(this).offset().top;
			
			try
			{
				ClearClickChess();
				ChessUp(clickchess);
			}
			catch
			{
			}
			
			for(i = 0; i < table.length; i++)
			{
				if(xPos > table[i].location[0] && yPos > table[i].location[1] && xPos < table[i].location[0] + table[i].location[2] && yPos < table[i].location[1] + table[i].location[3])
				{
					if(table[i].status == "close")
					{
						ChessUp(i);
						ChangePlayer(i);
					}
					else if(table[i].status == "open")
					{
						if(table[i].value != null && currentplayer != ChessColor(i))
						{
							//alert("只能移動自己的棋子!!!");
						}
						else if(table[i].value != null)
						{
							currentchess = i;
							ChessClick(i)
						}
					}
					break;
				}
			}
		}
	});
	
});

function GetChessOrder(ochess){
	for(j = 0; j < 7; j++)
	{
		if(table[ochess].value == blackchess[j])
		{
			return j;
		}
		else if(table[ochess].value == redchess[j])
		{
			return j;
		}
	}
}

function Compare(cchess,tchess){
	if(table[cchess].value == "砲" || table[cchess].value == "炮")
	{
		return true;
	}
	else if((table[cchess].value == "兵" && table[tchess].value == "將") || (table[cchess].value == "卒" && table[tchess].value == "帥"))
	{
		return true;
	}
	else if((table[cchess].value == "將" && table[tchess].value == "兵") || (table[cchess].value == "帥" && table[tchess].value == "卒"))
	{
		return false;
	}
	else
	{
		if(GetChessOrder(cchess) <= GetChessOrder(tchess))
		{
			return true;
		}
		else
		{
			return false;
		}
	}
}

function GetWinTableLocation(wintable,winchess){
	for(i = 0 ; i < 16; i++)
	{
		if(wintable[i][2] == winchess && wintable[i][3] == null)
		{
			wintable[i][3] = "in";
			return i;
		}
	}
}

function WinChessup(wintable,winchess,canvas){
	var wintableorder = GetWinTableLocation(wintable,winchess);
	let imgMain = new Image();
	imgMain.src = "chess.png";
	imgMain.onload = function(){
		canvas.save();
		canvas.beginPath();
		canvas.arc(wintable[wintableorder][0]+15,wintable[wintableorder][1]+15,15,0,Math.PI*2,true);
		canvas.closePath();
		canvas.clip();
		canvas.drawImage(imgMain,chess[winchess][0],chess[winchess][1],chess[winchess][2],chess[winchess][3],wintable[wintableorder][0],wintable[wintableorder][1],30,30);
		canvas.restore();
	}
	
}

function WinChess(winchess){
	if(currentplayer == "black")
	{
		WinChessup(blackwintable,winchess,blackcanvas);
	}
	else if(currentplayer == "red")
	{
		WinChessup(redwintable,winchess,redcanvas);
	}
}

function ChessMove(target){
	if((table[target].status == "open" && Compare(currentchess,target)) || (table[target].status == "empty"))
	{
		ctx.clearRect(table[currentchess].location[0]-1,table[currentchess].location[1]-1,table[currentchess].location[2]+2,table[currentchess].location[3]+2);
		ctx.clearRect(table[target].location[0],table[target].location[1],table[target].location[2],table[target].location[3]);
		WinChess(table[target].value);
		table[target].value = table[currentchess].value;
		table[target].status = "open";
		table[currentchess].value = null;
		table[currentchess].status = "empty";
		ChessUp(target);
		ChangePlayer(null);
		currentchess = -1;
		clickchess = -1;
	}
}

function CheckLeftBorder(borderchess){
	if(borderchess == 0 || borderchess == 8 || borderchess == 16 || borderchess == 24)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function CheckUpBorder(borderchess){
	if(borderchess == 0 || borderchess == 1 || borderchess == 2 || borderchess == 3 || borderchess == 4 || borderchess == 5 || borderchess == 6 || borderchess == 7)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function CheckRightBorder(borderchess){
	if(borderchess == 7 || borderchess == 15 || borderchess == 23 || borderchess == 31)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function CheckDownBorder(borderchess){
	if(borderchess == 24 || borderchess == 25 || borderchess == 26 || borderchess == 27 || borderchess == 28 || borderchess == 29 || borderchess == 30 || borderchess == 31)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function DoubleMove(){
	if(table[currentchess].value == "砲" || table[currentchess].value == "炮")
	{
		return true;
	}
	else 
	{
		return false;
	}
}

function CheckBorder(direction,borderchess){
	switch(direction)
	{
		case "ArrowLeft":
			return CheckLeftBorder(borderchess);
		case "ArrowUp":
			return CheckUpBorder(borderchess);
		case "ArrowRight":
			return CheckRightBorder(borderchess);
		case "ArrowDown":
			return CheckDownBorder(borderchess);
	}
}

function DoubleMoveTarget(direction,moveonechess,movestep){
	var midchess = false;
	var tarchess = false;
	while(!midchess)
	{
		if(!CheckBorder(direction,moveonechess))
		{
			if(table[moveonechess].status == "empty")
			{
				moveonechess = moveonechess + movestep;
			}
			else if(table[moveonechess + movestep].status == "empty")
			{
				moveonechess = moveonechess + movestep;
				while(!tarchess)
				{
					if(!CheckBorder(direction,moveonechess))
					{
						if(table[moveonechess + movestep].status == "empty")
						{
							moveonechess = moveonechess + movestep;
						}
						else
						{
							return (moveonechess + movestep);
						}
					}
					else
					{
						return "outborder";
					}
				}
			}
			else
			{
				return (moveonechess + movestep);
			}
		}
		else
		{
			return "outborder";
		}
	}
}

$(document).on("keyup" , function(event){
	if(event.code == "ControlLeft" || event.code == "ControlRight")
	{
		ctrlbutton = false;
	}
});

$(document).on("keydown" , function(event){
	if(gamestart)
	{
		if(currentchess != -1)
		{
			if(event.code == "ControlLeft" || event.code == "ControlRight")
			{
				ctrlbutton = true;
			}
			switch(event.code)
			{
				case "ArrowLeft":
					if(!CheckLeftBorder(currentchess))
					{
						if(!DoubleMove() || (DoubleMove() && !ctrlbutton && table[currentchess - 1].status == "empty"))
						{
							ChessMove(currentchess - 1);
						}
						else if(DoubleMove() && ctrlbutton)
						{
							var doubletarget = DoubleMoveTarget("ArrowLeft",currentchess - 1,-1);
							if(doubletarget != "outborder")
							{
								ChessMove(doubletarget);
							}
						}
					}
					break;
				case "ArrowUp":
					if(!CheckUpBorder(currentchess))
					{
						if(!DoubleMove() || (DoubleMove() && !ctrlbutton && table[currentchess - 8].status == "empty"))
						{
							ChessMove(currentchess - 8);
						}
						else if(DoubleMove() && ctrlbutton)
						{
							var doubletarget = DoubleMoveTarget("ArrowUp",currentchess - 8,-8);
							if(doubletarget != "outborder")
							{
								ChessMove(doubletarget);
							}
						}
					}
					break;
				case "ArrowRight":
					if(!CheckRightBorder(currentchess))
					{
						if(!DoubleMove() || (DoubleMove() && !ctrlbutton && table[currentchess + 1].status == "empty"))
						{
							ChessMove(currentchess + 1);
						}
						else if(DoubleMove() && ctrlbutton)
						{
							var doubletarget = DoubleMoveTarget("ArrowRight",currentchess + 1,1);
							if(doubletarget != "outborder")
							{
								ChessMove(doubletarget);
							}
						}
					}
					break;
				case "ArrowDown":
					if(!CheckDownBorder(currentchess))
					{
						if(!DoubleMove() || (DoubleMove() && !ctrlbutton && table[currentchess + 8].status == "empty"))
						{
							ChessMove(currentchess + 8);
						}
						else if(DoubleMove() && ctrlbutton)
						{
							var doubletarget = DoubleMoveTarget("ArrowDown",currentchess + 8, 8);
							if(doubletarget != "outborder")
							{
								ChessMove(doubletarget);
							}
						}
					}
					break;
			}	
		}
	}
});