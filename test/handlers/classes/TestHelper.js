'use strict'

const fs = require("fs");
const { AssertTrueFailedError, AssertFalseFailedError, AssertFileWrittenToError } = require("../../handlers/classes/CustomErrors");

class TestHelper {

    /**
     *
     * @param {string}           testName A string containing the name of the failed test
     * @param {string | error }  error    A string or error with the failed message
     */
    static logFailedTest(testName, error) {
        console.log(`* test_${testName} failed with error: ${error.toString()}`);
    }

    /**
     * @description Checks if two values are equal.
     * @param expectedValue The expected value
     * @param actualValue   The actual value to be tested
     * @returns {null}
     */
    static assertTrue(expectedValue, actualValue) {
        if (expectedValue === actualValue) {
            return null;
        } else {
            throw new AssertTrueFailedError(expectedValue, actualValue);
        }
    }

    /**
     * @description Checks if two values are not equal.
     * @param expectedValue
     * @param actualValue
     * @returns {null}
     */
    static assertFalse(expectedValue, actualValue) {
        if (expectedValue !== actualValue) {
            return null;
        } else {
            throw new AssertFalseFailedError(expectedValue, actualValue);
        }
    }

    /**
     * @description Checks if an expected function failed or not when its build function is called
     * @param {Object} obj      An object with a build function
     * @param {string} errorMsg A string containing the expected error message
     */
    static assertFailedBuild(obj, errorMsg) {
        try {
            obj.build();
        } catch(error) {
            this.assertTrue(errorMsg, error.toString())
        }
    }

    /**
     * @description Checks if an expected string was written to a specific file
     * @param {string} expectedValue A string containing the expected value of the test
     * @param {string} fileWrittenTo A string representing the path to the file written too
     */
    static assertFileWrittenTo(expectedValue, fileWrittenTo) {
        let actualValue;
        try {
            actualValue = fs.readFileSync(fileWrittenTo, "utf8");
        } catch(error) {
            throw new AssertFileWrittenToError(fileWrittenTo, error);
        }
        this.assertTrue(expectedValue, actualValue);
    }
}

module.exports = TestHelper;