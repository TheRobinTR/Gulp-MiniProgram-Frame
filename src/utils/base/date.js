/**
 * @file 日期格式化
 */
import f from './format';

/**
 * 格式化时间戳，传入Date对象
 * @param {Date} date
 * @param {String} fmt
 */
const format = (date, fmt = 'yyyy-MM-dd HH:mm:ss') => {
    // 部分兼容时间戳
    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    let d = {
        'y+': date.getFullYear(),
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'H+': date.getHours(),
        'h+': date.getHours() % 12,
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        't+': date.getHours() > 11 ? 'PM' : 'AM'
    };

    for (let r in d) {
        switch (r) {
        case 'y+':
            (new RegExp(`(${r})`, 'gi').test(fmt)) && (fmt = fmt.replace(RegExp.$1, d[r].toString().substring(4 - RegExp.$1.length)));
            break;
        case 't+':
            (new RegExp(`(${r})`, 'gi').test(fmt)) && (fmt = fmt.replace(RegExp.$1, d[r].toString().substring(0, RegExp.$1.length)));
            break;
        default:
            (new RegExp(`(${r})`, 'g').test(fmt)) && (fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? d[r] : f.padStart(d[r], 2)));
            break;
        }
    }
    return fmt;
};

const dateFormat = function (fmt) {
    return format(this, fmt);
};

const old = Date.prototype.format;

const noConflict = () => {
    if (Date.prototype.format === dateFormat) {
        try {
            Object.assign(Date.prototype, {format: old});
        } catch (e) {
        }
    }
};

Object.assign(Date.prototype, {
    format: dateFormat
});

/**
 * 格式化时间，倒计时场景
 * @param {Number} time 秒数
 * @param {String} fmt dd天HH小时mm分钟ss秒
 */
function formatTimePhase (time, fmt = 'HH:mm:ss') {
    time = parseInt(time);
    let hour = Math.floor(time / 3600);
    let minute = Math.floor(time / 60) % 60;
    let second = time % 60;

    let day = 0;
    if (fmt.indexOf('d') !== -1 && time >= 24 * 3600) {
        day = Math.floor(time / (24 * 3600));
        hour = Math.floor(time % (24 * 3600) / 3600);
    }

    let d = {
        'd+': day,
        'H+': hour,
        'm+': minute,
        's+': second
    };

    for (let r in d) {
        new RegExp(`(${r})`, 'g').test(fmt) && (fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? d[r] : f.padStart(d[r], 2)));
    }

    return fmt;
}

const utils = {
    format,
    noConflict,
    formatTimePhase
};

export default utils;
