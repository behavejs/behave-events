var path = require('path');

module.exports = function(grunt) {
    "use strict";

    /**
     * Use `load-grunt-config` plugin to load task config dynamicly
     */
    require('load-grunt-config')(grunt, {
        configPath: path.join(__dirname, 'grunt-tasks'),
        loadGruntTasks: {
            config: require('./package.json'),
        }
    });

    grunt.registerTask('default', ['test']);
    grunt.registerTask('dev', ['browserify:dev']);
    grunt.registerTask('test', ['clean:test', 'jshint', 'browserify:spec', 'jasmine']);
    grunt.registerTask('build', ['clean:dist', 'jshint', '6to5']);
};
