module.exports = function(grunt) {

    // Configure Project
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        'sftp-deploy': {
            build: {
                auth: {
                    host: '{%= host %}',
                    port: 22,
                    authKey: '{%= nickname %}'
                },
                src: '.',
                dest: '{%= path %}',
                exclusions: ['.DS_Store', '.ftppass', 'node_modules']
            }
        },

        sass: {
            dist: {
                options: {
                    sourcemap: 'none',
                    noCache: true
                },
                files: {
                    'css/master.css': 'scss/master.scss'
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 10 versions', 'ie 8', 'ie 9']
            },
            single_file: {
                src: 'css/master.css',
                dest: 'css/master.css'
            },
        },

        cssmin: {
          target: {
            files: [{
              expand: true,
              cwd: 'css',
              src: ['*.css', '!*.min.css'],
              dest: 'css',
              ext: '.min.css'
            }]
          }
        },

        uglify: {
            my_target: {
                files: {
                    'js/master.min.js': [
                        'js/main.js'
                    ]
                }
            }
        },

        watch: {
            sass: {
                files: 'scss/*.scss',
                tasks: ['sass', 'autoprefixer']
            }
        }

    });

    // Load Plugins
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sftp-deploy');

    // Register Tasks
    grunt.registerTask('default', ['sass', 'sftp-deploy']);
    grunt.registerTask('production', ['sass', 'cssmin', 'uglify', 'sftp-deploy']);

};