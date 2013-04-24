require(['./config'], function( config ){
	require(['domReady', 'app/main'], function(domReady, app){
		//once the dom is ready, execute the app
		domReady(function(){
			app( document.body );
		});
	});
});