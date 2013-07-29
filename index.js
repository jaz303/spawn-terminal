var spawn = require('child_process').spawn;

var spawnTerminal = null;

function home() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

function escapeDirName(dir) {
  return "'" + dir.replace('~', home()) + "'";
}

if (process.platform === 'darwin') {

  spawnTerminal = function(dir, cb) {
    
    if (typeof dir === 'function') {
      cb = dir;
      dir = null;
    }

    dir = dir || home();

    var child = spawn('osascript', ['-e', 'tell application "terminal"',
                                    '-e', 'do script "cd ' + escapeDirName(dir) + '"',
                                    '-e', 'end tell']);
    if (cb) {
      child.on('exit', function() { cb(dir); });
    }
  
  }

} else {

  throw "Sorry, platform '" + process.platform + "' is not yet supported.";

}

exports.spawnTerminal = spawnTerminal;