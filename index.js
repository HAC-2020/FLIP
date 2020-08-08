var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var users = new Array();
var myId;
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
io.on('connection', (socket) => {
    console.log(socket.id+ " connected\n");
    socket.on('disconnect',() =>{
        console.log(socket.id + " disconnected\n");
    });

    socket.on('end-chat',(id)=>{
        console.log(id + " disconnected\n");
        socket.disconnect(true);

    });
    
    //chat handler
    socket.on('sendMessage', (data) =>{
        console.log(data.sender_id + ' :' + data.msg)
        io.to(data.sender_id).emit('getMessage',data.msg);

    })

    socket.on('user-info',(data) =>{
        users.push(data);
        myId = users.length - 1;
    });
    socket.on('find-match',(id)=>{
         
        //random matching

        //if(users.length == 0){
           // io.to(id).emit("emptyQueue");
       // }
        var index = Math.floor(Math.random()*users.length);
        //EXPENSIVE WHILE LOOP
        let p = new Promise((resolve, reject) =>{
            let call = setInterval(()=>{
                if(users[index].id != id){
                    clearInterval(call);
                    resolve();
                }else{
                    index = Math.floor(Math.random()*users.length);
                }
            });

        })
    //while(users[index].id == id){
      //   index = Math.floor(Math.random()*users.length);
      // }
      p.then(()=>{
        var selected_name = users[index].username;
         var selected_id = users[index].id;
         var selected_keys = users[index].keys;
         users.splice(myId,1);
         users.splice(index,1);
         console.log("Your id =>" + id);
         console.log("match found !(reciever id) => " + selected_id);
         io.to(id).emit('ack',{ id: selected_id, username: selected_name, keys: selected_keys })
      })
         
    })
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});