/**
 * 驼峰命名转下划线命名
 * @param {*} str 
 */
function camelToUnderScore(str) {
    return str.replace(/\B([A-Z])/g, '_$1').toLowerCase();
}

/**
 * 下划线命名转驼峰命名
 * @param {*} str 
 */
function underScoreToCamel(str) {
    return str.replace(/_(\w)/g, (a, b) => { return b.toUpperCase(); });
}

/**
 * 将对象中属性的命名方式由驼峰命名转下划线命名
 * @param {*} obj 
 */
function objectCTUS(obj) {
    let temp = {};
    if (typeof obj == 'object') {
        Object.keys(obj).forEach(item => {
            temp[camelToUnderScore(item)] = obj[item];
        });
    }
    return temp;
}

/**
 * 将对象中属性的命名方式由下划线命名转驼峰命名
 * @param {*} obj 
 */
function objectUSTC(obj) {
    let temp = {};
    if (typeof obj == 'object') {
        Object.keys(obj).forEach(item => {
            temp[underScoreToCamel(item)] = obj[item];
        });
    }
    return temp;
}

/**
 * 联合查表去前缀
 * @param {*} obj 
 */
function removePrefix(obj) {
    let temp = {};
    if (typeof obj == 'object') {
        Object.keys(obj).forEach(item => {
            let arr = item.match(/([^_]+)_(.+)/);
            if (temp[arr[1]]) {
                temp[arr[1]][arr[2]] = obj[item];
            } else {
                temp[arr[1]] = { [arr[2]]: obj[item] };
            }
        });
    }
    return temp;
}

/**
 * 格式化时间
 * @param {*} date 
 */
function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

/**
 * 为不足两位的时间补0，保证两位
 * @param {*} n 
 */
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/**
 * 根据时间生成id
 * @param {*} date 
 */
function buildId(date, time) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    let temp = [year, month, day].map(formatNumber).join('');
    if (time) {
        temp += [hour, minute, second].map(formatNumber).join('');
    }
    return temp;
}

module.exports = {
    camelToUnderScore,
    underScoreToCamel,
    objectCTUS,
    objectUSTC,
    removePrefix,
    formatTime,
    buildId
}