/**
 * Sliders Initialization and Configuration
 * Handles Hero Slider and Plans Slider functionality
 */

$(document).ready(function () {
  // Initialize Hero Slider
  $(".hero-slider").slick({
    dots: false,
    infinite: true,
    speed: 800,
    fade: true,
    cssEase: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          fade: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  // Custom dot navigation functionality
  $(".hero-dot").click(function () {
    const slideIndex = $(this).data("slide");
    $(".hero-slider").slick("slickGoTo", slideIndex);
  });

  // Update active dot on slide change
  $(".hero-slider").on(
    "beforeChange",
    function (event, slick, currentSlide, nextSlide) {
      $(".hero-dot").removeClass("bg-primary").addClass("bg-gray-300");
      $('.hero-dot[data-slide="' + nextSlide + '"]')
        .removeClass("bg-gray-300")
        .addClass("bg-primary");
    }
  );

  // Set initial active dot
  $('.hero-dot[data-slide="0"]')
    .removeClass("bg-gray-300")
    .addClass("bg-primary");

  // Pause autoplay on dot hover
  $(".hero-dot").hover(
    function () {
      $(".hero-slider").slick("slickPause");
    },
    function () {
      $(".hero-slider").slick("slickPlay");
    }
  );

  // Initialize Plans Slider
  $(".plans-slider").slick({
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '80px',
    arrows: false,
    dotsClass: 'slick-dots plans-dots',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          centerPadding: '60px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '40px',
        },
      },
    ],
  });

  // Style plans slider dots like hero section
  $(".plans-slider").on("init reInit afterChange", function(event, slick, currentSlide) {
    const current = currentSlide || 0;
    $(".plans-dots li button").removeClass("bg-primary").addClass("bg-gray-300");
    $(".plans-dots li").eq(current).find("button").removeClass("bg-gray-300").addClass("bg-primary");
  });

  // Custom styling for plans slider dots
  setTimeout(function() {
    $(".plans-dots li button").each(function() {
      $(this).removeClass().addClass("w-3 h-3 rounded-full bg-gray-300 transition-colors duration-300");
    });
    $(".plans-dots li").first().find("button").removeClass("bg-gray-300").addClass("bg-primary");
  }, 100);
});
