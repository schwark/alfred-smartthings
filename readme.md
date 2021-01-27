# alfred-smartthings [![Build Status](https://travis-ci.org/schwark/alfred-smartthings.svg?branch=master)](https://travis-ci.org/schwark/alfred-smartthings)

> Alfred Workflow for new SmartThings API. Use the better maintained [python version](https://github.com/schwark/alfred-smartthings-py) if npm install is not important


## Install

```
$ npm install --global alfred-smartthings
```

*Requires [Node.js](https://nodejs.org) 4+ and the Alfred [Powerpack](https://www.alfredapp.com/powerpack/).*

You will need a personal access token from the SmartThings Developer Portal at https://account.smartthings.com/tokens

## Usage

In Alfred, type `st config apikey <Personal Access Token>` <kbd>Enter</kbd>, to set your API Key - should only need to do this once

Once the key is set, type `st update` <kbd>Enter</kbd>, to update devices and scenes - should only need to do this everytime you add scenes or switches

For regular usage, type `st <switch-name-or-scene-name>  on|off|<none-for-scenes>` <kbd>Enter</kbd> 

## License

MIT © [Schwark Satyavolu](https://github.com/schwark)
