document.getElementById('formMedicamento').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário
    var medicamento = document.getElementById('medicamento').value;
    fetch(`https://bula.vercel.app/pesquisar?nome=${medicamento}&pagina=1`, {
        method: "GET"
    })
    .then(response => response.json()) // Converte a resposta em JSON
    .then(data => {
        // Manipula os dados recebidos
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
                    //alert(`URL da bula: ${url}`);
                    window.location.href = url;
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
        console.error(err);
        alert('Erro ao buscar a bula do medicamento.');
    });
});