module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
	 	less: {
      './src/styles/app.css': ['./src/styles/app.less']
    },
		nodewebkit: {
      options: {
        version: '0.10.5',
        build_dir: './',
        mac: true,
        win: false,
        linux32: false,
        linux64: false,
        keep_nw: false,
        zip: false
      },
      src: ['./src/**/*'] 
    },
		clean: ["./SuuntoDMEditor/**/*"],
		shell: {
      install: {
        command: function() {
      		return 'bower cache clean && bower install && cd src && npm install';
        },
        options: {
          stdout: true,
          stderr: true,
          stdin: true
        }
      },
      run: {
        command: function() {
          return "/Applications/node-webkit.app/Contents/MacOS/node-webkit src";
        },
        options: {
          stdout: true,
          stderr: true,
          stdin: true
      	}
      }
    }
	});

	grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');

	grunt.registerTask('default', ['less', 'shell:run']);
	grunt.registerTask('run', ['default']);
  grunt.registerTask('install', ['shell:install', 'nodewebkit']);
  grunt.registerTask('build', ['less', 'nodewebkit']);
};
