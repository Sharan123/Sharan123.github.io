const parallax_el = document.querySelectorAll(".parallax");

let xValue = 0, yValue = 0;
let rotateDegree = 0;

function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
}

parallax_el.forEach(el => {
    el.dataset.left = getComputedStyle(el).left;
});

function update(cursorPosition)
{
    parallax_el.forEach(el => {
        let speedx = el.dataset.speedx;
        let speedy = el.dataset.speedy;
        let speedz = el.dataset.speedz;
        let rotateSpeed = el.dataset.rotation;
        let isInLeft = parseFloat(el.dataset.left) < window.innerWidth/2 ? 1 : -1;
        let zValue = (cursorPosition - parseFloat(el.dataset.left)) * isInLeft * 0.2;
        
        el.style.transform = `
            perspective(2300px)
            translateZ(${zValue * speedz}px)
            rotateY(${rotateDegree * rotateSpeed}deg)
            translateX(calc(-50% + ${-xValue * speedx}px))
            translateY(calc(-50% + ${yValue * speedy}px))
        `;
    });
}


update(0);

window.addEventListener("mousemove", (e) => {
    xValue = e.clientX - window.innerWidth/2;
    yValue = e.clientY - window.innerHeight/2;

    rotateDegree = (xValue / (window.innerWidth/2)) * 35;
    update(e.clientX);
});

/* GSAP Animation */
document.querySelectorAll('.parallax').forEach(function(el) {
    el.classList.add('no-transition');
});

window.onload = function() {
    let timeline = gsap.timeline();
    
    timeline.from(".bg-img", {
        duration: 4,
        autoAlpha: 0,
    });
    
    let layers_all = document.querySelectorAll(".layer-1, .layer-2, .layer-3, .layer-4, .layer-5, .text");
    layers_all.forEach(function(el) {
        timeline.from(el, {
            top: `${+el.offsetHeight/2 + +el.dataset.distance}px`,
            duration: 1.75,
            ease: "power2.out",
        }, "=-3.5");
    });

    timeline.eventCallback("onComplete", function() {
        document.querySelectorAll('.parallax').forEach(function(el) {
            el.classList.remove('no-transition');
        });
    });
    
}