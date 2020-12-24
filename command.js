const alfy = require('alfy');
const {SmartThingsClient, BearerTokenAuthenticator} = require('@smartthings/core-sdk');

const getClient = () => {
    const API_KEY = alfy.config.get('apikey')
    const client = new SmartThingsClient(new BearerTokenAuthenticator(API_KEY));
    //alfy.log(`using API_KEY ${API_KEY}`);

    return client;
}

 const execCommand = async (command) => {
    const client = getClient();

    if(command[1] != 'exec') {
        await client.devices.executeCommand(command[0], {
            "component": "main",
            "capability": "switch",
            "command": command[1]
        });
        alfy.log(`${command[2]} turned ${command[1]}`);
    } else {
        await client.scenes.execute(command[0]);
        alfy.log(`Scene ${command[2]} Executed`);
    }
}

const setConfig = (config) => {
    alfy.config.set(config[0],config[1]);
    alfy.log(`Config ${config[0]} updated`);
}

var updateDevices = async () => {
    const client = getClient();
	const devices = await client.devices.list();
    alfy.cache.set('devices', devices);	
    alfy.log('Updated Devices');
}

var updateScenes = async () => {
    const client = getClient();
	const scenes = await client.scenes.list();
	alfy.cache.set('scenes', scenes);	
    alfy.log('Updated Scenes');
}

const command = process.argv[2].split('.');
const commandTag = command[0];

switch(commandTag) {
    case 'config':
        setConfig(command.slice(1));        
        break;
    case 'update':
        updateDevices(); 
        updateScenes();       
        break;
    default:
        execCommand(command);
        break;
}