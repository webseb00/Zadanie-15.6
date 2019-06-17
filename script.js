class Stopwatch {
	constructor(display) {
		this.running = false;
		this.display = display;
		this.reset();
		this.print(this.times);
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
		timeList.appendChild(node); 
	}

	removeList() {
		let listChild = timeList.children.length;

		for(let i=0;i<listChild;i++) {
			timeList.removeChild(timeList.children[0]);
		}
	}

	// START WATCH
	startButton.addEventListener('click', () => this.start());
	// STOP WATCH
	stopButton.addEventListener('click', () => this.stop());
	// RESET WATCH
	resetButton.addEventListener('click', () => this.resetWatch());
	// ADD TIME TO TIME LIST
	addListButton.addEventListener('click', () => this.saveTime());
	// RESET TIME LIST
	resetList.addEventListener('click', () => this.removeList());
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let resetButton = document.getElementById('reset');
let addListButton = document.getElementById('addToList');
let resetList = document.getElementById('resetList');
const timeList = document.querySelector('.results');

