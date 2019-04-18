// 日期格式化
export const dateFormat = (fmt: any, dateRes: any) => {
    const date = dateRes ?  new Date(dateRes.toString().indexOf('T') > -1 ? transformUTC(dateRes) : dateRes) : new Date();
    const o: any = {
        'M+' : date.getMonth() + 1,                 // 月份
        'd+' : date.getDate(),                    // 日
        'h+' : date.getHours(),                   // 小时
        'm+' : date.getMinutes(),                 // 分
        's+' : date.getSeconds(),                 // 秒
        'q+' : Math.floor((date.getMonth() + 3) / 3), // 季度
        'S'  : date.getMilliseconds(),           // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (const k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
};

/**
 *  转换时区
 * @return {String}
 */
export const transformUTC = (value: any) => {
    if (value.length === 0) {
        return null;
    }
    const dateZone = Number(value.substring(value.length - 5));
    const dataTime = value.substring(0, (value.length - 9)).replace(/T/, ' ').replace(/-/g, '/');
    const dataValue = new Date(dataTime).getTime();
    const getZone =  new Date().getTimezoneOffset() / 60;
    const num = dataValue + (dateZone - getZone) * 3600000;
    return num;
};



// 日期添加时区
export const putDate = (value: any) => {
    if (value.length === 0) {
        return '';
    }
    const date = new Date();
    const timeString = date.toTimeString();
    const timeZone = IEVersion() > 10 ? timeString.split('GMT')[1].split('(')[0] : timeString.split('UTC')[1];
    if (!/T/.test(value)) {
        value = value.replace(/\s+/, 'T');
    }
    if (!/.000/.test(value)) {
        value = value + '.000';
    }
    const dataResult = (value + timeZone).replace(/\s+$/, '');
    return dataResult;
};

// 价格格式化 数字格式化
// type == number '保留2位，不补零' || price '保留2位，补零' || CBM '保留4位，补零' || int 整数
export const priceFormat = (str: any, type: 'number' | 'price' | 'CBM' | 'int', field?: string) => {
    if (str !== 0 && !str) {
        return;
    }
    let res;
    if (type === 'int') {
        // 整数，不补零
        res = (Math.round(parseFloat(str) )).toLocaleString();
        return res;
    }
    // field.indexOf(cbm) > -1
    if (type === 'CBM' || (field && field.toString().toLocaleUpperCase().indexOf('CBM') > -1)) {
        // 保留4位，补零
        if (str.toString().indexOf('.') > -1) {
            str = Math.round(parseFloat(str) * 10000) / 10000;
            if (str.toString().indexOf('.') === -1) {
                return str + '.0000';
            }
            let strRight = (str.toString().split('.')[1]).toString();
            let strLeft = (str.toString().split('.')[0]).toString();
            strLeft = strLeft.toLocaleString();
            const long = strRight.length;
            for (let i = 0; i < 4 - long; i++) {
                strRight += '0';
            }
            return strLeft + '.' + strRight;
        } else {
            return str + '.0000';
        }
    }
    if (type === 'number') {
        // 保留2位不补零
        res = (Math.round(parseFloat(str) * 100) / 100).toLocaleString();
        return res;
    }
    if (type === 'price') {
        // 价格保留2位，补零
        res = (Math.round(parseFloat(str) * 100) / 100).toLocaleString();
        if (res.indexOf('.') > -1) {
            if (res.split('.')[1].length > 1) {
                return res;
            } else {
                return res + '0';
            }
        } else {
            return res + '.00';
        }
    }
};



// 判断ie版本
function IEVersion() {
    const userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
    const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1; // 判断是否IE<11浏览器
    const isEdge = userAgent.indexOf('Edge') > -1 && !isIE; // 判断是否IE的Edge浏览器
    const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1;
    if (isIE) {
        const reIE = new RegExp('MSIE (\\d+\\.\\d+);');
        const ieRes = reIE.exec(userAgent)  as any;
        const fIEVersion = parseFloat(ieRes[1]);
        if (fIEVersion === 7) {
            return 7;
        } else if (fIEVersion === 8) {
            return 8;
        } else if (fIEVersion === 9) {
            return 9;
        } else if (fIEVersion === 10) {
            return 10;
        } else {
            return 6; // IE版本<=7
        }
    } else if (isEdge) {
        return 'edge'; // edge
    } else if (isIE11) {
        return 11; // IE11
    } else {
        return 100; // 不是ie浏览器
    }
}




