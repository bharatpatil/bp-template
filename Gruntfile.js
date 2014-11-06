module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        copy: {
            main: {
                nonull: true,
                files: [{
                        expand: true,
                        cwd: 'src/',
                        src: ['**'],
                        dest: 'dist/'
                    },
                    //copy all required js
                    {
                        expand: true,
                        flatten: true,
                        src: ['bower_components/jquery/jquery.min.js',
                         'bower_components/bootstrap/dist/js/bootstrap.min.js', 
                         'bower_components/bxslider/jquery.bxSlider.min.js', 
                         'bower_components/html5shiv/dist/html5shiv.min.js', 
                         'bower_components/respond/dest/respond.min.js' 
                        ],
                        dest: 'dist/js/'
                    },
                    //copy all required css
                    {
                        expand: true,
                        flatten: true,
                        src: [
                         'bower_components/bootstrap/dist/css/bootstrap.min.css', 
                         'bower_components/bxslider/bx_styles/bx_styles.css', 
                         'bower_components/bxslider/bx_styles/gray_*',
                        ],
                        dest: 'dist/css/'
                    },
                    //required file by bxslider
                    {
                        expand: true,
                        flatten: true,
                        src: [
                          'bower_components/bootstrap/dist/fonts/*', 
                        ],
                        dest: 'dist/fonts/'
                    },

                ],
            },
        },

        /**** watch task ***/

        watch: {
          scripts: {
            files: ['src/**'],
            tasks: ['copy', 'dom_munger:addLivereload'],
            options: {
              spawn: false,
              debounceDelay: 250,
              livereload: true,
            },
          },
        },   

        /**** connect task ***/
        connect: {
          server: {
            options: {
              port: 9001,
              base: 'dist'
            }
          }
        },

        /*** dom munger ****/
        dom_munger: {
            addLivereload: {
              options: {
                append: {selector:'head',html:'<script src="//localhost:35729/livereload.js"></script>'}
              },
              src: 'dist/index.html',
              dest: 'dist/index.html'
            },
          }


    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-dom-munger');

    grunt.registerTask('default', ['copy', 'dom_munger:addLivereload', 'connect', 'watch']);
};