var botao = document.querySelector("#mudaLayout").addEventListener("click", function(){
    var mural = document.querySelector(".mural");
    mural.classList.toggle("mural--linhas");
    if (mural.classList.contains("mural--linhas")){
        this.textContent = "Blocos";
    }else{
        this.textContent = "Linhas";
    }
})

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

function removeCartao(){
    var cartao = document.querySelector("#cartao_" + this.dataset.ref);
    cartao.classList.add("cartao--some");
    setTimeout(function(){
        cartao.remove();
    },400);
};

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
        
        adicionaCartao(conteudo, "#EBEF40");
                    
    };

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

    $("#ajuda").click(function(){
        $.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes",
            function(res){
                console.log(res);
       
                res.instrucoes.forEach(function(instrucao){
                    adicionaCartao(instrucao.conteudo, instrucao.cor);
                });
            }
        );
    });

$("#sync").click(function(){

    var cartoes = [];

    $("#sync").removeClass("botaoSync--sincronizado");
    $("#sync").addClass("botaoSync--esperando");

    $(".cartao").each(function(){
        var cartao={};
        cartao.conteudo = $(this).find(".cartao-conteudo").html();
        cartoes.push(cartao);
    });

    var mural = {
        usuario: usuario
        ,cartoes: cartoes
    }

    $.ajax({
        url: "https://ceep.herokuapp.com/cartoes/salvar"
        ,method: "POST"
        ,data: mural
        ,success: function(res){
            $("#sync").addClass("botaoSync--sincronizado");
            console.log(res.quantidade + " cartões salvos em "
        + res.usuario);
        }
        ,error: function(){
            $("#sync").addClass("botaoSync--deuRuim");
            console.log("Não foi possivel salvar o mural");
        }
        ,complete: function(){
            $("#sync").removeClass("botaoSync--esperando");
            
        }
    });
});

var usuario = "seu.email@exemplo.com.br";


$.getJSON(
    "https://ceep.herokuapp.com/cartoes/carregar?callback=?",
    {usuario: usuario},
    function(res){
        var cartoes = res.cartoes;
        console.log(cartoes.length + " carregados em " + res.usuario);
        cartoes.forEach(function(cartao){
            adicionaCartao(cartao.conteudo);
        });
    }
);



    // https://tableless.com.br/o-basico-sobre-expressoes-regulares/