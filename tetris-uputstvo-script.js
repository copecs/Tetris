let oblici = [1,1,1,1,1,1,1];
let lvl = 1;
$(document).ready(function(){
    
    localStorage.setItem("oblici", JSON.stringify(oblici));
    localStorage.setItem("lvl", JSON.stringify(lvl));
    
    checkthemall();
    $('#lvl').on('input', function() {
        lvl= $(this).val();
    });
    $("td").click(function(){
        save();
        if(isAllEmpty()){
            alert("Choose atleast one type of blocks");
        }
        else{
        window.location.href = "tetris-igra.html";
        }
    });

    $("#id0").click(function(){
        oblici[0] =this.checked?1:0;
        save();
    });
    $("#id1").click(function(){
        oblici[1] =this.checked?1:0;
        save();
    });
    $("#id2").click(function(){
        oblici[2] =this.checked?1:0;
        save();
    });
    $("#id3").click(function(){
        oblici[3] =this.checked?1:0;
        save();
    });
    $("#id4").click(function(){
        oblici[4] =this.checked?1:0;
        save();
    });
    $("#id5").click(function(){
        oblici[5] =this.checked?1:0;
        save();
    });
    $("#id6").click(function(){
        oblici[6] =this.checked?1:0;
        save();
    });
});
function save(){
    console.log($("#lvl").value);
    localStorage.setItem("oblici", JSON.stringify(oblici));
    localStorage.setItem("lvl", JSON.stringify(lvl));
}

function checkthemall(){
    $('#id0').prop('checked', true);
    $('#id1').prop('checked', true);
    $('#id2').prop('checked', true);
    $('#id3').prop('checked', true);
    $('#id4').prop('checked', true);
    $('#id5').prop('checked', true);
    $('#id6').prop('checked', true);
}

function isAllEmpty(){
    for(let i=0;i<7;i++){
        if(oblici[i]==1)
            return false;
    }
    return true;
}