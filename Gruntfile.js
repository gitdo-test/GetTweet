module.exports = function(grunt) {

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
          reporter: 'List',
          run: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-node-version');

  grunt.registerTask('test', ['mocha']);
};
