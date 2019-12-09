const app = getApp();

export default function tmPage (option) {
    const onLoad = option.onLoad;
    const onShow = option.onShow;
    const onReady = option.onReady;
    const onHide = option.onHide;
    const onUnload = option.onUnload;

    // option.data.isIphoneX = app.systemInfo.isIphoneX;
    option.isFirstvisit = true;

    option.onLoad = function (e) {
        onLoad && onLoad.call(this, e);
    };
    if (option.onShareAppMessage) {
        const onShareAppMessage = option.onShareAppMessage;

        option.onShareAppMessage = function (e) {
            this.__isShare = true;
            const share = onShareAppMessage.call(this, e);
            return share;
        };
    }

    option.onShow = function (e) {
        onShow && onShow.call(this, e);
        // 分享动作后的回调
        if (this.__isShare) {
            option.afterShare && option.afterShare.call(this);
            this.__isShare = false;
        }
        if (this.isFirstvisit) {
            this.isFirstvisit = false;
        }
    };

    option.onReady = function () {
        onReady && onReady.call(this);
    };

    option.onHide = function () {
        onHide && onHide.call(this);
    };

    option.onUnload = function () {
        onUnload && onUnload.call(this);
    };


    Page(option);
}
