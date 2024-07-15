// Função para buscar e processar os dados da API
function buscarBulaMedicamento(medicamento) {
    // URL da API com o nome do medicamento
    var url = `https://bula.vercel.app/pesquisar?nome=${encodeURIComponent(medicamento)}&pagina=1`;
    var medicamento = document.getElementById('medicamento').value;
    // Faz a requisição GET para a API usando fetch
    fetch(url, {
        method: "GET"
    })
    .then(response => {
        // Verifica se a resposta da API está ok (status 200)
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        // Retorna a resposta como JSON
        return response.json();
    })
    .then(data => {
        // Processa os dados recebidos da API (exemplo: exibir no console)
        console.log("Dados da API:", data);
        // Aqui você pode adicionar mais lógica para manipular os dados, como exibir em uma interface HTML
    })
    .catch(err => {
        // Trata erros que possam ocorrer durante a requisição
        console.error("Erro na requisição:", err);
    });
}

// Exemplo de uso: chamando a função para buscar informações sobre AMOXICILINA
buscarBulaMedicamento('AMOXICILINA');
