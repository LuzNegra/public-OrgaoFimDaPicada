$(document).ready(function(){
    verificação();

    function verificação(){
        if(window.sessionStorage.getItem('token') === null){
            window.location.href = "../index.html"
        }
    }
});