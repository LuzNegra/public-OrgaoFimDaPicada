const url = "https://api-fimdapicada.herokuapp.com";
//const url = "http://localhost:3000"

const nome = window.sessionStorage.getItem('nome');
const myuf = window.sessionStorage.getItem('estado');

$(document).ready(function () {
    const myestado = 'MS';
    $("#estado").val(myuf);
    buscarDados();
    preehcherOrgaos();
    $('#btn_procurar').click(function () {
        buscarDados();
    })

    function preehcherOrgaos () {
        $('#orgao_nome').text(nome + " - " + myuf);
        $('#titulo_aba').text(nome);
    }
    function buscarDados() {
        $.ajax({
            type: "GET",
            url: url + "/denuncia/buscar/" + $("#estado").val(),
            headers: { authorization: 'Bearer ' + window.sessionStorage.getItem('token') },
            success: function (data) {
                $('#root').empty();
                if (data.retorno.length > 0) {
                    const qtdDenuncia = data.retorno.length - 1;
                    let html = '<table class="table table-striped table-bordered table-condensed table-hover"><tr><th>Cep</th><th>Cidade</th><th>Estado</th><th>Bairro</th><th>Rua</th><th>Número</th><th>Complemento</th><th>Descricão</th><th>Verificar</th></tr>';
                    for (let x = qtdDenuncia; x >= 0; x--) {
                        html += '<tr>'
                        html += '<td id="cep' + x + '">' + data.retorno[x].cep + '</td>';
                        html += '<td id="cidade' + x + '">' + data.retorno[x].cidade + '</td>';
                        html += '<td id="estado' + x + '">' + data.retorno[x].estado + '</td>';
                        html += '<td id="bairro' + x + '">' + data.retorno[x].bairro + '</td>';
                        html += '<td id="rua' + x + '">' + data.retorno[x].rua + '</td>';
                        html += '<td id="numero' + x + '">' + data.retorno[x].numero + '</td>';
                        html += '<td id="complemento' + x + '">' + data.retorno[x].completamento + '</td>';
                        html += '<td id="descricao' + x + '">' + data.retorno[x].descricao + '</td>';
                        html += '<td><button type="button" id="btn_verificar" class="btn btn-success" value="' + x + '">Verificado</button></td>';
                        html += '</tr>';
                    }
                    $('#root').append(html + '</table>');
                    $('#btn_verificar, #btn_verificar').click(function () {
                        procurarEndereco(this.value);
                    })
                }else{
                    alert("Não Possui denúncia");
                }

            }, error: function (message) {
                alert("Falha")
            }
        });
    }
    function procurarEndereco(indice) {
        $.ajax({
            url: url + "/endereco/procurar",
            type: "POST",
            data: {
                cep: $("#cep" + indice).text(),
                estado: $("#estado" + indice).text(),
                cidade: $("#cidade" + indice).text(),
                bairro: $("#bairro" + indice).text(),
                rua: $("#rua" + indice).text(),
                numero: $("#numero" + indice).text()
            },
            success: function (message) {
                console.log(message.id)
                AtualizarEndereco(message.id);
            }, error: function (message) {
                alert("Endereço falhou");
            }
        });
    }
    function AtualizarEndereco(id_endereco) {
        $.ajax({
            url: url + "/denuncia/status/" + id_endereco,
            type: "PUT",
            headers: { authorization: 'Bearer ' + window.sessionStorage.getItem('token') },
            success: function (message) {
                console.log(message.mensagem);
                window.location.href = "./denuncia.html";
            }, error: function (message) {
                alert("Endereço falhou");
            }
        });
    }
});