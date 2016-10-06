const chai = require('chai');
const expect = chai.expect;
const User = require('./User');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/bargainbetter'); // find a cleaner way to do this

describe('User Model', () => {
    it('should create a new user', (done) => {
        const user = new User({
            email: 'test@mail.com',
            password: 'password',
            profile: {
                name: 'tester mctesty',
                headline: 'tests the best'
            }
        });
        user.save((err) => {
            expect(err).to.be.null;
            expect(user.email).to.equal('test@mail.com');
            expect(user).to.have.property('createdAt');
            expect(user).to.have.property('updatedAt');
            done();
        });
    });

    it('should not create a user with same email', (done) => {
        const user = new User({
            email: 'test@mail.com',
            password: 'password'
        });
        user.save((err) => {
            expect(err).to.be.defined;
            expect(err.code).to.equal(11000);
            done();
        });
    });

    it('should find user by email', (done) => {
        User.findOne({ email: 'test@mail.com'}, (err, user) => {
            expect(err).to.be.null;
            expect(user.email).to.equal('test@mail.com');
            done();
        });
    });

    it('should have a profile', (done) => {
        User.findOne({ email: 'test@mail.com'}, (err, user) => {
            expect(err).to.be.null;
            expect(user.profile).to.be.defined;
            expect(user.profile.name).to.equal('tester mctesty');
            expect(user.profile.headline).to.equal('tests the best');
            done();
        });
    });

    it('should delete a user', (done) => {
        User.remove({ email: 'test@mail.com'}, (err) => {
            expect(err).to.be.null;
            done();
        });
    });
});