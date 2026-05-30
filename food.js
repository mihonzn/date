let foodVideoInterval = null;
const foodVideos = {
  Фастфуд: [
    "images/fastfood1.mp4",
    "images/fastfood2.mp4",
    "images/fastfood3.mp4",
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
      c.classList.remove("selected");
    });

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
  }, 700);
});

backFoodBtn.addEventListener("click", () => {
  const activeVideo = document.querySelector(".food-card.selected .food-video");

  if (activeVideo) {
    activeVideo.pause();
    activeVideo.currentTime = 0;
    clearInterval(foodVideoInterval);
  }
  selectedCard = null;

  foodCards.forEach((c) => {
    c.classList.remove("selected");
  });

  document.querySelector(".food-cards").classList.remove("has-selected");
  document.querySelector(".food-page").classList.remove("blur-active");
  document.querySelector(".food-actions").classList.remove("active");
});
