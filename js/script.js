// carousel
const track = document.querySelector('.carousel');
let currentIndex = 1;

// // carousel items
// const carouselData = [
//     { 
//         image: "projects/typefaceCards/P1_Mockup.png",
//         title: "Typeface Cards", 
//     },
//     { 
//         image: "",
//         title: "Rembrandt's Conceptual Redesign", 
//     },
// ]

// track.innerHTML = "";
// carouselData.forEach(item => {
//     const slide = document.createElement('div');
//     slide.classList.add('carouselItem');

//     // for image
//     if (item.image) {
//         const img = document.getElement('img');
//         img.src = item.image;
//         img.title = item.title;
//         img.style.width = "100%";
//         img.style.height = "100%";
//         img.style.objectFit = "cover";
//         slide.appendChild(img);
//     }

//     const title = document.createElement('div');
//     title.textContent = item.title;
//     title.style.position = 'absolute';
//     title.style.bottom = '10px';
//     title.style.left = '50%';
//     title.style.transform = 'translateX(-50%)';
//     title.style.color = 'white';
//     title.style.fontWeight = 'bold';
//     slide.appendChild(title);

//     track.appendChild(slide);
// });

let slides = Array.from(track.children);
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

slides = Array.from(track.children);

// indicators
const indicatorContainer = document.querySelector('.carouselIndicators');
const realSlides = slides.filter(slide => !slide.id);

realSlides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
        currentIndex = index + 1;
        track.style.transition = "transform 0.5s ease-in-out";
        setActiveSlide();
    });
    indicatorContainer.appendChild(dot);
});

function updateIndicators() {
    const dots = Array.from(indicatorContainer.children);
    dots.forEach(dot => dot.classList.remove('active'));

    let realIndex = currentIndex - 1;
    if (slides[currentIndex].id === "first-clone") realIndex = 0;
    if (slides[currentIndex].id === "last-clone") realIndex = realSlides.length - 1;

    dots[realIndex].classList.add('active');
}

// set active item
function setActiveSlide() {
    slides.forEach(slide => {
        slide.classList.remove('prev', 'active', 'next');
        slide.style.display = 'none';
    });

    const prevIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;

    slides[currentIndex].classList.add('active');
    slides[currentIndex].style.display = 'flex';
    slides[prevIndex].classList.add('prev');
    slides[prevIndex].style.display = 'flex';
    slides[nextIndex].classList.add('next');
    slides[nextIndex].style.display = 'flex';

    const containerWidth = track.parentElement.getBoundingClientRect().width;
    const activeRect = slides[currentIndex].getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();

    const translateX = activeRect.left - trackRect.left - (containerWidth / 2 - activeRect.width / 2);
    track.style.transform = `translateX(-${translateX}px)`;

    updateIndicators();
}

// on click transitions
nextButton.addEventListener('click', () => {
    if (currentIndex >= slides.length - 1) return;
    currentIndex++;
    track.style.transition = "transform 1.5s ease-in-out";
    setActiveSlide();
});

prevButton.addEventListener('click', () => {
    if (currentIndex <= 0) return;
    currentIndex--;
    track.style.transition = "transform 1s ease-in-out";
    setActiveSlide();
});

track.addEventListener('transitionend', () => {
    if (slides[currentIndex].id === "first-clone") {
        track.style.transition = "none";
        currentIndex = 1;
        setActiveSlide();
    }
    if (slides[currentIndex].id === "last-clone") {
        track.style.transition = "none";
        currentIndex = slides.length - 2;
        setActiveSlide();
    }
});

window.addEventListener('resize', () => {
    track.style.transition = "none";
    setActiveSlide();
});

window.onload = () => {
    requestAnimationFrame(setActiveSlide);
};

// scrolling text
const scrolling = document.getElementById("scrolling");
scrolling.innerHTML += scrolling.innerHTML += scrolling.innerHTML += scrolling.innerHTML;

let x = 0;
const scrollWidth = scrolling.scrollWidth / 2;

function animate() {
    x -= 1.5;
    if (Math.abs(x) >= scrollWidth / 2) {
        x = 0;
    }
    scrolling.style.transform = `translate(${x}px)`;
    requestAnimationFrame(animate);
}
animate();

