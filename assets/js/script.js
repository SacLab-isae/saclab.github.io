$(document).ready(function(){

    // Partner slider
        $('#partner-slider').owlCarousel({
            loop:true,
            margin:10,
            autoplay: true,
            responsive:{
                0:{
                    items:4
                },
                600:{
                    items:5
                },
                1000:{
                    items:6
                }
            }
        }) // end of #partner-slider

    // student slider
        $('#students-slider').owlCarousel({
            loop:true,
            margin:10,
            autoplay: true,
            responsive:{
                0:{
                    items:3
                },
                600:{
                    items:5
                },
                1000:{
                    items:7
                }
            }
        }) // end of #partner-slider

    // student slider
    $('#masters-slider').owlCarousel({
        loop:true,
        margin:10,
        autoplay: true,
        responsive:{
            0:{
                items:5
            },
            600:{
                items:7
            },
            1000:{
                items:9
            }
        }
    }) // end of #partner-slider

    $('#owl-video-slider').owlCarousel({
        items:1,
        merge:true,
        loop:true,
        margin:10,
        video:true,
        lazyLoad:true,
        center:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:3
            }
        }
    })



    // Turn off Google Map zooming
        $('.map_canvas').addClass('scrolloff'); // set the pointer events to none on doc ready
        $('#map').on('click', function () {
            $('.map_canvas').removeClass('scrolloff'); // set the pointer events true on click
        });
        // you want to disable pointer events when the mouse leave the canvas area;
        $(".map_canvas").mouseleave(function () {
            $('.map_canvas').addClass('scrolloff'); // set the pointer events to none when mouse leaves the map area
        }); //end of Turn off Google Map zooming


    // Team box height
        var h = $('.team-img-detail').height();
        var mbottom = h;
        h = h/10;
        var top = $('.team-box').height();
        top = (top/2)+h;
        var win = $(window).width();

        if ( win >= 768 ){
            $(".team-img-detail").css("top", top);
        } else {
            $(".team-img-detail").css({
                "bottom": -mbottom+20,
                "left": "0",
                "width": "100%"
            });
            $(".team-box").css("margin-bottom", mbottom+30);
        }// end of Team box height


    // Pop up
        $('.test-popup-link').magnificPopup({
            type:'image',
            gallery:{
                enabled:true
            },
            zoom: {
                enabled: true,
                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        }); //end of Pop Up



}); // end of $(document).ready(function()
