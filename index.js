(function() {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation')
  
    Array.prototype.slice.call(forms)
      .forEach(function(form) {
        form.addEventListener('submit', function(event) {
          if (!form.checkValidity()) {
            form.classList.add('was-validated')
          } else {
            inserir()
            form.classList.remove('was-validated')
            form.reset()
          }
          event.preventDefault()
          event.stopPropagation()
        }, false)
      })
  })()
  
  
  function getLocalStorage() {
    return JSON.parse(localStorage.getItem('bd_clientes')) ?? [];
  }
  
  function setLocalStorage(bd_clientes) {
    localStorage.setItem('bd_clientes', JSON.stringify(bd_clientes));
  }
  
  function limparTabela() {
    var elemento = document.querySelector("#tabela>tbody");
    while (elemento.firstChild) {
      elemento.removeChild(elemento.firstChild);
    }
  }
  
  function atualizarTabela() { 
    limparTabela();
    const bd_clientes = getLocalStorage();
    let index = 0;
    for (cliente of bd_clientes) {
      const novaLinha = document.createElement('tr');
      novaLinha.innerHTML = `
          <th scope="row">${index}</th>
          <td>${cliente.nome}</td>
          <td>${cliente.email}</td>
          <td>${cliente.marcas}</td>
          <td>${cliente.notas}</td>
          <td>${cliente.tamanho}</td>
          <td>
              <button type="button" class="btn btn-danger" id="${index}" onclick="excluir(${index})">Excluir</button>
          </td>
      `
      document.querySelector('#tabela>tbody').appendChild(novaLinha)
      index++;
    }
  }
  
  function inserir() { 
    const cliente = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      notas: document.getElementById('notas').value,
      marcas: document.getElementById('marcas').value,
      tamanho: document.getElementById('tamanho').value
    }
    const bd_clientes = getLocalStorage();
    bd_clientes.push(cliente);
    setLocalStorage(bd_clientes);
    atualizarTabela();
  }
  
  function excluir(index) { 
    const bd_clientes = getLocalStorage();
    bd_clientes.splice(index, 1);
    setLocalStorage(bd_clientes);
    atualizarTabela();
  }
  
  function validarNotas() {
    const bd_clientes = getLocalStorage();
    if (notas.value === bd_clientes.value) {
      notas.setCustomValidity("Informe a nota corretamente.");
      return true;
    }
    if (notas.value > 5) {
      notas.setCustomValidity("A nota deve ser menor ou igual a 5.");
      return false;
    }
    notas.setCustomValidity("");
    feedbackNotas.innerText = "A nota foi inserida corretamente.";
    return true;
  }
  atualizarTabela();
 
  const notas = document.getElementById("notas");
  const feedbackNotas = document.getElementById("feedbackNotas");
  notas.addEventListener('input', validarNotas);