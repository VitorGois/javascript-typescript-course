function timer() {
  const timerDisplay = document.querySelector('.timer');

  let seconds = 0;
  let timer;

  function getTimeFromSeconds(seconds) {
    const date = new Date(seconds * 1000);
    return date.toLocaleTimeString('pt-BR', {
      hou12: false,
      timeZone: 'GMT'
    });
  }

  function startTimer() {
    timer = setInterval(() => {
      seconds++;
      timerDisplay.innerHTML = getTimeFromSeconds(seconds);
    }, 1000);
  }

  document.addEventListener('click', (event) => {
    const targetElement = event.target;
    
    if (targetElement.classList.contains('start')) {
      timerDisplay.classList.remove('paused');
      clearInterval(timer);
      startTimer();
    }
    if (targetElement.classList.contains('pause')) {
      clearInterval(timer);
      timerDisplay.classList.add('paused');
    }
    if (targetElement.classList.contains('stop')) {
      clearInterval(timer);
      timerDisplay.innerHTML = '00:00:00';
      seconds = 0;
      timerDisplay.classList.remove('paused');
    }
  });
}

timer();
