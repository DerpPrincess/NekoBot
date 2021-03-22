'use strict'

const JavaScriptTest = require("../handlers/classes/JavaScriptTest");
const SpiffyDate = require("../../handlers/classes/SpiffyDate");
const TestHelper = require("../handlers/classes/TestHelper");

class SpiffyDateTest extends JavaScriptTest {

    constructor() {
        super();
    }

    runAllTests() {
        super.beginTests();
        this.test_initialSpiffyDate();
        this.test_setSeconds();
        this.test_setMinutes();
        this.test_setHour();
        this.test_setDate();
        this.test_setMonth();
        this.test_setYear();
        this.test_asDate();
        this.test_getMonth();
        this.test_getDayOfWeek();
        super.finishTests();
    }

    test_initialSpiffyDate() {
        this.totalTestCount++;
        let testName = "initialSpiffyDate";
        try {
            let spiffyDate = new SpiffyDate();
            TestHelper.assertTrue(spiffyDate, spiffyDate);
            this.passedTestCount++;
        } catch(error) {
            TestHelper.logFailedTest(testName, error);
        }
    }

    test_setSeconds() {
        this.totalTestCount++;
        let testName = "setSeconds";
        try {
            let spiffyDate = new SpiffyDate();
            spiffyDate.setSeconds(1);
            TestHelper.assertTrue(1, spiffyDate.asJSON().seconds);
            this.passedTestCount++;
        } catch (error) {
            TestHelper.logFailedTest(testName, error);
        }
    }

    test_setMinutes() {
        this.totalTestCount++;
        let testName = "setMinutes";
        try {
            let spiffyDate = new SpiffyDate();
            spiffyDate.setMinutes(1);
            TestHelper.assertTrue(1, spiffyDate.asJSON().minutes);
            this.passedTestCount++;
        } catch(error) {
            TestHelper.logFailedTest(testName, error);
        }
    }

    test_setHour() {
        this.totalTestCount++;
        let testName = "setHour";
        try {
            let spiffyDate = new SpiffyDate();
            spiffyDate.setHour(1);
            TestHelper.assertTrue(1, spiffyDate.asJSON().hour);
            this.passedTestCount++;
        } catch(error) {
            TestHelper.logFailedTest(testName, error);
        }
    }

    test_setDate() {
        this.totalTestCount++;
        let testName = "setDate";
        try {
            let spiffyDate = new SpiffyDate();
            spiffyDate.setDate(1);
            TestHelper.assertTrue(1, spiffyDate.asJSON().date);
            this.passedTestCount++;
        } catch(error) {
            TestHelper.logFailedTest(testName, error);
        }
    }

    test_setMonth() {
        this.totalTestCount++;
        let testName = "setMonth";
        try {
            let spiffyDate = new SpiffyDate();
            spiffyDate.setMonth(0);
            TestHelper.assertTrue(1, spiffyDate.asJSON().month);
            this.passedTestCount++;
        } catch(error) {
            TestHelper.logFailedTest(testName, error);
        }
    }

    test_setYear() {
        this.totalTestCount++;
        let testName = "setYear";
        try {
            let spiffyDate = new SpiffyDate();
            spiffyDate.setYear(2021);
            TestHelper.assertTrue(2021, spiffyDate.asJSON().year);
            this.passedTestCount++;
        } catch(error) {
            TestHelper.logFailedTest(testName, error);
        }
    }

    test_asDate() {
        this.totalTestCount++;
        let testName = "asDate";
        try {
            let date = new Date();
            let spiffyDate = new SpiffyDate(date);
            TestHelper.assertTrue(true, spiffyDate.isEqual(date));
            this.passedTestCount++;
        } catch(error) {
            TestHelper.logFailedTest(testName, error);
        }
    }

    test_getMonth() {
        this.totalTestCount++;
        let testName = "getMonth";
        try {
            let spiffyDate = new SpiffyDate();
            spiffyDate.setMonth(0);
            TestHelper.assertTrue(1, spiffyDate.getMonth());
            TestHelper.assertTrue("January", spiffyDate.getMonthAsString());
            this.passedTestCount++;
        } catch(error) {
            TestHelper.logFailedTest(testName, error);
        }
    }

    test_getDayOfWeek() {
        this.totalTestCount++;
        let testName = "getDayOfWeek";
        try {
            let spiffyDate = new SpiffyDate();
            spiffyDate.setYear(2021);
            spiffyDate.setMonth(0);
            spiffyDate.setDate(1);
            TestHelper.assertTrue(6, spiffyDate.getDay());
            TestHelper.assertTrue("Friday", spiffyDate.getDayAsString());
            this.passedTestCount++;
        } catch(error) {
            TestHelper.logFailedTest(testName, error);
        }
    }

}

module.exports = SpiffyDateTest;