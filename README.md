# spawn-terminal

Spawn a terminal in a given directory, or `$HOME` if none provided.

OS X only for now.

## API

	var spawnTerminal = require('spawn-terminal').spawnTerminal;

	spawnTerminal(); // open terminal in $HOME
	spawnTerminal("~/foo/bar"); // open terminal in ~/foo/bar
