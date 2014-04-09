(function(){

  'use strict';

  $(document).ready(initialize);

  var socket;
  var game = {};
  
  function initialize(){
    initializeSocketIO();
	$('#join').click(join);
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
	game.user = user;
	game.letters = [];
	game.nickname = user.concat(" the loser");
	var tr = '<tr class="secondary" data-user="'+user+'"><td class="user">'+user+'</td><td class="letters"></td><td class="nickname">'+game.nickname+'</td></tr>';
	$('#users > tbody').append(tr);
  }
  
  function initializeSocketIO(){
    socket = io.connect('/game');
    socket.on('online', function(data){console.log(data);});
	socket.on('joined', joined);
  }

})();
