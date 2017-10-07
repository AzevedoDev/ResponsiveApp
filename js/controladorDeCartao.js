const controladorDeCartao = (function(){
    "use strict";

    function removeCartao(){
        var cartao = document.querySelector("#cartao_" + this.dataset.ref);
        cartao.classList.add("cartao--some");
        setTimeout(function(){
            cartao.remove();
            $(document).trigger("precisaSincronizar");
        },400);
    };

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

    var contador = 0;

    function adicionaCartao(conteudo,cor){
        
        contador++;
        
    
            var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
                                            .addClass("opcoesDoCartao-opcao")
                                            .attr("data-ref" , contador)
                                            .text("remover")
                                            .click(removeCartao);
    
    
            var opcoes = $("<div>").addClass("opcoesDoCartao")
                        .append(botaoRemove);
    
            var conteudoTag = $("<p>").addClass("cartao-conteudo")
                        .append(conteudo);
    
            
            var tipoCartao = decideTipoCartao(conteudo);
    
            
            $("<div>").attr("id","cartao_" + contador)
                        .addClass("cartao")
                        .addClass(tipoCartao)
                        .append(opcoes)
                        .append(conteudoTag)
                        .css("background-color",cor)
                        .prependTo(".mural");
    };

    return{
        adicionaCartao: adicionaCartao
        ,idUltimoCartao: function(){
            return contador;
        }
    } 

})();