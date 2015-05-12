var Event = require('./models/event'),
    User = require('./models/user'),
    auth = require('../config/auth'),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId;

module.exports = function (app, passport) {

    // User Routes
    //Get all users
    app.post('/users',
        passport.authenticate('singUp', {successRedirect: '/'})
    );

    //Get user by id
    app.get('/users/:userId', function (req, res, next) {
        var userId = req.params.userId;

        User.findById(ObjectId(userId), function (err, user) {
            if (err) {
                return next(new Error('Failed to load User'));
            }
            if (user) {
                res.send({username: user.username, profile: user.profile});
            } else {
                res.send(404, 'USER_NOT_FOUND')
            }
        });
    });


    // Session Routes
    //Get user session
    app.get('/session', auth.ensureAuthenticated, function (req, res) {
        res.json(req.user.username);
    });

    //Login user
    app.post('/session', passport.authenticate('login', {successRedirect: '/'}));

    //Logout user
    app.delete('/session', function (req, res) {
        if (req.user) {
            req.logout();
            res.send(200);
        } else {
            res.send(400, "Not logged in");
        }
    });


    // Calendar routes
    //Get all events
    app.get('/api/events', function (req, res) {
        Event.find({}, {title: 1, start: 1, end: 1, _id: 0}, function (err, events) {
            if (err)
                res.send(err);

            res.json(events);
        });
    });

    //Get event by id
    app.get('/api/events/:event_id', function (req, res) {
        Event.findById(req.params.event_id, function (err, event) {
            if (err)
                res.send(err);
            res.json(event);
        });
    });

    // Create a new event
    app.post('/events', function (req, res) {

        var event = new Event();
        event.title = req.body.title;
        event.start = req.body.start;
        event.end = req.body.end;
        event.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'Event created!'});
        });

    });

    // Delete the event by id
    app.delete('/api/events/:event_id', function (req, res) {
        Event.remove({
            _id: req.params.event_id
        }, function (err, event) {
            if (err)
                res.send(err);

            res.json({message: 'Successfully deleted'});
        });
    });


    // Update the event by id
    app.put('/api/events/:event_id', function (req, res) {

        Event.findById(req.params.event_id, function (err, event) {

            if (err)
                res.send(err);

            event.name = req.body.name;

            event.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Event updated!'});
            });

        });
    });

};

