'use strict'

class AlreadyBuiltError extends Error {

    /**
     * @description Error indicating that an object is already built when attempting to build it or update it using
     * builder options.
     * @param {Object} params
     * @param {string} params.offendingClass A string containing the name of the class causing the error
     * @param {string} params.cause          A string containing the cause of the error
     */
    constructor(params) {
        super();
        this.message = `Unable to build object ${params.offendingClass}. Object already built`;
        this.cause = `${params.cause}`;
    }
}

class UnableToLocateOrInvalidConfigError extends Error {

    /**
     * @description Error indicating that the EnhancedClient is missing it's required config file
     * @param {string} configPath A string representing the file path to the EnhancedClient's config file
     */
    constructor(configPath) {
        super();
        this.message = `Unable locate config file or Invalid at: ${configPath}`;
    }
}

module.exports.AlreadyBuiltError = AlreadyBuiltError;
module.exports.UnableToLocateOrInvalidConfigError = UnableToLocateOrInvalidConfigError;