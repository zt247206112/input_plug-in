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
		let _this = this;
		let inputDom = document.createElement('div');
		inputDom.setAttribute("contenteditable", "true");
		inputDom.setAttribute('placeholder', this.opts.placeholder);
		inputDom.setAttribute('disable', this.opts.disable);
		inputDom.className = 'plugin-box';
		// 变相添加div的change事件
		inputDom.addEventListener('keyup', function (e) {
			if (_this.opts.maxlength) {
				// 用户设置了maxlength属性
				inputDom.innerText = inputDom.innerText.substring(0, parseInt(_this.opts.maxlength));
			}
			_this.opts.change(inputDom.innerText);
		});
		// 添加粘贴监听事件，用于去除复制的样式
		inputDom.addEventListener('paste', function (e) {
			e.preventDefault();
		    let text;
		    let clp = (e.originalEvent || e.clipboardData);
		    if (clp === undefined || clp === null) {
		        text = window.clipboardData.getData("text") || "";
		        if (text !== "") {
		            if (window.getSelection) {
		                var newNode = document.createElement("span");
		                newNode.innerHTML = text;
		                window.getSelection().getRangeAt(0).insertNode(newNode);
		            } else {
		                document.selection.createRange().pasteHTML(text);
		            }
		        }
		    } else {
		        text = clp.getData('text/plain') || "";
		        if (text !== "") {
		            document.execCommand('insertText', false, text);
		        }
		    }
		})
		this.opts.el.appendChild(inputDom);
	}
})(window)
