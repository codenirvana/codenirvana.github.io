$(function() {

    var links = {
            "GitHub" : "https://github.com/codenirvana",
            "Blog" : "https://uditvasu.net/blog",
            "LinkedIn" : "https://www.linkedin.com/in/uditvasu",
            "E-Mail" : "mailto:admin@codenirvana.in",
            "Twitter" : "http://twitter.com/uditdistro",
            "Website" : "http://www.codenirvana.net"

    };

    var valueContent = ["Others", "Operating-System", "Designing", "Company-name"];

    $.getJSON("/data.json", function(data) {
            var codeItems = [];
            $.each(data, function(key, val) {
                var codeItem = '<div class="code-item">';
                codeItem += '<span class="code-selection">' + key + '</span>';
                codeItem += '<span class="code-item-content">';
                $.each(val, function(key, value) {
                    codeItem += '<span class="code-item-line ';
                    if(jQuery.inArray(key, valueContent) != -1){
                        codeItem += 'value-content';
                    }
                    codeItem += '">';
                    codeItem += '<span class="code-item-attr">' + key + '</span>';
                    if(links[key]){
                        codeItem += '<span class="code-item-value"><a href="'+links[key]+'" target="_blank">' + value + '</a></span>';
                    } else{
                        if(value.indexOf("%") != -1){
                            codeItem += '<span class="code-item-value">' + value.slice(0,-1)+ '<span class="value-number-percent">%</span></span>';
                        } else{
                            codeItem += '<span class="code-item-value">' + value + '</span>';
                        }

                    }
                    codeItem += '</span>';
                });
                codeItem += '</span></div>';
                codeItems.push(codeItem);
            });
            codeItems.push('<div class="code-item description-item"><div class="description-item-line">Thank you for reading</div></div>');
            $('.code-items').html(codeItems);

        })
        .done(function() {
            var w = $(window).width();
            var h = $(window).height();
            var lineCount = $(".code").height() / 25;
            for (var i = 1; i <= lineCount; i++) {
                $(".line-count").append("<span>" + i + "</span>")
            }
            $(window).hover(function(e) {
                lineCount = $(".code").height() / 25;
                var pY = e.pageY;
                for (var c = 1; c <= lineCount; c++) {
                    if (pY > $(".line-count span:nth-child(" + c + ")").offset().top && pY < $(".line-count span:nth-child(" + c + ")").offset().top + 25) {
                        $(".line-count span:nth-child(" + c + ")").css({
                            color: "#55b5db"
                        })
                    }
                }
            }, function() {
                $(".line-count span").css({
                    color: "#404b53"
                })
            });
            $(".code-items .code-item").append('<span class="directional-arrow"></span>')
            $(".code-items .code-item .directional-arrow").click(function() {
                if ($(this).parent().hasClass('close')) {
                    $(this).parent().removeClass('close')
                    $(this).siblings('.code-selection').removeClass('collapsed');
                    $(".code-item-content", $(this).parent()).show();
                    $(".line-count").html("");
                    var lineCount = $(".code").height() / 25;
                    for (var i = 1; i <= lineCount; i++) {
                        $(".line-count").append("<span>" + i + "</span>")
                    }
                } else {
                    $(this).parent().addClass('close');
                    $(this).siblings('.code-selection').addClass('collapsed');
                    $(".code-item-content", $(this).parent()).hide();
                    $(".line-count").html("");
                    var lineCount = $(".code").height() / 25;
                    for (var i = 1; i <= lineCount; i++) {
                        $(".line-count").append("<span>" + i + "</span>")
                    }
                }
            });
        })
        .fail(function() {
            alert('Error Loading, Please Refresh!');
        });

});
