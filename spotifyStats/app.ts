import debug = require('debug');
import express = require('express');
import path = require('path');
var bodyParser = require('body-parser');
var corse = require('cors');
import querystring = require('query-string');
import routes from './routes/index';
import users from './routes/user';

var app = express();

const httpsOption = {
    

}


/** * @description id clienta pobierane z spotify developer console */
var clientId: string = "clientId";
/** * @description secret key pobierany z spotify developer console */
var secretKey: string = 'secretKey';
/** * @description przekierowanie do stronny jeśli callback będzie success */
var redirectUri: string = 'redirectUri';


app.use(corse());

//Http body to JSON Parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/login', function (req, res) {
    var scopes = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
        querystring.stringify({
            response_type: 'code',
            client_id: clientId,
            scope: scopes,
            redirect_uri: redirectUri
        }));
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err['status'] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err: any, req, res, next) => {
        res.status(err['status'] || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// production error handler
// no stacktraces leaked to user
app.use((err: any, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 1337)

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
