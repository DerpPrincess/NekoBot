'use strict'

/**
 * @typedef {Object} CommandHelp
 * @property {string}          name            A string containing a lowercase all-one-word version of the command
 * @property {string}          fullName        A string containing a English readable name of the command
 * @property {string}          bigDescription  A string containing a detailed description of the command
 * @property {string}          description     A string containing a short description of the command
 * @property {Boolean}         enabled         A boolean indicating if the command is current enabled or not
 * @property {PermissionLevel} permissionLevel A PermissionLevel indicating what permissions are necessary to use the command
 */

class CommandHelp {

}

module.exports = CommandHelp;