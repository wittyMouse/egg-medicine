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
 * 去前缀
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

module.exports = {
    camelToUnderScore,
    underScoreToCamel,
    objectCTUS,
    objectUSTC,
    removePrefix
}