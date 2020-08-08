$(document).ready(function(){
    $(".load-screen").delay(500).fadeOut(500);
    $("#next").click(function(){
        nickname = $("#nickname").val(); //stores the nickname
        $(".question-box").fadeOut(250);
        $(".question-box2").delay(300).fadeIn(250);
        }); 
});
function changeState(id){
    var button = document.getElementById(id);
    if(button.style.color == "white"){
        button.style.backgroundColor = "white";
        button.style.color = "#329643";
    }else{
        button.style.backgroundColor = "#329643";
        button.style.color = "white";
    }  
}
function submitDetails(){
    var buttons = document.getElementsByClassName("option");
    Array.from(buttons).forEach(element => {
        if(element.style.color == "white"){
            keys.push(element.innerHTML);
        }
        
    });
}