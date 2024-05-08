let HighScores = [
    ["YourName",0],
    ["YourName",0],
    ["YourName",0],
    ["YourName",0],
    ["YourName",0]
]
let lastGame =["YourName",0]


$(document).ready(function(){
    read();
    computeHighScores();
    save();
    for (var i = 0; i < 5; i++) {
        var sc = $("<p></p>");
        sc.addClass("col-12");
        sc.text(""+(i+1)+". "+HighScores[i][0]+" : "+HighScores[i][1]);
        $("#hs").append(sc);
    }
    var sc = $("<p></p>");
    sc.addClass("col-12");
    sc.text(""+lastGame[0]+" : "+lastGame[1]);
    $("#lg").append(sc);


    $("#restart").click(function(){
        window.location.href = "tetris-uputstvo.html";
    });

    $("#restart").hover(function(){
        for(let i=0;i<7;i++){
            $("#r"+i).css("font-size", "3em");
        }
    }, function(){
        for(let i=0;i<7;i++){
            $("#r"+i).css("font-size", "2.5em");
        }
    });

});

function save(){
    localStorage.setItem("HighScores", JSON.stringify(HighScores));
    localStorage.setItem("lastGame", JSON.stringify(lastGame));
}

function read(){
    if(localStorage.getItem("HighScores")!=null)
        HighScores = JSON.parse(localStorage.getItem("HighScores"));
    if(localStorage.getItem("lastGame")!=null)
        lastGame = JSON.parse(localStorage.getItem("lastGame"));
}

function computeHighScores(){
    for(let i=0;i<5;i++){
        if(HighScores[i][1]<lastGame[1]){
            let index = i;
            for(let j=i+1;j<5;j++){
                for(let j2=0;j2<2;j2++){
                    HighScores[j][j2]=HighScores[j-1][j2];
                }
            }
            for(let j=0;j<2;j++){
                HighScores[index][j]=lastGame[j];
            }
            return;
        }
        if(HighScores[i][1]==lastGame[1] && HighScores[i][0]==lastGame[0])
            return;
    }
}