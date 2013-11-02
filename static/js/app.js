var frisbeeApp = frisbeeApp || {};

(function () {
	// Data objecten
	frisbeeApp.schedule = {
		scheduleThead: [
			{
				description: 'Datum'
			},{
				description: 'Team 1'
			}, {
				description: 'Team 1 Score'
			}, {
				description: 'Team 2'
			}, {
				description: 'Team 2 Score'
			}, {
				description: 'Last Update'
			}, {
				description: 'Score Update'
			}
		]
	};

	frisbeeApp.game = {
		gameThead: [
			{
				description: 'Team1'
			}, {
				description: 'score1'
			},{
				description: 'score2'
			}, {
				description: 'Team2'
			}
		],		
	};

	frisbeeApp.ranking = {
		rankingThead: [
			{
				description: 'Teamnaam'
			}, {
				description: 'Keren gespeeld'
			}, {
				description: 'Win'
			}, {
				description: 'Lose'
			}, {
				description: 'Points Scored'
			}, {
				description: '+/-'
			}
		]
	};
	
	// Controller Init
	frisbeeApp.controller = {
		init: function () {
			// Initialize router
			frisbeeApp.router.init();
		}
		 var type='POST',
                 url='https://api.leaguevine.com/v1/game_scores/',
                 postData= JSON.stringify({
                 	"game_id": "127236",
    			 	"team_1_score": "5",
    				"team_2_score": "6",
    				"is_final": "False"
                 });

                        // Create request
                        var xhr = new XMLHttpRequest();
                        
                        // Open request
                        xhr.open(type,url,true);

                        // Set request headers
                        xhr.setRequestHeader('Content-type','application/json');
                        xhr.setRequestHeader('Authorization','bearer 78f73d2624');
                        
                        // Send request (with data as a json string)
                        xhr.send(postData);
		},
		
	};
	
	// Router
	frisbeeApp.router = {
		init: function () {
	  		routie({
			    '/schedule': function() {
			    	frisbeeApp.page.schedule();
				},
			    '/game/': function(game_id) {
			    	frisbeeApp.page.game();
			    },

			    '/ranking': function() {
			    	frisbeeApp.page.ranking();
			    },
		
			    '*': function() {
			    	frisbeeApp.page.game();
			    }
			});


		change: function () {
            var route = window.location.hash.slice(2),
                sections = qwery('section[data-route]'),
                section = qwery('[data-route=' + route + ']')[0];  

            // Show active section, hide all other
            if (section) {
            	for (var i=0; i < sections.length; i++){
            		sections[i].classList.remove('active');
            	}
            	section.classList.add('active');
            }

            // Default route
            if (!route) {
            	sections[0].classList.add('active');
            }

		}
	};

	// Pages
	frisbeeApp.page = {
		schedule: function () {
			$$.json('https://api.leaguevine.com/v1/game_scores/?tournament_id=19389&access_token=c0d139912b',{},function(data){
				Transparency.render(qwery('[data-route=schedule')[0], frisbeeApp.schedule);
				Transparency.render(qwery('[data-route=schedule.time')[0], data);
				frisbeeApp.router.change();
				console.log(data);
			})			
		},

		game: function () {
		$$.json('https://api.leaguevine.com/v1/game_scores/?tournament_id=19389&access_token=c0d139912b',{},function(data){	
			Transparency.render(qwery('[data-route=game')[0], frisbeeApp.game);
				Transparency.render(qwery('[data-route=game.score')[0], data);
				frisbeeApp.router.change();
				console.log(data);
			})
		},

		ranking: function () {			
			$$.json('https://api.leaguevine.com/v1/pools/?tournament_id=19389&access_token=29da126e2c',{},function(data){
					Transparency.render(qwery('[data-route=ranking')[0], frisbeeApp.ranking);
					Transparency.render(qwery('[data-route=Tournament.pools')[0], data);
					//console.log(frisbeeApp.Tournament.pools);
					frisbeeApp.router.change();
				})
		}
	}
	// DOM ready
	domready(function () {
		// Kickstart application
		frisbeeApp.controller.init();
	});
	
})();
=======
var frisbeeApp = frisbeeApp || {};



