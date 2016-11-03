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
    console.log(typeof opt[1]);

    function check() {
      console.log(opt);
      if ((opt[0] !== opt[1] && opt[2] !== opt[3] && opt[1] !== opt[3] && opt[1] !== opt[2] && opt[0] !== opt[3] && opt[0] !== opt[2]) === true) {

        $('.exercise').text(x + 'x' + y);
        $('.startReset').text('Reset');
        $('.score').text('Score: ' + count);
        $('#first').text(opt[Math.floor(Math.random() * opt.length)]);
        opt.splice(opt.indexOf(parseInt($('#first').text())), 1);
        //                console.log(opt);
        $('#second').text(opt[Math.floor(Math.random() * opt.length)]);
        opt.splice(opt.indexOf(parseInt($('#second').text())), 1);
        //                console.log(opt);
        $('#third').text(opt[Math.floor(Math.random() * opt.length)]);
        opt.splice(opt.indexOf(parseInt($('#third').text())), 1);
        //                console.log(opt);
        $('#fourth').text(opt[Math.floor(Math.random() * opt.length)]);
        opt.splice(opt.indexOf(parseInt($('#fourth').text())), 1);
        //                console.log(opt);
        /*if you would have used 'delete opt[index]' you'd have deleted th element but the array would still preserve the same length, and instead of the element of at that index you'd have an emty space, but with splice you remove the element and the length of the array gets modified as well, so no empty spaces*/

      } else {
        opt = []; /*if you don't empty the array before the nenerator starts over again recursevely, the array iteself gets much more than just 4 elements and you get an infinite loop*/
        console.log('wtf?');
        generator();
      }
    }


    check(); /*remember to CALL the function .. you only declared it above .. you have to call it to make it work*/
  }


  function rst() {
    $('.verdict').text('Answer:').css('color', 'green');
    $('.option').css('pointer-events', 'inherit');
    /*https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events*/
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
      //            $('.gameEnd').css('display','inherit')
      $('.announcement').append('<br>' + count);
      $('.option').css('opacity', '0.4');
      setTimeout(function () {
        $('.gameEnd').css('display', 'none');
        $('.announcement').text('Your score was :');
      }, 3500);
    }
    //        $('.countDown').css('display','inline-block');
    $('.countDown').show(); /*or you could use the line above */
    $('.countDown').text('Time: ' + timer + 's');
    $('.score').css('display', 'inline-block');
    //        $('.score').show();/*this displays the div but not in the correct position, it's lower than it should and it's behind the main quiz area ... why? */
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
      //            $('.countDown').text( 'Time: ' + timer + 's'); /*this has to be inside the countdown function itself not here; if it's here , it only takes the first value that the countdown function gives (i.e. 59)*/
    } else {
      //            $('.option').css('pointer-events','none');
    }
  });

  $('.option').on('click', function () {
    $('.option').css('pointer-events', 'none');
    /*https://developer.mozilla.org/en-US/docs/Web/CSS/pointer-events*/
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