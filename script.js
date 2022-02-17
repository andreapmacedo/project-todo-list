// 5 - Adicione um botão com id="criar-tarefa" e, ao clicar nesse botão, um novo item deverá ser criado ao final da lista e o texto do input deve ser limpo
// O que será verificado:
// Será verificada a existência de um elemento do tipo button com o id criar-tarefa
// No campo de input será digitado o texto de uma tarefa qualquer e, em seguida, clicar-se-á no botão de criar tarefa. Será verificado que, após o clique, o texto digitado aparece na lista e desaparece do input.
// A adição de elementos na lista será feita algumas vezes, e será checado se todos os itens criados permanecem na lista na medida em que novos são adicionados.


const btnAdd = document.getElementById('criar-tarefa');
btnAdd.addEventListener('click', function () {
  let inputTextField = document.getElementById('texto-tarefa');
  let taskList = document.querySelector('#lista-tarefas');

  // 6 - Ordene os itens da lista de tarefas por ordem de criação
  // O que será verificado:
  // Três itens serão criados na lista e será checado se eles estão ordenados por ordem de criação - ou seja, primeiro o primeiro item criado, depois o segundo, e assim por diante.

  if (inputTextField.value.length > 0) {
    let newLi = document.createElement('li');
    newLi.innerText = inputTextField.value;
    newLi.className = 'itemList'
    taskList.appendChild(newLi);
    inputTextField.value = '';
    addBackGroundColor();
  } else {
    alert('Error: Digite ao menos 1 caractere.');
  }
});

// 7 - Clicar em um item da lista deve alterar a cor de fundo do item para cinza
// O que será verificado:
// Atenção, a cor deve ser alterada para para o nome da cor (gray) e não qualquer outro padrão de cores.
// Será verificado que, ao se carregar a página, os itens da lista não tem o estilo CSS background-color: gray;
// Será verificado que, ao se clicar em um item da lista, ele passa a ter o estilo CSS background-color: gray.

let selectedItem = 0;
let liItens = document.getElementsByTagName('li');

function addBackGroundColor() {
  for (let i = 0; i < liItens.length; i++) {
    console.log(liItens[i]);

    liItens[i].addEventListener('click', function (event) {

      selectedItem = i;
      clearSelectedListItem(selectedItem);
      liItens[i].style.backgroundColor = 'gray';

    });
    // 9 - Clicar duas vezes em um item, faz com que ele seja riscado, indicando que foi completo. Deve ser possível desfazer essa ação clicando novamente duas vezes no item
    liItens[i].addEventListener('dblclick', switchCompleted);
  }
}
// 8 - Não deve ser possível selecionar mais de um elemento da lista ao mesmo tempo
// O que será verificado:
// Será verificado que, quando um elemento da lista é selecionado, o elemento selecionado previamente deixa de sê-lo. Isso é verificado através da presença ou não do estilo background-color: gray no elemento.


// este código foi elaborado por 
function switchCompleted(evento) {
  const elemento = evento.target;
  if (!elemento.classList.contains('completed')) {
    elemento.classList.add('completed');
  } else if (elemento.classList.contains('completed')) {
    elemento.classList.remove('completed');
  }
}

function clearSelectedListItem(selectedItem) {
  for (let i = 0; i < liItens.length; i += 1) {
    if (i !== selectedItem) {
      liItens[i].style.backgroundColor = 'rgba(255, 255, 255)';
    }
  }
}




// 10 - Adicione um botão com id="apaga-tudo" que quando clicado deve apagar todos os itens da lista
// O que será verificado:
// Será verificado que existe um elemento button com o id apaga-tudo
// Será verificado que, dado que uma lista possui tarefas, um clique no botão a deixa vazia

const btnClearAll = document.getElementById('apaga-tudo')

btnClearAll.addEventListener('click', clearList);


function clearList() {
  let list = document.getElementById('lista-tarefas')
  //Material de consulta  
  //https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
  //https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
  if (list.textContent !== '') {
    list.textContent = '';
  }
}

// 11 - Adicione um botão com id="remover-finalizados" que quando clicado remove somente os elementos finalizados da sua lista
// O que será verificado:
// Será verificado que existe um elemento button com o id remover-finalizados
// Será verificado que, ao clicar no botão, todos os elementos marcados como feitos são removidos da lista
const btnClearDone = document.getElementById('remover-finalizados')
btnClearDone.addEventListener('click', clearDone);


function clearDone() {
  let nodes = document.getElementsByClassName('completed');
  console.log('antes' + nodes.length);

  //https://developer.mozilla.org/pt-BR/docs/Web/API/Node/removeChild
  // Removendo todos os nós filhos de um elemento
  // var elemento = document.getElementById("topo");
  

  //https://developer.mozilla.org/pt-BR/docs/Web/API/Node/removeChild
  // while (list.firstChild) {
  //   list.removeChild(list.firstChild);
  // }

  for (let i = 0; i < nodes.length; i += 1) {
    if (nodes[i].parentNode) {
      nodes[i].parentNode.removeChild(nodes[i]);
      i--;
    }

  }
  console.log('depois' + nodes.length);


}
