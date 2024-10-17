jQuery(document).ready(function($) {
  let currentRotation = 0;

  $('#coin').on('click', function() {
    let flipResult = Math.random();
    let additionalRotation = 1800; // 5 full rotations (360 * 5)
    let newRotation;

    currentRotation += additionalRotation;

    if (flipResult <= 0.5) {
      newRotation = currentRotation;
    } else {
      newRotation = currentRotation + 180;
    }

    $('#coin').css('transition', `transform 3s cubic-bezier(0.5, 0, 1, 1)`);
    $('#coin').css('transform', `rotateY(${newRotation}deg)`);

 
    setTimeout(function() {
      if (flipResult <= 0.5) {
        $('#coin').removeClass('current-tails').addClass('current-heads');
      } else {
        $('#coin').removeClass('current-heads').addClass('current-tails');
      }
    }, 3000); 
  });
});