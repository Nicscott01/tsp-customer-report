//GRUNTFILE for BRIC
const sass = require('node-sass');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            // this is the "dev" Sass config used with "grunt watch" command
            dist: {
                options: {
                    implementation: sass,
                    sourceMap: true,
                    style: 'compressed',
                    // tell Sass to look in the Bootstrap stylesheets directory when compiling
                    includePaths: ['node_modules/bootstrap/scss/', 'assets/src/css/tsp/']
                },
                files: {
                    // the first path is the output and the second is the input
                    'assets/css/style.css': 'assets/src/css/style.scss'
                }
            }
            // this is the "production" Sass config used with the "grunt buildcss" command
        },
        // configure the "grunt watch" task
        watch: {
            sass: {
                files: 'assets/src/css/*.scss',
                tasks: ['sass:dev', 'postcss']
            }
        },
        concat: {
            options: {
                separator: ';',
                stripBanners: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                sourceMap: true
            },
            js: {
                src: ['assets/src/js/bric/*.js'],
                dest: 'assets/src/js/bric.js'
            }
        },
        uglify: {
            options: {
                manage: false,
                preserveComments: 'all' //preserve all comments on JS files
            },
            photoswipe: {
                options: {
                    preserveComments: false
                },
                files: {
                    'assets/js/photoswipe-thumbnail-opener.min.js': ['assets/src/js/photoswipe-thumbnail-opener.js'],
                    'assets/js/google-maps-render.min.js': ['assets/src/js/google-maps-render.js'],
                    'assets/js/bric.min.js': ['assets/src/js/bric.js'],
                    'assets/js/customizer-carousel.min.js': ['assets/src/js/customizer-carousel.js'],
                    'assets/js/jQuery-inView.min.js': ['assets/src/js/jQuery-inView.js']
                }
            }


        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'node_modules/jquery/dist',
                    src: ['jquery.min.js', 'jquery.min.map'],
                    dest: 'assets/js/',
                    filter: 'isFile',
                    flatten: true,
                }, {
                    expand: true,
                    cwd: 'node_modules/bootstrap/dist/js/',
                    src: ['bootstrap.bundle.min.js', 'bootstrap.bundle.min.js.map'],
                    dest: 'assets/js/',
                    filter: 'isFile',
                    flatten: true,
                }, {
                    expand: true,
                    cwd: 'node_modules/slideout/dist/',
                    src: ['slideout.min.js'],
                    dest: 'assets/js/',
                    filter: 'isFile',
                    flatten: true,
                }, {
                    expand: true,
                    cwd: 'node_modules/photoswipe/dist/',
                    src: ['photoswipe.min.js', 'photoswipe-ui-default.min.js'],
                    dest: 'assets/js/',
                    filter: 'isFile',
                    flatten: true,
                }, {
                    expand: true,
                    cwd: 'assets/src/css/photoswipe/default-skin/',
                    src: ['*'],
                    dest: 'assets/css/photoswipe/default-skin/',
                    filter: 'isFile',
                    flatten: true,
                }, {
                    expand: true,
                    cwd: 'node_modules/waypoints/lib/',
                    src: ['jquery.waypoints.min.js', 'shortcuts/inview.min.js'],
                    dest: 'assets/js/',
                    filter: 'isFile',
                    flatten: true,
                }, {
                    expand: true,
                    cwd: 'node_modules/stickyfilljs/dist/',
                    src: ['stickyfill.min.js'],
                    dest: 'assets/js/',
                    filter: 'isFile',
                    flatten: true,
                }, {
                    expand: true,
                    cwd: 'node_modules/in-view/dist/',
                    src: ['in-view.min.js'],
                    dest: 'assets/js/',
                    filter: 'isFile',
                    flatten: true,
                }]
            }
        },

        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')
                ]
            },
            dist: {
                src: 'assets/css/*.css'
            }
        },

        image: {
            static: {
                options: {
                    optipng: false,
                    pngquant: true,
                    zopflipng: true,
                    jpegRecompress: false,
                    mozjpeg: true,
                    gifsicle: true,
                    svgo: true
                },
                files: {
                    'dist/img.png': 'src/img.png',
                    'dist/img.jpg': 'src/img.jpg',
                    'dist/img.gif': 'src/img.gif',
                    'dist/img.svg': 'src/img.svg'
                }
            },
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/src/img/',
                    src: ['**/*.{png,jpg,gif,svg}'],
                    dest: 'assets/img/'
                }]
            }
        },

        svgstore: {
            options: {
                prefix: '', // This will prefix each <g> ID
            },
            default: {
                files: {
                    'assets/svgs/svg-sprites.svg': ['assets/src/svgs/*.svg'],
                }
            }
        }


    });

    // Load the plugin that provides the "watch" task.
    //grunt.loadNpmTasks('grunt-contrib-watch');

    // Load the plugin that provides the "sass" task.
    grunt.loadNpmTasks('grunt-sass');
    //grunt.loadNpmTasks('grunt-contrib-sass');


    grunt.loadNpmTasks('grunt-postcss');

    //grunt.loadNpmTasks('grunt-contrib-uglify');

    //    grunt.loadNpmTasks('grunt-contrib-copy');

    //  grunt.loadNpmTasks('grunt-contrib-concat');


    grunt.loadNpmTasks('grunt-image');
    grunt.loadNpmTasks('grunt-svgstore');

    // Default task(s).
    grunt.registerTask('default', ['sass:dist', 'postcss']);
    grunt.registerTask('js', ['copy', 'concat', 'uglify']);
};