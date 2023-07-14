const bcrypt = require('bcrypt');

// let hash ='$2b$10$SjdWCr8dKYds95Kcs9nB7emngAA5bFMjmvIfQ/sygokxIDzqGsWdy';
const password = 'Test@123';

bcrypt.hash(password, 10, function(err, hash) {
    if (err) { throw (err); }

    bcrypt.compare(password, hash, function(err, result) {
        if (err) { throw (err); }
        console.log(result);
    });
});