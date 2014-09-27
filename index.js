module.exports = spawnTerminal;

var spawn = require('child_process').spawn;

function home() {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

function escapeDirName(dir) {
    return "'" + dir.replace('~', home()) + "'";
}

function spawnTerminal(dir, cb) {
    
    if (typeof dir === 'function') {
        cb = dir;
        dir = null;
    }

    dir = dir || home();
    
    var child = doSpawn(dir);
    
    if (cb) {
        child.on('exit', function() { cb(dir); });
    }
    
}

var doSpawn = null;

if (process.platform === 'darwin') {
    
    doSpawn = function(dir) {
        return spawn('osascript', [ '-e', 'tell application "terminal"',
                                    '-e', 'do script "cd ' + escapeDirName(dir) + '"',
                                    '-e', 'end tell' ]);
    }

} else if (process.platform === 'linux') {
    
    doSpawn = function(dir) {
        // TODO: pick correct terminal
        return spawn('gnome-terminal', ['--working-directory=' + escapeDirName(dir)]);
    }

} else {

    throw "Sorry, platform '" + process.platform + "' is not yet supported.";

}
