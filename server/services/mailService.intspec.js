var expect = require('expect');
var Promise = global.Promise = require('bluebird');
Promise.promisifyAll(require('request'));
var mailService = require('../../server/services/mailService');

describe('mailService >', function() {

    describe('lists >', function () {

        it('should return all subscriber lists', function (done) {
            mailService.lists()
                .then(function (result) {
                    expect(result.lists[0].id).toBe('5e59e840a2');
                    done();
                })
        });
    });

    describe('subscribe >', function () {

       it('should subscribe an email to a list', function (done) {

           var subscriber = {
               "email_address": "chris.j.stevenson@gmail.com",
               "status": "subscribed",
               "merge_fields": {
                   "FNAME": "Christopher",
                   "LNAME": "Stevenson"
               }
           };

           mailService.subscribe(subscriber)
            .then(function (result) {
                //console.log(result);
                expect(result.status).toBe(400);
                done();
           });
       });
    });

    describe('getAllSubscribers >', function () {

        it('should get all members of a list', function (done) {
            mailService.getAllSubscribers()
                .then(function (result) {
                    //console.log(result);
                    done();
                });
        });
    });
});