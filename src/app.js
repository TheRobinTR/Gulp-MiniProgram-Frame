
import comm from './utils/base/index';

App({
    comm,
    onLaunch: function (options) {},
    globalData: {
        sessionToken: ''
    },
    onShow: function (e) {
    },
    onError (msg) {
        console.log(msg)
    },
    onHide: function () {}
});