$(function() {

    var lineCount;

    function lineCountWrite() {
        $("aside").html("");
        lineCount = $("main").height() / 25;
        for (var i = 1; i <= lineCount; i++) {
            $("aside").append("<span>" + i + "</span>")
        }
    }

    lineCountWrite();
    $(window).hover(function(e) {
        var pY = e.pageY;
        for (var c = 1; c <= lineCount; c++) {
            if (pY > $("aside span:nth-child(" + c + ")").offset().top && pY < $("aside span:nth-child(" + c + ")").offset().top + 25) {
                $("aside span:nth-child(" + c + ")").css({
                    color: "#55b5db"
                });
            }
        }
    }, function() {
        $("aside span").css({
            color: "#404b53"
        });
    });
    $(".code").append('<span class="arrow"></span>');
    $(".code .arrow").click(function() {
        $(this).parent().toggleClass('close');
        $(this).siblings('.code-selection').toggleClass('collapsed');
        $(".code-content", $(this).parent()).toggle();
        lineCountWrite();
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./js/service-worker.js');
    }

});
