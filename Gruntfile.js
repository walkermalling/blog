module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-casperjs');

  grunt.initConfig({

    // JS HINT
    jshint: {
      all: ['Gruntfile.js', 'server.js']
    },

    // SASS
    sass: {                              // Task
      dist: {                            // Target
        options: {                       // Target options
          style: 'expanded'
        },
        files: {
          './app/style/master.compiled.css': './app/style/master.scss'
        }
      }
    },

    // CASPER
    casperjs: {
      options: {
        async: {
          parallel: false
        }
      },
      files: ['test/acceptance/**/*.js']
    }

  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.registerTask('default', ['jshint','sass','casperjs']);
};
