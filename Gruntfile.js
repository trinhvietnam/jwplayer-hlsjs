'use strict';
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist/*'],
        },
        jshint: {
            options: {jshintrc: '.jshintrc'},
            all: ['src/*.js'],
        },
        browserify: {
            options: {
                browserifyOptions: {
                    standalone: 'jwplayer_hls_provider',
                    debug: true,
                },
                plugin: ['browserify-derequire'],
            },
            dist: {
                files: {'dist/jwplayer.hlsjs.js': ['src/jwplayer.hlsjs.js']},
            },
        },
        exorcise: {
            dist: {
                options: {},
                files: {
                    'dist/jwplayer.hlsjs.js.map': ['dist/jwplayer.hlsjs.js'],
                },
            },
        },
        uglify : {
            options: {
                sourceMap: true,
                sourceMapIn: 'dist/jwplayer.hlsjs.js.map',
            },
            dist: {
                files: {'dist/jwplayer.hlsjs.min.js': 'dist/jwplayer.hlsjs.js'},
            },
        },
    });
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('build', ['clean', 'jshint', 'browserify:dist',
        'exorcise', 'uglify']);
    grunt.registerTask('default', ['build']);
};
