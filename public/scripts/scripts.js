var nickname; //nickname of the user
var keys = new Array();
var match_id;
var match_name;
var match_keys; //all the state values are stored here
$(document).ready(function(){
    $(".load-screen").delay(500).fadeOut(500);
    $("#next").click(function(){
        nickname = $("#nickname").val(); //stores the nickname
        $(".question-box").fadeOut(250);
        $(".question-box2").delay(300).fadeIn(250);
        }); 
});
const socket = io('http://localhost:3000/');
        socket.on('ack',(data)=>{
        $(".load-screen").delay(200).fadeOut(500);
        $(".container").fadeIn(200);
        match_id = data.id;
       match_name = data.username;
        match_keys = data.keys;
        var rec_name = document.getElementById('match_name');
        rec_name.innerHTML = match_name;
        var rec_info = document.getElementById('match_info');
        for(var i = 0;i < match_keys.length;i++){
            rec_info.innerHTML = rec_info.innerHTML + ' #' + match_keys[i];
        }



        
    });
    socket.on('getMessage', (text) =>{
    console.log("text recieved => "+ text);
    var msg_box = document.getElementById('text-box');
    var rec_box = document.createElement('div')
    rec_box.setAttribute('class','rec-box');
    var rec_name = document.createElement('p');
    rec_name.setAttribute('class','rec-name');
    var rec_msg = document.createElement('p');
    rec_msg.setAttribute('class','rec-msg');
    rec_name.innerHTML=match_name;
    rec_msg.innerHTML = text;
    rec_box.appendChild(rec_name);
    rec_box.appendChild(rec_msg);
    msg_box.appendChild(rec_box);
    var msg = document.querySelector('#text');
    msg.value = "";
    var element = document.getElementById("text-box");
    element.scrollTop = element.scrollHeight;
}); 
function chat_end(){
    socket.emit('chat-end', socket.id);
    location.reload();
}
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
    $(".question-box2").delay(300).fadeOut(250);
    $(".navbar").slideUp(150);
    
    socket.emit('user-info',{id: socket.id, username : nickname, keys: keys});
    console.log("this tab has id =>" + socket.id);
   $(".load-screen").delay(500).fadeIn(500);
    
    setTimeout(()=>{
        socket.emit('find-match', socket.id);
    },5000);
}

function send_msg(){
    var text = document.getElementById('text').value;
    socket.emit('sendMessage', {msg: text, sender_id: match_id})
    var sen_box = document.createElement('div')
    sen_box.setAttribute('class','sen-box');
    var msg_box = document.getElementById('text-box');
    var sen_name = document.createElement('p');
    sen_name.setAttribute('class','sen-name');
    var sen_msg = document.createElement('p');
    sen_msg.setAttribute('class','sen-msg');
    sen_name.innerHTML = nickname;
    sen_msg.innerHTML = text;
    sen_box.appendChild(sen_name);
    sen_box.appendChild(sen_msg);
    msg_box.appendChild(sen_box);
    var msg = document.getElementById('text');
    msg.value = "";
    var element = document.getElementById("text-box");
    element.scrollTop = element.scrollHeight;
}