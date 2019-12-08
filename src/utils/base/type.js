/**
 * @file 类型判断
 */

/**
 * 辅助工具函数
 * @param {any} val
 * @param {String} type
 * @return {Boolean}
 */
function checkPureType (val, type) {
    return Object.prototype.toString.call(val).toLowerCase() === '[object ' + type + ']';
}

/**
 * 判断是否为字符串类型
 * @param {any} str
 * @return {Boolean}
 */
function isString (str) {
    return checkPureType(str, 'string');
}

/**
 * 判断是否为数字类型
 * @param {any} num
 * @return {Boolean}
 */
function isNumber (num) {
    return checkPureType(num, 'number');
}

/**
 * 判断是否为布尔类型
 * @param {any} b
 * @return {Boolean}
 */
function isBoolean (b) {
    return checkPureType(b, 'boolean');
}

/**
 * 判断是否为null
 * @param {any} val
 * @return {Boolean}
 */
function isNull (val) {
    return checkPureType(val, 'null');
}

/**
 * 判断是否为undefined
 * @param {any} val
 * @return {Boolean}
 */
function isUndefined (val) {
    return checkPureType(val, 'undefined');
}

/**
 * 判断是否为函数类型
 * @param {any} fn
 * @return {Boolean}
 */
function isFunction (fn) {
    return checkPureType(fn, 'function');
}

/**
 * 判断是否为对象类型
 * @param {any} obj
 * @return {Boolean}
 */
function isObject (obj) {
    return obj instanceof Object;
}

/**
 * 判断是否为纯对象类型 {}
 * @param {any} obj
 * @return {Boolean}
 */
function isPureObject (obj) {
    return isObject(obj) && checkPureType(obj, 'object');
}

/**
 * 判断是否为空对象 {}
 * @param {any} obj
 * @return {Boolean}
 */
function isEmptyObject (obj) {
    return isPureObject(obj) && JSON.stringify(obj) === '{}';
}

/**
 * 判断是否为合法有效的数字字符串或数值
 * @param {any} val
 * @param {Boolean} isSafe 是否做数值安全校验
 * @return {Boolean}
 */
function isEffectNumber (val, isSafe = false) {
    if (isString(val) && val !== '' || isNumber(val)) {
        val = Number(val);
        if (!Number.isNaN(val) && Number.isFinite(val)) {
            if (isSafe && Number.isInteger(val)) {
                return Number.isSafeInteger(val);
            }
            return true;
        }
    }
    return false;
}

/**
 * 是否为可迭代的非空数组或非空对象
 * @param {*} list
 */
function isIterableList (list) {
    if (Array.isArray(list)) {
        return list.length > 0;
    }

    if (isPureObject(list)) {
        return Object.keys(list).length > 0;
    }

    return false;
}

const typeCheck = {
    isString,
    isNumber,
    isBoolean,
    isNull,
    isUndefined,
    isFunction,
    isObject,
    isPureObject,
    isEmptyObject,
    isEffectNumber,
    isIterableList
};

export default typeCheck;
