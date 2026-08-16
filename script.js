// ======================================
// 1. LOADING SCREEN
// ======================================

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.style.display = "none";
        }, 1000);

    }, 1800);

});


// ======================================
// 2. MUSIC BUTTON
// ======================================

const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

musicBtn.addEventListener("click", async () => {

    if (!musicPlaying) {

        try {

            await music.play();

            musicPlaying = true;

            musicBtn.innerHTML =
                '<i class="fa-solid fa-pause"></i>';

        } catch (error) {

            alert(
                "Add your music file as assets/music.mp3 first 🎵"
            );

        }

    } else {

        music.pause();

        musicPlaying = false;

        musicBtn.innerHTML =
            '<i class="fa-solid fa-music"></i>';

    }

});


// ======================================
// 3. CONFETTI FUNCTION
// ======================================

function launchConfetti() {

    if (typeof confetti !== "function") {
        return;
    }

    confetti({
        particleCount: 220,
        spread: 170,
        startVelocity: 45,
        origin: {
            x: 0.5,
            y: 0.55
        }
    });

}


// ======================================
// 4. SIDE CONFETTI
// ======================================

function sideConfetti() {

    if (typeof confetti !== "function") {
        return;
    }

    confetti({
        particleCount: 100,
        angle: 60,
        spread: 70,
        origin: {
            x: 0,
            y: 0.7
        }
    });

    confetti({
        particleCount: 100,
        angle: 120,
        spread: 70,
        origin: {
            x: 1,
            y: 0.7
        }
    });

}


// ======================================
// 5. HERO SURPRISE BUTTON
// ======================================

const surpriseBtn =
    document.getElementById("surpriseBtn");

surpriseBtn.addEventListener("click", () => {

    launchConfetti();

    setTimeout(() => {
        sideConfetti();
    }, 250);

    createHearts(18);

    document.querySelector(".letter-section")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// ======================================
// 6. FINAL SURPRISE
// ======================================

const finalSurprise =
    document.getElementById("finalSurprise");

finalSurprise.addEventListener("click", () => {

    launchConfetti();

    setTimeout(() => {
        sideConfetti();
    }, 300);

    setTimeout(() => {
        startFireworks();
    }, 500);

    createHearts(35);

    setTimeout(() => {

        document.querySelector(".ending-section")
            .scrollIntoView({
                behavior: "smooth"
            });

    }, 1200);

});


// ======================================
// 7. FLOATING HEARTS
// ======================================

function createHearts(amount) {

    for (let i = 0; i < amount; i++) {

        const heart =
            document.createElement("div");

        heart.innerHTML =
            Math.random() > 0.5 ? "❤️" : "💖";

        heart.style.position = "fixed";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.bottom = "-30px";

        heart.style.fontSize =
            (12 + Math.random() * 20) + "px";

        heart.style.pointerEvents = "none";

        heart.style.zIndex = "800";

        document.body.appendChild(heart);

        const duration =
            2500 + Math.random() * 3000;

        heart.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 0
                },

                {
                    transform:
                        "translateY(-50vh) rotate(15deg)",
                    opacity: 1
                },

                {
                    transform:
                        "translateY(-115vh) rotate(-15deg)",
                    opacity: 0
                }
            ],
            {
                duration: duration,
                easing: "ease-out"
            }
        ).onfinish = () => {
            heart.remove();
        };

    }

}


// ======================================
// 8. CLICK SPARKLES
// ======================================

document.addEventListener("click", (event) => {

    for (let i = 0; i < 7; i++) {

        const sparkle =
            document.createElement("span");

        sparkle.textContent = "✦";

        sparkle.style.position = "fixed";

        sparkle.style.left =
            event.clientX + "px";

        sparkle.style.top =
            event.clientY + "px";

        sparkle.style.color = "#ffffff";

        sparkle.style.fontSize =
            (8 + Math.random() * 10) + "px";

        sparkle.style.pointerEvents = "none";

        sparkle.style.zIndex = "9999";

        document.body.appendChild(sparkle);

        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            25 + Math.random() * 55;

        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;

        sparkle.animate(
            [
                {
                    transform:
                        "translate(0,0) scale(1)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(${x}px,${y}px) scale(0)`,
                    opacity: 0
                }
            ],
            {
                duration: 700,
                easing: "ease-out"
            }
        ).onfinish = () => {
            sparkle.remove();
        };

    }

});


// ======================================
// 9. FIREWORKS
// ======================================

const canvas =
    document.getElementById("fireworks");

const ctx =
    canvas.getContext("2d");

let fireworks = [];

let fireworksRunning = false;


function resizeCanvas() {

    canvas.width =
        window.innerWidth *
        window.devicePixelRatio;

    canvas.height =
        window.innerHeight *
        window.devicePixelRatio;

    canvas.style.width =
        window.innerWidth + "px";

    canvas.style.height =
        window.innerHeight + "px";

    ctx.scale(
        window.devicePixelRatio,
        window.devicePixelRatio
    );

}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


// ======================================
// FIREWORK PARTICLE
// ======================================

class FireworkParticle {

    constructor(x, y, angle) {

        this.x = x;
        this.y = y;

        this.speed =
            2 + Math.random() * 5;

        this.angle = angle;

        this.life = 100;

        this.size =
            1 + Math.random() * 2;

    }

    update() {

        this.x +=
            Math.cos(this.angle)
            * this.speed;

        this.y +=
            Math.sin(this.angle)
            * this.speed;

        this.speed *= 0.97;

        this.life -= 1;

    }

    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,220,240,${this.life / 100})`;

        ctx.fill();

    }

}


// ======================================
// CREATE FIREWORK
// ======================================

function createFirework() {

    const x =
        100 +
        Math.random() *
        (window.innerWidth - 200);

    const y =
        100 +
        Math.random() *
        (window.innerHeight * 0.55);

    for (
        let angle = 0;
        angle < Math.PI * 2;
        angle += Math.PI / 14
    ) {

        fireworks.push(
            new FireworkParticle(
                x,
                y,
                angle
            )
        );

    }

}


// ======================================
// FIREWORK ANIMATION
// ======================================

function animateFireworks() {

    if (!fireworksRunning) {
        return;
    }

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    fireworks =
        fireworks.filter(
            particle =>
                particle.life > 0
        );

    fireworks.forEach(
        particle => {

            particle.update();
            particle.draw();

        }
    );

    requestAnimationFrame(
        animateFireworks
    );

}


// ======================================
// START FIREWORKS
// ======================================

function startFireworks() {

    fireworksRunning = true;

    createFirework();

    animateFireworks();

    let count = 0;

    const interval =
        setInterval(() => {

            createFirework();

            count++;

            if (count >= 10) {

                clearInterval(interval);

                setTimeout(() => {

                    fireworksRunning = false;

                    ctx.clearRect(
                        0,
                        0,
                        window.innerWidth,
                        window.innerHeight
                    );

                }, 5000);

            }

        }, 500);

}


// ======================================
// WELCOME CONFETTI
// ======================================

setTimeout(() => {

    launchConfetti();

}, 2300);