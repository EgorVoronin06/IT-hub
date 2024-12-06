document.querySelector ('menu-container'). 
 addEventListener('click', function () {
     const menu = document. querySelector('menu');
     menu. classList. toggle( 'open') ;
}) ;
function animateXP(targetXP) {
  let currentXP = 0;
  const xpElement = document.getElementById('xpCount');
  const increment = Math.ceil(targetXP / 100); // Увеличение на каждую итерацию

  const interval = setInterval(() => {
      currentXP += increment;
      if (currentXP >= targetXP) {
          currentXP = targetXP; // Устанавливаем целевое значение
          clearInterval(interval); // Останавливаем анимацию
      }
      xpElement.textContent = `${currentXP} XP`; // Обновляем текст
  }, 30); // Интервал обновления
}

// Запускаем анимацию до 500 XP
animateXP(500);
