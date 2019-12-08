/**
 * @file 字符串操作
 */

/**
 * 生成随机字符串
 * @param {Number} len
 */
function genRandomStr (len = 32) {
    const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';

    let res = '';
    for (let i = 0; i < len; i++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return res;
}

const str = {
    genRandomStr
};

export default str;
