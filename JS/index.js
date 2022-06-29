const url = "https://api-fimdapicada.herokuapp.com";
//const url = "http://localhost:3000"

$(document).ready(function(){
    deslogar();
    $('#btn_Logar').click(function() {
        logar();
    })
    function logar(){
        $.ajax({
            url: url + "/loguin/logar",
            type: "POST",
            data: {
                loguin: $("#email").val(),
                senha: $("#password").val()
            },
            success:function(message){
                window.sessionStorage.setItem('token', message.token);
                window.sessionStorage.setItem('nome', message.nome);
                window.sessionStorage.setItem('estado', message.estado);
                window.location.href = "./html/denuncia.html"
                
            },error:function(message){
                alert("Loguin Falhou");
            }
        });
    }
    function deslogar(){
        window.sessionStorage.removeItem('token');
        window.sessionStorage.removeItem('nome');
        window.sessionStorage.removeItem('estado');
    }
});