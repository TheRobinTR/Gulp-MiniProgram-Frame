var app = getApp();
Component({
	properties: {
		diffTime: {
			type: Number,
			value: 0
		},
		fontColor: {
			type: Boolean,
			value: false
		},

		lastSprint: {
			type: Boolean,
			value: false
		},
		isInterval: {
			type: Boolean,
			value: false
		},
		color: {
			type: String
		}
	},
	data: {
		hour: 0,
		minute: 0,
		second: 0,
		millisecond: 0,
		interval: ''
	},
	ready() {
		clearInterval(this.data.interval);
		this.getdetailtime();
		if (this.data.lastSprint) {
			this.lastSprint();
		}
	},
	detached() {
		clearInterval(this.data.interval);
	},
	methods: {
		getdetailtime() {
			var diffTime = this.data.diffTime;
			let hour = Math.floor(diffTime / 3600);
			hour = hour < 10 ? `0${hour}` : hour;
			let minute = Math.floor((diffTime - hour * 3600) / 60);
			minute = minute < 10 ? `0${minute}` : minute;
			let sec = diffTime - hour * 3600 - minute * 60;
			sec = sec < 10 ? `0${sec}` : sec;

			this.setData({
				hour: hour,
				minute: minute,
				second: sec
			});
		},
		lastSprint() {
			var millisecond = 10;
			this.data.interval = setInterval(() => {
				millisecond = millisecond > 0 ? millisecond - 1 : 0;
				this.setData({
					millisecond: millisecond
				});
			}, 95);
		},

		timerun() {
			this.getdetailtime();
			clearInterval(this.data.interval);
			var lastSprint = this.data.lastSprint;
			if (lastSprint) {
				this.lastSprint();
			}
		}
	}
});
