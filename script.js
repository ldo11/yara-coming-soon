document.addEventListener("DOMContentLoaded", () => {
    // --- Current Year for Footer ---
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --- Countdown Timer Logic ---
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl || hoursEl || minutesEl || secondsEl) {
        // Launch Date: 30 Days from right now
        const launchDate = new Date();
        launchDate.setDate(launchDate.getDate() + 30);
        const targetTime = launchDate.getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const difference = targetTime - now;

            if (difference < 0) {
                clearInterval(timerInterval);
                if (daysEl) daysEl.innerText = "00";
                if (hoursEl) hoursEl.innerText = "00";
                if (minutesEl) minutesEl.innerText = "00";
                if (secondsEl) secondsEl.innerText = "00";
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (daysEl) daysEl.innerText = days < 10 ? "0" + days : days;
            if (hoursEl) hoursEl.innerText = hours < 10 ? "0" + hours : hours;
            if (minutesEl) minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            if (secondsEl) secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        }

        // Run once immediately, then every second
        updateCountdown();
        const timerInterval = setInterval(updateCountdown, 1000);
    }

    // --- Scroll Animations (Intersection Observer) ---
    const scrollElements = document.querySelectorAll('.fade-in-up');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend);
    };

    const displayScrollElement = (element) => {
        element.classList.add('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.15)) {
                displayScrollElement(el);
            }
        })
    }

    // Trigger animation on load and scroll
    handleScrollAnimation();
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

});
