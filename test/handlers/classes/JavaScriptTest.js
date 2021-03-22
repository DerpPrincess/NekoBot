'use strict'

class JavaScriptTest {

    totalTestCount;
    passedTestCount;

    constructor() {
        this.totalTestCount = 0;
        this.passedTestCount = 0;
    }


    beginTests() {
        console.log(`Beginning ${this.constructor.name} tests.`);
    }

    finishTests() {
        let passedPercent = (this.passedTestCount / this.totalTestCount).toFixed(2) * 100;
        console.log(`Completed ${this.constructor.name} tests. A total of ${this.totalTestCount} ran with ${this.passedTestCount} passing (${passedPercent}%).\n\n`);
    }

}

module.exports = JavaScriptTest;