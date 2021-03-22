'use strict'

class SpiffyDate extends Date {

    /**
     * @typedef {SpiffyDate}
     * @description An enhanced version of the default Date class
     */

    /**
     * @description Creates an instance of the SpiffyDate class
     */
    constructor() {
        super();
    }

    /**
     * @description Sets the seconds
     * @param {number} arg The value to set the seconds to
     */
    setSeconds(arg) { super.setSeconds(arg); }

    /**
     * @description Gets the seconds
     * @returns {number}
     */
    getSeconds() { return super.getSeconds(); }

    /**
     * @description Sets the minutes
     * @param {number} arg The value to set the minutes to
     */
    setMinutes(arg) { super.setMinutes(arg); }

    /**
     * @description Gets the minutes
     * @returns {number}
     */
    getMinutes() { return super.getMinutes(); }

    /**
     * @description Sets the hour
     * @param {number} arg The value to set the hour to
     */
    setHour(arg) { super.setHours(arg); }

    /**
     * @description Gets the hour
     * @returns {number}
     */
    getHour() { return super.getHours(); }

    /**
     * @description Sets the date of the month
     * @param {number} arg The value to set the date of the month to
     */
    setDateOfMonth(arg) { super.setDate(arg); }

    /**
     * @description Gets the date of the month
     * @returns {number}
     */
    getDateOfMonth() { return super.getDate(); }

    /**
     * @description Sets the month
     * @param {number} arg The value to set the month to
     */
    setMonth(arg) { super.setMonth(arg); }

    /**
     * @description Gets the month
     * @returns {number}
     */
    getMonth() { return super.getMonth() + 1; }

    /**
     * @description Gets the month as a string
     * @returns {string}
     */
    getMonthAsString() {
        let monthOfYear = "";
        switch (this.getMonth()) {
            case 1:
                monthOfYear = "January";
                break;
            case 2:
                monthOfYear = "February";
                break;
            case 3:
                monthOfYear = "March";
                break;
            case 4:
                monthOfYear = "April";
                break;
            case 5:
                monthOfYear = "May";
                break;
            case 6:
                monthOfYear = "June";
                break;
            case 7:
                monthOfYear = "July";
                break;
            case 8:
                monthOfYear = "August";
                break;
            case 9:
                monthOfYear = "September";
                break;
            case 10:
                monthOfYear = "October";
                break;
            case 11:
                monthOfYear = "November";
                break;
            case 12:
                monthOfYear = "December";
                break;
        }

        return monthOfYear;
    }

    /**
     * @description Sets the year
     * @param {number} arg the Value to set the year to
     */
    setYear(arg) { super.setFullYear(arg); }

    /**
     * @description Gets the year
     * @returns {number}
     */
    getYear() { return super.getFullYear(); }

    /**
     * @description Gets the day of the week
     * @returns {number}
     */
    getDay() { return super.getDay() + 1; }

    /**
     * @description Gets the day of the week as a string
     * @returns {string}
     */
    getDayAsString() {
        let dayOfWeek = "";
        switch (this.getDay()) {
            case 1:
                dayOfWeek = "Sunday";
                break;
            case 2:
                dayOfWeek = "Monday";
                break;
            case 3:
                dayOfWeek = "Tuesday";
                break;
            case 4:
                dayOfWeek = "Wednesday";
                break;
            case 5:
                dayOfWeek = "Thursday";
                break;
            case 6:
                dayOfWeek = "Friday";
                break;
            case 7:
                dayOfWeek = "Saturday";
                break;
        }

        return dayOfWeek;
    }

    /**
     * @description Returns the SpiffyDate as a string
     * @returns {string}
     */
    asString() { return this._formatDate(); }

    /**
     * @description Returns the SpiffyDate as JSON
     * @returns {{seconds: number, dayOfWeek: number, hour: number, month: number, date: number, year: number, minutes: number}}
     */
    asJSON() { return this._formatJson(); }

    asDate() { return new Date(this); }

    /**
     * @description Formats the SpiffyDate value as a string
     * @returns {string} A formatted SpiffyDate string
     * @private
     */
    _formatDate() {
        let formatedMonth = this.getMonth() < 10 ? "0" + this.getMonth() : this.getMonth();
        let formatedDateOfMonth = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();

        let formatedHour = this.getHours() < 10 ? "0" + this.getHours() : this.getHours();
        let formatedMinute = this.getMinutes() < 10 ? "0" + this.getMinutes() : this.getMinutes();
        let formatedSecond = this.getSeconds() < 10 ? "0" + this.getSeconds() : this.getSeconds();

        return `${formatedMonth}/${formatedDateOfMonth}/${this.getYear()}: ${formatedHour}:${formatedMinute}:${formatedSecond}`;
    }

    /**
     * @description Formats the SpiffyDAte values as JSON
     * @returns {{seconds: number, dayOfWeek: number, hour: number, month: number, date: number, year: number, minutes: number}}
     * @private
     */
    _formatJson() {
        return {
            dayOfWeek: this.getDay(),
            seconds: this.getSeconds(),
            minutes: this.getMinutes(),
            hour: this.getHours(),
            date: this.getDate(),
            month: this.getMonth(),
            year: this.getFullYear()
        }
    }

    /**
     * @description Compares if two SpiffyDate or Date values are Equal
     * @param {SpiffyDate | Date}compareTo
     * @returns {boolean}
     */
    isEqual(compareTo) { return this.toString() === compareTo.toString(); }
}

module.exports = SpiffyDate;