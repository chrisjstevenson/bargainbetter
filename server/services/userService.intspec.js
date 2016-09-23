var expect = require('expect');
var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var uuid = require('node-uuid');
var userService = require('./userService');
var User = require('../models/User');
mongoose.connect('mongodb://localhost/bargainbetter');

const testableEmail = 'test@bargainbetter.com';

describe('userService >', () => {

    it('should register a new user', () => {
        var obj = staticProfile;
        obj.emailAddress = 'new_user@bargainbetter.com';
        return userService.update(obj)
            .then(() => {
                User.findOne({emailAddress: obj.emailAddress}, function(err, user){
                    //console.log(user);
                    expect(user.emailAddress).toBe('new_user@bargainbetter.com');
                    expect(user.linkedInId).toBe('RxVp_B8apR');
                });
            })
    });

    it('should update an existing user', () => {
        var obj = staticProfile;
        obj.firstName = "Robert";
        obj.lastName = "Jones";
        obj.emailAddress = 'existing_user@bargainbetter.com';
        return userService.update(obj)
            .then(() => {
                User.findOne({emailAddress: obj.emailAddress}, function(err, user){
                    //console.log(user);
                    expect(user.emailAddress).toBe('existing_user@bargainbetter.com');
                    expect(user.firstName).toBe('Robert');
                    expect(user.lastName).toBe('Jones');
                });
            })
    });

});

// sample profile from LinkedIn.
var staticProfile = { emailAddress: 'chris.j.stevenson@gmail.com',
    firstName: 'Christopher',
    formattedName: 'Christopher Stevenson',
    headline: 'Sr. Manager, IT at Best Buy',
    id: 'RxVp_B8apR',
    industry: 'Information Technology and Services',
    lastName: 'Stevenson',
    location: {
        country: {
            code: 'us'
        },
        name: 'Greater Minneapolis-St. Paul Area'
    },
    numConnections: 269,
    numConnectionsCapped: false,
    pictureUrl: 'https://media.licdn.com/mpr/mprx/0_GH1iiRkWsDUoEFFQeHbCw2SexjFwEBJw8oIS6mIeVyNoEboFX2dDCy6epfF92vBbeMbDeEdH9IVEuPIISU90IfkXPIVIuPmFHU9hhaldZofbQ5vUko8m8sx41YhRLPJ9T4tfbyHRTOv',
    pictureUrls:
    { _total: 1,
        values: [ 'https://media.licdn.com/mpr/mprx/0_0liagGbvEUQIr2emDqODuRvKZqEarh6HM1OdWp61dNFmr2wwD80dRtQnJJEC6CFSmZOuIeF1Ea6I_AIHsVtTEJbzja6w_AsHDVt20GUveqBC_QITDYCDvcRy-m' ] },
    positions: { _total: 1, values: [ [Object] ] },
    publicProfileUrl: 'https://www.linkedin.com/in/christopher-stevenson-663a4330' };