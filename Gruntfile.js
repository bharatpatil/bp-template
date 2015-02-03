module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*!\n' +
                ' * Bootstrap v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
                ' * Copyright 2011-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
                ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n' +
                ' */\n',
        // NOTE: This jqueryCheck/jqueryVersionCheck code is duplicated in customizer.js;
        //       if making changes here, be sure to update the other copy too.
        jqueryCheck: [
          'if (typeof jQuery === \'undefined\') {',
          '  throw new Error(\'Bootstrap\\\'s JavaScript requires jQuery\')',
          '}\n'
        ].join('\n'),
        jqueryVersionCheck: [
          '+function ($) {',
          '  var version = $.fn.jquery.split(\' \')[0].split(\'.\')',
          '  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1)) {',
          '    throw new Error(\'Bootstrap\\\'s JavaScript requires jQuery version 1.9.1 or higher\')',
          '  }',
          '}(jQuery);\n\n'
        ].join('\n'),

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
                         // 'bower_components/bootstrap/dist/js/bootstrap.min.js', 
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
                         // 'bower_components/bootstrap/dist/css/bootstrap.min.css', 
                         'bower_components/bxslider-4/jquery.bxslider.css', 
                         // 'bower_components/fontawesome/css/font-awesome.min.css', 
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
            files: ['src/**', 'Gruntfile.js', 'less/**'],
            tasks: ['myWatch'],
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
              "dist/css/combined.min.css": "less/bootstrap.less"
            }
          },
          production: {
            options: {
              paths: ["less"],
              cleancss: true
            },
            files: {
              "dist/css/combined.min.css": "less/bootstrap.less"
            }
          },
        },  

        /**** concat js files of bootstrap ****/
        concat: {
          options: {
            banner: '<%= banner %>\n<%= jqueryCheck %>\n<%= jqueryVersionCheck %>',
            stripBanners: false
          },          
          bootstrap: {
            src: [
              'bower_components/bootstrap/js/transition.js',
              'bower_components/bootstrap/js/alert.js',
              'bower_components/bootstrap/js/button.js',
              'bower_components/bootstrap/js/carousel.js',
              'bower_components/bootstrap/js/collapse.js',
              'bower_components/bootstrap/js/dropdown.js',
              'bower_components/bootstrap/js/modal.js',
              'bower_components/bootstrap/js/tooltip.js',
              'bower_components/bootstrap/js/popover.js',
              'bower_components/bootstrap/js/scrollspy.js',
              'bower_components/bootstrap/js/tab.js',
              'bower_components/bootstrap/js/affix.js'
            ],
            dest: 'dist/js/bootstrap.min.js'
          }
        },

        /**** uglify js files ****/
        uglify: {
          options: {
            preserveComments: 'some'
          },
          core: {
            src: 'dist/js/bootstrap.min.js',
            dest: 'dist/js/bootstrap.min.js'
          },
        },                          

        /********** delete empty directories and files ************/    
        cleanempty: {
          options: {
          },
          dist: {
            options: {
              files: true
            },
            src: ['dist/**/*']
          }
        },        

        /********** delete files and folders *************/
        clean: {
          dist: {
            src: ["dist/**/*"]
          }
        },       

    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-dom-munger');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-cleanempty');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['clean:dist', 'copy', 'less:development', 'concat', 'uglify', 'replace', 'dom_munger:addLivereload', 'connect', 'open', 'watch']);
    grunt.registerTask('build', ['clean:dist', 'copy', 'less:production', 'concat', 'uglify', 'replace']);
    grunt.registerTask('myWatch', ['clean:dist', 'copy', 'less:development', 'concat', 'uglify', 'replace', 'dom_munger:addLivereload']);

};