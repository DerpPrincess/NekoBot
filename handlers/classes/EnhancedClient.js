'use strict';

const fs = require('fs');
const Discord = require('discord.js');
const SpiffyDate = require('./SpiffyDate');
const Logger = require('./Logger');
const LoggerType = require('./LoggerType');
const PermissionLevel = require('./PermissionLevel');
const CommandObject = require('./CommandObject');
const {UnableToLocateOrInvalidConfigError} = require('./CustomErrors');
const {INFO, WARN, ALERT, ERROR} = require('./BootLogger');

class EnhancedClient extends Discord.Client {
  /**
   * @typedef {EnhancedClient}
   * @description An enhanced version of the Discord.Client class
   */

  /**
   * @description Builds the EnhancedClient Class
   * @param {Object}        options                    Options that help configure the bot
   * @param {ClientOptions} [options.clientOptions={}] Client options that the EnhancedClient uses during runtime
   */
  constructor(options) {
    let startTime = new SpiffyDate();
    let configPath = '../../core/config.json';

    super(options.clientOptions || {});

    try {
      this.config = require(configPath);
    } catch (error) {
      throw new UnableToLocateOrInvalidConfigError(configPath);
    }

    /**
     * @description The start time for this instance of the bot
     * @type {Date}
     */
    this.startTime = startTime.asDate();

    /**
     * @description A collection of the EnhancedClient's commands
     * @type {Discord.Collection<string, CommandObject>}
     */
    this.commands = new Discord.Collection();

    /**
     * @description A collection of all the hardcoded privileged users the EnhancedClient recognizes
     * @type {Object}
     */
    this.userList = require('../../core/users.json');

    /**
     * @description A Discord Snowflake representing the owner
     * @type {Snowflake}
     * @public
     */
    this.ownerId = this.userList.ownerId;

    /**
     * @description A collection of all the special channels used by the EnhancedClient
     * @type {Object}
     */
    this.channelList = require('../../core/channelList.json');

    /**
     * @description The log channel used by the EnhancedClient
     * @type {Snowflake}
     */
    this.logChannel = this.channelList.logChannel;

    /**
     * @description The EnhancedClient's current prefix value
     * @type {string}
     */
    this.currentPrefix = this.config.prefix ? this.config.prefix : '!';

    /**
     * @description Indicates if the EnhancedClient is currently accepting commands
     * @type {boolean}
     */
    this.isOn = true;

    /**
     * @description Indicates if the EnhancedClient is currently in debug mode
     * @type {boolean}
     * @private
     */
    this._isDebugModeOn = this.config.debug;

    /**
     * @description Indicates if the EnhancedClient is currently running in a test environment
     * @type {boolean}
     * @private
     */
    this._isTestEnvironment = this._checkIsTestEnvironment();

    /**
     * @description The EnhancedClient's debug Logger
     * @type {Logger}
     */
    this.debugLogger = new Logger(LoggerType.DEBUG);

    /**
     * @description The EnhancedClient's error Logger
     * @type {Logger}
     */
    this.errorLogger = new Logger(LoggerType.ERROR);
  }

  /**
   * @description Sends the user designated as owner a message
   * @param {string} str A string to send to the owner
   * @returns {Promise<void>}
   */
  async sendOwnerMessage(str) {
    try {
      let owner = await this.users.fetch(this.ownerId);
      await owner.send(str);
    } catch (error) {
      this.error(error);
    }
  }

  /**
   * @description Sends a log message to the log channel
   * @param {string | Object} logContent A string or object to send to the log channel
   * @returns {Promise<void>}
   */
  async sendLogMessage(logContent) {
    try {
      let logChannel = await this.channels.fetch(this.logChannel);
      await logChannel.send(logContent);
    } catch (error) {
      this.error(error);
    }
  }

  /**
   * @description EnhancedClient function to log debug level messages
   * @param str
   */
  debug(str) {
    this.debugLogger.writeLog(str, this._isDebugModeOn);
  }

  /**
   * @description EnhancedClient function to log error level messages
   * @param str
   */
  error(str) {
    this.errorLogger.writeLog(str);
  }

  /**
   * @description Validation method for EnhancedClient class. Ensures that the EnhancedClient is built correctly
   * @returns {(boolean|string)[]}
   */
  isValid() {
    let message = '';

    // if (this.commands.size <= 0) message += "No commands were loaded;";

    if (!this.ownerId) message += 'No ownerId loaded;';

    if (!this.logChannel) message += 'No logChannel loaded;';

    return [message === '', message];
  }

  /**
   *
   * @param args
   */
  start(args) {
    INFO.log(`Bot start time: ${this.startTime}`);

    let passedArgs = args[2];

    this._previousIterationCode = passedArgs ? passedArgs : 0;

    try {
      let message = '';
      let showWarning = false;

      switch (passedArgs) {
        case null:
        case '0':
          message = 'Previous iteration terminated cleanly';
          break;
        case '66':
          message = 'Process updated silently';
          break;
        case '77':
          message = 'Process restarted silently';
          break;
        case '99':
          message = 'Update complete';
          break;
        case undefined:
          break;
        default:
          message = `Previous iteration terminated with error code: ${passedArgs}`;
          if (args[3]) {
            let additionalArgs = args.slice(2).join(' ');
            message += `. The following args were also included: ${additionalArgs}`;
          }
          showWarning = true;
      }

      if (showWarning) {
        WARN.log(message);
        this.sendOwnerMessage(message);
        this.sendLogMessage(message);
      } else {
        INFO.log(message);
      }
    } catch (error) {
      ERROR.log(error);
      process.exit(88);
    }

    let [isValid, message] = this.isValid();

    if (!isValid) {
      let errorMessages = message.split(';').filter(function (element) {
        return element !== '';
      });
      errorMessages.forEach((entry) => {
        ERROR.log(entry);
      });
      process.exit(88);
    }
  }

  /**
   * @description Updates the debug flag for the EnhancedClient. Unable to be updated if on test environment
   * @param {boolean} debugFlag Value to set the debug flag to
   */
  setDebugMode(debugFlag) {
    if (this._isTestEnvironment) {
      throw new UnableToUpdateDebugFlagError();
    }

    this._isDebugModeOn = debugFlag;
  }

  /**
   * @description Gets the current debug flag level
   * @returns {boolean}
   */
  getDebugMode() {
    return this._isDebugModeOn;
  }

  /**
   * @description Returns either development if the bot is in a development environment, or production if not
   * @returns {string}
   */
  getEnvironmentType() {
    return this._isTestEnvironment ? 'development' : 'production';
  }

  /**
   * @description Deletes a file in the EnhancedClient's directory
   * @param {string} file A string representing the file path of the file to delete
   */
  deleteFile(file) {
    try {
      fs.unlinkSync(file);
    } catch (error) {
      this.error(error.toString());
    }
  }

  /**
   * @function
   * @description Determines if the EnhancedClient is in a test environment and updates debug flag accordingly
   * @returns {boolean}
   * @private
   */
  _checkIsTestEnvironment() {
    let isTestEnvironment = fs.existsSync('./.env');
    this._isDebugModeOn = isTestEnvironment === true || this._isDebugModeOn;
    return isTestEnvironment;
  }
}

module.exports = EnhancedClient;
