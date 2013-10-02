module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
        'Gruntfile.js',
        'get-tweet.js',
        'test/**/*.js',
        'demo/**/*.js'
      ],
      options: {
        ignores: ['test/lib/**/*.js'],
        jshintrc: './.jshintrc'
      }
    },

    mocha: {
      test: {
        src: ['test/index.html'],
        options: {
          log: true,
          reporter: 'Nyan',
          run: true
        }
      }
    },

    connect: {
      server: {
        options: {
          hostname: 'localhost'
        }
      }
    },

    watch: {
      scripts: {
        files: ['**/*.js'],
        tasks: ['test'],
        options: {
          atBegin: true,
          spawn: false
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-node-version');

  grunt.registerTask('run', ['connect', 'watch']);
  grunt.registerTask('test', ['jshint', 'mocha']);
};
