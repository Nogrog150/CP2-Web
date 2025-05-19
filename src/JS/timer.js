let seconds = 0;
let minutes = 0;

// Recupera o tempo salvo no sessionStorage, se existir
const savedTime = sessionStorage.getItem('timer');
let totalSeconds = 0;
if (savedTime) {
  const { savedMinutes, savedSeconds, totalSeconds: savedTotalSeconds } = JSON.parse(savedTime);
  minutes = savedMinutes;
  seconds = savedSeconds;
  totalSeconds = savedTotalSeconds || 0;
}

const displayMinutes = document.querySelector("#minutes");
const displaySeconds = document.querySelector("#seconds");
const body = document.querySelector("body");

function updatingDisplay() {
  displayMinutes.innerHTML = String(minutes).padStart(2, "0");
  displaySeconds.innerHTML = String(seconds).padStart(2, "0");
  // Salva o tempo atual e o acumulado no sessionStorage a cada atualização
  sessionStorage.setItem('timer', JSON.stringify({ savedMinutes: minutes, savedSeconds: seconds, totalSeconds }));
}

function startTimer() {
  updatingDisplay();
  return setInterval(() => {
    if (seconds < 10) {
      seconds++;
      totalSeconds++;
      
    } else {
      clearInterval(intervalId);
      seconds = 0;
      minutes = 0;
      updatingDisplay();
      alert("Interaja com o site");
      intervalId = startTimer();
      return;
    }
    updatingDisplay();
  }, 1000);
}
let intervalId = startTimer();

const resetTimer = () => {
  clearInterval(intervalId);
  seconds = 0;
  minutes = 0;
  updatingDisplay();
  intervalId = startTimer();
}

body.addEventListener('click', resetTimer);
body.addEventListener('input', resetTimer);
body.addEventListener('mouseover', resetTimer);