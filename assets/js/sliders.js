/**
 * Sliders Initialization and Configuration
 * Handles Hero Slider and Plans Slider functionality
 */

$(document).ready(function () {
  // Initialize Hero Slider (vertical, manual via dashed controls)
  $(".hero-slider").slick({
    dots: false,
    infinite: true,
    speed: 600,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    autoplay: false,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          vertical: false,
          verticalSwiping: false,
          adaptiveHeight: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          vertical: false,
          verticalSwiping: false,
          adaptiveHeight: true,
        }
      }
    ]
  });

  // Custom dashed navigation functionality
  $(document).on('click', '.hero-dash', function () {
    const slideIndex = $(this).data('slide');
    $(".hero-slider").slick("slickGoTo", slideIndex);
  });

  // Update active dashed control on slide change
  $(".hero-slider").on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $(".hero-dash")
      .removeClass("border-primary")
      .addClass("border-gray-300");
    $('.hero-dash[data-slide="' + nextSlide + '"]')
      .removeClass("border-gray-300")
      .addClass("border-primary");
  });

  // Set initial active dash
  $('.hero-dash[data-slide="0"]').removeClass('border-gray-300').addClass('border-primary');

 

  // Initialize Testimonial Slider
  $(".testimonial-slider").slick({
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    fade: true,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    arrows: true,
    prevArrow: '.testimonial-prev',
    nextArrow: '.testimonial-next',
    dotsClass: 'slick-dots testimonial-dots',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          fade: true,
          adaptiveHeight: true,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          fade: false,
          adaptiveHeight: true,
          arrows: false,
          dots: true,
        },
      },
    ],
  });

  // Custom navigation button functionality for testimonials
  $('.testimonial-prev').click(function() {
    $('.testimonial-slider').slick('slickPrev');
  });

  $('.testimonial-next').click(function() {
    $('.testimonial-slider').slick('slickNext');
  });

  // Initialize Services Slider
  $(".services-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    arrows: false,
    dots: false,
    pauseOnHover: true,
    speed: 800,
    cssEase: 'ease-in-out',
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  });

  // Initialize Responsive Services Slider (only on large screens)
  function initResponsiveSlider() {
    if ($(window).width() >= 1024) {
      if (!$('.responsive').hasClass('slick-initialized')) {
        $('.responsive').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          infinite: true,
          arrows: false,
          dots: false,
          pauseOnHover: true,
          speed: 800,
          cssEase: 'ease-in-out',
          responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              }
            }
          ]
        });
      }
    } else {
      if ($('.responsive').hasClass('slick-initialized')) {
        $('.responsive').slick('unslick');
      }
    }
  }

  // Initialize on page load
  initResponsiveSlider();

  // Re-initialize on window resize
  $(window).resize(function() {
    initResponsiveSlider();
  });

  // Initialize Plans Slider
  $(".plans-slider").slick({
    lazyLoad: 'ondemand',
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: false, // Disabled infinite loop
    arrows: false, // Disabled arrows - no manual navigation buttons
    dots: true,
    pauseOnHover: true,
    speed: 800,
    cssEase: 'ease-in-out',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          arrows: false,
        }
      }
    ]
  });

  // Prevent radio button issues in cloned slides
  $(".plans-slider").on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    // Temporarily disable all radio buttons during slide transition
    $(this).find('input[type="radio"]').prop('disabled', true);
  });

  $(".plans-slider").on('afterChange', function(event, slick, currentSlide) {
    // Re-enable radio buttons and fix their states
    var $slider = $(this);
    setTimeout(function() {
      $slider.find('input[type="radio"]').prop('disabled', false);
      enforceDefaultMonthlyRadios();
    }, 100);
  });

  // Ensure Monthly is checked by default for each plan group (simplified for non-infinite slider)
  function enforceDefaultMonthlyRadios(){
    var $container = $(".plans-slider");
    if ($container.length === 0) return;
    
    // Since infinite is disabled, no cloned slides to worry about
    $container.find('input[type="radio"][id$="-monthly"]').each(function(){
      var groupName = this.name;
      // Uncheck all radios in this group
      $container.find('input[name="' + groupName + '"]').prop('checked', false);
      // Check monthly option
      $(this).prop('checked', true);
    });
    
    // Ensure radio buttons remain clickable
    $container.find('input[type="radio"]').prop('disabled', false);
  }

  // Simplified function for radio state management (no cloned slides)
  function syncRadioStates(changedRadio) {
    var $container = $(".plans-slider");
    var groupName = changedRadio.name;
    
    // Simple radio button behavior - only one can be selected per group
    $container.find('input[name="' + groupName + '"]').prop('checked', false);
    $(changedRadio).prop('checked', true);
  }

  // Run once on load
  setTimeout(function() {
    enforceDefaultMonthlyRadios();
  }, 100);

  // Re-apply after slider events with proper timing
  $(".plans-slider").on('init reInit afterChange', function(event, slick){
    setTimeout(function() {
      enforceDefaultMonthlyRadios();
    }, 50);
  });

  // Handle radio button changes with synchronization
  $(document).on('change', '.plans-slider input[type="radio"]', function() {
    syncRadioStates(this);
  });
  
  // =============================
  // OENOD Cards sequencing + click
  // =============================
  (function(){
    var $grid = $('#oenod-grid');
    if ($grid.length === 0) return;

    var $cards = $('#oenod-cards .oenod-card');
    var $rightImg = $('#oenod-right-image');
    if ($cards.length === 0 || $rightImg.length === 0) return;

    var defaultRightSrc = 'assets/images/enode-right.png';
    var stepToImage = {
      1: defaultRightSrc, // keep current for first step
      2: 'assets/images/dashboard1.jpg',
      3: 'assets/images/dashboard3.jpg'
    };

    function playUnderline($card){
      $cards.removeClass('play');
      // Force reflow then add class to restart animation
      void $card[0].offsetWidth;
      $card.addClass('play');
    }

    function setActive(step){
      $cards.removeClass('card-active');
      $cards.filter('[data-step="' + step + '"]').addClass('card-active');
    }

    function swapRight(step){
      var nextSrc = stepToImage[step] || defaultRightSrc;
      if ($rightImg.attr('src') === nextSrc) return;
      $rightImg.css('opacity', '0');
      setTimeout(function(){
        $rightImg.attr('src', nextSrc);
        $rightImg.css('opacity', '1');
      }, 200);
    }

    // Auto run 1 -> 2 -> 3
    function runSequence(){
      var steps = [1,2,3];
      var delay = 1000;
      steps.forEach(function(step){
        setTimeout(function(){
          var $c = $cards.filter('[data-step="' + step + '"]');
          if ($c.length === 0) return;
          playUnderline($c);
          setActive(step);
          if (step > 1) swapRight(step);
        }, delay);
        delay += 1500;
      });
    }

    // Click
    $cards.css('cursor','pointer').on('click', function(){
      var step = Number(this.getAttribute('data-step'));
      playUnderline($(this));
      setActive(step);
      swapRight(step);
    });

    // Kick off once, then repeat periodically
    setTimeout(runSequence, 100);
    setInterval(runSequence, 7000);
  })();

});
