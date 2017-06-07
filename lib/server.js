'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    app = express();

/* istanbul ignore next */
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
}

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
    var webpackDevMiddleware = require("webpack-dev-middleware");
    var webpack = require("webpack");
    var webpackConfig = require("../webpack.config");

    var compiler = webpack(webpackConfig);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: "/", // Same as `output.publicPath` in most cases.
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    }));
}

// to extract form data from POST bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');

app.get("/", function(request, response) {
  response.render('index');
});

app.get('/:name', function(request, response) {
  var name = request.params.name;
  if (request.query.lastname) {
      name = name + " " + request.query.lastname;
  }
  response.render('hello', {
      name: name,
      lastname: request.query.lastname,
      inseam: request.query.inseam
  });
});

app.post('/my-form', function(request, response) {
  response.redirect('/' + request.body.input);
});

app.post('/:name', function(request, response) {
  response.end('POSTED: Hello, ' + request.params.name + '!');
})

// allow other modules to use the server
module.exports = app;
