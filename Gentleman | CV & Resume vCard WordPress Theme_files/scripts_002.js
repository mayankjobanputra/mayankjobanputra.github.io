(function ($) { 

  "use strict";

  /*===============================================
    Preloader
  ===============================================*/
  $(window).load(function () {
    $("body").addClass("loaded");
  });

  /*===============================================
    Scroll Spy
  ===============================================*/
  $('body').scrollspy({ target: '.menu-top' });

  /*===============================================
    Toggle Menu
  ===============================================*/
  $(".toggle-btn").on("click", function(e) {
    e.stopPropagation();
    if ($(".menu-top").hasClass("show-menu")) {
      $(".menu-top").removeClass("show-menu");
    }
    else {
      $(".menu-top").addClass("show-menu");
    }
  });

  // Navicon transform into X //
  $(".toggle-btn").on("click", function() {
    if ($(".toggle-btn").hasClass("toggle-close")) {
      $(".toggle-btn").removeClass("toggle-close");
    }
    else {
      $(".toggle-btn").addClass("toggle-close");
    }
  });

  // Close Menu
  $(document).on("click", function() {
    if ($(".menu-top").hasClass("show-menu")) {
      $(".menu-top").removeClass("show-menu");
    }
    if ($(".toggle-btn").hasClass("toggle-close")) {
      $(".toggle-btn").removeClass("toggle-close");
    }
  });

  $('body').fitVids();

  $('.home-box').height($(window).height());

  $('.bg-image').parents('.col-sm-6').prev().attr('data-mh','match-edu');
  $('.bg-image').parents('.col-sm-6').next().attr('data-mh','match-edu');
  $('.contacts-map').parents('.col-sm-6').next().attr('data-mh','match-contact');
  $('.contacts-map').parents('.col-sm-6').prev().attr('data-mh','match-contact');

  //var hfooter = $('footer').height();
 // $('.page404').height($(window).height()-hfooter);
  /*===============================================
    Parallax
  ===============================================*/
  $(".parallax-section").parallax({
    speed : 0.3
  });

  /*===============================================
    Circular Progress bar
  ===============================================*/
  $(".dial").knob({
    'width': '100',
    'height': '100',
    'thickness': .03,
    'fgColor': 'rgb(255, 255, 255)',
    'bgColor': 'rgba(255, 255, 255, .0)',
    'inputColor': 'rgb(255, 255, 255)',
    'readOnly': true,
    'font': 'Open Sans',
    'fontWeight': "300",
      parse: function (v) {return parseInt(v, 10);},
      format: function (v) {return v + "%";}
  });

  /*===============================================
    Circular Progress bar Animate when visible
  ===============================================*/
  $(".dial").each(function () {
    var $this = $(this);
    var myVal = $this.data("number");
    $(".skill-bar").appear(function() {
      $({
        value: 0
      }).animate({
        value: myVal,
      }, {
        duration: 2000,
        easing: 'swing',
        step: function () {
          $this.val(Math.ceil(this.value)).trigger('change');
        }
      })
    },{accX: 0, accY: -10});
  });


  /*===============================================
    Magnific Popup
  ===============================================*/
  $('.lightbox-popup').magnificPopup({ 
    type:'inline',
    fixedContentPos: false,
    removalDelay: 100,
    closeBtnInside: true,
    preloader: false,
    mainClass: 'mfp-fade'
  });

  /*===============================================
    Counter
  ===============================================*/
  $(".facts-background [data-to]").each(function() {
    var $this = $(this);
    $this.appear(function() {
      $this.countTo({
        speed: 1500,
        onComplete: function() {
          if($this.data("append")) {
            $this.html($this.html() + $this.data("append"));
          }
        }
      });
    }, {accX: 0, accY: -10});
  });

  /*===============================================
    Owl Carousel
  ===============================================*/
  $("#portfolioSlider, .post-gallery").owlCarousel({
    slideSpeed: 400,
    paginationSpeed: 400,
    rewindSpeed: 800,
    singleItem: true
  });

  $("#clientSlider").owlCarousel({
    items: 3,
    itemsDesktop: [1199,3],
    itemsDesktopSmall: [979,2],
    itemsTablet: [768,1],
    itemsMobile: [479,1],
    autoPlay: 2000, // 2 seconds
    stopOnHover: true,
    pagination: false,
    slideSpeed: 400,
    paginationSpeed: 400,
    rewindSpeed: 800,
    singleItem: false
  });
  

  /*===============================================
    Smooth Scrolling
  ===============================================*/
  $(document).ready(function(e) {
    $('.menu-home li a[href^="#"], .hire-background a[href^="#"]').on("click", function(e) {
      e.preventDefault();
      $("html,body").animate({scrollTop: $(this.hash).offset().top}, 800, "easeInOutQuart");                                       
    });
  });
  
  /*===============================================
    end Toggle Menu
  ===============================================*/

  //  go to top
        var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 1200,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 700,
    //grab the "back to top" link
    $back_to_top = $('.go-top');

    //hide or show the "back to top" link
    $(window).scroll(function(){
      ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('go-top-visible') : $back_to_top.removeClass('go-top-visible go-top-fade-out');
      if( $(this).scrollTop() > offset_opacity ) { 
        $back_to_top.addClass('go-top-fade-out');
      }
    });

    //smooth scroll to top
    $back_to_top.on('click', function(event){
      event.preventDefault();
      $('body,html').animate({
        scrollTop: 0 ,
        }, scroll_top_duration
      );
    });

})(jQuery);