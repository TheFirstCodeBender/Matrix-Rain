const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// let gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
// gradient.addColorStop(0, 'red');
// gradient.addColorStop(0.2, 'yellow');
// gradient.addColorStop(0.33, 'green');
// gradient.addColorStop(0.6, 'cyan');
// gradient.addColorStop(0.66, 'blue');
// gradient.addColorStop(1, 'magenta');
/*
4 Pillars of object oriented Programming
1) Encapsulation
2) Abstraction - hiding unnecessary details from the user.
It is about hiding internal functionality and implementation details of our objects
and only exposing essential information to the user.
3) Inheritance
4) Polymorphism
*/

//Class creates and manages individual symbols
class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ♕♖♗♘♙♚♛♜♝♞♟'
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight
    }
    drawRandomSymbol(context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length))
        
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.95) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

//Manage entire effect of all the symbols at once
class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 25;
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
        
    }

    //2nd Pillar Abstraction example.
    //Private method
    #initialize() {
        for (let i = 0; i < this.columns; i++){
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height) {
        this.canvasWidth = width
        this.canvasHeight = height
        this.columns = this.canvasWidth / this.fontSize
        this.symbols = []
        this.#initialize()
    }
}

const effect = new Effect(canvas.width, canvas.height)
let lastTime = 0;
const fps = 15;
const nextFrame = 1000/fps;
let timer = 0;
function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame) {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.textAlign = 'center'
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.fillStyle = '#0aff0a'
        context.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.drawRandomSymbol(context));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    
    requestAnimationFrame(animate);
}
animate(0);


window.addEventListener('resize', function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    // gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
    // gradient.addColorStop(0, 'red');
    // gradient.addColorStop(0.2, 'yellow');
    // gradient.addColorStop(0.4, 'green');
    // gradient.addColorStop(0.6, 'cyan');
    // gradient.addColorStop(0.8, 'blue');
    // gradient.addColorStop(1, 'magenta');
    effect.resize(canvas.width, canvas.height)
})