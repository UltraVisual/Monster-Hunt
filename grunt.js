/*global module:false*/
module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        server: {
            port: 9999,
            base: 'dev'
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                jQuery: true
            }
        },
        min: {
            dist: {
                src: ['dist/monster-hunt.js'],
                dest: 'dist/monster-hunt.min.js'
            }
        },
        shell: {
            build_impact: {
                command: 'bake.bat',
                stdout:true,
                execOptions: {
                    cwd: 'dev/js/libs/impact/tools'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-shell');
    // Default task.
    grunt.registerTask('default', 'build');

    grunt.registerTask('wait', 'Wait for a set amount of time.', function(delay) {
        var d = delay ? delay + ' second' + (delay === '1' ? '' : 's') : 'forever';
        grunt.log.write('Waiting ' + d + '...');
        var done = this.async();
        if (delay) { setTimeout(done, delay * 1000); }
    });

    grunt.registerTask('test-server', ['server', 'wait']);
    grunt.registerTask('build', ['shell:build_impact', 'min'])
};
