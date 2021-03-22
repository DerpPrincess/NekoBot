'use strict'

const fs = require("fs");

const JavaScriptTest = require("../handlers/classes/JavaScriptTest");
const Logger = require("../../handlers/classes/Logger");
const SpiffyDate = require("../../handlers/classes/SpiffyDate");
const LoggerType = require("../../handlers/classes/LoggerType");
const TestHelper = require("../handlers/classes/TestHelper");

class LoggerTest extends JavaScriptTest {

    logger;
    expectedPath;

    setUpSpiffyDateAndLogPath(loggerType) {
        this.logger = new Logger(loggerType);
        let spiffyDate = new SpiffyDate();
        let month = spiffyDate.getMonth() < 10 ? "0" + spiffyDate.getMonth() : spiffyDate.getMonth();
        let year = spiffyDate.getYear();

        this.expectedPath = `./test/log/${loggerType.text}/${year}-${month}.txt`;
        this.testStr = "potato";
        this.expectedLogMessage = `${spiffyDate.asString()}: > ${this.testStr}\n`
        this.logger.logFilePath = this.logger.getLoggerTestPath();
    }

    destroyAndRemoveTestFile() {
        try {
            fs.unlinkSync(this.logger.logFilePath);
        } catch(error) {
            this.destroyAndRemoveTestFile();
        }
    }

    runAllTests() {
        super.beginTests();
        this.test_debugLogger();
        this.test_errorLogger();
        this.test_writeDebug();
        this.test_writeError();
        super.finishTests();
    }

    test_debugLogger() {
        this.totalTestCount++;
        let testName = "debugLogger";
        try {
            this.setUpSpiffyDateAndLogPath(LoggerType.DEBUG);
            TestHelper.assertTrue(this.expectedPath, this.logger.getLoggerFilePath());
            this.passedTestCount++;
        } catch(error) {
            TestHelper.logFailedTest(testName, error);
        }
    }

    test_errorLogger() {
        this.totalTestCount++;
        let testName = "errorLogger";
        try {
            this.setUpSpiffyDateAndLogPath(LoggerType.ERROR);
            TestHelper.assertTrue(this.expectedPath, this.logger.getLoggerFilePath());
            this.passedTestCount++;
        } catch(error) {
            TestHelper.logFailedTest(testName, error);
        }
    }

    test_writeDebug() {
        this.totalTestCount++;
        let testName = "writeDebug";
        try {
            this.setUpSpiffyDateAndLogPath(LoggerType.DEBUG);
            this.logger.writeLog(this.testStr, false);
            TestHelper.assertFileWrittenTo(this.expectedLogMessage, this.logger.getLoggerFilePath());
            this.passedTestCount++;
        } catch(error) {
            TestHelper.logFailedTest(testName, error);
        }

        this.destroyAndRemoveTestFile();
    }

    test_writeError() {
        this.totalTestCount++;
        let testName = "writeError";
        try {
            this.setUpSpiffyDateAndLogPath(LoggerType.ERROR);
            this.logger.writeLog(this.testStr, false);
            TestHelper.assertTrue(this.expectedPath, this.logger.logFilePath);
            TestHelper.assertFileWrittenTo(this.expectedLogMessage, this.logger.getLoggerFilePath());
            this.passedTestCount++;
        } catch (error) {
            TestHelper.logFailedTest(testName, error);
        }

        this.destroyAndRemoveTestFile();
    }
}

module.exports = LoggerTest;