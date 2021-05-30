var cards;
var current = null;
var dogru = 0;
var run = null;
var sure = 100; 
var puan = 0;
var son;
var sakla;
var a=0;

function shuffle(array) {
    var currentIndex = array.length,
        temp, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    }
}

function karıstır() { 
    cards = cards.concat(cards);
    shuffle(cards);
    var html = '';
    for (var i = 0; i < cards.length; i++) {
        html += '<div class="cards" data-name="' + cards[i] + '" onclick="flip(this)"><div class="back"><img src="img/' + konum + '/' + cards[i] + '"/></div><div class="front"><img src="img/back.jpg"/></div></div>';
    }
    $(".grid").html(html);
}

function start() {
    if(a==1)
    {
        run = setInterval(frame, 1000);
    } 
    $("#a1").val("100");
    $(".play-btn").css("display", "none");
    $("#cover").css("display", "none");

    function frame() {
        if (sure == 0) {
            clearInterval(run);
            $("#cards").remove(); 
            $(".grid").css("padding-top", "0%"); 
            $("#cover").css("display", '');

            $(".lose").css("display", "flex");
            $(".win").css("opacity", 0);
            $(".continue-btn").css("display", "flex");
            $("#a3").css("display", "flex");
            $("#a4").css("display", "flex");
            document.getElementById("defeat").play();
            $("#a4").html("" + "KAYBETTİN");
            $("#a3").html("" + "oyunda kazandığın puan: "+puan);
        }
        else if (sure > 0) {
            sure -= 1;
            $("#a1").html("" + sure);
        }
    }
};

function flip(card) {
    $(card).toggleClass("flip");
    $(card).css("pointer-events", "none");
    if (current == null)
        current = $(card);
    else {
        $(".cards").css("pointer-events", "none");
        setTimeout(function() {
            if (current.attr("data-name") != $(card).attr("data-name")) {
                current.toggleClass("flip");
                $(card).toggleClass("flip");
                document.getElementById("wrong").play();
            }
            else {
                current.addClass("hidden")
                $(card).addClass("hidden")
                document.getElementById("correct").play();
                puan = puan + 10;
                $("#a2").html("" + puan); 
                dogru++;
                if (dogru == son) {
                    clearInterval(run);
                    $("#cards").remove(); 
                    $(".grid").css("padding-top", "0%"); 
                    $("#cover").css("display", '');

                    $(".win").css("display", "flex");
                    $(".lose").css("opacity", 0);
                    $(".continue-btn").css("display", "flex");
                    $("#a3").css("display", "flex");
                    $("#a4").css("display", "flex");
                    $("#a5").css("display", "flex");


                    document.getElementById('victory').play();

                    $("#a4").html("" + "KAZANDIN");

                    $("#a3").html("" + "oyunda kazandığın puan: "+puan);

                    $("#a5").html("" + "oyunu: "+sure+" süre kala bitirdin");
                }
            }
            current = null;
            $(".cards:not(.hidden)").css("pointer-events", "auto");
        }, 700);
    }
}

function replay() {
    location.reload(); 
}

function baslat(duzey) {
    
    sakla=duzey;
    ++a;


    if(duzey == 1){
        $( ".grid" ).css( "grid", "repeat(2, 1fr) / repeat(5, 1fr)" );
        cards = ["card1.png", "card2.png", "card3.png", "card4.png", "card5.png"];
        konum=2;
        karıstır();   
        start();
        son=5;
    }
    if(duzey == 2){
        cards = ["card1.png", "card2.png", "card3.png", "card4.png", "card5.png", "card6.png", "card7.png", "card8.png", "card9.png"];
        konum=3;
        karıstır(); 
        $( ".grid" ).css( "grid", "repeat(3, 1fr) / repeat(6, 1fr)" );
        $( ".grid" ).css( "padding-top", "8%" );
        $( ".cards" ).css( "width", "180px" );
        $( ".cards" ).css( "height", "250px" );
        $( ".ust" ).css( "top", "30px" );  
        start();
        son=9;
    }
    if(duzey == 3){
        cards = ["card1.png", "card2.png", "card3.png", "card4.png", "card5.png", "card6.png", "card7.png", "card8.png", "card9.png", "card10.png"];
        konum=4;
        karıstır();
        $( ".grid" ).css( "grid", "repeat(4, 1fr) / repeat(5, 1fr)" );
        $( ".grid" ).css( "padding-top", "8%" );
        $( ".cards" ).css( "width", "150px" );
        $( ".cards" ).css( "height", "200px" );
        $( ".ust" ).css( "top", "30px" );  
        start();
        son=10;
    }
}

function yenile() { 
    $( ".cards" ).remove();
    baslat(sakla);
    sure = 101;
    puan = 0;
    $("#a2").html("" + puan);

}
