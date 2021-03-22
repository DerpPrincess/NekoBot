'use strict'

const fs = require("fs");
const path = require("path");
const SpiffyDate = require("./SpiffyDate");
const LoggerType = require("./LoggerType");

class Logger {

    /**
     * @description Builds the Logger object
     * @param {LoggerType} loggerType The type of Logger
     */
    constructor(loggerType) {
        this.loggerType = loggerType;
        this._setLogFilePath();
        this._validateFilePath();
    }

    /**
     * @description Generates the string representing the Logger's file path
     * @private
     */
    _setLogFilePath() {
        let spiffyDate = new SpiffyDate()

        let month = spiffyDate.getMonth() < 10 ? "0" + spiffyDate.getMonth() : spiffyDate.getMonth();
        let year = spiffyDate.getYear();

        this.logFilePath = `./logs/${this.loggerType.text}/${year}-${month}.txt`;
    }

    /**
     * @description Validates that the logFilePath is valid, creating it if necessary
     * @private
     */
    _validateFilePath() {
        let logDir = path.dirname("./logs/temp.txt");

        if(!fs.existsSync(logDir)) {
            console.log(`Unable to locate ${logDir}, creating now...`);
            fs.mkdirSync(logDir);
            this._validateFilePath();
        }

        let dirname = path.dirname(this.logFilePath);
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname);
            this._validateFilePath();
        }
    }

    /**
     * @description Writes the log text to the file
     * @param {string}   logText        A string containing the text to log
     * @param {?boolean} [display=true] A boolean indicating if the message should be displayed on the console
     */
    writeLog(logText, display=true) {
        let timestamp = new SpiffyDate();

        let logMessage = `${timestamp.asString()}: ${this.loggerType.text} > ${logText}`;
        let fileMessage = `${timestamp.asString()}: > ${logText}\n`;

        fs.writeFileSync(this.logFilePath, fileMessage, { encoding: "utf8", flag: "a" });

        if (display) console.log(`${logMessage}`);
    }

    /**
     * @description Returns a String representing the Logger's file path
     * @returns {string}
     */
    getLoggerFilePath() { return this.logFilePath; }

    /**
     * @description Returns a String representing the Logger's test file path
     * @returns {string}
     */
    getLoggerTestPath() { return this.logFilePath.replace("/logs/", "/test/log/"); }

}

module.exports = Logger;