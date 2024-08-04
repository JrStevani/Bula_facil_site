function fetchBula(medicamento, retries = 3) {
    fetch(`https://bula.vercel.app/pesquisar?nome=${medicamento}&pagina=1`, {
        method: "GET"
    })
    .then(response => response.json())
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

                    var linkContainer = document.getElementById('downloadLinkContainer');
                    linkContainer.innerHTML = '';  
                    var anchor = document.createElement('a');
                    anchor.href = url;
                    anchor.textContent = `Download de ${medicamento}`;
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
            setTimeout(() => fetchBula(medicamento, retries - 1), 2000); 
        } else {
            console.error(err);
            alert('Erro ao buscar a bula do medicamento.');
        }
    });
}

document.getElementById('formMedicamento').addEventListener('submit', function(event) {
    event.preventDefault();
    var medicamento = document.getElementById('medicamento').value;
    fetchBula(medicamento);
});