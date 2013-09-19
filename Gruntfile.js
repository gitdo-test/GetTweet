module.exports = function(grunt) {

  grunt.initConfig({
  	pkg: grunt.file.readJSON('package.json'),

    mocha: {
      index: [ 'test/index.html' ]
    }

  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-node-version');

  grunt.registerTask('test', ['mocha']);
};
