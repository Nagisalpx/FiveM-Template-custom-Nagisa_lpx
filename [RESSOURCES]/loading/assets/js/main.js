// Luka Lansky auf die 1 !!!
var currentButton = 0;
var currentImage = 0;

$(document).ready(function() {
    $(window).on('mousemove', function(e) {
        $('#cursor').css({top: e.pageY + 'px', left: e.pageX + 'px'});
    });

    Config.Images.forEach((value, index) => {
        $("#images").append(`<img id="galleryimage-${index}" src="assets/media/gallery/${value}">`)
    });

    Config.Buttons.forEach((button, index) => {
        $(".buttons").append(`<div id="${button.id}" ${button.default ? 'class="active"' : ''}>
            <p>${button.label}</p>
        </div>`)

        if(button.default) {
            currentButton = index
            $(".screens").css({left: currentButton * -100 + "%"});

            if(button.id == Config.MediaPage) {
                $(".videobox").css({left: "50%"})
                $(".gallerybox").css({right: "2%"})
            }
        }
    })


    Config.Pages.forEach((page, index) => {
        let html = "";
        html += `<div>
            <p class="description">${page.description}</p>`;

        if(page.additionalinfo) {
            html += `<div class="additionalinfo">`;
            page.additionalinfo.forEach((value, index) => {
                html += `<div><img src="assets/media/${value.icon}">${value.data}</div>`;

                if(index == page.additionalinfo.length - 1) {
                    html += `</div></div>`;
                }
            })
        } else {
            html += `</div>`;
        }

        $(".screens").append(html)
    });

    $(".buttons > *").on("click", function(e) {
        e.preventDefault();

        $("#" + Config.Pages[currentButton].id).removeClass("active")
        currentButton = Config.Pages.findIndex(val => val.id == this.id);
        if(currentButton == -1) return;
        
        $("#" + Config.Pages[currentButton].id).addClass("active")
        $(".screens").css({left: currentButton * -100 + "%"});

        let paused = document.querySelector("#video-player").paused
        $("#playscreen").css({opacity: 1.0})
        if(!paused) {
            document.querySelector("#video-player").pause();
        }
            
        if(Config.Pages[currentButton].id == Config.MediaPage) {
            $(".videobox").css({left: "50%"})
            $(".gallerybox").css({right: "2%"})
        } else {
            $(".videobox").css({left: "152%"})
            $(".gallerybox").css({right: "-52%"})
        }
    });

    $("#right-arrow").on("click", function(e) {
        e.preventDefault();

        currentImage = currentImage < Config.Images.length - 1 ? currentImage + 1 : currentImage;
        $("#images").css("left", currentImage * -100 + "%");
    });

    $("#left-arrow").on("click", function(e) {
        e.preventDefault();

        currentImage = currentImage > 0 ? currentImage - 1 : currentImage;
        $("#images").css("left", currentImage * -100 + "%");
    });

    $(".videobox").on("click", function(e) {
        let paused = document.querySelector("#video-player").paused
        $("#playscreen").css({opacity: paused ? 0.0 : 1.0})
        if(paused) {
            document.querySelector("#video-player").play();
        } else { 
            document.querySelector("#video-player").pause();
        }
    });

    $("#playscreen").hover(function() {
    }, function() {
    })
});