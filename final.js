const finalDate = document.getElementById("finalDate");
const finalTime = document.getElementById("finalTime");
const finalPlace = document.getElementById("finalPlace");
const finalFood = document.getElementById("finalFood");

finalDate.textContent =
  localStorage.getItem("selectedDate") || "Дата не выбрана";
finalTime.textContent =
  localStorage.getItem("selectedTime") || "Время не выбрано";
finalPlace.textContent =
  localStorage.getItem("selectedPlace") || "Место не выбрано";

document.querySelector(".finish-btn").addEventListener("click", () => {
  alert("Поздно. План уже утверждён 😄");
});
setTimeout(() => {
  const sound = document.getElementById("stampSound");

  if (sound) {
    sound.play().catch(() => {});
  }
}, 1300);
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    window.location.reload();
  }
});
const finalFoodIcon = document.getElementById("finalFoodIcon");

const selectedFood = localStorage.getItem("selectedFood") || "Еда не выбрана";

finalFood.textContent = selectedFood;

const foodIcons = {
  Фастфуд: "🍔",
  "Классическая еда": "🍛",
  Перекус: "🥪",
  Особенное: "✨",
  Острое: "🌶️",
};

finalFoodIcon.textContent = foodIcons[selectedFood] || "🍴";
document.addEventListener("selectstart", (e) => {
  e.preventDefault();
});
const cancelBtn = document.querySelector(".cancel-date-btn");

cancelBtn.addEventListener("click", () => {
  if (birdInterval) {
    clearInterval(birdInterval);
  }

  if (flyingBird) {
    flyingBird.style.display = "none";
  }
  cancelBtn.textContent = "🧾";

  setTimeout(() => {
    const bird = document.createElement("div");

    bird.className = "bird";
    bird.textContent = "🕊️";

    const rect = cancelBtn.getBoundingClientRect();

    bird.style.left = rect.left + "px";
    bird.style.top = rect.top + "px";

    document.body.appendChild(bird);

    cancelBtn.style.opacity = "0";

    setTimeout(() => {
      bird.classList.add("bird-fly");
    }, 100);
  }, 500);

  setTimeout(() => {
    alert("🕊️ Ваш отказ был успешно проигнорирован");
  }, 2500);
});
const flyingBird = document.querySelector(".flying-bird");
let birdInterval = null;

function flyRandomBird() {
  if (!flyingBird) return;

  const direction = Math.floor(Math.random() * 4);

  flyingBird.style.transition = "none";
  flyingBird.style.opacity = "1";

  if (direction === 0) {
    flyingBird.style.left = "-120px";
    flyingBird.style.top = Math.random() * 80 + "vh";
    flyingBird.style.transform = "rotate(0deg) scaleX(1)";

    setTimeout(() => {
      flyingBird.style.transition = "all 1.2s linear";
      flyingBird.style.left = "calc(100vw + 120px)";
    }, 50);
  }

  if (direction === 1) {
    flyingBird.style.left = "calc(100vw + 120px)";
    flyingBird.style.top = Math.random() * 80 + "vh";
    flyingBird.style.transform = "rotate(0deg) scaleX(-1)";

    setTimeout(() => {
      flyingBird.style.transition = "all 1.2s linear";
      flyingBird.style.left = "-120px";
    }, 50);
  }

  if (direction === 2) {
    flyingBird.style.left = Math.random() * 80 + "vw";
    flyingBird.style.top = "-120px";
    flyingBird.style.transform = "rotate(90deg)";

    setTimeout(() => {
      flyingBird.style.transition = "all 1.2s linear";
      flyingBird.style.top = "calc(100vh + 120px)";
    }, 50);
  }

  if (direction === 3) {
    flyingBird.style.left = Math.random() * 80 + "vw";
    flyingBird.style.top = "calc(100vh + 120px)";
    flyingBird.style.transform = "rotate(-90deg)";

    setTimeout(() => {
      flyingBird.style.transition = "all 1.2s linear";
      flyingBird.style.top = "-120px";
    }, 50);
  }

  setTimeout(() => {
    flyingBird.style.opacity = "0";
  }, 1300);
}

if (flyingBird) {
  birdInterval = setInterval(flyRandomBird, 4000);
}
