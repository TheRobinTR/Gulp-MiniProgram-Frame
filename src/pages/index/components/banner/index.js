const app = getApp()

Component({
    properties: {
        items: {
            type: Array,
            value: []
        },
        autoplay: {
            type: Boolean,
            value: true
        }
    },
    data: {
        interval: 5000,
        duration: 500,
        currentIndex: 0,
        canPlay: true
    },
    pageLifetimes: {
        show() {
            this.setData({canPlay: true})
        },
        hide() {
            this.setData({canPlay: false})
        }
    },
    methods: {
        bindChange(e) {
            const {current} = e.detail || {current: 0}
            this.setData({
                currentIndex: current
            })
        },
        handleItemTap(e) {
            const {url,index} = e.currentTarget.dataset;

            let pages = getCurrentPages();
            let page = pages[pages.length - 1];
            page.wwzReport.ereport('click', {
                clickData: {
                    position: index+'',
                    link: url
                },
                id: 136,
                // 136首页资源位点击上报
                subType: 'resourcePlace'
            });

            app.wwzResource(url, 'liveChannelBanner');
        }
    }
})
