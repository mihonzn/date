const butterflies = document.querySelector(".butterflies");

function createButterfly() {
  const butterfly = document.createElement("div");

  butterfly.classList.add("butterfly");

  butterfly.textContent = "🦋";

  butterfly.style.left = "-50px";

  const startY = Math.random() * window.innerHeight;

  butterfly.style.top = `${startY}px`;

  butterflies.appendChild(butterfly);

  let x = Math.random() * window.innerWidth;
  let y = Math.random() * window.innerHeight;

  let speedX = (Math.random() - 0.5) * 3;
  let speedY = (Math.random() - 0.5) * 2.5;

  function animate() {
    x += speedX + Math.sin(y * 0.02);
    y += speedY + Math.cos(x * 0.02);

    const flap = Math.sin(x * 0.25);
    const scaleX = 1 + flap * 0.35;
    const rotate = flap * 14;

    butterfly.style.transform = `translate(${x}px, ${y}px) scaleX(${scaleX}) rotate(${rotate}deg)`;

    if (x < 0 || x > window.innerWidth - 40) {
      speedX *= -1;
    }

    if (y < 0 || y > window.innerHeight - 40) {
      speedY *= -1;
    }
    requestAnimationFrame(animate);
  }

  animate();
  setTimeout(() => {
    butterfly.remove();
  }, 6000);
}

setInterval(createButterfly, 4000);

const previewBg = document.querySelector(".place-preview-bg");
const placeCards = document.querySelectorAll(".place-card");

const previewImages = [
  "images/park.jpg",
  "images/horse.jpg",
  "images/cinema.jpg",
  "images/cafe.jpg",
];

placeCards.forEach((card, index) => {
  card.addEventListener("mouseenter", () => {
    previewBg.style.backgroundImage = `url("${previewImages[index]}")`;
    document.body.classList.add("preview-active");
  });

  card.addEventListener("mouseleave", () => {
    document.body.classList.remove("preview-active");
  });
});

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("night-mode");

  if (document.body.classList.contains("night-mode")) {
    themeToggle.textContent = "☀️";
  } else {
    themeToggle.textContent = "🌙";
  }
});

const fireflies = document.querySelector(".fireflies");

function createFirefly() {
  const firefly = document.createElement("div");

  firefly.classList.add("firefly");
  const size = Math.random() * 6 + 4;

  firefly.style.width = `${size}px`;
  firefly.style.height = `${size}px`;
  firefly.style.left = `${Math.random() * window.innerWidth}px`;

  firefly.style.top = `${Math.random() * window.innerHeight}px`;

  fireflies.appendChild(firefly);

  let x = parseFloat(firefly.style.left);
  let y = parseFloat(firefly.style.top);

  const speedX = (Math.random() - 0.5) * 0.45;
  const speedY = (Math.random() - 0.5) * 0.45;

  function animate() {
    x += speedX + Math.sin(y * 0.01);
    y += speedY + Math.cos(x * 0.01);

    firefly.style.transform = `translate(${x}px, ${y}px)`;

    firefly.style.opacity = 0.4 + Math.abs(Math.sin(Date.now() * 0.003));

    requestAnimationFrame(animate);
  }

  animate();
}

for (let i = 0; i < 45; i++) {
  createFirefly();
}
placeCards.forEach((card) => {
  card.addEventListener("click", () => {
    const selectedPlace = card.dataset.place;

    localStorage.setItem("selectedPlace", selectedPlace);

    document.body.classList.add("page-exit");

    setTimeout(() => {
      window.location.href = "food.html";
    }, 800);
  });
});
