document.addEventListener('DOMContentLoaded', function() {
  const coin = document.getElementById('coin');

  coin.addEventListener('click', function() {
      const flipResult = Math.random();
      coin.className = '';  // Reset any existing classes

      setTimeout(function() {
          if (flipResult <= 0.5) {
              coin.classList.add('heads');
              coin.style.animation = 'flipHeads 3s ease-out forwards';
              console.log('it is heads');
          } else {
              coin.classList.add('tails');
              coin.style.animation = 'flipTails 3s ease-out forwards';
              console.log('it is tails');
          }
      }, 100);
  });
});
