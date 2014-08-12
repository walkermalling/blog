module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-casperjs');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean : ['dist'],

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
    },

    // CONCAT
    concat: {
      dist: {
        src: ['app/bower_components/**/*.js', 'app/scripts/*.js'],
        dest: 'dist/scripts/bundle.js',
      },
    },

    uglify: {
      my_target: {
        files: {
          'dist/scripts/bundle.min.js': ['dist/scripts/bundle.js']
        }
      }
    },

    // HTMLMIN
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'dist/index.html': 'app/index.html',     // 'destination': 'source'
        }
      }
    },

    // BROWSERIFY
    browserify: {
      all: {
        src: 'app/scripts/*.js',
        dest: 'dist/scripts/app.js'
      },
      options: {
        transform: ['debowerify'],
        debug: true
      }
    },

    // EXPESS SEVER
    express: {
      dev: {
        options: {
          script: 'server.js'
        }
      },
      // prod: {
      //   options: {
      //     script: 'path/to/prod/server.js',
      //     node_env: 'production'
      //   }
      // },
      // test: {
      //   options: {
      //     script: 'path/to/test/server.js'
      //   }
      // }
    }


  });
  grunt.registerTask('test', ['express','casperjs']);
  grunt.registerTask('default', ['jshint','clean','sass','concat','htmlmin','uglify','browserify']);
};
