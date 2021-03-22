'use strict'

/**
 * @typedef {Object} PermissionLevel
 * @property {string} code
 * @property {string} text
 * @description A Type used to indicate what permissions are necessary to execute a section of code
 */
class PermissionLevel {

    static OWNER = {code: "OWNER", text: "owner"};
    static ADMIN = {code: "ADMIN", text: "admin"};
    static MOD = {code: "MOD", text: "mod"};
    static NONE = {code: "NONE", text: "none"};

    /**
     * @description Indicates if the user has owner permissions
     * @param {PermissionLevel} permissionLevel The user's permission level to check
     * @returns {boolean} True if the user has owner permissions, otherwise false
     */
    static isOwner(permissionLevel) { return this.OWNER === permissionLevel; }

    /**
     * @description Indicates if the user has admin permissions
     * @param {PermissionLevel} permissionLevel The user's permission level to check
     * @returns {boolean} True if the user has admin permissions, otherwise false
     */
    static isAdmin(permissionLevel) { return this.ADMIN === permissionLevel; }

    /**
     * @description Indicates if the user has mod permissions
     * @param {PermissionLevel} permissionLevel The user's permission level to check
     * @returns {boolean} True if the user has mod permissions, otherwise false
     */
    static isMod (permissionLevel) { return this.MOD === permissionLevel; }

    /**
     * @description Indicates if the user has mod, admin, or owner permissions
     * @param {PermissionLevel} permissionLevel The user's permission level to check
     * @returns {boolean} True if the user is privileged, otherwise false
     */
    static isPrivilegedUser(permissionLevel) {
        return (this.isOwner(permissionLevel)) || (this.isAdmin(permissionLevel) || (this.isMod(permissionLevel)));
    }

    /**
     * @description Indicates if the user has admin or owner permissions
     * @param {PermissionLevel} permissionLevel The user's permission level to check
     * @returns {boolean} True if the user is admin or owner, otherwise false
     */
    static isSuperUser(permissionLevel) {
        return ((this.isOwner(permissionLevel)) || (this.isAdmin(permissionLevel)));
    }

}

module.exports = PermissionLevel;