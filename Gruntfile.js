// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'js/*.js']
    },

    // configure uglify to minify js files -------------------------------------
    uglify: {
      build: {
        files: {
          'js/main.min.js': ['js/main.js']
        }
      }
    },

    // compile sass stylesheets to css -----------------------------------------
    sass: {
      build: {
        files: {
          'css/main.css': 'css/scss/main.scss'
        }
      }
    },

    // configure cssmin to minify css files ------------------------------------
    cssmin: {
      build: {
        files: {
          'css/main.min.css': 'css/main.css'
        }
      }
    },

    // configure watch to auto update ----------------
    watch: {
      
      // for stylesheets, watch css and sass files 
      // only run sass and cssmin
      stylesheets: { 
        files: ['css/main.css', 'css/scss/**/*.scss'], 
        tasks: ['sass', 'cssmin']
    },

      // for scripts, run jshint and uglify 
      scripts: { 
        files: 'js/*.js', tasks: ['jshint', 'uglify'] 
      } 
    }
  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // create tasks
  grunt.registerTask('default', ['jshint', 'uglify', 'sass']);
};