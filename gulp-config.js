var dest = './build';
var src = './src';

module.exports = {
  dest: dest,
  src: src,

  jade: {
    src: [
      src + '/**/*.jade',
      '!' + src + '/**/_*.jade'
    ],
    dest: dest
  },

  sass: {
    src: src + '/style/**/*.scss',
    dest: dest + '/css',
    cssnext: {
      browsers: ['last 2 versions']
    },
    minify: true
  },

  css: {
    src: src + '/style/**/*.css',
    dest: dest + '/css',
    minify: true
  },

  js: {
    src: src + '/**/*.js',
    dest: dest + '/js',
    minify: true
  },

  image: {
    src: src + '/image/**/*.+(jpg|jpeg|png|gif|svg)',
    dest: dest + '/image',
    imageminOptions: {
      optimizationLevel: 8
    }
  },

  favicon: {
    src: src + '/image/favicon.ico',
    dest: dest
  }
};
