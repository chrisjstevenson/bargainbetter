var profileContoller = module.exports;
var linkedInService = require('../services/linkedInService');
var mailService = require('../services/mailService');
var userService = require('../services/userService');
var User = require('../models/User');
var request = require('request');

profileContoller.index = function register(req, res) {
    linkedInService.getProfile(req.query.t)
        .then(basicProfile => {

            // register the user, if they don't exist already
            userService.update(basicProfile); //fire & forget
            return basicProfile;
        })
        .then(user => {

            // create the subscriber object
            subscriber = {
                "email_address": user.emailAddress,
                "status": "subscribed",
                "merge_fields": {
                    "FNAME": user.firstName,
                    "LNAME": user.lastName
                }
            };

            // right now we don't care about the response, just check if there is an error.
            return mailService.subscribe(subscriber)
                .then(subscriptionResponse => {
                    log.info(subscriptionResponse);
                    return subscriptionResponse;
                })
                .catch(err => {
                    log.error(err);
                });
        })
        .then(subscriptionResponse => res.render("profile", subscriptionResponse));
};



var staticProfile = { emailAddress: 'chris.j.stevenson@gmail.com',
    firstName: 'Christopher',
    formattedName: 'Christopher Stevenson',
    headline: 'Sr. Manager, IT at Best Buy',
    id: 'RxVp_B8apR',
    industry: 'Information Technology and Services',
    lastName: 'Stevenson',
    location:
    { country: { code: 'us' },
        name: 'Greater Minneapolis-St. Paul Area' },
    numConnections: 269,
    numConnectionsCapped: false,
    pictureUrl: 'https://media.licdn.com/mpr/mprx/0_GH1iiRkWsDUoEFFQeHbCw2SexjFwEBJw8oIS6mIeVyNoEboFX2dDCy6epfF92vBbeMbDeEdH9IVEuPIISU90IfkXPIVIuPmFHU9hhaldZofbQ5vUko8m8sx41YhRLPJ9T4tfbyHRTOv',
    pictureUrls:
    { _total: 1,
        values: [ 'https://media.licdn.com/mpr/mprx/0_0liagGbvEUQIr2emDqODuRvKZqEarh6HM1OdWp61dNFmr2wwD80dRtQnJJEC6CFSmZOuIeF1Ea6I_AIHsVtTEJbzja6w_AsHDVt20GUveqBC_QITDYCDvcRy-m' ] },
    positions: { _total: 1, values: [ [Object] ] },
    publicProfileUrl: 'https://www.linkedin.com/in/christopher-stevenson-663a4330' };

