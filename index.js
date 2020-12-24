'use strict';
const alfy = require('alfy');

var commandize = (input) => {
	const commands = ['on', 'off'];
	const commandRe = new RegExp('(^|\\s+)('+commands.join('|')+')', 'i');
	var command = '';
	const matches = input.match(commandRe);
	if(matches && matches.length > 2) {
		command = matches[2];
	}
	const device = input.replace(commandRe,'');
	//alfy.log(`Commandize: input is ${input} and device is ${device} and command is ${command} and valid is ${!!command}`);
	return {name: device.trim(), command: command.toLowerCase(), valid: !!command};
}

var processCommands = () => {
	var items = [];
	const apikey = alfy.config.get('apikey');
	const devices = alfy.cache.get('devices');
	const scenes = alfy.cache.get('scenes');

	//alfy.log(`Using API_KEY ${apikey}`);
	//alfy.log(devices);
	//alfy.log(scenes);

	var input = alfy.input;
	if(!input) input = '';
	input = input.toLowerCase();
	input = input.split(' ');
	if(!apikey && input[0] != 'config') {
		input[0] = 'apierror';
	}
	if(apikey && !devices && input[0] != 'update') {
		input[0] = 'deviceserror';
	}
	switch(input[0]) {
		case 'apierror':
			items.push({
				title: `API Key missing`,
				subtitle: `Please use - st config apikey <token> - to set apikey`,
				valid: false
			});
			break;
		case 'deviceserror':
			items.push({
				title: `Devices missing`,
				subtitle: `Please use - st update - to update devices`,
				valid: false
			});
			break;
		case 'config':
			items.push({
				title: `Set config variable ${input[1]}`,
				subtitle: `Set ${input[1]} to ${input[2]}`,
				arg: `config.${input[1]}.${input[2]}`
			});
			break;
		case 'update':
			items.push({
				title: `Update device list`,
				subtitle: `Refresh list of devices from cloud`,
				arg: `update`
			});
			break;
		default:
			const deviceCommand = commandize(alfy.input);
			//alfy.log(`command is ${deviceCommand.name} and ${deviceCommand.command}`);
			items = alfy
			.matches(deviceCommand.name, devices, 'label')
			.map(element => ({
				title: element.label,
				subtitle: `Turn ${element.label} ${deviceCommand.command}`,
				autocomplete: element.label,
				arg: `${element.deviceId}.${deviceCommand.command}`,
				valid: deviceCommand.valid
			}));
			Array.prototype.push.apply(items, 
				alfy
				.matches(deviceCommand.name, scenes, 'sceneName')
				.map(element => ({
					title: element.sceneName,
					subtitle: `Execute scene ${element.sceneName}`,
					autocomplete: element.sceneName,
					arg: `${element.sceneId}.exec`
				})));
			break;
	}
	return items;
}

const items = processCommands();
alfy.output(items);