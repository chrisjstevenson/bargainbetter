process.NODE_TLS_REJECT_UNAUTHORIZED=0;

process.chdir(__dirname);

require('./server/server').run(function (err) {
    if(err) process.exit(10);
})