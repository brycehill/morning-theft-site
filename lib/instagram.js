var request = require('request'),
    async = require('async'),
    config = require('../config');

// TODO USE STREAMS AND ADD CACHING

exports.getAll = function(cb) {
    var methods = ['follows', 'followedBy', 'recent', 'tags'];

    async.map(methods, get, function (err, results) {
        var users = results[0].concat(results[1]),
            recent = results[2],
            allTags = results[3],
            relevantTags = allTags.filter(function(tag) {
                return users.indexOf(tag.username) > -1;
            });

        // TODO: Sort by timestamp.
        cb(null, relevantTags.concat(recent));
    });
};

function get(method, cb) {
    var base = 'https://api.instagram.com/v1/',
        userId = config.instagram.userId,
        accessToken = config.instagram.accessToken,
        data, ret;

    switch (method) {
        case 'follows':
            url = base + 'users/' + userId + '/follows';
            break;
        case 'followedBy':
            url = base + 'users/' + userId + '/followed-by';
            break;
        case 'recent':
            url = base + 'users/' + userId + '/media/recent';
            break;
        case 'tags':
            url = base + 'tags/morningtheft/media/recent';
            break;
        default:
            break;
    }

    request({ uri: url, qs: { access_token: accessToken }}, function(err, res, body) {
        if (err) return cb(err);

        if (res.statusCode === 200) {
            data = JSON.parse(body);
            ret = data.data.map(parseData);

            return cb(null, ret);
        }
    });
}

// Parse the response from Instagram.
function parseData(obj) {
    if (!obj.images) return obj.username;

    return {
        username: obj.user.username,
        link: obj.link,
        url: obj.images.thumbnail.url,
        width: obj.images.thumbnail.width,
        height: obj.images.thumbnail.height,
        link: obj.link,
        ts: obj.created_time
    };
}