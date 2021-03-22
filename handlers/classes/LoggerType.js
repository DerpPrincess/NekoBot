'use strict'

class LoggerType {

    /**
     * @typedef {Object} LoggerType
     * @property {string} code
     * @property {string} text
     * @description A Type used by the Logger class
     */

    static DEBUG = {code: "DEBUG", text: "debug"};
    static ERROR = {code: "ERROR", text: "error"};
    static COMMAND = {code: "COMMAND", text: "command"};
    static BOOT = {code: "BOOT", text: "boot"};

    /**
     * @description Indicates if the LoggerType is debug
     * @param {LoggerType} logType
     * @returns {boolean} True if LoggerType is debug, otherwise false
     */
    static isDebug(logType) { return this.DEBUG === logType; }

    /**
     * @description Indicates if the LoggerType is error
     * @param {LoggerType} logType
     * @returns {boolean} True if LoggerType is error, otherwise false
     */
    static isError(logType) { return this.ERROR === logType; }

    /**
     * @description Indicates if the LoggerType is command
     * @param {LoggerType} logType
     * @returns {boolean} True if LoggerType is command, otherwise false
     */
    static isCommand(logType) { return this.COMMAND === logType; }

    /**
     * @description Indicates if the LoggerType is boot
     * @param {LoggerType} logType
     * @returns {boolean} True if LoggerType is boot, otherwise false
     */
    static isBoot(logType) { return this.BOOT === logType; }
}

module.exports = LoggerType;