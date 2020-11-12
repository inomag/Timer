const duration = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');

class Timer{
    constructor(duration, startBtn, pauseBtn){
        this.durationInput = duration;
        this.startBtn = startBtn;
        this.pauseBtn = pauseBtn;

        this.startBtn.addEventListener('click', this.start);
        this.pauseBtn.addEventListener('click', this.pause);
    }

    start=()=>{
        this.tick();
        this.timer = setInterval(this.tick, 1000);
    }
    pause=()=>{
        clearInterval(this.timer);
    }
    tick=()=>{
        this.displayTime = this.timeRemaining-1;
    }

    get timeRemaining(){
        return parseFloat(this.durationInput.value);
    }
    
    set displayTime (time){
        this.durationInput.value = time;
    }
}

const timer = new Timer(duration, startBtn, pauseBtn);
 
