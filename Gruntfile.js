module.exports = function(grunt){
	grunt.initConfig({
		// compile .scss/.sass to .css using Compass
		// http://compass-style.org/help/tutorials/configuration-reference/#configuration-properties
		compass: {
			dist: {
				options: {
					cssDir: 'public/stylesheets',
					sassDir: 'sass'
				}
			}
		},
		//compile requirejs files for production
		requirejs: {
			compile: {
				options: {
					appDir: 'public/',
					baseUrl: 'javascripts',
					dir: 'dist/',
					optimizeCss: 'standard',
					optimize: 'none',
					mainConfigFile: 'public/javascripts/config.js',
					modules: [
						{
							name: 'config',
							include: ['domReady']
						},
						{
							name: 'Processing',
							include: [
								'backbone',
								'underscore'
							]
						},
						{
							name: 'app/main',
							exclude: [
								'backbone',
								'underscore',
								'Processing'
							]
						}
					]
				}
			}
		},
		//better-than-watch
		regarde: {
			compass: {
				files: [
					'scss/*.{scss,sass}',
				],
				tasks: 'compass'
			}
		}
	});
	grunt.loadNpmTasks('grunt-regarde');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.registerTask('default', ['compass','requirejs', 'regarde']);
	grunt.registerTask('dist', ['compass','requirejs']);
};