const finalDate = document.getElementById("finalDate");
const finalPlace = document.getElementById("finalPlace");
const finalFood = document.getElementById("finalFood");

finalDate.textContent =
  localStorage.getItem("selectedDate") || "Дата не выбрана";

finalPlace.textContent =
  localStorage.getItem("selectedPlace") || "Место не выбрано";

finalFood.textContent =
  localStorage.getItem("selectedFood") || "Еда не выбрана";

document.querySelector(".finish-btn").addEventListener("click", () => {
  alert("Поздно. План уже утверждён 😄");
});
setTimeout(() => {
  document.getElementById("stampSound").play();
}, 1300);
