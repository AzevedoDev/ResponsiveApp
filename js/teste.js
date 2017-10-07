for (var i = 0; i < 10; i++) {
    var botao = $("<button>").click(clicado(i)).text("botao" + i);

    $(".painel").append(botao);
    
}

function clicado(indice){
    return function(){
        alert(indice);
    }
}