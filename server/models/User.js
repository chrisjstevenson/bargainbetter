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

    profile: {
        name: String,  // formattedName
        firstName: String,
        lastName: String,
        headline: String, // headline
        industry: String, // industry
        location: {
            country: {
                code: String
            },
            name: String
        },
        picture: String
    }
}, { timestamps: true });

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
