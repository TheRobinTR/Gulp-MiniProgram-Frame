var app = getApp();
Component({
    data: {
        islogin: false
    },
    ready() {
        app.wwzQuietLogin(res => {
            if (res.sessionToken) {
                this.setData({
                    islogin: true
                });
            }
        });
    },
    methods: {
        userinfo(e) {
            if (e.detail.errMsg === 'getUserInfo:ok') {
                app.wwzAuthorLogin(e.detail).then(res => {
                    this.triggerEvent(
                        'userinfo',
                        function() {
                            return Promise.resolve(res);
                        }.bind(this)
                    );
                });
                // this.triggerEvent(
                //     'userinfo',
                //     function() {
                //         return app.wwzAuthorLogin(e.detail);
                //     }.bind(this)
                // );
            }
            // else{
            //     this.triggerEvent(
            //         'userinfo',
            //         function() {
            //             return Promise.reject('拒绝了！');
            //         }.bind(this)
            //     );
            // }
        },
        handle(e) {
            this.triggerEvent('userinfo', app.wwzQuietLogin.bind(this));
        }
    }
});
