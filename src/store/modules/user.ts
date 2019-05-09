const state =
    // @ts-ignore
    sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')) :
    {
        menu: [{
            title: 'Home',
            icon: 'icon-shouye',
            name: 'Home',
            closable: false,
        }],
        defoultTag: 'Home,icon-shouye,Home',
        cHeight: 600,
        size: 'small',
    };

const mutations = {
    changeSize(stat: any, payload: any) {
        stat.size = payload;
    },
    changeHeight(stat: any, payload: any) {
        stat.cHeight = payload;
    },
    setMenu(stat: any, payload: any) {
        stat.menu = payload;
    },
    changeMenu(stat: any, payload: any) {
        const sideValue = payload.split(',');
        const res = {
            icon: sideValue[1],
            title: sideValue[2],
            name: sideValue[0],
            query: sideValue.length > 3 ? sideValue[3] : '',
            closable: true,
        };
        const names = stat.menu.map((it: any) => it.name);
        const titles = stat.menu.map((it: any) => it.title);
        if (!names.includes(res.name) || !titles.includes(res.title)) {
            stat.menu = [...stat.menu, res];
        }
        stat.defoultTag = [sideValue[0], sideValue[1], sideValue[2]].toString();
    },
    selectTag(stat: any, payload: any) {
        stat.defoultTag = payload;
    },
    pxoveTag(stat: any, payload: any) {
        let num = 0;
        for (let i = 0; i < stat.menu.length; i++) {
            if (stat.menu[i].name === payload) {
                num = i;
                break;
            }
        }
        stat.menu.splice(num, 1);
        if (payload === stat.defoultTag.split(',')[0]) {
            const seletTagRes = stat.menu[num - 1];
            console.log(seletTagRes);
            stat.defoultTag = `${seletTagRes.name},${seletTagRes.icon},${seletTagRes.title}`;
        }
    },
};

const getters = {
    menu: (stat: any) => stat.menu,
    defoultTag: (stat: any) => stat.defoultTag,
    cHeight: (stat: any) => stat.cHeight,
    size: (stat: any) => stat.size,
};

export default {
    state,
    mutations,
    actions: {},
    getters,
};
