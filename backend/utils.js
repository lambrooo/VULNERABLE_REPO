const { exec } = require('child_process');

// VULNERABILITY: Command Injection
exports.processImage = function(userFilename) {
    // BAD: Passing user input directly to shell command
    exec(`convert ${userFilename} output.png`, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(stdout);
    });
};