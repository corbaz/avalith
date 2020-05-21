const path = require('path');

module.exports = {
  entry: {
    app: './dist/server.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.server.bundle.js'
  }
};