'use strict';

const fs = require('fs');

class BootLogger {
  static bootLogPath = './boot.txt';

  constructor(code, text, formatter = '') {
    this.code = code;
    this.text = text.toUpperCase();
    this.formatter = formatter;
  }

  /**
   * @description Posts a formatted message the console
   * @param {string} str The string to log to the console
   */
  log(str) {
    let formattedMessage = `[ ${this.text}] ${str}`;
    console.log(this.formatter, formattedMessage);
    this.writeLog(str);
  }

  /**
   * @description Writes a message to the bootlog text file
   * @param logText
   */
  writeLog(logText) {
    fs.writeFileSync(BootLogger.bootLogPath, `${logText}\n`, {
      encoding: 'utf8',
      flag: 'a',
    });
  }

  /**
   * @description Returns the path for the bootlog text file
   * @returns {string}
   */
  getBootLogPath() {
    return BootLogger.bootLogPath;
  }
}

class NonFormattedBootLogger extends BootLogger {
  constructor() {
    super('BOOT_NONE', 'none');
  }

  /**
   * @description Posts a non-formatted message to the console
   * @param {string} str The string to log to the console
   * @override
   */
  log(str) {
    console.log(str);
    super.writeLog(str);
  }
}

module.exports.BOOT = new NonFormattedBootLogger();
module.exports.INFO = new BootLogger('BOOT_INFO', 'info ', '%s');
module.exports.WARN = new BootLogger('BOOT_WARN', 'warn ', '\x1b[33m%s\x1b[0m');
module.exports.ALERT = new BootLogger(
  'BOOT_ALERT',
  'alert',
  '\x1b[41m%s\x1b[0m'
);
module.exports.ERROR = new BootLogger(
  'BOOT_ERROR',
  'error',
  '\x1b[31m%s\x1b[0m'
);
