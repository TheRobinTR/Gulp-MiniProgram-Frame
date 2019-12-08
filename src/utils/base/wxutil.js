/**
 * @file 小程序相关的一些方法
 */

/**
 * 比较基础库版本
 * @param {String} v1
 * @param {String} v2
 */
const compareVersion = function (v1, v2) {
    v1 = v1.split('.');
    v2 = v2.split('.');
    const len = Math.max(v1.length, v2.length);

    while (v1.length < len) {
        v1.push('0');
    }
    while (v2.length < len) {
        v2.push('0');
    }

    for (let i = 0; i < len; i++) {
        const num1 = parseInt(v1[i]);
        const num2 = parseInt(v2[i]);

        if (num1 > num2) {
            return 1;
        } else if (num1 < num2) {
            return -1;
        }
    }

    return 0;
};

const wxutil = {
    compareVersion,
};

export default wxutil;
