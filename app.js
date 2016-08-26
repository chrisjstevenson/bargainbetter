process.chdir(__dirname);

require('./server/server').run(function (err) {
    if(err) process.exit(10);
})