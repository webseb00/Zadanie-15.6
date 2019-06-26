'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
	function Stopwatch(display) {
		var _this = this;

		_classCallCheck(this, Stopwatch);

		this.running = false;
		this.display = display;
		this.reset();
		this.print(this.times);
		this.startButton = document.getElementById('start');
		this.stopButton = document.getElementById('stop');
		this.resetButton = document.getElementById('reset');
		this.addListButton = document.getElementById('addToList');
		this.resetList = document.getElementById('resetList');
		this.timeList = document.querySelector('.results');
		this.startButton.addEventListener('click', function () {
			return _this.start();
		});
		this.stopButton.addEventListener('click', function () {
			return _this.stop();
		});
		this.resetButton.addEventListener('click', function () {
			return _this.resetWatch();
		});
		this.addListButton.addEventListener('click', function () {
			return _this.saveTime();
		});
		this.resetList.addEventListener('click', function () {
			return _this.removeList();
		});
	}

	_createClass(Stopwatch, [{
		key: 'reset',
		value: function reset() {
			this.times = {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			};
		}
	}, {
		key: 'print',
		value: function print() {
			this.display.innerText = this.format(this.times);
			this.save = {
				time: this.display.innerText
			};
		}
	}, {
		key: 'format',
		value: function format(times) {
			return this.pad0(times.minutes) + ':' + this.pad0(times.seconds) + ':' + this.pad0(Math.floor(times.miliseconds));
		}
	}, {
		key: 'pad0',
		value: function pad0(value) {
			var result = value.toString();
			if (result.length < 2) {
				result = '0' + result;
			}
			return result;
		}
	}, {
		key: 'start',
		value: function start() {
			var _this2 = this;

			if (!this.running) {
				this.running = true;
				this.watch = setInterval(function () {
					return _this2.step();
				}, 10);
			}
		}
	}, {
		key: 'step',
		value: function step() {
			if (!this.running) {
				return;
			}
			this.calculate();
			this.print();
		}
	}, {
		key: 'calculate',
		value: function calculate() {
			this.times.miliseconds += 1;
			if (this.times.miliseconds >= 100) {
				this.times.seconds += 1;
				this.times.miliseconds = 0;
			}
			if (this.times.seconds >= 60) {
				this.times.minutes += 1;
				this.times.seconds = 0;
			}
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.running = false;
			clearInterval(this.watch);
		}
	}, {
		key: 'resetWatch',
		value: function resetWatch() {
			this.running = false;
			this.reset();
			this.print();
		}
	}, {
		key: 'saveTime',
		value: function saveTime() {
			var timeItem = this.save.time;
			var node = document.createElement('li');
			var content = document.createTextNode(timeItem);
			node.appendChild(content);
			this.timeList.appendChild(node);
		}
	}, {
		key: 'removeList',
		value: function removeList() {
			var listChild = this.timeList.children.length;

			for (var i = 0; i < listChild; i++) {
				this.timeList.removeChild(this.timeList.children[0]);
			}
		}
	}]);

	return Stopwatch;
}();

var stopwatch = new Stopwatch(document.querySelector('.stopwatch'));
