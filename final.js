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
  document.getElementById("stampSound").play();
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