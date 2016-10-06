var userService = module.exports;
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var User = require('../models/User');

userService.update = function(userData) {
    var obj =  {
        bargainBetterId: uuid.v1(),
        email: userData.emailAddress,
        firstName: userData.firstName,
        lastName: userData.lastName,
        formattedName: userData.formattedName,
        headline: userData.headline,
        linkedInId: userData.id,
        location: {
            country: {
                code: userData.location.country.code
            },
            name: userData.location.name
        },
        numberOfConnections: userData.numConnections,
        pictureUrl: userData.pictureUrl,
        linkedInPublicProfileUrl: userData.publicProfileUrl
    };

    return User.findOneAndUpdate({emailAddress: userData.emailAddress}, obj, { upsert: true} );
};