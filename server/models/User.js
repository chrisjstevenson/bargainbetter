const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    linkedin: String,
    facebook: String,
    twitter: String,
    google: String,
    tokens: Array, // needed by passport

    profile: {
        name: String,  // formattedName
        firstName: String,
        lastName: String,
        headline: String, // headline
        industry: String, // industry
        location: String,
        picture: String,
        website: String
    }
}, { timestamps: true });

/**
 * Password hash middleware.
 */
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

/**
 * Helper method for validating user's password.
 */
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        cb(err, isMatch);
    });
};

/**
 * Helper method for getting user's gravatar.
 */
userSchema.methods.gravatar = function (size = 200) {
    if (!this.email) {
        return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    }
    const md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);

module.exports = User;


//var staticProfile = { emailAddress: 'chris.j.stevenson@gmail.com',
//    firstName: 'Christopher',
//    formattedName: 'Christopher Stevenson',
//    headline: 'Sr. Manager, IT at Best Buy',
//    id: 'RxVp_B8apR',
//    industry: 'Information Technology and Services',
//    lastName: 'Stevenson',
//    location:
//    { country: { code: 'us' },
//        name: 'Greater Minneapolis-St. Paul Area' },
//    numConnections: 269,
//    numConnectionsCapped: false,
//    pictureUrl: 'https://media.licdn.com/mpr/mprx/0_GH1iiRkWsDUoEFFQeHbCw2SexjFwEBJw8oIS6mIeVyNoEboFX2dDCy6epfF92vBbeMbDeEdH9IVEuPIISU90IfkXPIVIuPmFHU9hhaldZofbQ5vUko8m8sx41YhRLPJ9T4tfbyHRTOv',
//    pictureUrls:
//    { _total: 1,
//        values: [ 'https://media.licdn.com/mpr/mprx/0_0liagGbvEUQIr2emDqODuRvKZqEarh6HM1OdWp61dNFmr2wwD80dRtQnJJEC6CFSmZOuIeF1Ea6I_AIHsVtTEJbzja6w_AsHDVt20GUveqBC_QITDYCDvcRy-m' ] },
//    positions: { _total: 1, values: [ [Object] ] },
//    publicProfileUrl: 'https://www.linkedin.com/in/christopher-stevenson-663a4330' };
