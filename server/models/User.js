var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    linkedInId: {
        type: String
    },
    emailAddress: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    formattedName: {
        type: String
    },
    headline: {
        type: String
    },
    industry: {
        type: String
    },
    location: {
        country: {
            code: {
                type: String
            }
        },
        name: {
            type: String
        }
    },
    numberOfConnections: {
        type: Integer
    },
    pictureUrl: {
        type: String
    },
    linkedInPublicProfile: {
        type: String
    }
});

module.exports = mongoose.model('User', userSchema);




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
