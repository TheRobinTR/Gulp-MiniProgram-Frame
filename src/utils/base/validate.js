// 验证是否是国内身份证
const matchIdCard = function (id) {
    return /^((11|12|13|14|15|21|22|23|31|32|33|34|35|36|37|41|42|43|44|45|46|50|51|52|53|54|61|62|63|64|65|71|81|82|91)\d{4})((((19|20)(([02468][048])|([13579][26]))0229))|((20[0-9][0-9])|(19[0-9][0-9]))((((0[1-9])|(1[0-2]))((0[1-9])|(1\d)|(2[0-8])))|((((0[1,3-9])|(1[0-2]))(29|30))|(((0[13578])|(1[02]))31))))((\d{3}(x|X))|(\d{4}))$/.test(
        id
    );
};

// 验证台湾身份证号
const validateTWIDCard = function (idCode) {
    const reg = /^[a-zA-Z][0-9]{9}$/;
    if (reg.test(idCode) !== false) {
        const twFirstCode = {
            A: 10,
            B: 11,
            C: 12,
            D: 13,
            E: 14,
            F: 15,
            G: 16,
            H: 17,
            J: 18,
            K: 19,
            L: 20,
            M: 21,
            N: 22,
            P: 23,
            Q: 24,
            R: 25,
            S: 26,
            T: 27,
            U: 28,
            V: 29,
            X: 30,
            Y: 31,
            W: 32,
            Z: 33,
            I: 34,
            O: 35
        };
        const start = idCode.substring(0, 1).toUpperCase();
        const mid = idCode.substring(1, 9);
        const end = idCode.substring(9, 10) * 1;
        const iStart = twFirstCode[start];
        let sum = parseInt(iStart / 10 + (iStart % 10) * 9);
        let iflag = 8;
        for (const c in mid) {
            sum += mid[c] * iflag;
            iflag--;
        }
        return (sum % 10 == 0 ? 0 : 10 - (sum % 10)) == end;
    }
    return false;
};

// 验证香港身份证号
const validateHKIDCard = function (idCode) {
    const reg = /^[a-zA-Z]\d{6}\(?\s?[A\d]\s?\)?$/;
    if (reg.test(idCode) !== false) {
        let start = idCode.substr(0, 1).toUpperCase();
        start = start.charCodeAt();
        if (start >= 65 && start <= 90) {
            start -= 64;
            let subIdCode = idCode.substr(1, 6);
            subIdCode = subIdCode.split('');
            let sum = start * 8;
            for (let i = 7; i > 1; i--) {
                sum += i * subIdCode[-i + 7];
            }
            let reminder = sum % 11;
            if (reminder == 1) {
                reminder = 'A';
            } else {
                reminder = 11 - reminder;
            }
            let verifyBit = 7;
            if (idCode.match(/\([A\d]\)/)) {
                verifyBit = 8;
            }
            const verify = idCode.substr(verifyBit, 1);
            if (verify == reminder) {
                return true;
            }
        }
    }
    return false;
};

// 护照
const validPassportIDCard = function (idCode) {
    if (!idCode) { return false; }
    const reg = /(^[a-zA-Z0-9]{5,21}$)|(^(P\d{7})|(G\d{8})$)/;
    if (reg.test(idCode)) {
        return true;
    }
    return false;
};

// 香港，澳门回乡证
const validateHkongMacao = function (idCode) {
    if (!idCode) { return false; }
    const reg = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/;
    if (reg.test(idCode)) {
        return true;
    }
    return false;
};

// 台湾通行证
const validateTaiwan = function (idCode) {
    if (!idCode) { return false; }
    const reg = /^([0-9]{8})|([0-9]{10})$/;
    if (reg.test(idCode)) {
        return true;
    }
    return false;
};

/**
 * 正则匹配身份证
 * @param {*} idCardType
 * @param {*} idCode
 */

const matchCard = function (idCardType, idCode) {
    switch (idCardType) {
    case 0:
        return matchIdCard(idCode);
    case 1:
        return validateTWIDCard(idCode);
    case 2:
        return validateHKIDCard(idCode);
    case 3:
        return validPassportIDCard(idCode);
    case 4:
        return validateHkongMacao(idCode);
    case 5:
        return validateTaiwan(idCode);
    default:
        return false;
    }
};

/**
 * 校验手机号
 * @param {String} t
 */
function telephoneCheck (t) {
    var _emp = /^\s*|\s*$/g;
    t = t.replace(_emp, '');
    var _d = /^1[3578][01379]\d{8}$/g;
    var _l = /^1[34578][01256]\d{8}$/g;
    var _y = /^(134[012345678]\d{7}|184\d{8}|1[345789][012356789]\d{8})$/g;
    if (_d.test(t)) {
        return 3;
    } else if (_l.test(t)) {
        return 2;
    } else if (_y.test(t)) {
        return 1;
    }
    return 0;
}

const validate = {
    matchCard,
    telephoneCheck
};

export default validate;
