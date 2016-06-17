/**
 * Created by hansollim on 2016-06-17.
 */

window.onload = function (event) {
	verticalMiddle();

	var idx, select, input;
	var convertColor = function (preType, type, code) {
		var convert = new colorConvert();
		return preType === type ? code : (type === "hex" ? "#" + convert[preType][type](code) : convert[preType][type](code));
	};
	var colorSetter = function (type, code, targetDOM) {
		var element = (targetDOM ? targetDOM : document.querySelectorAll(".code-table.code-" + type));
		if (isElement(element)) {
			if (typeof code === "object") {
				for (var _idx in code) {
					if (element.querySelector("input:nth-child(" + (parseInt(_idx) + 1) + ")")) {
						element.querySelector("input:nth-child(" + (parseInt(_idx) + 1) + ")").value = code[_idx];
					}
				}
			} else if (typeof code === "string" || typeof code === "number") {
				var inputs = element.getElementsByTagName("input");
				for (var _idx in inputs) {
					var input = inputs[_idx];
					if (isElement(input)) {
						input.value = code;
					}
				}
			}
		}
	};

	input = document.querySelectorAll(".code-table input");
	for (var idx in input) {
		if (isElement(input[idx])) {
			input[idx].addEventListener("keyup", function (event) {
				var parentDOM = event.target.parentNode;
				var rootDOM = event.target.parentNode.parentNode.parentNode;

				var code = [];
				var inputs = parentDOM.getElementsByTagName("input");
				if (inputs.length > 2) {
					for (var idx in inputs) {
						var input = inputs[idx];
						if (isElement(input) && !isNaN(idx)) {
							code.push(parseInt(input.value || 0));
						}
					}
				} else {
					for (var idx in inputs) {
						var input = inputs[idx];
						if (isElement(input)) {
							code = input.value;
						}
					}
				}

				rootDOM.querySelector(".box-left .color-preview").style.backgroundColor = convertColor(rootDOM.querySelector(".box-left .code-selector").value, "hex", code);
			});
		}
	}

	document.querySelector("section.middle img").addEventListener("click", function () {
		var leftDOM = document.querySelector("section.left");
		var rightDOM = document.querySelector("section.right");

		var preType = leftDOM.querySelector(".code-selector").value;
		var targetType = rightDOM.querySelector(".code-selector").value;

		var preDOM = leftDOM.querySelector(".box-right .code-" + preType);
		var targetDOM = rightDOM.querySelector(".box-right .code-" + targetType);

		var code = [];
		var inputs = preDOM.getElementsByTagName("input");
		if (inputs.length > 2) {
			for (var idx in inputs) {
				var input = inputs[idx];
				if (isElement(input) && !isNaN(idx)) {
					code.push(parseInt(input.value || 0));
				}
			}
		} else {
			for (var idx in inputs) {
				var input = inputs[idx];
				if (isElement(input)) {
					code = input.value;
				}
			}
		}

		var codeTable = rightDOM.querySelectorAll(".box-right .code-table");
		for (var idx in codeTable) {
			if (isElement(codeTable[idx])) {
				var className = codeTable[idx].className;
				codeTable[idx].className = className.replace("selected", "");
			}
		}
		targetDOM.className = targetDOM.className + " selected";

		rightDOM.querySelector(".color-preview").style.backgroundColor = convertColor(preType, "hex", code);
		colorSetter(targetType, convertColor(preType, targetType, code), targetDOM);
	});

	select = document.getElementsByClassName("code-selector");
	for (var idx in select) {
		if (isElement(select[idx])) {
			select[idx].addEventListener("click", function (event) {
				event.target.setAttribute("data-pre", event.target.value);
			});
			select[idx].addEventListener("change", function (event) {
				var code = [];
				var target = event.target;
				var preValue = target.getAttribute("data-pre");
				var preDOM = target.parentNode.parentNode.parentNode.querySelector(".box-right .code-" + preValue);
				var targetDOM = target.parentNode.parentNode.parentNode.querySelector(".box-right .code-" + target.value);

				var inputs = preDOM.getElementsByTagName("input");
				if (inputs.length > 2) {
					for (var input_idx in inputs) {
						var input = inputs[input_idx];
						if (isElement(input) && !isNaN(input_idx)) {
							code.push(parseInt(input.value || 0));
						}
					}
				} else {
					for (var input_idx in inputs) {
						var input = inputs[input_idx];
						if (isElement(input)) {
							code = input.value;
						}
					}
				}

				var codeTable = target.parentNode.parentNode.parentNode.querySelectorAll(".box-right .code-table");
				for (var _idx in codeTable) {
					if (isElement(codeTable[_idx])) {
						var className = codeTable[_idx].className;
						codeTable[_idx].className = className.replace("selected", "");
					}
				}
				targetDOM.className = targetDOM.className + " selected";

				target.parentNode.parentNode.querySelector(".color-preview").style.backgroundColor = convertColor(target.value, "hex", convertColor(preValue, target.value, code));
				colorSetter(target.value, convertColor(preValue, target.value, code), targetDOM);
			});
		}
	}
};
window.onresize = function (event) {
	verticalMiddle();
};

window.verticalMiddle = function () {
	document.querySelector("section#article .bg_border").style.marginTop = (window.innerHeight - document.querySelector("section#article .bg_border").clientHeight) / 2.35 + "px";
	document.querySelector("section.middle .vertical-middle").style.height = document.querySelector("section.left").clientHeight + "px";
};

window.isElement = function (obj) {
	try {
		return obj instanceof HTMLElement;
	}
	catch (e) {
		return (typeof obj === "object") &&
			(obj.nodeType === 1) && (typeof obj.style === "object") &&
			(typeof obj.ownerDocument === "object");
	}
};
