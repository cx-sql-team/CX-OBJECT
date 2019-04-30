// 引入mockjs
import Mock from 'mockjs';


const account = [{
    name: 'admin',
    password: 'admin',
}];

const tableList = {
    "success": true, "data": {
        "total": 122,
        "list": [{
            "id": 169,
            "code": "A'ALI",
            "name": "A'ali",
            "nameLocal": null,
            "regionCode": "AS",
            "countryCode": "BH",
            "status": null,
            "deleted": false,
            "createBy": "Liu",
            "createTime": 1548753948000,
            "lastUpdateBy": "Liu",
            "lastUpdateTime": 1548753948000,
            "regionName": "Asia",
            "countryName": "Bahrain",
        }, {
            "id": 92,
            "code": "ABU AL ABYAD",
            "name": "Abu al Abyad",
            "nameLocal": null,
            "regionCode": "AS",
            "countryCode": "AE",
            "status": null,
            "deleted": false,
            "createBy": "Liu",
            "createTime": 1548752855000,
            "lastUpdateBy": "Liu",
            "lastUpdateTime": 1548752855000,
            "regionName": "Asia",
            "countryName": "United Arab Emirates",
        }, {
            "id": 186,
            "code": "ABU DHABI",
            "name": "Abu Dhabi",
            "nameLocal": null,
            "regionCode": "AS",
            "countryCode": "AE",
            "status": null,
            "deleted": false,
            "createBy": "Liu",
            "createTime": 1550219740000,
            "lastUpdateBy": "Liu",
            "lastUpdateTime": 1550219740000,
            "regionName": "Asia",
            "countryName": "United Arab Emirates",
        }, {
            "id": 93,
            "code": "ADHEN",
            "name": "Adhen",
            "nameLocal": null,
            "regionCode": "AS",
            "countryCode": "AE",
            "status": null,
            "deleted": false,
            "createBy": "Liu",
            "createTime": 1548752855000,
            "lastUpdateBy": "Liu",
            "lastUpdateTime": 1548752855000,
            "regionName": "Asia",
            "countryName": "United Arab Emirates",
        }, {
            "id": 188,
            "code": "AJMAN",
            "name": "Ajman",
            "nameLocal": null,
            "regionCode": "AS",
            "countryCode": "AE",
            "status": null,
            "deleted": false,
            "createBy": "Liu",
            "createTime": 1550219740000,
            "lastUpdateBy": "Liu",
            "lastUpdateTime": 1550219740000,
            "regionName": "Asia",
            "countryName": "United Arab Emirates",
        }, {
            "id": 135,
            "code": "AL AHMADI",
            "name": "Al Ahmadi",
            "nameLocal": null,
            "regionCode": "AS",
            "countryCode": "KW",
            "status": null,
            "deleted": false,
            "createBy": "Liu",
            "createTime": 1548753522000,
            "lastUpdateBy": "Liu",
            "lastUpdateTime": 1548753522000,
            "regionName": "Asia",
            "countryName": "Kuwait",
        }, {
            "id": 80,
            "code": "AL AIN",
            "name": "Al Ain",
            "nameLocal": null,
            "regionCode": "AS",
            "countryCode": "AE",
            "status": null,
            "deleted": false,
            "createBy": "Liu",
            "createTime": 1548752855000,
            "lastUpdateBy": "Liu",
            "lastUpdateTime": 1548752855000,
            "regionName": "Asia",
            "countryName": "United Arab Emirates",
        }, {
            "id": 94,
            "code": "AL ARYAM",
            "name": "Al Aryam",
            "nameLocal": null,
            "regionCode": "AS",
            "countryCode": "AE",
            "status": null,
            "deleted": false,
            "createBy": "Liu",
            "createTime": 1548752855000,
            "lastUpdateBy": "Liu",
            "lastUpdateTime": 1548752855000,
            "regionName": "Asia",
            "countryName": "United Arab Emirates",
        }, {
            "id": 95,
            "code": "AL BADIYAH",
            "name": "Al Badiyah",
            "nameLocal": null,
            "regionCode": "AS",
            "countryCode": "AE",
            "status": null,
            "deleted": false,
            "createBy": "Liu",
            "createTime": 1548752855000,
            "lastUpdateBy": "Liu",
            "lastUpdateTime": 1548752855000,
            "regionName": "Asia",
            "countryName": "United Arab Emirates",
        }, {
            "id": 139,
            "code": "AL FAḨĀḨĪL",
            "name": "Al Faḩāḩīl",
            "nameLocal": null,
            "regionCode": "AS",
            "countryCode": "KW",
            "status": null,
            "deleted": false,
            "createBy": "Liu",
            "createTime": 1548753522000,
            "lastUpdateBy": "Liu",
            "lastUpdateTime": 1548753522000,
            "regionName": "Asia",
            "countryName": "Kuwait",
        }],
        "pageNum": 1,
        "pageSize": 10,
        "size": 10,
        "startRow": 1,
        "endRow": 10,
        "pages": 13,
        "prePage": 0,
        "nextPage": 2,
        "isFirstPage": true,
        "isLastPage": false,
        "hasPreviousPage": false,
        "hasNextPage": true,
        "navigatePages": 8,
        "navigatepageNums": [1, 2, 3, 4, 5, 6, 7, 8],
        "navigateFirstPage": 1,
        "navigateLastPage": 8
    }, "errorCode": null, "errorMsg": null
};


