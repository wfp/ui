// Gruntfile.js
module.exports = function(grunt) {
  require('time-grunt')(grunt);
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: 'scss/**/**/*.scss',
        tasks: ['build', 'docs']
      },
      eslint: {
        files: 'js/**/*.js',
        tasks: ['eslint']
      },
      docs: {
        files: ['docs/**/*.*', 'scss/**/**/*.scss'],
        tasks: ['docs']
      }
    },
    clean: {
      grunticon: ['dist/assets/icons/ui', 'dist/assets/icons/thematic'],
      svg: ['icons/ui/dist']
    },
    pure_grids: {
      responsive: {
        dest: 'scss/css/_grid-units.scss',
        options: {
          units: [5,12,24],
          includeOldIEWidths: false,
          mediaQueries: {
            sm: 'screen and (min-width: 36.5em)', //584px
            md: 'screen and (min-width: 48em)', //768px
            lg: 'screen and (min-width: 64em)', //1024px
            xl: 'screen and (min-width: 80em)'  //1200px
          },
          selectorPrefix: '.wfp-u-'
        }
      }
    },
    sass: {
      options: {
        outputStyle: 'expanded',
        sourceMap: true,
        indentedSyntax: true,
        sassDir: 'scss',
        cssDir: 'dist/css',
        includePaths: [
          'node_modules/mathsass/dist'
        ],
        includePaths: [
          'node_modules'
        ]
      },
      dev: {
        files: [{
          expand: true,
          cwd: 'scss/',
          src: ['*.scss'],
          dest: 'dist/css/',
          ext: '.css'
        }]
      },
      dist: {
        options: {
          sourceMap: false
        },
        files: [{
          expand: true,
          cwd: 'scss/',
          src: ['*.scss'],
          dest: 'dist/css/',
          ext: '.css'
        }]
      },
      docs: {
        files: {
          'docs/css/main.css': 'docs/_sass/main.scss',
          'docs/css/bootstrap-theme.css': 'scss/bootstrap-theme.scss'
        }
      },
      docsDist: {
        options: {
          sourceMap: false
        },
        files: {
          'docs/css/main.css': 'docs/_sass/main.scss',
          'docs/css/bootstrap-theme.css': 'scss/bootstrap-theme.scss'
        }
      }
    },
    postcss: {
      options: {
        syntax: require('postcss-scss'),
        processors: [
          require('autoprefixer')({ browsers: ['last 3 version', 'ff >= 22', 'ie >= 11', 'Chrome >= 28', 'Safari >= 6'] }),
          require('pixrem')(),
          //require('postcss-wcag-contrast')()
        ],
        map: {
          inline: false,
        }
      },
      dist: {
        options: {
          processors: [
            require('autoprefixer')({ browsers: ['last 3 version', 'ff >= 22', 'ie >= 11', 'Chrome >= 28', 'Safari >= 6'] }),
            require('pixrem')(),
            //require('postcss-wcag-contrast')(),
            require('cssnano')()
          ],
          map: false
        },
        src: 'dist/css/*.css'
      },
      dev: {
        src: 'dist/css/*.css'
      },
      docs: {
        options: {
          processors: [
            require('autoprefixer')({ browsers: ['last 3 version', 'ff >= 22', 'ie >= 11', 'Chrome >= 28', 'Safari >= 6'] }),
            require('pixrem')()
          ]
        },
        src: 'docs/css/*.css'
      },
      docsDist: {
        options: {
          processors: [
            require('autoprefixer')({ browsers: ['last 3 version', 'ff >= 22', 'ie >= 11', 'Chrome >= 28', 'Safari >= 6'] }),
            require('pixrem')(),
            require('cssnano')()
          ],
          map: false
        },
        src: 'docs/css/*.css'
      }
    },
    grunticon: {
      ui: {
        files: [{
          expand: true,
          cwd: 'icons/ui/src',
          src: ['*.svg'],
          dest: 'dist/assets/icons/ui'
        }],
        options: {
          dynamicColorOnly: true,
          colors: {
            light: '#ffffff',
            dark: '#000000'
          },
          datasvgcss: 'ui-icons.svg.css',
          datapngcss: 'ui-icons.png.css',
          urlpngcss: 'ui-icons.fallback.css'
        }
      },
      thematic: {
        files: [{
          expand: true,
          cwd: 'icons/thematic',
          src: ['*.svg'],
          dest: 'dist/assets/icons/thematic'
        }],
        options: {
          datasvgcss: 'thematic-icons.svg.css',
          datapngcss: 'thematic-icons.png.css',
          urlpngcss: 'thematic-icons.fallback.css',
          cssprefix: '.thematic-'
        }
      }
    },
    svgcolorify: {
      light: {
        options: {
          colorify: '#ffffff'
        },
        files: [{
          expand: true,
          cwd: 'icons/ui/src',
          src: '*.svg',
          dest: 'icons/ui/dist/light'
        }]
      },
      dark: {
        options: {
          colorify: '#232323'
        },
        files: [{
          expand: true,
          cwd: 'icons/ui/src',
          src: '*.svg',
          dest: 'icons/ui/dist/dark'
        }]
      },
      primary: {
        options: {
          colorify: '#0374e6'
        },
        files: [{
          expand: true,
          cwd: 'icons/ui/src',
          src: '*.svg',
          dest: 'icons/ui/dist/primary'
        }]
      }
    },
    datauri: {
      light: {
        options: {
          classPrefix: 'icon-light-',
          usePlaceholder: true
        },
        files: [{
          src: 'icons/ui/dist/light/**/*.svg',
          dest: 'scss/icons/_icons-light.scss'
        }]
      },
      dark: {
        options: {
          classPrefix: 'icon-dark-',
          usePlaceholder: true
        },
        files: [{
          src: 'icons/ui/dist/dark/**/*.svg',
          dest: 'scss/icons/_icons-dark.scss'
        }]
      },
      primary: {
        options: {
          classPrefix: 'icon-primary-',
          usePlaceholder: true
        },
        files: [{
          src: 'icons/ui/dist/primary/**/*.svg',
          dest: 'scss/icons/_icons-primary.scss'
        }]
      }
    },
    jekyll: {
      dist: {
        options: {
          src: './docs',
          config: './docs/_config.yml',
          dest: './dist/docs'
        }
      }
    },
    uglify: {
      options: {
        mangle: false,
        wrap: false,
        screwIE8: true
      },
      dist: {
        files: [
          {
            expand: true,
            src: ['js/**/*.js'],
            dest: 'dist/js/',
            flatten: true
          }
        ]
      },
      docs: {
        options: {
          compress: false,
          beautify: {
            beautify: true,
            indent_level: 2
          },
          preserveComments: 'all',
          screwIE8: true
        },
        files: [
          {
            expand: true,
            src: ['js/**/*.js'],
            dest: 'docs/js/',
            flatten: true
          }
        ]
      }
    },
    eslint: {
      target: ['js/**/**/*.js'],
      options: {
        ignorePattern: ['js/lib/**/*.js']
      }
    },
    sasslint: {
      options: {
        config: '.sass-lint.yml',
      },
      target: ['scss/**/**/*.scss']
    },
    htmlaudit: {
      default: {
        options: {
          baseUri: 'http://cdn.wfp.org/guides/ui/v0.12.0/'
        },
        src: './dist/docs/*.html'
      },
      ci: {
        options: {
          tests: {
            a11y: true,
            html5: true,
            link: false
          },
          showSummaryOnly: true
        },
        src: './dist/docs/*.html'
      }
    },
    copy: {
      docsJS: {
        files: [
          {
            expand: true,
            src: ['dist/js/**'],
            dest: 'docs/js/',
            flatten: true
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-datauri');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-grunticon');
  grunt.loadNpmTasks('grunt-html-auditor');
  grunt.loadNpmTasks('grunt-jekyll');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-sass-lint');
  grunt.loadNpmTasks('grunt-svg-colorify');
  grunt.loadNpmTasks('grunt-pure-grids');

  // Build SVGs and SCSS
  grunt.registerTask('gen-svg', ['clean:svg', 'svgcolorify', 'datauri', 'clean:svg']);
  // Build Grunticon Icons
  grunt.registerTask('gen-icons', ['clean:grunticon', 'grunticon']);
  // Build WFP UI Docs locally
  grunt.registerTask('docs', ['sass:docs', 'copy', 'postcss:docs', 'uglify:docs', 'jekyll']);
  // Build WFP UI Docs
  grunt.registerTask('docs-build', ['sasslint', 'sass:docs', 'copy', 'uglify:docs', 'postcss:docs', 'jekyll']);
  // Build dist-ready WFP UI Docs
  grunt.registerTask('docs-dist', ['sass:docsDist', 'copy', 'postcss:docsDist', 'uglify:docs', 'jekyll']);
  // Build WFP UI
  grunt.registerTask('build', ['eslint', 'sasslint', 'sass:dev', 'postcss:dev']);
  // Build all assets for distribution
  grunt.registerTask('dist-assets', ['gen-svg', 'gen-icons']);
  // Build a dist-ready WFP UI with all stati resources
  grunt.registerTask('dist', ['sass:dist', 'postcss:dist', 'uglify:dist']);
  // Run build and dist task in sequence (for Travis CI)
  grunt.registerTask('test', ['eslint', 'sasslint', 'htmlaudit:ci']);
  // Set default grunt task to `dist`
  grunt.registerTask('default', ['dist']);
};
