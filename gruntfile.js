module.exports = function(grunt) {

	var globalConfig = {
		proxy: 'px-theme.dev'
	};

	// load all grunt tasks matching the ['grunt-*', '@*/grunt-*'] patterns
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	grunt.initConfig({
		globalConfig: globalConfig,
		pkg: grunt.file.readJSON('package.json'),

		sass: {
			options: {
				sourceMap: true
			},

			dist: {
				options: {
					outputStyle: 'compressed'
				},
				files: {
					'assets/dist/main.min.css': 'assets/scss/styles.scss',
				}
			}
		},

		scsslint: {
			allFiles: [
			'assets/scss/**/*.scss'
			],
			options: {
				config: '.scss-lint.yml',
				colorizeOutput: true
			},
		},

		postcss: {
			options: {
				processors: [
					require('autoprefixer')({browsers: ['last 2 versions', 'ie >= 9']}),
				]
			},
			dist: {
				src: 'assets/dist/main.min.css'
			}
		},

		concat: {
			options: {
				separator: ';',
			},
			dist: {
				src: [
					'assets/js/modules/*.js',
					'assets/js/px-theme.js'
				],
				dest: 'assets/js/modules.js',
			},
		},

		uglify: {
			dist: {
				files: {
					'assets/dist/main.min.js': ['assets/js/modules.js']
				}
			}
		},

		jshint: {
			all: ['Gruntfile.js', 'assets/js/modules/*.js'],

			options: {
				reporter: require('jshint-stylish'),
				jshintrc: '.jshintrc'
			}
		},

		phplint: {
			all: ['**/*.php', '!vendor/*.php', '!vendor/**/*.php']
		},

		browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        '**/*.php', '!vendor/*.php', '!vendor/**/*.php',
                        'assets/dist/*.css',
                        'assets/dist/*.js'
                    ]
                },
                options: {
                    watchTask: true,
                    proxy: '<%= globalConfig.proxy %>'
                }
            }
        },

		watch: {
			grunt: { files: ['Gruntfile.js'] },

			sass: {
				files: 'assets/scss/**/*.scss',
				tasks: ['newer:scsslint', 'sass', 'postcss'],
				options: {
					livereload:true,
				}
			},

			js: {
				files: ['assets/js/vendor/**/*.js', 'assets/js/modules/**/*.js', 'assets/js/main.js'],
				tasks: ['newer:concat', 'newer:uglify'],
				options: {
					livereload:true,
				}
			},

			all: {
				files: ['**/*.php', '!vendor/*.php', '!vendor/**/*.php'],
				tasks: ['newer:phplint:all'],
				options: {
					livereload:true,
				}
			}
		}
	});

	grunt.registerTask('default', ['browserSync', 'watch']);
};
