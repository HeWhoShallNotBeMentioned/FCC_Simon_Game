


var simon = {
  sendColor: function(color){
    console.log("New Color: " + color);
  },
};

$(document).ready(function(){
  $(".red").click(function(){ simon.sendColor("red");});
  $(".green").click(function(){ simon.sendColor("green");});
  $(".yellow").click(function(){ simon.sendColor("yellow");});
  $(".blue").click(function(){ simon.sendColor("blue");});
});
