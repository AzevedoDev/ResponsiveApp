(function() {
    var botoes = document.querySelectorAll(".opcoesDoCartao-remove");
    
    for (var i=0;i<botoes.length;i++){
        botoes[i].addEventListener("click", removeCartao);
    };
    
    
    var contador = $(".cartao").length;
    
    
    $(".novoCartao").submit(function(event){
        
        
        event.preventDefault();
    
        var campoConteudo = $(".novoCartao-conteudo");
        var conteudo = campoConteudo.val()
                                    .trim()
                                    .replace(/\*\*(.+?)\*\*/g, "<strong> $1 </strong")
                                    .replace(/\*(.+?)\*/g, "<em> $1 </em")
                                    .replace(/\n/g, "<br>");
    
    
        if(conteudo){
            
            controladorDeCartao.adicionaCartao(conteudo, "#EBEF40");
                        
        };
    
        campoConteudo.val("");
    });
})();