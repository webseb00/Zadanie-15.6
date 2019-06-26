class Stopwatch {
	constructor(display) {
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
		this.startButton.addEventListener('click', () => this.start());
		this.stopButton.addEventListener('click', () => this.stop());
		this.resetButton.addEventListener('click', () => this.resetWatch());
		this.addListButton.addEventListener('click', () => this.saveTime());
		this.resetList.addEventListener('click', () => this.removeList());
	}

	reset() {
		this.times = {
			minutes: 0,
			seconds: 0,
			miliseconds: 0
		}
	}

	print() {
		this.display.innerText = this.format(this.times);
		this.save = {
			time: this.display.innerText
		}
	}

	format(times) {
		return `${this.pad0(times.minutes)}:${this.pad0(times.seconds)}:${this.pad0(Math.floor(times.miliseconds))}`;
	}

	pad0(value) {
		let result = value.toString();
		if(result.length < 2) {
			result = '0' + result;
		}
		return result;
	}

	start() {
		if(!this.running) {
			this.running = true;
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	step() {
		if(!this.running) {
			return
		}
		this.calculate();
		this.print();
	}

	calculate() {
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

	stop() {
		this.running = false;
		clearInterval(this.watch);
	}

	resetWatch() {
		this.running = false;
		this.reset();
		this.print();
	}

	saveTime() {
		let timeItem = this.save.time;
		let node = document.createElement('li');
		let content = document.createTextNode(timeItem);
		node.appendChild(content);
		this.timeList.appendChild(node); 
	}

	removeList() {
		let listChild = this.timeList.children.length;

		for(let i=0;i<listChild;i++) {
			this.timeList.removeChild(this.timeList.children[0]);
		}
	}
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));
