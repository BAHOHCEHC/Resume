$(document).ready(function ($) {



    //custom scroll
    // http://manos.malihu.gr/jquery-custom-content-scroller/

    $(".article__body").mCustomScrollbar({
        theme: "rounded-dots"
    });



    // Grid
    // classie.js by @desandro: https://github.com/desandro/classie
    // https://tympanus.net/codrops/2013/06/19/dynamic-grid-with-transitions/
    Grid.init({
        transition: true,
        speed: 650,
        delay: 50
    });

    // Lightbox gallery POP UP
    // http://dimsemenov.com/plugins/magnific-popup/
    $('.popup-gallery>div').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title') + '<small>by Ivan Onyshchenko</small>';
            }
        }
    });

    // CAROUSEL http://tj-s.ru/tod/prostaya-karusel-na-jquery.html
    //Обработка клика на стрелку вправо
    $(document).on('click', ".carousel-button-right", function () {
        var carusel = $(this).parents('.carousel');
        right_carusel(carusel);
        return false;
    });
    //Обработка клика на стрелку влево
    $(document).on('click', ".carousel-button-left", function () {
        var carusel = $(this).parents('.carousel');
        left_carusel(carusel);
        return false;
    });

    function left_carusel(carusel) {
        var block_width = $(carusel).find('.carousel-block').outerWidth();
        $(carusel).find(".carousel-items .carousel-block").eq(-1).clone().prependTo($(carusel).find(".carousel-items"));
        $(carusel).find(".carousel-items").css({
            "left": "-" + block_width + "px"
        });
        $(carusel).find(".carousel-items .carousel-block").eq(-1).remove();
        $(carusel).find(".carousel-items").animate({
            left: "0px"
        }, 200);
    }

    function right_carusel(carusel) {
        var block_width = $(carusel).find('.carousel-block').outerWidth();
        $(carusel).find(".carousel-items").animate({
            left: "-" + block_width + "px"
        }, 200, function () {
            $(carusel).find(".carousel-items .carousel-block").eq(0).clone().appendTo($(carusel).find(".carousel-items"));
            $(carusel).find(".carousel-items .carousel-block").eq(0).remove();
            $(carusel).find(".carousel-items").css({
                "left": "0px"
            });
        });
    }
    $(function () {
        //Раскомментируйте строку ниже, чтобы включить автоматическую прокрутку карусели
        auto_right('.carousel');
    })
    //    Автоматическая прокрутка
    function auto_right(carusel) {
        setInterval(function () {
            if (!$(carusel).is('.hover'))
                right_carusel(carusel);
        }, 4000)
    }
    // Навели курсор на карусель
    $(document).on('mouseenter', '.carousel', function () {
        $(this).addClass('hover')
    })
    //Убрали курсор с карусели
    $(document).on('mouseleave', '.carousel', function () {
        $(this).removeClass('hover')
    })
    //END CAROUSEL





// ================= AJAX + HASH NAV =================
$(function () {

    function initLeftPlugins() {
        $(".article__body__LEFT #ee").mCustomScrollbar({
            theme: "rounded-dots"
        });

        $('.popup-galleryPhoto>div').magnificPopup({
            delegate: 'a',
            type: 'image',
            gallery: {
                enabled: true
            },
            image: {
                titleSrc: function (item) {
                    return item.el.attr('title') + '<small>by Иван Оныщенко</small>';
                }
            }
        });
    }

    function initRightPlugins() {
        $(".article__body__RIGHT #ee").mCustomScrollbar({
            theme: "rounded-dots"
        });
    }

    function loadByHash() {
        var hash = window.location.hash.replace('#', '');
        if (!hash) return;

        var toLoad = hash + '.html .article__body-LEFT';
        $('.article__body__LEFT').load(toLoad, function () {
            initLeftPlugins();
        });
    }

    loadByHash();

    // -------- LEFT MENU --------
    $('.left_side .nav_LEFT li a').on('click', function (e) {
        e.preventDefault();

        var $link = $(this);
        var href = $link.attr('href');
        var hash = href.replace('.html', '');

        if ($link.parent().hasClass('active')) return;

        $('.nav_LEFT li').removeClass('active moved');
        $link.parent().addClass('active moved');

        $(".left_side .info__header__h3").text($link.text());

        $('.wrapper--loading .fa-refresh').remove();
        $('.wrap__LEFT .wrapper--loading')
            .append('<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>');

        $('.article__body__LEFT').fadeOut(200, function () {
            $('.article__body__LEFT').load(href + ' .article__body-LEFT', function () {
                $('.article__body__LEFT').fadeIn(200);
                $('.wrapper--loading .fa-refresh').fadeOut(200);
                initLeftPlugins();
            });
        });

        window.location.hash = hash;
    });

    // -------- RIGHT MENU --------
    $('.right_side .nav_RIGHT li a').on('click', function (e) {
        e.preventDefault();

        var $link = $(this);
        var href = $link.attr('href');
        var hash = href.replace('.html', '');

        if ($link.parent().hasClass('active')) return;

        $('.nav_RIGHT li').removeClass('active moved');
        $link.parent().addClass('active moved');

        $(".right_side .info__header__h3").text($link.text());

        $('.wrapper--loading .fa-refresh').remove();
        $('.wrap__RIGHT .wrapper--loading')
            .append('<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>');

        $('.article__body__RIGHT').fadeOut(200, function () {
            $('.article__body__RIGHT').load(href + ' .article__body-RIGHT', function () {
                $('.article__body__RIGHT').fadeIn(200);
                $('.wrapper--loading .fa-refresh').fadeOut(200);
                initRightPlugins();

                // tech stack animation
                setTimeout(function () {
                    $('.loading__tec').each(function () {
                        var val = parseInt($(this).text(), 10);
                        $(this).css('width', val + '0%');
                    });
                }, 500);
            });
        });

        window.location.hash = hash;
    });

});
// ================= END AJAX =================





});