const duration = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const circle = document.querySelector('circle');
const perimeter = circle.getAttribute('r')*2*Math.PI;

circle.setAttribute('stroke-dasharray',perimeter);

class Timer{
    constructor(duration, startBtn, pauseBtn, callbacks){
        this.durationInput = duration;
        this.startBtn = startBtn;
        this.pauseBtn = pauseBtn;
        if(callbacks){
           this.onStart = callbacks.onStart; 
           this.onTick = callbacks.onTick;
           this.onComplete = callbacks.onComplete;
        }

        this.startBtn.addEventListener('click', this.start);
        this.pauseBtn.addEventListener('click', this.pause);
    }
    start=()=>{
        if(this.onStart){
            this.onStart(this.timeRemaining);
        }
        this.tick();
        this.timer = setInterval(this.tick, 10);
    }
    pause=()=>{
        clearInterval(this.timer);
    }
    tick=()=>{
        if(this.timeRemaining<=0){
            this.pause();
            if(this.onComplete){
                this.onComplete();
            }
        }
        else{
            this.displayTime = this.timeRemaining-0.01;
            if(this.onTick){
                this.onTick(this.timeRemaining);
            }
        }
    }
    get timeRemaining(){
        return parseFloat(this.durationInput.value);
    }
    /**
     * @param {any} time
     */
    set displayTime(time){
        this.durationInput.value = time.toFixed(2);
    }
}


let totalTime;
const timer = new Timer(duration, startBtn, pauseBtn, {
    onStart(displayTime){
        totalTime = displayTime;
    },
    onTick(timeRemaining){
        circle.setAttribute('stroke-dashoffset',perimeter*timeRemaining/totalTime-perimeter);
    },
    onComplete(){
        console.log('Timer Completed');
    }
});


