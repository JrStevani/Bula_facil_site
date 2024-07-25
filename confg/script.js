function fetchBula(medicamento, retries = 3) {
    fetch(`https://bula.vercel.app/pesquisar?nome=${medicamento}&pagina=1`, {
        method: "GET"
    })
    .then(response => response.json()) // Converte a resposta em JSON
    .then(data => {
        console.log(data);
        if (data && data.content && data.content.length > 0) {
            var id = data.content[0].idBulaPacienteProtegido;
            fetch(`https://bula.vercel.app/bula?id=${id}`, {
                method: "GET"
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data && data.pdf) {
                    var url = data.pdf;

                    // Redireciona para a URL
                    //window.location.href = url;

                    // Cria a âncora e adiciona ao HTML
                    var linkContainer = document.getElementById('downloadLinkContainer');
                    var anchor = document.createElement('a');
                    anchor.href = url;
                    anchor.textContent = `<p>Download de ${medicamento}</p>`;
                    linkContainer.appendChild(anchor);
                } else {
                    alert('Bula não encontrada.');
                }
            })
            .catch(err => {
                console.error(err);
                alert('Erro ao buscar a bula do medicamento.');
            });
        } else {
            alert('Nenhuma bula encontrada para o medicamento informado.');
        }
    })
    .catch(err => {
        if (retries > 0) {
            console.error(err);
            console.log(`Tentando novamente... Restam ${retries} tentativas.`);
            setTimeout(() => fetchBula(medicamento, retries - 1), 2000); // Espera 2 segundos antes de tentar novamente
        } else {
            console.error(err);
            alert('Erro ao buscar a bula do medicamento.');
        }
    });
}

document.getElementById('formMedicamento').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
    var medicamento = document.getElementById('medicamento').value;
    fetchBula(medicamento);
});
