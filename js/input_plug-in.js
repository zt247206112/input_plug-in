(function (window) {
	initPlugIn = function (options) {
		// 合并参数
		Object.assign(this.opts, options);
		// 创建模拟的input
		this.creatInput();
	};
	initPlugIn.prototype.opts = {
		el: '',
		placeholder: '',
		maxlength: '',
		disable: false,
		change: function () {}
	}
	// 创建模拟的input
	initPlugIn.prototype.creatInput = function () {
		console.log('zttt', this.opts)
	}
})(window)
