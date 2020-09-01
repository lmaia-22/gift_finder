$(document).ready(function(){
    $("#show").click(function(){
      var hide= $(".older").css("display");
      if(hide == "none"){
        $(".older").show();
        $("#show").text("Less Posts");
      }else{
        $(".older").hide();
        $("#show").text("More Posts");
      }
    });
  });