(function () {

	// Fill schedule header

	frisbeeApp.schedule = {

		scheduleThead: [

			{

				description: 'Datum'

			},

			{

				description: 'Team'

			}, 

			{

				description: 'Team Score'

			}, 

			{

				description: 'Team'

			}, 

			{

				description: 'Team Score'

			}, 

			{

				description: 'Score Update'

			}

		]

	};

	// Fill schedule game objects

	frisbeeApp.gameObjects = {

		time: {

			text: function(params) {

				var time = new Date(this.time);	

				return time.getDay() + "-" + time.getMonth() + "-" + 

					time.getFullYear() + " " + time.getHours() + ":" + time.getMinutes();

			}

		},

		game_id: {

			text: function() {

				return "Update";

			},

			href: function(params) {

				return "#/game/"+this.game_id;

			}

		}

	};



	frisbeeApp.game = {

	    score1: 0,

	    score2: 0,

	    gameId: 0,

	       init: function () {
			   
	       		score1 = parseInt(document.getElementById('addScore1').innerHTML );

		        score2 = parseInt(document.getElementById('addScore2').innerHTML);

		        document.getElementById('plus1').onclick = function () {

		            score1++;

		            document.getElementById('addScore1').innerHTML = score1;

		            console.log(score1);

		        };

		        document.getElementById('plus2').onclick = function () {

		            score2++;

		            document.getElementById('addScore2').innerHTML = score2;

		            console.log(score2);

		        };

				document.getElementById('min1').onclick = function () {

					score1--;

		            document.getElementById('addScore1').innerHTML = score1;

		            console.log(score2);

	        	};				

				document.getElementById('min2').onclick = function () {

					score2--;

		            document.getElementById('addScore2').innerHTML = score2;

		            console.log(score2);

	        	};

                document.getElementById('finalScore').onclick = function () {

                    var type =  'POST';

                    var url  =  'https://api.leaguevine.com/v1/game_scores/';

                    var postData = JSON.stringify({

                    	game_id: gameId,

                    	team_1_score: score1,

                    	team_2_score: score2,

                    	is_final: 'True'

            		});

                	frisbeeApp.controller.post();	

                };

		    },



	    getScore1: function() {

	        return score1;

	    },



	    getScore2: function() {

	        return score2;

	    },



	    reset: function () {

	        var object = {};

	        for(key in frisbeeApp.controller.getCurrentSchedule().objects)

	        {

	        	object = frisbeeApp.controller.getCurrentSchedule().objects[key];

				if (object.game_id == gameId)

				{

					console.log("HELL YEAH");

					break;

				}

	        }
			document.getElementById('team_1').innerHTML = object.team_1.name;
			document.getElementById('team_2').innerHTML = object.team_2.name;
			document.getElementById('addScore1').innerHTML = object.team_1_score;
			document.getElementById('addScore2').innerHTML = object.team_2_score;
			
			score1 = document.getElementById('addScore1').innerHTML = object.team_1_score;

	        score2 = document.getElementById('addScore2').innerHTML = object.team_2_score;

	        document.getElementById('addScore1').innerHTML = score1;

	        document.getElementById('addScore2').innerHTML = score2;

	    },

	    

	   	setGameId: function (id) {

			gameId = id;

	    }

	    

	};



	frisbeeApp.ranking = {

		rankingThead: [

			{

				description: 'Teamnaam'

			}, {

				description: 'Keren gespeeld'

			}, {

				description: 'Win'

			}, {

				description: 'Lose'

			}, {

				description: 'Points Scored'

			}, {

				description: '+/-'

			}

		]

	};

	

	// Controller Init

    frisbeeApp.controller = {

    	currentSchedule: {},

        init: function(){

        		frisbeeApp.game.init();

                frisbeeApp.router.init();                                 

		},

    	post: function(type, url, postData){

            // Create request

            var xhr = new XMLHttpRequest();



            // Open request

            xhr.open(type,url,true);



            // Set request headers

            xhr.setRequestHeader('Content-type','application/json');

            xhr.setRequestHeader('Authorization','bearer 82996312dc');



            // Send request (with data as a json string)

            xhr.send(postData);

            

            console.log("verzonden");

    	},

    	setCurrentSchedule: function(schedule) {

    		currentSchedule = schedule;	

    	},

    	getCurrentSchedule: function(){

    		return currentSchedule;

    	}   

	};

	

	// Router

	frisbeeApp.router = {

		init: function () {

	  		routie({

			    '/schedule': function() {

			    	frisbeeApp.page.schedule();

				},

				'/game/:id': function(id) {

					frisbeeApp.page.game(id);

				},

			    '/ranking': function() {

			    	frisbeeApp.page.ranking();

			    },

		

			    '*': function() {

			       frisbeeApp.page.schedule();

			    }

			});

		},



		change: function (page) {

            	//var route = window.location.hash.slice(2),

                sections = qwery('section[data-route]'),

                section = qwery('[data-route=' + page + ']')[0];  



            // Show active section, hide all other

            if (section) {

            	for (var i=0; i < sections.length; i++){

            		sections[i].classList.remove('active');

            	}

            	section.classList.add('active');

            }



            // Default route

            if (!page) {

            	sections[0].classList.add('active');

            }



		}

	};



	// Pages

	frisbeeApp.page = {

		schedule: function () {

			$$.json('https://api.leaguevine.com/v1/game_scores/?tournament_id=19389&access_token=c0d139912b',{},function(data){

				frisbeeApp.controller.setCurrentSchedule(data);

				Transparency.render(qwery('[data-route=schedule')[0], frisbeeApp.schedule);	

				Transparency.render(document.getElementById('gameObjects'), data.objects, frisbeeApp.gameObjects);

				frisbeeApp.router.change("schedule");

				console.log(data);

			})			

		},



		game: function (id) {

		    frisbeeApp.game.setGameId(id);

		    frisbeeApp.game.reset();

			Transparency.render(qwery('[data-route=game')[0], frisbeeApp.game);

            frisbeeApp.router.change("game");

		},



		ranking: function () {			

			$$.json('https://api.leaguevine.com/v1/pools/?tournament_id=19389&access_token=29da126e2c',{},function(data2){

					Transparency.render(qwery('[data-route=ranking')[0], frisbeeApp.ranking);

					Transparency.render(qwery('[data-route=Tournament.pools')[0], data2);

					//console.log(frisbeeApp.Tournament.pools);

					frisbeeApp.router.change("ranking");

				})

		}

	}

	

	// DOM ready

	domready(function () {

		// Kickstart application

		frisbeeApp.controller.init();

	});

	

})();
>>>>>>> Update 2.0
