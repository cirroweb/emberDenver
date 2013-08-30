/* jshint camelcase: false, strict: false */
/* global module, console */

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // uglify: {
    //   'dist/built.min.js': 'dist/built.js'
    // },

    neuter: {
      options: {
        template: '(function(window, undefined){\n\'use strict\';\n\n{%= src %}\n})(window);',
        includeSourceURL: true
      },
      'build/application.js': 'app/**/*.js',
      'test/build/unit_tests.js': [
        'test/utils/**/*.js',
        'test/unit/**/*.js'
      ],
      'test/build/integration_tests.js' : [
        'test/utils/**/*.js',
        'test/integration/**/*.js'
      ]
    },

    watch: {
      application_code: {
        files: [
          'sass/**/*.sass',
          'dependencies/**/*.js',
          '!dependencies/compiled/*.*',
          'app/**/*.js',
          'app/**/*.hbs',
          'test/**/*.js'
        ],
        tasks: ['watch_log_start', 'build', 'test']
      },
      jshint: {
        files: ['.jshintrc'],
        tasks: ['jshint']
      }
    },

    qunit: {
      all: ['test/unit_tests.html', 'test/integration_tests.html']
    },

    jshint: {
      all: [
        'Gruntfile.js',
        '!dependencies/*.*',
        'app/**/*.js',
        'test/**/*.js',
        '!test/build/**/*.js',
        '!test/support/*.*',
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    ember_templates: {
      options: {
        templateName: function(sourceFile) {
          return sourceFile.replace(/app\/templates\//, '');
        }
      },
      'dependencies/compiled/templates.js': ['app/templates/**/*.hbs']
    },

    sass: {
      dev: {
        files: {
          'build/main.css': ['sass/main.sass', 'sass/**/*.sass']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-neuter');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('watch_log_start', 'Logs the date and time.', function() {
    console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('  WATCH START: ' + new Date());
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  });

  grunt.registerTask('build', ['jshint', 'ember_templates', 'sass', 'neuter']);
  grunt.registerTask('test', ['qunit']);
  grunt.registerTask('default', ['build', 'watch']);
};