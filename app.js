

let userArray = [];
let computerArray = [];
let id, color, stage = 0;
let mode = "notStrict";
const sounds = [
  'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3', 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'
  ];
const colors = ["green", "red", "yellow", "blue"];
const numStages = 4;


$(document).ready(function(){
  $('.start-btn').click(function(){
    if (stage > 0) {
      gameReset();
    }
    stage++;
    computerPlayer();

  });

  $('.strict-btn').click(function(){
    if (mode == "notStrict") {
      mode = "strict";
      console.log("mode ", mode);
    } else {
      mode = "notStrict";
      console.log("mode ", mode);
    }
  });


  $('.pad').click(function() {
    id = $(this).attr('id');
    color = $(this).attr("class").split(" ")[1];
    userArray.push(id);
    console.log(id + " " + color);
    addSound(id, color);
    if(!userArrayCheck()) {
      displayError();
      userArray = [];
    }
    if(userArray.length == computerArray.length && userArray.length < numStages) {
      stage++;
      console.log("stage ", stage);
      userArray = [];
      computerPlayer();
    }
    if(userArray.length == numStages) {
      $('.display').text('Win!');
      stage = 0;
      computerArray = [];
      userArray = [];
    }
  });

  $(".switchContainer").click(function() {
    // gameOn = (gameOn == false) ? true : false;
    // console.log(gameOn);
    if($("#7").hasClass("outter-active")) {
      console.log("inside 7");
      $("#8").addClass("inner-active").removeClass("inner-inactive");
      $("#7").addClass("outter-inactive").removeClass("outter-active");
      $(".display").text("");
    }
    else if ($("#8").hasClass("inner-active")){
      console.log("inside 8");
      $("#8").addClass("inner-inactive").removeClass("inner-active");
      $("#7").addClass("outter-active").removeClass("outter-inactive");
      $(".display").text("00");
    } else {
      console.log("inside else");
    }
  });
});

  function userArrayCheck () {
    for(var j = 0; j < userArray.length; j++) {
      if(userArray[j] != computerArray[j]) {
        return false;
      }
    }
    return true;
  }

  function displayError () {
    console.log("error");
    if (mode == "strict") {
      $('.display').text('err.');
      setTimeout(function(){

        gameReset();
      }, 1500);

    } else {
      var counter = 0;
      var myError = setInterval(function(){
        $('.display').text('err.');
        counter++;
        console.log("counter", counter);
        if(counter == numStages) {
          $(".display").text(stage);
          clearInterval(myError);
          userArray = [];
          counter = 0;
        }
      }, 800);
      $('.display').text(stage);
      var i = 0;
      var interval = setInterval(function(){
        id = computerArray[i];
        color = $("#" + id).attr("class").split(" ")[1];
        console.log(id + " " + color);
        i++;
        addSound(id, color);
        if(i == computerArray.length){
          clearInterval(interval);
        }
      }, 1100);
    }
  }

  function computerPlayer() {
    console.log("stage ", stage);
    $('.display').text(stage);
    getRandomNum();
    var i = 0;
    var interval = setInterval(function(){
      id = computerArray[i];
      color = $("#" + id).attr("class").split(" ")[1];
      console.log(id + " " + color);
      i++;
      addSound(id, color);
      if(i == computerArray.length){
        clearInterval(interval);
      }
    }, 1100);
  }

  function getRandomNum(){
    var random = Math.floor(Math.random() * colors.length);
    computerArray.push(random);
  }

  function addSound(id, color){
    $("#"+id).addClass(color + "-active");
    playSound(id);
    setTimeout(function(){
      $("#"+id).removeClass(color + "-active");
    }, 550);
  }

  function playSound(id) {
    var sound = new Audio(sounds[id]);
    sound.play();
  }

  function gameReset() {
    stage = 0;
    userArray = [];
    computerArray = [];
    $(".display").text("00");
  }
