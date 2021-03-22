'use strict'

const Discord = require("discord.js");
const EnhancedClient = require("./EnhancedClient");
const PermissionLevel = require("./PermissionLevel");
const CommandHelp = require("./CommandHelp");

/**
 * @typedef {Object} CommandObject
 * @property {CommandHelp}
 * @property {CommandFunction}
 */

/**
 * @callback CommandFunction
 * @param {EnhancedClient}  client  The EnhancedClient
 * @param {Discord.Message} message The discord message that triggered the command
 * @param {string[]}        args    An array of strings given to the command
 * @returns {Promise<void>}
 */

class CommandObject {

}

module.exports = CommandObject;