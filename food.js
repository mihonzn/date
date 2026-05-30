let foodVideoInterval = null;
const foodVideos = {
  Фастфуд: [
    "images/fastfood1.mp4",
    "images/fastfood2.mp4",
    "images/fastfood3.mp4",
  ],

  Острое: [
    "images/spicyfood1.mp4",
    "images/spicyfood2.mp4",
    "images/spicyfood3.mp4",
  ],

  Особенное: ["images/osoboe1.mp4", "images/osoboe2.mp4", "images/osoboe3.mp4"],
};
let foodImageInterval = null;

const foodSlides = {
  "Классическая еда": [
    "images/classic1.jpg",
    "images/classic2.jpg",
    "images/classic3.jpg",
  ],
  Перекус: [
    "images/perekus1.jpg",
    "images/perekus2.jpg",
    "images/perekus3.jpg",
  ],
};
const foodCards = document.querySelectorAll(".food-card");
const foodPreviewBg = document.querySelector(".food-preview-bg");
let selectedCard = null;
const foodImages = [
  "images/sushi.jpg",
  "images/pizza.jpg",
  "images/ramen.jpg",
  "images/burger.jpg",
  "images/dessert.jpg",
  "images/coffee.jpg",
];

foodCards.forEach((card, index) => {
  card.addEventListener("mouseenter", () => {
    foodPreviewBg.style.backgroundImage = `url("${foodImages[index]}")`;
    document.body.classList.add("preview-active");
  });

  card.addEventListener("mouseleave", () => {
    document.body.classList.remove("preview-active");
  });

  card.addEventListener("click", () => {
    document.querySelector(".food-cards").classList.add("has-selected");
    document.querySelector(".food-page").classList.add("blur-active");

    foodCards.forEach((c) => {
      const oldVideo = c.querySelector(".food-video");

      if (oldVideo) {
        oldVideo.pause();
        oldVideo.currentTime = 0;
      }

      c.classList.remove("selected");
      c.disabled = true;
    });

    const slides = foodSlides[card.dataset.food];

    if (slides) {
      let slideIndex = 0;

      function changeFoodSlide() {
        card.style.backgroundImage = `url("${slides[slideIndex]}")`;
        card.style.backgroundSize = "cover";
        card.style.backgroundPosition = "center";

        slideIndex = (slideIndex + 1) % slides.length;
      }

      changeFoodSlide();

      clearInterval(foodImageInterval);

      foodImageInterval = setInterval(changeFoodSlide, 3500);
    }
    card.disabled = false;

    card.classList.add("selected");
    const video = card.querySelector(".food-video");

    if (video) {
      const videos = foodVideos[card.dataset.food];

      if (videos) {
        function changeFoodVideo() {
          const randomVideo = videos[Math.floor(Math.random() * videos.length)];

          video.src = randomVideo;

          video.currentTime = 0;

          video.play();
        }

        changeFoodVideo();

        clearInterval(foodVideoInterval);

        foodVideoInterval = setInterval(() => {
          changeFoodVideo();
        }, 3500);
      }
    }
    selectedCard = card;

    document.querySelector(".food-actions").classList.add("active");
  });
});
const confirmFoodBtn = document.getElementById("confirmFoodBtn");

const backFoodBtn = document.getElementById("backFoodBtn");

confirmFoodBtn.addEventListener("click", () => {
  if (!selectedCard) return;

  localStorage.setItem("selectedFood", selectedCard.dataset.food);

  document.body.classList.add("page-exit");

  setTimeout(() => {
    window.location.href = "final.html";
  }, 800);
});

backFoodBtn.addEventListener("click", () => {
  const activeVideo = document.querySelector(".food-card.selected .food-video");

  if (activeVideo) {
    activeVideo.pause();
    activeVideo.currentTime = 0;
  }
  clearInterval(foodVideoInterval);
  clearInterval(foodImageInterval);

  if (selectedCard) {
    selectedCard.style.backgroundImage = "";
  }
  selectedCard = null;

  foodCards.forEach((c) => {
    const oldVideo = c.querySelector(".food-video");

    if (oldVideo) {
      oldVideo.pause();
      oldVideo.currentTime = 0;
    }

    c.classList.remove("selected");
    c.disabled = false;
  });

  document.querySelector(".food-cards").classList.remove("has-selected");
  document.querySelector(".food-page").classList.remove("blur-active");
  document.querySelector(".food-actions").classList.remove("active");
});
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    window.location.reload();
  }
});
document.addEventListener("selectstart", (e) => {
  e.preventDefault();
});