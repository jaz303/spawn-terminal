var spawn = require('child_process').spawn;

var spawnTerminal = null;

function home() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

function escapeDirName(dir) {
  return "'" + dir.replace('~', home()) + "'";
}

if (process.platform === 'darwin') {

  spawnTerminal = function(dir) {
    spawn('osascript', ['-e', 'tell application "terminal"',
                        '-e', 'do script "cd ' + escapeDirName(dir || home()) + '"',
                        '-e', 'end tell']);
  }

} else {

  throw "Sorry, platform '" + process.platform + "' is not yet supported.";

}

exports.spawnTerminal = spawnTerminal;