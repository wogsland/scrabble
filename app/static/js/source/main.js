(function(){

  'use strict';

  $(document).ready(initialize);

  var socket;
  var game = {};
  
  function initialize(){
    initializeSocketIO();
	$('#join').click(join);
	$('#pick').click(pick);
	$('#users').on('click','.primary .letters span',selectletter);
	$('#board').on('click','td',placeletter);
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
	game.letters = data.letters;
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
	socket.on('receivemove', receivemove);
  }

  function selectletter(){
    console.log('clickses on '+$(this).text()+'!');
	$('.primary .letters span').removeClass();
	$(this).addClass('marked');
  }
  
  function placeletter(){
	var letter = $('.primary .marked').text();
	var x = $(this).data('x');
	var y = $(this).data('y');
    console.log('clickses on '+x+','+y+'!');
    socket.emit('sendmove',{user:game.user, letter:letter, x:x, y:y})
  }

  function receivemove(data){
    console.log(data);
	var $td = $('#board td[data-x="'+data.x+'"][data-x="'+data.y+'"]');
    console.log($td);
	$td.text(data.letter);
  }
  
})();
