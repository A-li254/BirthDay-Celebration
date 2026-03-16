// --- Confetti on Page Load ---
window.onload = () => {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
};

function randomInRange(min, max) { return Math.random() * (max - min) + min; }

// --- Floating & Popping Balloons ---
const balloonContainer = document.getElementById('balloon-container');

function createBalloons() {
    for (let i = 0; i < 15; i++) {
        let balloon = document.createElement('div');
        balloon.className = 'balloon';
        balloon.style.left = Math.random() * 90 + 'vw';
        balloon.style.animationDuration = (Math.random() * 5 + 8) + 's'; // 8s to 13s
        balloon.style.animationDelay = Math.random() * 5 + 's';
        
        // On tap/click balloon breaks
        balloon.onclick = function(e) {
            popBalloon(e.clientX, e.clientY, balloon);
        };
        balloonContainer.appendChild(balloon);
    }
}

function popBalloon(x, y, balloonElement) {
    // Play pop effect
    confetti({
        particleCount: 30,
        spread: 70,
        origin: { x: x / window.innerWidth, y: y / window.innerHeight },
        colors: ['#d4af37', '#f3e5ab', '#ffffff']
    });
    // Remove balloon
    balloonElement.style.display = 'none';
}

createBalloons();

// --- Cake Cutting Effect ---
let cakeCut = false;
function cutCake() {
    if(cakeCut) return;
    cakeCut = true;
    
    const cake = document.getElementById('cake');
    const msg = document.getElementById('cake-msg');
    const flame = document.querySelector('.flame');
    
    // Blow out candle
    flame.style.display = 'none';
    
    // Add cut animation class
    cake.classList.add('cut-active');
    
    // Show text and confetti
    setTimeout(() => {
        msg.classList.add('show-msg');
        fireConfettiCannon();
    }, 1000);
}

// --- Gift Opening Effect ---
let giftOpened = false;
function openGift() {
    if(giftOpened) return;
    giftOpened = true;

    const giftBox = document.getElementById('gift-box');
    const giftMsg = document.getElementById('gift-msg');

    giftBox.classList.add('opened');
    
    setTimeout(() => {
        giftMsg.classList.add('show-msg');
        fireConfettiCannon();
    }, 500);
}

// Huge Confetti blast for special interactions
function fireConfettiCannon() {
    var count = 200;
    var defaults = { origin: { y: 0.7 } };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, {
            particleCount: Math.floor(count * particleRatio)
        }));
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
}
