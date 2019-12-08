/**
 * @file 字符串&数字格式化
 */

import typeCheck from './type';

/**
 * 千分位格式化
 * @param {*} val
 * @return {String}
 */
function thousandPar (val) {
    if (!typeCheck.isEffectNumber(val)) {
        // 格式化失败，返回空字符串
        return '';
    }

    val = val + '';
    let pairs = val.split('.');
    let res = pairs[0].match(/\d{1,3}(?=(\d{3})+$)/g);
    if (!res) {
        return val;
    }
    res.push(pairs[0].slice(-3));
    return res.join(',') + (pairs[1] ? '.' + pairs[1] : '');
}

/**
 * 数字格式化
 * @param {*} val
 * @param {Number} digits 有效数字位数
 * opt
 * @param {Boolean} isFixedDigits 是否为固定有效位数
 * @param {String} type 'round' 'ceil' 'floor' 舍入方式
 * @return {String}
 */
function toFloatString (val, digits = 2, opt = {}) {
    if (!typeCheck.isEffectNumber(val)) {
        // 格式化失败，返回空字符串
        return '';
    }

    let {isFixedDigits = true, type = 'round'} = opt;
    let intfy = Math[type];
    val = Number(val);
    // 取整
    if (!Number.isSafeInteger(digits) || digits <= 0) {
        return intfy(val) + '';
    }

    // 格式化
    val = intfy(val * Math.pow(10, digits)) / Math.pow(10, digits) + '';

    // 补0
    if (isFixedDigits) {
        let pairs = val.split('.');
        pairs[1] = (pairs[1] || '').padEnd(digits, '0');
        val = pairs.join('.');
    }

    return val;
}

/**
 * 前面补0操作
 * @param {*} val
 * @param {Number} digit 补足位数
 * @return {String}
 */
function padStart (val, digit = 2) {
    val = val.toString() || '';
    let chars = val.split('');
    let len = digit - chars.length;
    for (let i = 0; i < len; i++) {
        chars.unshift('0');
    }
    return chars.join('');
}

/**
 * 万格式化 (本函数不会对不到一万的数值做小数位数校正，如需校正可以在调用本函数前先调用toFloatString格式化)
 * @param {*} val
 * @param {String} txt 单位
 * @return {String}
 */
function formatWan (val, txt = 'w') {
    // 非有效数字，返回原值
    if (!typeCheck.isEffectNumber(val)) {
        return val;
    }

    val = Number(val);
    if (val >= 10000) {
        return toFloatString(val / 10000, 1) + txt;
    }

    return val + '';
}

const format = {
    thousandPar,
    toFloatString,
    padStart,
    formatWan
};

export default format;
