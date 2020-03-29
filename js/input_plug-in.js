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
		disabled: false,
		change: function () {}
	}
	// 创建模拟的input
	initPlugIn.prototype.creatInput = function () {
		let _this = this;
		let inputDom = document.createElement('div');
		inputDom.setAttribute("contenteditable", !this.opts.disabled);
		inputDom.setAttribute('placeholder', this.opts.placeholder);
		inputDom.className = 'plugin-box';
		// 变相添加div的change事件
		inputDom.addEventListener('keyup', function (e) {
			let ev = e || window.event
			if (_this.opts.maxlength) {
				// 用户设置了maxlength属性
				inputDom.innerText = inputDom.innerText.substring(0, parseInt(_this.opts.maxlength));
				_this.keepLastIndex(ev.target);
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
	// 将光标移向最后一位
	initPlugIn.prototype.keepLastIndex = function (obj) {
	    if (window.getSelection) { //ie11 10 9 ff safari
	        obj.focus(); //解决ff不获取焦点无法定位问题
	        let range = window.getSelection(); //创建range
	        range.selectAllChildren(obj); //range 选择obj下所有子内容
	        range.collapseToEnd(); //光标移至最后
	    } else if (document.selection) { //ie10 9 8 7 6 5
	        let range = document.selection.createRange(); //创建选择对象
	        //var range = document.body.createTextRange();
	        range.moveToElementText(obj); //range定位到obj
	        range.collapse(false); //光标移至最后
	        range.select();
	    }
	}
})(window)
