var botao = document.querySelector("#mudaLayout").addEventListener("click", function(){
    var mural = document.querySelector(".mural");
    mural.classList.toggle("mural--linhas");
    if (mural.classList.contains("mural--linhas")){
        this.textContent = "Blocos";
    }else{
        this.textContent = "Linhas";
    }
})

function removeCartao(){
    var cartao = document.querySelector("#cartao_" + this.dataset.ref);
    cartao.classList.add("cartao--some");
    setTimeout(function(){
        cartao.remove();
    },400);
}
var botoes = document.querySelectorAll(".opcoesDoCartao-remove");
for (var i=0;i<botoes.length;i++){
    botoes[i].addEventListener("click", removeCartao);
};


var contador = $(".cartao").length;


$(".novoCartao").submit(function(event){
    
    
    event.preventDefault();

    var campoConteudo = $(".novoCartao-conteudo");
    var conteudo = campoConteudo.val().trim().replace(/\n/g, "<br>");


    if(conteudo){
        
        contador++;

    

        var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
                                       .addClass("opcoesDoCartao-opcao").attr("data-ref" , contador).text("remover").click(removeCartao);

        var opcoes = $("<div>").addClass("opcoesDoCartao").append(botaoRemove);

        var conteudoTag = $("<p>").addClass("cartao-conteudo").append(conteudo);  
        
       var tipoCartao = decideTipoCartao(conteudo);
       
        $("<div>").attr("id","cartao_" + contador)
                    .addClass("cartao")
                    .addClass(tipoCartao)
                    .append(opcoes)
                    .append(conteudoTag)
                    .prependTo(".mural");
                    
    }

    campoConteudo.val("");
});

function decideTipoCartao(conteudo){
    var quebras = conteudo.split("<br>").length;

    var totalDeLetras = conteudo.replace(/<br>/g, " ").length;

    var ultimoMaior = "";
    conteudo.replace(/<br>/g, " ").split(" ").forEach(function(palavra) {
        if(palavra.length > ultimoMaior.length){
            ultimoMaior = palavra;
        }
    });
    var tamMaior = ultimoMaior.length;

    var tipoCartao = "cartao--textoPequeno";

    if(tamMaior < 9 && quebras < 5 && totalDeLetras < 55){
        tipoCartao = "cartao--textoGrande";
    }else if(tamMaior < 12 && quebras < 6 && totalDeLetras < 75){
        tipoCartao = "cartao--textoMedio";
    }
    
    return tipoCartao;
}

$("#busca").on("input", function(){
    var busca = $(this).val().trim();

    if(busca.length){
        $(".cartao").hide().filter(function(){
            return $(this).find(".cartao-conteudo").text().match(new RegExp(busca, "i"));
            


        }).show();

    }else{
            $(".cartao").show();
        }
    });