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
                return item.el.attr('title') + '<small>by Иван Оныщенко</small>';
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





    // ajax
    //Check for hash value in URL
    var hash = window.location.hash.substr(1);
    var href = $('.nav li a').each(function () {
        var href = $(this).attr('href');
        if (hash == href.substr(0, href.length - 5)) {
            var toLoad = hash + '.html #ee';
            $('#ee').load(toLoad)
        }
    });

    $('.left_side .nav_LEFT li a').on('click', function (event) {
        event.preventDefault();

        //работа с пунктами меню
        if ($(this).parent().hasClass("active")) {
            return false;
        } else {
            $('.left_side .nav_LEFT li').removeClass("active moved");
            $(this).parent().addClass("active moved");
        }

        //Меняем заголовок статьи
        var innerText = $(this).text();
        $(".left_side .info__header__h3").text(innerText);

        //обновление плагина к загруженному аяксом контенту в статье
        setInterval(function () {
            //обновление скрола в левой секции при аякс вызове
            $(".article__body__LEFT #ee").mCustomScrollbar({
                theme: "rounded-dots"
            });


            //Обновление мплагина при загрузке страницы фото
            $('.popup-galleryPhoto>div').magnificPopup({
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
                        return item.el.attr('title') + '<small>by Иван Оныщенко</small>';
                    }
                }
            });



        }, 100);

        var toLoad = $(this).attr('href') + ' .article__body-LEFT';
        $('.article__body__LEFT').fadeOut('', loadContent);
        $('.fa-refresh').remove();
        $('.wrap__LEFT .wrapper--loading').append('<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>');
        $('.fa-refresh').fadeIn('normal');
        window.location.hash = $(this).attr('href').substr(0, $(this).attr('href').length - 5);

        function loadContent() {
            $('.article__body__LEFT').load(toLoad, 'normal', showNewContent());
        }

        function showNewContent() {
            $('.article__body__LEFT').fadeIn('normal', hideLoader());

        }

        function hideLoader() {
            $('.wrapper--loading .fa-refresh').fadeOut('normal');
        }

        return false;

    });




    //правые пункты меню аякс загрузка
    $('.right_side .nav_RIGHT li a').on('click', function (event) {
        event.preventDefault();

        //работа с пунктами меню работа с svg анимацией
        if ($(this).parent().hasClass("active")) {
            return false;
        } else {
            $('.right_side .nav_RIGHT li').removeClass("active moved");
            $(this).parent().addClass("active moved");
        }

        //Меняем заголовок статьи
        var innerText = $(this).text();
        $(".right_side .info__header__h3").text(innerText);



        //обновление плагина к загруженному аяксом контенту в статье
        setInterval(function () {
            $(".article__body__RIGHT #ee").mCustomScrollbar({
                theme: "rounded-dots"
            });
        }, 500);

        var toLoad = $(this).attr('href') + ' .article__body-RIGHT';
        $('.article__body__RIGHT').fadeOut('', loadContent);
        $('.fa-refresh').remove();
        $('.wrap__RIGHT .wrapper--loading').append('<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>');
        $('.fa-refresh').fadeIn('normal');
        window.location.hash = $(this).attr('href').substr(0, $(this).attr('href').length - 5);

        function loadContent() {
            $('.article__body__RIGHT').load(toLoad, 'normal', showNewContent());
        }

        function showNewContent() {
            $('.article__body__RIGHT').fadeIn('normal', hideLoader());
        }

        function hideLoader() {
            $('.wrapper--loading .fa-refresh').fadeOut('normal');

        }

        //анимация загрузки на странице technology stack
        setTimeout(function () {
            $(function () {
                var w = 0;
                $(".loading__tec").each(function () {
                    var re = $(this).text();
                    re = +re;
                    $(this).css("width", re + "0%");
                });
            }());
        }, 1000);
        return false;
    });

    // END ajax




});