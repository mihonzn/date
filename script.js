const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const hearts = document.getElementById("hearts");
const phrases = [
  "Ты уверена?",
  "Подумай еще ",
  "УААААААААААААААААААААААА",
  "НЕГЕ?",
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

function formatDate(date) {
  return date.toLocaleDateString("ru-RU");
}

function getDateText(type) {
  const today = new Date();
  const result = new Date(today);

  if (type === "today") {
    return `Сегодня: ${formatDate(result)}`;
  }

  if (type === "tomorrow") {
    result.setDate(today.getDate() + 1);
    return `Завтра: ${formatDate(result)}`;
  }

  if (type === "weekend") {
    const day = today.getDay();
    const daysToSaturday = (6 - day + 7) % 7 || 7;

    result.setDate(today.getDate() + daysToSaturday);

    return `Выходные: ${formatDate(result)}`;
  }

  if (type === "custom") {
    const customInput = document.querySelector(".custom-date");

    if (!customInput.value) {
      return "Дата не выбрана 😭";
    }

    const formatted = new Date(customInput.value).toLocaleDateString("ru-RU");

    return `Выбрано: ${formatted}`;
  }
}

yesBtn.addEventListener("click", () => {
  document.body.classList.add("page-exit");

  setTimeout(() => {
    document.body.classList.remove("page-exit");

    document.body.innerHTML = `
  <section class="result date-step">
    <h1>Выбери дату 📅</h1>

  <div class="date-buttons">

  <button class="date-btn" data-type="today">
    Сегодня
  </button>

  <button class="date-btn" data-type="tomorrow">
    Завтра
  </button>

  <button class="date-btn" data-type="weekend">
    На выходных
  </button>

  <button class="date-btn" data-type="custom">
    Выбрать самой
  </button>

</div>

<input type="date" class="custom-date">

</section>
<div class="baby-side">

  <video
    autoplay
    loop
    muted
    playsinline
    class="meme-video"
  >
    <source src="images/baby.mp4" type="video/mp4">
  </video>

  <div class="baby-text">
    <h2>Че внатуре?</h2>
    <p>Пошли тогда)</p>
  </div>

</div>
`;
    const dateButtons = document.querySelectorAll(".date-btn");

    dateButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const type = btn.dataset.type;

        if (type === "custom") {
          openCalendarModal();
          return;
        }

        const selectedDate = getDateText(type);
        showDateResult(selectedDate);
      });
    });
  }, 800);
});

function showDateResult(selectedDate) {
  localStorage.setItem("selectedDate", selectedDate);

  document.querySelector(".date-step").innerHTML = `
    <h1>Отлично 😭</h1>

    <p class="selected-date">
      Свидание: ${selectedDate}
    </p>

    <button class="next-btn">
      Дальше 
    </button>
  `;

  document.querySelector(".next-btn").addEventListener("click", () => {
    document.body.classList.add("page-exit");

    setTimeout(() => {
      window.location.href = "place.html";
    }, 700);
  });
}

function openCalendarModal() {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="calendar-modal">
      <div class="calendar-box">
        <h2>Выбери дату 📅</h2>

      <div class="cute-calendar">
  <div class="calendar-title">Выбери день 💖</div>
  <div class="calendar-days" id="calendarDays"></div>
</div>
      </div>
    </div>
    `,
  );
  function renderCuteCalendar() {
    const calendarDays = document.getElementById("calendarDays");

    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 31);

    let current = new Date(today);

    calendarDays.innerHTML = "";

    while (current <= nextMonth) {
      const btn = document.createElement("button");

      btn.textContent = current.getDate();

      const savedDate = new Date(current);

      btn.addEventListener("click", () => {
        const selectedDate = `Выбрано: ${savedDate.toLocaleDateString("ru-RU")}`;

        showDateResult(selectedDate);
        document.querySelector(".calendar-modal").remove();
      });

      calendarDays.appendChild(btn);

      current.setDate(current.getDate() + 1);
    }
  }
  renderCuteCalendar();
}

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

  if ((hitLeft || hitRight) && (hitTop || hitBottom)) {
    newX = Math.random() * maxX;
    newY = Math.random() * maxY;
  } else if (hitLeft || hitRight) {
    newX = hitLeft ? 0 : maxX;
    newY += event.clientY < btnCenterY ? 260 : -260;
  } else if (hitTop || hitBottom) {
    newY = hitTop ? 0 : maxY;
    newX += event.clientX < btnCenterX ? 280 : -280;
  }

  newX = Math.max(0, Math.min(maxX, newX));
  newY = Math.max(0, Math.min(maxY, newY));

  noBtn.style.position = "absolute";
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;
}
