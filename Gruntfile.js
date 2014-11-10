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
                         'bower_components/bxslider-4/jquery.bxslider.min.js', 
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
                         'bower_components/bxslider-4/jquery.bxslider.css', 
                         'bower_components/fontawesome/css/font-awesome.min.css', 
                        ],
                        dest: 'dist/css/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [
                          'bower_components/bootstrap/dist/fonts/*', 
                          'bower_components/fontawesome/fonts/*', 
                        ],
                        dest: 'dist/fonts/'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: [
                          'bower_components/bxslider-4/images/*'
                        ],
                        dest: 'dist/images/'
                    },

                ],
            },
        },

        /**** watch task ***/

        watch: {
          scripts: {
            files: ['src/**', 'Gruntfile.js'],
            tasks: ['copy', 'replace', 'dom_munger:addLivereload'],
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
          },

        /*** replace texts in files ***/
        replace: {
          bxslidercss: {
            src: ['dist/css/jquery.bxslider.css'],             // source files array (supports minimatch)
            dest: 'dist/css/jquery.bxslider.css',             // destination directory or file
            replacements: [{
              from: '(images',                   // string replacement
              to: '(../images'
            }]
          },

          bxsliderjs: {
            src: ['dist/js/jquery.bxslider.min.js'],             // source files array (supports minimatch)
            dest: 'dist/js/jquery.bxslider.min.js',             // destination directory or file
            replacements: [{
              from: 'margin:"0 auto 0px"',                   // string replacement
              to: ''
            }]
          }

        },

        /**** launch browser ****/
        open: {
            dev : {
              path: 'http://localhost:9001/',
              app: 'Firefox'
            }
        },

        /**** less for bootstra ****/
        less: {
          development: {
            options: {
              paths: ["less"]
            },
            files: {
              "dist/css/bootstrap.min.css": "less/bootstrap.less"
            }
          },
          production: {
            options: {
              paths: ["less"],
              cleancss: true
            },
            files: {
              "dist/css/bootstrap.min.css": "less/bootstrap.less"
            }
          },
        },                

    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-dom-munger');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['copy', 'less:development', 'replace', 'dom_munger:addLivereload', 'connect', 'open', 'watch']);
    grunt.registerTask('build', ['copy', 'less:production', 'replace']);
};