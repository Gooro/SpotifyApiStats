import debug = require('debug');
import express = require('express');
import path = require('path');
var bodyParser = require('body-parser');
var corse = require('cors');
var request = require('request');
import querystring = require('query-string');
import routes from './routes/index';
import users from './routes/user';
import { functionDeclaration } from 'babel-types';

import user from './routes/user';
var app = express();

var clientId: string = 'eda7cb802a37453190d0d66551507e64';
var secretKey: string = '4c459b72da5646b4a0ae07d9b9d21db8';
/** * @description przekierowanie do stronny jeśli callback będzie success */
var redirectUri: string = 'http://localhost:1337/callback';

var stateKey = 'spotify_auth_state';
let userData;
let topArtistData;
let topTracksData;
let topArtistShortTermData;
let topTracksShortTermData;
let topArtistsForGenreData;
var cors = require('cors');

// use it before all route definitions
app.use(cors());

//Http body to JSON Parse
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/login', function (req, res, next) {
    var scopes = 'user-read-private user-read-email user-library-read user-read-recently-played user-top-read';
    res.send('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirectUri));
});

app.get('/callback', function (req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;

    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
            code: code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
        },
        headers: {
            'Authorization': 'Basic ' + (new Buffer(clientId + ':' + secretKey).toString('base64'))
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {

            var access_token = body.access_token,
                refresh_token = body.refresh_token;

            var options = {
                url: 'https://api.spotify.com/v1/me',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            };

            var topArtist = {
                url: 'https://api.spotify.com/v1/me/top/artists/?limit=15&time_range=long_term',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            }

            var topArtistShortTerm = {
                url: 'https://api.spotify.com/v1/me/top/artists/?limit=15&time_range=short_term',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            }

            var topTracks = {
                url: 'https://api.spotify.com/v1/me/top/tracks/?limit=15&time_range=long_term',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            }

            var topTracksShortTerm = {
                url: 'https://api.spotify.com/v1/me/top/tracks/?limit=15&time_range=short_term',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            }

            var topArtistsForGenre = {
                url: 'https://api.spotify.com/v1/me/top/artists/?limit=50&time_range=long_term',
                headers: { 'Authorization': 'Bearer ' + access_token },
                json: true
            }
            // use the access token to access the Spotify Web API


            request.get(topArtist, function (error, response, body) {
                topArtistData = body;
            });

            request.get(topTracks, function (error, response, body) {
                topTracksData = body;
            });

            request.get(topTracksShortTerm, function (error, response, body) {
                topTracksShortTermData = body;
            });

            request.get(topArtistShortTerm, function (error, response, body) {
                topArtistShortTermData = body;
            });

            request.get(topArtistsForGenre, function (error, response, body) {
                topArtistsForGenreData = body;
            });

            request.get(options, function (error, response, body) {
                userData = body;
                res.redirect("http://localhost:1337/#/home");
            });
        }
    });
});



app.get("/userdata", function (req, res) {
    res.send(userData);
});

app.get("/topartistdata", function (req, res) {
    res.send(topArtistData);
});

app.get("/toptracksdata", function (req, res) {
    res.send(topTracksData);
});

app.get("/toptracksdatashortterm", function (req, res) {
    res.send(topTracksShortTermData);
});

app.get("/topartistdatashortterm", function (req, res) {
    res.send(topArtistShortTermData);
});


app.get("/topartistsforgenre", function (req, res) {
    var genreArray = [];
    for (let i of topArtistsForGenreData.items) {
        for (let j of i.genres) {
            console.log(j);
            genreArray.push(j);
        }
    }
    var hist = genreArray.reduce(function (prev, item) {
        if (item in prev) prev[item]++;
        else prev[item] = 1;




       return prev;
    }, {});
    function sortProperties(obj) {
        // zmiana obiektu na array
        var sortable = [];
        for (var key in obj)
            if (obj.hasOwnProperty(key))
                sortable.push([key, obj[key]]); // zmianiam na format [key, value]

        // sortuje
        sortable.sort(function (a, b) {
            return b[1] - a[1] ; 
        });
        var sliced = sortable.slice(0, 5); //biore pierwsze 5

        return sliced; 
    }
    
    res.send(sortProperties(hist));
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
