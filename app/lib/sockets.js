'use strict';

exports.connection = function(socket){
  socket.emit('online', {date: new Date()});
  socket.on('join', join);
};

function join(data){
  console.log('Jeebus! Messages came!');
  console.log(data);
  
  var socket = this;
  socket.broadcast.emit('joined',data);
}