const menu = {
    "success": true,
    "data": [{
        "id": "Home",
        "appCode": "Home",
        "menuCode": "Home",
        "menuName": "Home",
        "icon": "icon-shouye",
        "displayOrder": 1,
        "level": 1,
        "parentCode": "0",
        "uri": "",
        "mnemonicCode": null,
        "childList": null
    }, {
        "id": "About",
        "appCode": "About",
        "menuCode": "About",
        "menuName": "About",
        "icon": "icon-shouye",
        "displayOrder": 1,
        "level": 1,
        "parentCode": "0",
        "uri": "About",
        "mnemonicCode": null,
        "childList": null
    }],
    "errorCode": null,
    "errorMsg": null
};


const region = {
    "success": true,
    "data": [
        {
            "code": "cn",
            "name": "中国",
        },
        {
            "code": "en",
            "name": "英国",
        }
    ],
    "errorCode": null,
    "errorMsg": null
};

const country = {
    "success": true,
    "data": [
        {
            "code": "sh",
            "name": "上海",
            "parent": "cn"
        },
        {
            "code": "bj",
            "name": "北京",
            "parent": "cn"
        },
        {
            "code": "liverpool",
            "name": "利物浦",
            "parent": "en"
        },
        {
            "code": "man",
            "name": "曼联",
            "parent": "en"
        }
    ],
    "errorCode": null,
    "errorMsg": null
};


// mock
function mockFun(url, data, type='get') {
    Mock.mock(RegExp(url + "/*"), type, (req, res) => {

        const re = typeof data === "function" ? data(req, res) : data;
        console.info('%c ' + 'response:' + url,'font-weight:bold;color:blue;', re.data);
        return re;
    });
}


//登录
mockFun('/api/auth/login', (req, res) => {
    console.log(req);
    const reqName = JSON.parse(req.body).userName;
    const reqPassword = JSON.parse(req.body).passWord;
    const isSuccess = account.filter(it => (it.name === reqName && it.password === reqPassword)).length === 1;
    if(isSuccess) {
        return {
            "success": true,
            "data": {
                jwt: 'jwt',
                uName: JSON.parse(req.body).userName,
            }
        }
    }
    else {
        return {
            "success": false,
            "errorMsg": '账号密码不正确',
        }
    }
}, 'post');




// 表格数据
mockFun('/api/mdm-api/city/query', tableList);


// 菜单
mockFun('/api/am-api/common/menuTree', menu);


// 国家下拉框
mockFun('/api/mdm-api/region', (req, res) => {
    let name = GetQueryString('name', req.url);
    return {
        "success": true,
        "data": name ? region.data.filter((it) => (it.name.indexOf(name) > -1 ||  it.code.indexOf(name) > -1)) : region.data,
    }
});

// 城市下拉框
mockFun('/api/mdm-api/city/country', (req, res) => {
    return {
        "success": true,
        "data": country.data.filter((it) => (it.parent === GetQueryString('regionCode', req.url))),
    }
});

function GetQueryString(name, url)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    let num = url.indexOf('?');
    var r = url.substr(num + 1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}


