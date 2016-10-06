const chai = require('chai');
const expect = chai.expect;
const User = require('../server/models/User');

describe('User Model', () => {
    it('should create a new user');
    it('should not create a user with same email');
    it('should find user by email');
    it('should delete a user');
});