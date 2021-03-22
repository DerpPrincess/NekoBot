class AssertTrueFailedError extends Error {

    /**
     * @description Error indicating that a test failed asserting a value as true.
     * @param expectedValue The expected value
     * @param actualValue   The actual value
     */
    constructor(expectedValue, actualValue) {
        super();
        this.message = `Expected value \"${expectedValue}\" but actual value \"${actualValue}\"`;
        this.cause = "Expected value did not match actual value";
    }
}

class AssertFalseFailedError extends Error {

    /**
     * @description Error indicating that a test failed asserting a value as false.
     * @param expectedValue
     * @param actualValue
     */
    constructor(expectedValue, actualValue) {
        super();
        this.message = `Expected value \"${expectedValue}\" but actual value \"${actualValue}\"`;
        this.cause = "Expected value matched actual value";
    }
}

class AssertFileWrittenToError extends Error {

    constructor(fileWrittenTo, error) {
        super();
        this.message = `Expected to find file at ${fileWrittenTo} but did not.`;
        this.cause = error.toString();
    }
}

module.exports.AssertTrueFailedError = AssertTrueFailedError;
module.exports.AssertFalseFailedError = AssertFalseFailedError;
module.exports.AssertFileWrittenToError = AssertFileWrittenToError;