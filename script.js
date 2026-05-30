const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const hearts = document.getElementById("hearts");
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

function moveNoButton() {
  if (noClicks >= 7) {
    activateScaredNoButton();
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

  const currentPhrase = phrases[phraseIndex % phrases.length];
  phraseIndex++;
  noClicks++;
  const randomImage =
    sadImageList[Math.floor(Math.random() * sadImageList.length)];

  noBtn.innerHTML = `
    <div style="display:flex; flex-direction:column; align-items:center; gap:10px;">
      <span>${currentPhrase}</span>

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
  const effects = ["❤️", "🌸", "💮", "💖"];
  heart.className = "heart";
  heart.textContent = effects[Math.floor(Math.random() * effects.length)];
  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.fontSize = `${Math.random() * 18 + 14}px`;
  heart.style.animationDuration = `${Math.random() * 3 + 3}s`;

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}

setInterval(createHeart, 350);

yesBtn.addEventListener("click", () => {
  document.body.classList.add("page-exit");

  setTimeout(() => {
    document.body.classList.remove("page-exit");

    document.body.innerHTML = `
      <section class="result">

        <video
          autoplay
          loop
          muted
          playsinline
          class="meme-video"
        >
          <source src="images/baby.mp4" type="video/mp4">
        </video>

        <h1>Че натури? </h1>

        <p>Пошли тогда)</p>

      </section>
    `;
  }, 800);
});

let lastHeartTime = 0;

document.addEventListener("mousemove", (event) => {
  const now = Date.now();

  if (now - lastHeartTime < 80) return;

  lastHeartTime = now;

  const heart = document.createElement("span");
  heart.className = "cursor-heart";
  heart.textContent = "❤️";

  heart.style.left = `${event.clientX}px`;
  heart.style.top = `${event.clientY}px`;

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 900);
});

let scaredMode = false;

function activateScaredNoButton() {
  if (scaredMode) return;

  scaredMode = true;

  noBtn.classList.add("scared-no");

  noBtn.innerHTML = `
<video
  autoplay
  loop
  muted
  playsinline
  class="laugh-cat"
>
  <source src="images/laugh-cat.mp4" type="video/mp4">
</video>

<span>Не поймаешь)</span>
  `;

  document.addEventListener("mousemove", (event) => {
    runAwayFromCursor(event);
    moveEyes(event);
  });
}
function moveEyes(event) {
  const eyes = document.querySelectorAll(".eyes span");

  eyes.forEach((eye) => {
    const rect = eye.getBoundingClientRect();

    const eyeX = rect.left + rect.width / 2;
    const eyeY = rect.top + rect.height / 2;

    const angle = Math.atan2(event.clientY - eyeY, event.clientX - eyeX);

    const pupilX = Math.cos(angle) * 9;
    const pupilY = Math.sin(angle) * 9;

    eye.style.setProperty("--pupil-x", `${pupilX}px`);
    eye.style.setProperty("--pupil-y", `${pupilY}px`);
  });
}

function runAwayFromCursor(event) {
  if (!scaredMode) return;

  const area = document.querySelector(".buttons");
  const areaRect = area.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const btnCenterX = btnRect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top + btnRect.height / 2;

  const distanceX = btnCenterX - event.clientX;
  const distanceY = btnCenterY - event.clientY;

  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  const safeDistance = Math.max(noBtn.offsetWidth, noBtn.offsetHeight) * 0.75;

  if (distance > safeDistance) return;

  const maxX = area.clientWidth - noBtn.offsetWidth;
  const maxY = area.clientHeight - noBtn.offsetHeight;

  let speed = 2.4;

  if (distance < 180) {
    speed = 3.8;
  }

  let newX = noBtn.offsetLeft + distanceX * speed;
  let newY = noBtn.offsetTop + distanceY * speed;

  const hitLeft = newX <= 0;
  const hitRight = newX >= maxX;
  const hitTop = newY <= 0;
  const hitBottom = newY >= maxY;

  if (hitLeft || hitRight) {
    newX = hitLeft ? 0 : maxX;
    newY += event.clientY < btnCenterY ? 180 : -180;
  }

  if (hitTop || hitBottom) {
    newY = hitTop ? 0 : maxY;
    newX += event.clientX < btnCenterX ? 220 : -220;
  }

  newX = Math.max(0, Math.min(maxX, newX));
  newY = Math.max(0, Math.min(maxY, newY));

  noBtn.style.position = "absolute";
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
}
