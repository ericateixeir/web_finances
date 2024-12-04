
document.getElementById("formcadastro").addEventListener("submit",function(event){
    event.preventDefault();
    
    //pega os valores informados pelo usuário
    var nome = document.getElementById('nome').value;
    var categoria = document.getElementById('categoria').value;
    var data = document.getElementById('data').value;
    var valor = parseFloat(document.getElementById('valor').value);

    //armazena as informações
    var registro = {nome, categoria, data, valor};
    //recupera os regitros armazenados no LocalStorage ou cria um array vazio, caso nenhum registro tenha sido feito
    let cadastro = JSON.parse(localStorage.getItem('cadastro')) || [];
    cadastro.push(registro); //adiciona o novo registro ao array

   
      //guarda o array atualizado no LocalStorage
      localStorage.setItem('cadastro',JSON.stringify(cadastro));
      //limpa o formulário após o envio
      document.getElementById('formcadastro').reset();
    
      exibir_cadastro()
})

  function exibir_cadastro(){
    //recupera os registros armazenados ou cria um array vazio
    var cadastro = JSON.parse(localStorage.getItem('cadastro')) || [];
    var output = document.getElementById('output'); // Obtém o elemento HTML onde os registros serão exibidos
    output.innerHTML=''; //limpa o conteúdo anterior
    cadastro.forEach((registro, index) => {
      let li = document.createElement('li');
      li.innerHTML = `
          Nome: ${registro.nome}, Categoria: ${registro.categoria}, Data: ${registro.data}, Valor: ${formatarMoeda(registro.valor)}
          <button onclick="editarRegistro(${index})">Editar</button>
          <button onclick="excluirRegistro(${index})">Excluir</button>
      `;
      output.appendChild(li); // Adiciona o li criado à lista
  });
  } 

  //converte o valor para real
  function formatarMoeda(valor){
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  exibir_cadastro();

  function atualizarResumo() {
    //pegar do armazenamento
    var cadastro = JSON.parse(localStorage.getItem('cadastro')) || [];
    let totalReceitas = 0;
    let totalDespesas = 0;

    //filtrar as despesas e receitas para agrupar
    cadastro.forEach(registro => {
        if (registro.categoria === 'Receita') {
            totalReceitas += registro.valor;
        } else if (registro.categoria === 'Despesa') {
            totalDespesas += registro.valor;
        }
    });

    const saldoFinal = totalReceitas - totalDespesas;

    // Atualiza os valores no HTML
    document.getElementById('total_receitas').textContent = formatarMoeda(totalReceitas);
    document.getElementById('total_despesas').textContent = formatarMoeda(totalDespesas);
    document.getElementById('saldo_final').textContent = formatarMoeda(saldoFinal);
}
// Função para editar um registro
function editarRegistro(index) {
  let cadastro = JSON.parse(localStorage.getItem('cadastro')) || [];
  let registro = cadastro[index]; //index indica o elemento

  // Preenche o formulário com os valores do registro
  document.getElementById('nome').value = registro.nome;
  document.getElementById('categoria').value = registro.categoria;
  document.getElementById('data').value = registro.data;
  document.getElementById('valor').value = registro.valor;

  // Remove o registro antigo para substituição
  excluirRegistro(index);
}

// Função para excluir um registro
function excluirRegistro(index) {
  let cadastro = JSON.parse(localStorage.getItem('cadastro')) || [];
  //splice serve para a manipulação de elementos no array
  cadastro.splice(index, 1); // Remove o registro pelo índice

  // Atualiza o LocalStorage e a exibição
  localStorage.setItem('cadastro', JSON.stringify(cadastro));
  exibir_cadastro();
  atualizarResumo();
}
// Exibe os dados ao carregar a página
exibir_cadastro();
atualizarResumo();
 