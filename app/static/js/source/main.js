(function(){

  'use strict';

  $(document).ready(initialize);

  var socket;
  var game = {};
  
  function initialize(){
    initializeSocketIO();
	$('#join').click(join);
	$('#pick').click(pick);
  }

  function join(){
	var user = $('#user').val();
	game.user = user;
	game.letters = [];
	game.nickname = user.concat(" the loser");
	var tr = '<tr class="primary" data-user="'+user+'"><td class="user">'+user+'</td><td class="letters"></td><td class="nickname">'+game.nickname+'</td></tr>';
	$('#users > tbody').append(tr);
	socket.emit('join',{user:user});
  }
  
  function joined(data){
    console.log('Jeebus! Other PeOpLeS plaaaying!');
	console.log(data);
	
	var user = data.user;
	var nickname = user.concat(" the loser");
	var tr = '<tr class="secondary" data-user="'+user+'"><td class="user">'+user+'</td><td class="letters"></td><td class="nickname">'+nickname+'</td></tr>';
	$('#users > tbody').append(tr);
  }

  function pick(){
	var numlets = $('#count').val() * 1;
	var total = game.letters.length + numlets;
	if(total <= 7){
	  socket.emit('getletters',{user:game.user, count:numlets});
	}
  }
  
  function setletters(data){
    console.log('Jeebus! LETTERS!');
	console.log(data);
	
	var $row = $('#users tr[data-user="'+data.user+'"');
	var $td = $row.children('.letters');
	for(var i=0;i<data.letters.length;i++){
	  console.log(data.letters[i]);
	  $td.append('<span>'+data.letters[i]+'</span>');	  
	}
  }
  
  function initializeSocketIO(){
    socket = io.connect('/game');
    socket.on('online', function(data){console.log(data);});
	socket.on('joined', joined);
	socket.on('setletters', setletters);
  }

})();
