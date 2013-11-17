module.exports = function(grunt) {

  // Plugins
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');


  // Tasks
  grunt.registerTask('dev', ['concat', 'uglify:core', 'less', 'watch']);
  grunt.registerTask('vendor', ['uglify:vendor']);
  // grunt.registerTask('build', 'uglify:production');

  // The order matters!
  var
    coreFiles = [
      'src/js/*.js'
    ],
    vendorFiles = [
      'vendor/jquery/jquery.min.js'
      // 'vendor/bootstrap/dist/css/bootstrap.min.css'
    ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %>*/\n',

    concat: {
      dev: {
        options: {
          stripBanners: true,
          separator: ';'
        },
        src: coreFiles,
        dest: 'public/js/<%= pkg.name %>.js'
      }
    },

    less: {
      core: {
        options: {
          yuicompress: true
        },
        files: {
          'public/css/styles.css': [
            'src/less/*.less'
          ],
          'public/css/bootstrap.min.css': [
            'vendor/bootstrap/less/bootstrap.less'
          ]
        }
      }
    },

    uglify: {
      vendor: {
        src: vendorFiles,
        dest: 'public/js/vendor.js'
      },
      core: {
        options: {
          report: 'min',
          banner: '<%= banner %>'
        },
        files: {
          'public/js/<%= pkg.name %>.min.js': coreFiles
        }
      }
    },
    qunit: {
      files: ['tests/**/*.html']
    },

    watch: {
      js: {
        files: [
          'src/**/*.js'
        ],
        tasks: [
          'concat',
          'uglify:core'
        ],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['src/less/*.less'],
        tasks: ['less']
      },
      // options: {
      //   livereload: true
      // },
      // files: '<config:jshint.all>',
      // tasks: 'concat'

      javascriptDev: {
          files: ['src/js/**/*.js'],
          tasks: ['concat:dev'],
          options: {
              livereload: false
          }
      },

      test: {
        files: ['test/**/*.js'],
        tasks: ['qunit']
      }
    }
  });
};