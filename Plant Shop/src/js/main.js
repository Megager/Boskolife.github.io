jQuery(function() {
    $('.slider').slick({
        dots:false,
        arrows:true,
        speed:1000,
        responsive:[
          {
            breakpoint:768,
            settings: {
              arrows:false
            }
          }
        ]
    });
});

new WOW().init(); 
