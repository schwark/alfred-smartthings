# alfred-smartthings [![Build Status](https://travis-ci.org/schwark/alfred-smartthings.svg?branch=master)](https://travis-ci.org/schwark/alfred-smartthings)

> Alfred Workflow for new SmartThings API


## Install

```
$ npm install --global alfred-smartthings
```

*Requires [Node.js](https://nodejs.org) 4+ and the Alfred [Powerpack](https://www.alfredapp.com/powerpack/).*

*Needs a personal access token from the SmartThings Developer Portal at https://account.smartthings.com/tokens

## Usage

In Alfred, type `st config apikey <Personal Access Token>` <kbd>Enter</kbd>, to set your API Key - should only need to do this once

Once the key is set, type `st update` <kbd>Enter</kbd>, to update devices and scenes - should only need to do this everytime you add scenes or switches

For regular usage, type `st <switch-name-or-scene-name>  on|off|<none-for-scenes>` <kbd>Enter</kbd> 

## License

MIT © [Schwark Satyavolu](https://github.com/schwark)
