$(document).ready(function(){
    $(".load-screen").delay(500).fadeOut(500);
    $("#next").click(function(){
        nickname = $("#nickname").val(); //stores the nickname
        $(".question-box").fadeOut(250);
        $(".question-box2").delay(300).fadeIn(250);
        }); 
});