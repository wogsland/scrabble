'use strict';

exports.connection = function(socket){
  socket.emit('online', {date: new Date()});
  socket.on('join', join);
  socket.on('getletters', getletters);
};

function join(data){
  console.log('Jeebus! Messages came!');
  console.log(data);
  
  var socket = this;
  socket.broadcast.emit('joined',data);
}

function getletters(data){
  var letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
  letters = letters.split('');
  var picklist = [];
  for(var i=0;i<data.count;i++){
    var index = Math.floor(Math.random()*26)
	picklist.push(letters[index]);
  }
  var socket = this;
  socket.broadcast.emit('setletters',{user:data.user,letters:picklist});
  socket.emit('setletters',{user:data.user,letters:picklist});
}