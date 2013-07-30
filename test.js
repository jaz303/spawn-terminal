var st = require('./').spawnTerminal;

st("~", function(dir) {
  console.log("terminal opened @ " + dir);
});

