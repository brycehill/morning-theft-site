var request = require('request'),
    async = require('async'),
    config = require('../config');


var base = 'https://api.instagram.com/v1/',
    userId = config.instagram.userId,
    accessToken = config.instagram.accessToken,
    clientId = config.instagram.client.id,
    clientSecret = config.instagram.client.secret;

// TODO USE STREAMS

exports.getAll = function(cb) {

    function reducePosts(err, results) {
        var users = results[0].concat(results[1]),
            recent = results[2],
            allTags = results[3],
            relevantTags = allTags.filter(function(tag) {
                return users.indexOf(tag.username) > -1;
            });

        // TODO: Sort by timestamp.
        cb(null, relevantTags.concat(recent));
    }

    // TODO: Make this better. Use one function instead of 4?
    async.parallel([
        getFollows,
        getFollowedBy,
        getRecent,
        getTags
    ], reducePosts);

};

function getFollows(cb) {
    var url = base + 'users/' + userId + '/follows',
        data, following;

    request({ uri: url, qs: { access_token: accessToken }}, function(err, res, body) {
        if (err) return cb(err);


        if (res.statusCode === 200) {
            data = JSON.parse(body);
            following = data.data.map(function(user) {
                return user.username;
            });

            return cb(null, following);
        }
    });
};

function getFollowedBy(cb) {
    var url = base + 'users/' + userId + '/followed-by',
        data, followers;

    request({ uri: url, qs: { access_token: accessToken }}, function(err, res, body) {
        if (err) return cb(err);

        if (res.statusCode === 200) {
            data = JSON.parse(body);
            followers = data.data.map(function(user) {
                return user.username;
            });

            return cb(null, followers);
        }
    });
};

function getRecent(cb) {
    var url = base + 'users/' + userId + '/media/recent',
        data, recent;

    request({ uri: url, qs: { access_token: accessToken }}, function(err, res, body) {
        if (err) return cb(err);

        if (res.statusCode === 200) {
            data = JSON.parse(body);
            recent = data.data.map(parseData);

            return cb(null, recent);
        }
    });
};


function getTags(cb) {
    var url = base + 'tags/morningtheft/media/recent',
        data, tags;

    request({ uri: url, qs: { access_token: accessToken }}, function(err, res, body) {
        if (err) return cb(err);

        if (res.statusCode === 200) {
            data = JSON.parse(body);
            tags = data.data.map(parseData);

            return cb(null, tags);
        }
    });
};

// Parse the response from Instagram.
function parseData(obj) {
    return {
        username: obj.user.username,
        link: obj.link,
        images: obj.images,
        ts: obj.created_time
    };
}