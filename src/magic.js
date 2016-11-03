$(document).ready(function () {
  var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  var opt = [];
  var mode = false;
  var count = 0;
  var timer = 60;
  var x, y, result, rnd1, rnd2, rnd3, tot1, tot2, tot3;
  $('.option').css('pointer-events', 'none');

  function generator() {
    x = arr[Math.floor(Math.random() * arr.length)];
    y = arr[Math.floor(Math.random() * arr.length)];
    result = x * y;

    rnd1 = arr[Math.floor(Math.random() * arr.length)];
    rnd2 = arr[Math.floor(Math.random() * arr.length)];
    rnd3 = arr[Math.floor(Math.random() * arr.length)];
    tot1 = rnd1 * rnd2;
    tot2 = rnd1 * rnd3;
    tot3 = rnd2 * rnd3;

    opt.push(result, tot1, tot2, tot3);

    function check() {
      console.log(opt);
      if ((opt[0] !== opt[1] && opt[2] !== opt[3] && opt[1] !== opt[3] && opt[1] !== opt[2] && opt[0] !== opt[3] && opt[0] !== opt[2]) === true) {

        $('.exercise').text(x + 'x' + y);
        $('.startReset').text('Reset');
        $('.score').text('Score: ' + count);
        $('#first').text(opt[Math.floor(Math.random() * opt.length)]);
        opt.splice(opt.indexOf(parseInt($('#first').text())), 1);

        $('#second').text(opt[Math.floor(Math.random() * opt.length)]);
        opt.splice(opt.indexOf(parseInt($('#second').text())), 1);

        $('#third').text(opt[Math.floor(Math.random() * opt.length)]);
        opt.splice(opt.indexOf(parseInt($('#third').text())), 1);

        $('#fourth').text(opt[Math.floor(Math.random() * opt.length)]);
        opt.splice(opt.indexOf(parseInt($('#fourth').text())), 1);

      } else {
        opt = [];
        generator();
      }
    }

    check();
  }


  function rst() {
    $('.verdict').text('Answer:').css('color', 'green');
    $('.option').css('pointer-events', 'inherit');
  }

  function rstComplete() {
    $('.verdict').text('Answer:').css('color', 'green');
    $('.option').css('pointer-events', 'inherit');
    opt = [];
    generator();
  }

  function countdown() {
    timer -= 1;
    var action = setTimeout(countdown, 1000);
    if (timer === 0) {
      clearTimeout(action);
      mode = false;
      $('.option').css('pointer-events', 'none');
      $('.gameEnd').show();

      $('.announcement').append('<br>' + count);
      $('.option').css('opacity', '0.4');
      setTimeout(function () {
        $('.gameEnd').css('display', 'none');
        $('.announcement').text('Your score was :');
      }, 3500);
    }

    $('.countDown').show();
    $('.countDown').text('Time: ' + timer + 's');
    $('.score').css('display', 'inline-block');
  }

  $('.startReset').on('click', function () {
    if (!mode) {
      timer = 60;
      count = 0;
      countdown();
      $('.option').css('opacity', 'inherit');
      $('.option').css('pointer-events', 'inherit');
      generator();
      mode = true;

    } else {
      
    }
  });

  $('.option').on('click', function () {
    $('.option').css('pointer-events', 'none');
    if (parseInt($(this).text()) === result && timer !== 0) {
      count += 1;
      $('.verdict').text('Correct !');
      setTimeout(rstComplete, 500);

    } else if (parseInt($(this).text()) !== result && timer !== 0) {
      $('.verdict').text('Try again !').css('color', 'brown');
      setTimeout(rst, 500);
    }
  });
});
