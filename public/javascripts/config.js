requirejs.config({
	shim: {
		'underscore': { exports: '_' },
		'backbone': { deps: ['jquery', 'underscore'], exports: 'Backbone' },
		'Three': { exports: 'THREE' },
		'Stats': { exports: 'Stats' },
		'Processing': { exports: 'Processing' }
	},
	paths: {
		'jquery': 'vendor/jquery',
		'Processing': 'vendor/processing',
		'toxi': 'vendor/toxi',
		'dat': 'vendor/dat',
		'backbone': 'vendor/backbone',
		'underscore': 'vendor/underscore',
		'Three': 'vendor/Three',
		'Stats': 'vendor/Stats',
		'domReady': 'vendor/domReady',
		'text': 'vendor/text'
	}
});