const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const hearts = document.getElementById("hearts");
const brainrotOverlay = document.getElementById("brainrotOverlay");
const brainrotAudio = document.getElementById("brainrotAudio");
const phrases = [
  "Ты уверена?",
  "Подумай еще ",
  "УААААААААААААААААААААААА",
  "Error 404",
];
const sadImageList = [
  "images/cat1.jpg",
  "images/hamster1.jpg",
  "images/cat2.jpg",
  "images/hamster2.jpg",
];

const sadImage = document.getElementById("sadImage");
let phraseIndex = 0;
let noClicks = 0;

noBtn.addEventListener("click", moveNoButton);

yesBtn.addEventListener("click", () => {
  document.body.innerHTML = `
    <section class="result">
      <h1>УРААА ❤️</h1>
      <p>Тогда готовься к лучшему свиданию 😎</p>
    </section>
  `;
});

function moveNoButton() {
  if (noClicks >= 7) {
    brainrotOverlay.style.display = "grid";
    brainrotAudio.volume = 1;
    brainrotAudio.play();
    return;
  }

  const area = document.querySelector(".buttons");

  const areaRect = area.getBoundingClientRect();

  const maxX = area.clientWidth - noBtn.offsetWidth;
  const maxY = area.clientHeight - noBtn.offsetHeight;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  noBtn.style.position = "absolute";

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  noBtn.textContent = phrases[phraseIndex % phrases.length];

  phraseIndex++;
  noClicks++;
  const randomImage =
    sadImageList[Math.floor(Math.random() * sadImageList.length)];

  noBtn.innerHTML = `
    <div style="display:flex; flex-direction:column; align-items:center; gap:10px;">
      <span>${phrases[phraseIndex % phrases.length]}</span>

      <img 
        src="${randomImage}" 
        style="
          width:180px;
          height:100px;
          object-fit:cover;
          border-radius:15px;
        "
      >
    </div>
  `;
}

function createHeart() {
  const heart = document.createElement("span");

  heart.className = "heart";
  heart.textContent = "❤️";
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${Math.random() * 18 + 14}px`;
  heart.style.animationDuration = `${Math.random() * 3 + 3}s`;

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

setInterval(createHeart, 350);
