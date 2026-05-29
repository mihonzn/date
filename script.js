* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.hero {
  position: absolute;

  top: 100px;
  left: 50%;

  transform: translateX(-50%);

  text-align: center;

  animation: dropDown 1.2s ease;
}

.hero h1 {
  font-size: 46px;
  margin-bottom: 12px;
}

.hero p {
  font-size: 25px;
}

body {
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #ff758c, #fa74ac);
}

.c .card h1 {
  font-size: clamp(32px, 7vw, 52px);
  margin-bottom: 18px;
  animation: float 3s ease-in-out infinite;
}

.card p {
  font-size: clamp(17px, 4vw, 22px);
  margin-bottom: 50px;
}

.buttons {
  position: relative;
  width: 1000px;
  height: 500px;
  margin: 80px auto;
}

.yes {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #ff4f81;
  background: rgb(255, 255, 255);
  width: 350px;
  height: 300px;
}
.btn.icon {
  width: 220px;
  height: 120px;

  object-fit: cover;

  border-radius: 20px;

  display: block;
}

.btn span {
  height: 90px;

  display: flex;
  align-items: center;
  justify-content: center;

  text-align: center;
}
.no {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #ff4f81;
  background: white;
  width: 350px;
  height: 300px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  overflow: hidden;
}

.no img {
  width: 180px;
  height: 200px;

  object-fit: cover;

  border-radius: 15px;

  margin-top: 15px;
}

.btn {
  padding: 35px 60px;
  border-radius: 50px;
  font-size: 38px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  padding-top: 30px;
  gap: 15px;
  transition:
    left 0.6s ease,
    top 0.6s ease,
    transform 0.25s ease;
}

.btn-icon {
  width: 180px;
  height: 200px;
  object-fit: cover;
  border-radius: 18px;
}

.yes:hover {
  transform: translateY(-50%) scale(1.08);
}

.heart {
  position: fixed;
  top: -20px;
  pointer-events: none;
  animation: fall linear forwards;
}

@keyframes shake {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  25% {
    transform: translate(-49%, -50%) rotate(1deg);
  }
  50% {
    transform: translate(-50%, -49%) rotate(-1deg);
  }
  75% {
    transform: translate(-51%, -50%) rotate(1deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
}

#sadImage {
  display: none;
  width: 260px;
  height: 120px;
  object-fit: cover;
  border-radius: 20px;
  margin-left: 20px;
  animation: fadeUp 0.5s ease;
}
.result {
  text-align: center;
  color: white;
  animation: fadeUp 1s ease forwards;
}

.result h1 {
  font-size: clamp(48px, 10vw, 80px);
}

.result p {
  font-size: clamp(20px, 5vw, 30px);
  margin-top: 20px;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(25px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}

@keyframes fall {
  to {
    transform: translateY(110vh) rotate(360deg);
    opacity: 0;
  }
}

#brainrotOverlay {
  position: fixed;

  inset: 0;

  display: none;

  justify-content: center;
  align-items: center;

  z-index: 999999;
}

#brainrotOverlay img {
  width: 70vw;

  max-width: 900px;

  height: auto;

  border-radius: 30px;

  animation:
    brainrotShow 0.4s ease,
    brainrotShake 0.15s infinite;
}

@keyframes brainrotShow {
  from {
    opacity: 0;
    transform: scale(0.4) rotate(-8deg);
  }

  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes brainrotShake {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(2deg);
  }

  50% {
    transform: rotate(-2deg);
  }

  75% {
    transform: rotate(2deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

@keyframes dropDown {
  from {
    opacity: 0;
    transform:
      translateX(-50%)
      translateY(-120px);
  }

  to {
    opacity: 1;
    transform:
      translateX(-50%)
      translateY(0);
  }
}

.meme-video {
  width: 350px;

  border-radius: 25px;

  margin-bottom: 30px;

  animation: fadeUp 0.7s ease;
}

.result h1 {
  font-size: 72px;

  margin-bottom: 20px;
}

.result p {
  font-size: 30px;
}

@media (max-width: 768px) {
  body {
    overflow-x: hidden;
    overflow-y: auto;
    min-height: 100vh;
  }

  .hero {
    top: 40px;
    width: 90%;
  }

  .hero h1 {
    font-size: 30px;
  }

  .buttons {
    width: 100%;
    height: auto;
    margin-top: 160px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
  }

  .btn {
    position: relative;
    left: auto;
    right: auto;
    top: auto;
    transform: none;

    width: 85vw;
    max-width: 360px;
    height: 240px;
    font-size: 32px;
  }

  .yes:hover {
    transform: scale(1.03);
  }

  .btn-icon {
    width: 180px;
    height: 150px;
  }

  .no img {
    width: 180px;
    height: 150px;
  }

  #brainrotOverlay img {
    width: 90vw;
  }

  .meme-video {
    width: 90vw;
    max-width: 360px;
  }
}
