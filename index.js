'use strict';

/**
 * Declarations for node included files
 */
const fs = require('fs');

/**
 * Declarations for npm packages
 */
const {Intents} = require('discord.js');

/**
 * Declarations for this project
 */
const EnhancedClient = require('./handlers/classes/EnhancedClient');
const SpiffyDate = require('./handlers/classes/SpiffyDate');
const secret = require('./core/secret.json');
const {
  BOOT,
  INFO,
  WARN,
  ALERT,
  ERROR,
} = require('./handlers/classes/BootLogger');

/*
 * Number of times meowed, just to prevent it from spamming channels.
 */
let meowCount = 0;

/**
 * No code should be placed or executed before the following boot command. Everything prior to this point should be
 * required files, either through node, npm, or this project. Code can be placed after the first boot line.
 */
BOOT.log(
  '\t ======================== Starting Script ========================\n'
);

/**
 * @description The time the script started running
 * @type {SpiffyDate}
 */
process.startTime = new SpiffyDate();
INFO.log(`Process started at ${process.startTime}`);

process.chdir(__dirname);
INFO.log(`Setting process.chdir to ${__dirname}`);

INFO.log('Creating EnhancedClient client');

const client = new EnhancedClient({
  clientOptions: {
    disableEveryone: true,
    ws: {
      intents: Intents.ALL,
    },
  },
});

INFO.log(`Environment set to ${client.getEnvironmentType()}`);

client.on('ready', async () => {
  await client.start(process.argv);
  INFO.log(
    `Client created successfully in ${
      client.startTime - new Date(process.startTime)
    } ms\n`
  );

  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('master give her food!', {type: 'WATCHING'});

  client.debug(
    'Successfully logged the booting procedure. Switching from boot to debug logging.'
  );

  if (process.argv[2] === '66' || process.argv[2] === '77') return;

  await client.sendLogMessage({
    files: [
      {
        attachment: './boot.txt',
      },
    ],
  });

  client.deleteFile(BOOT.getBootLogPath());
});

client.on('message', async (message) => {
  if (message.author.bot) return;

  client.debug(
    `Received message ${message} from user ${message.author.username}`
  );
  if (message.author.id === client.ownerId) {
    client.debug('Attempting to DM the princess');
    await client.sendOwnerMessage('Received your message, cutie!');
    //await client.sendLogMessage('You are a butt face doo doo head');
  } else {
    client.debug('Not DMing the beautiful one');
  }
});

client.login(secret.token);
