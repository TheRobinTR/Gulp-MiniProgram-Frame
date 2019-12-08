/**
 * [全局定时器]
 * @return {[type]} [description]
 */
class Interval {
    constructor () {
        this.interval = 0;
        this.allData = {};
    }

    append (key, fun, time) {
        if (time || +time === 0) {
            var newtime = +time;
            this.allData[key] = {callBack: fun, time: newtime};
        } else {
            this.allData[key] = {callBack: fun};
        }
        this.create();
    }

    create () {
        if (!this.interval) {
            this.interval = setInterval(() => {
                for (var key in this.allData) {
                    if (this.allData[key]) {
                        if (this.allData[key].time > -1 && this.allData[key].time !== undefined) {
                            var timedom = this.allData[key].time;
                            var totumin = timedom % 3600;
                            var hour = parseInt(timedom / 3600);
                            var min = parseInt(totumin / 60);
                            var second = totumin % 60;
                            typeof this.allData[key].callBack === 'function' && this.allData[key].callBack(second, min, hour);
                            this.allData[key].time--;
                            if (this.allData[key].time < 0) {
                                this.clear(key);
                            }
                        } else {
                            typeof this.allData[key].callBack === 'function' && this.allData[key].callBack();
                        }
                    }
                }
            }, 1000);
        }
    }

    clear (name) {
        clearInterval(this.interval);
        this.interval = 0;
        if (name) {
            delete this.allData[name];
            for (var key in this.allData) {
                if (this.allData[key]) {
                    this.create();
                }
            }
        } else {
            this.allData = {};
        }
    }
}

const interval = {
    interval: new Interval()
};

export default interval;
