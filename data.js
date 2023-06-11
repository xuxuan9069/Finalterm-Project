let allchess = ["將","士","士","象","象","車","車","馬","馬","砲","砲","卒","卒","卒","卒","卒","帥","仕","仕","相","相","俥","俥","傌","傌","炮","炮","兵","兵","兵","兵","兵"];
let blackchess = ["將","士","象","車","馬","砲","卒"];
let redchess = ["帥","仕","相","俥","傌","炮","兵"];

let blackwintable = [
	[38,3,"帥",null],
	[38,36,"仕",null],
	[2,36,"仕",null],
	[38,69,"相",null],
	[2,69,"相",null],
	[38,102,"俥",null],
	[2,102,"俥",null],
	[38,135,"傌",null],
	[2,135,"傌",null],
	[38,168,"炮",null],
	[2,168,"炮",null],
	[38,201,"兵",null],
	[2,201,"兵",null],
	[38,234,"兵",null],
	[2,234,"兵",null],
	[38,267,"兵",null]
];

let redwintable = [
	[2,3,"將",null],
	[2,36,"士",null],
	[38,36,"士",null],
	[2,69,"象",null],
	[38,69,"象",null],
	[2,102,"車",null],
	[38,102,"車",null],
	[2,135,"馬",null],
	[38,135,"馬",null],
	[2,168,"砲",null],
	[38,168,"砲",null],
	[2,201,"卒",null],
	[38,201,"卒",null],
	[2,234,"卒",null],
	[38,234,"卒",null],
	[2,267,"卒",null]
];

let chess = {
	"將" : [1,1,66,66],
	"士" : [68,2,66,65],
	"象" : [135,2,66,65],
	"車" : [202,2,66,65],
	"馬" : [268,2,66,65],
	"砲" : [334,67,67,66],
	"卒" : [202,67,67,66],
	"帥" : [1,132,66,67],
	"仕" : [68,132,66,67],
	"相" : [135,132,66,67],
	"俥" : [202,198,66,67],
	"傌" : [268,198,67,67],
	"炮" : [335,132,67,67],
	"兵" : [134,198,67,67]
};

let table = [
	{
		"location" : [3,2,70,70],
		"circle" : [39,38],
		"status" : "close",
		"value" : "將"
	},
	{
		"location" : [77,3,69,70],
		"circle" : [112,38],
		"status" : "close",
		"value" : "士"
	},
	{
		"location" : [151,3,69,70],
		"circle" : [186,38],
		"status" : "close",
		"value" : "士"
	},
	{
		"location" : [225,3,69,70],
		"circle" : [260,38],
		"status" : "close",
		"value" : "象"
	},
	{
		"location" : [298,3,69,70],
		"circle" : [334,38],
		"status" : "close",
		"value" : "象"
	},
	{
		"location" : [371,3,69,70],
		"circle" : [407,38],
		"status" : "close",
		"value" : "車"
	},
	{
		"location" : [447,3,69,70],
		"circle" : [481,38],
		"status" : "close",
		"value" : "車"
	},
	{
		"location" : [520,3,69,70],
		"circle" : [555,38],
		"status" : "close",
		"value" : "馬"
	},
	{
		"location" : [3,77,70,70],
		"circle" : [39,112],
		"status" : "close",
		"value" : "馬"
	},
	{
		"location" : [76,77,70,70],
		"circle" : [112,112],
		"status" : "close",
		"value" : "砲"
	},
	{
		"location" : [151,77,70,70],
		"circle" : [186,112],
		"status" : "close",
		"value" : "砲"
	},
	{
		"location" : [225,77,70,70],
		"circle" : [260,112],
		"status" : "close",
		"value" : "卒"
	},
	{
		"location" : [298,77,70,70],
		"circle" : [334,112],
		"status" : "close",
		"value" : "卒"
	},
	{
		"location" : [371,77,70,70],
		"circle" : [407,112],
		"status" : "close",
		"value" : "卒"
	},
	{
		"location" : [447,77,70,70],
		"circle" : [481,112],
		"status" : "close",
		"value" : "卒"
	},
	{
		"location" : [520,77,70,70],
		"circle" : [555,112],
		"status" : "close",
		"value" : "卒"
	},
	{
		"location" : [3,152,70,70],
		"circle" : [39,186],
		"status" : "close",
		"value" : "帥"
	},
	{
		"location" : [76,152,70,70],
		"circle" : [112,186],
		"status" : "close",
		"value" : "仕"
	},
	{
		"location" : [151,152,70,70],
		"circle" : [186,186],
		"status" : "close",
		"value" : "仕"
	},
	{
		"location" : [225,152,70,70],
		"circle" : [260,186],
		"status" : "close",
		"value" : "相"
	},
	{
		"location" : [298,152,70,70],
		"circle" : [334,186],
		"status" : "close",
		"value" : "相"
	},
	{
		"location" : [371,152,70,70],
		"circle" : [407,186],
		"status" : "close",
		"value" : "俥"
	},
	{
		"location" : [447,152,70,70],
		"circle" : [481,186],
		"status" : "close",
		"value" : "俥"
	},
	{
		"location" : [520,152,70,70],
		"circle" : [555,186],
		"status" : "close",
		"value" : "傌"
	},
	{
		"location" : [3,225,70,70],
		"circle" : [39,260],
		"status" : "close",
		"value" : "傌"
	},
	{
		"location" : [76,225,70,70],
		"circle" : [112,260],
		"status" : "close",
		"value" : "炮"
	},
	{
		"location" : [151,225,70,70],
		"circle" : [186,260],
		"status" : "close",
		"value" : "炮"
	},
	{
		"location" : [224,225,70,70],
		"circle" : [260,260],
		"status" : "close",
		"value" : "兵"
	},
	{
		"location" : [298,225,70,70],
		"circle" : [334,260],
		"status" : "close",
		"value" : "兵"
	},
	{
		"location" : [371,225,70,70],
		"circle" : [407,260],
		"status" : "close",
		"value" : "兵"
	},
	{
		"location" : [445,225,70,70],
		"circle" : [481,260],
		"status" : "close",
		"value" : "兵"
	},
	{
		"location" : [519,225,70,70],
		"circle" : [555,260],
		"status" : "close",
		"value" : "兵"
	}
];