/*
Declaração das constantes e variáveis globais
*/

const inputTextField = document.getElementById('texto-tarefa');
const taskList = document.querySelector('#lista-tarefas');
const liItens = document.getElementsByTagName('li');

/*
  -(botões)
*/
const btnAdd = document.getElementById('criar-tarefa');
const btnClearAll = document.getElementById('apaga-tudo');
const btnClearDone = document.getElementById('remover-finalizados');
const btnSaveTask = document.getElementById('salvar-tarefas');

/*
 -(variáveis)
*/
let selectedItem = 0;


/*
  O bloco abaixo verifica se o 'input' está preenchido e caso esteja, adiciona a uma lista um novo elemento <li>
  dentro da lista (taskList) com a tarefa que o usuário cadastrou.
*/

btnAdd.addEventListener('click', function () {
  if (inputTextField.value.length > 0) {
    const newLi = document.createElement('li');
    newLi.innerText = inputTextField.value;
    newLi.className = 'itemList'
    taskList.appendChild(newLi);
    inputTextField.value = '';
    addBackGroundColor();
  } else {
    alert('Error: Digite ao menos 1 caractere.');
  }
});

/*

*/

function addBackGroundColor() {
  for (let i = 0; i < liItens.length; i++) {
    liItens[i].addEventListener('click', function (event) {
      selectedItem = i;
      clearSelectedListItem(selectedItem);
      liItens[i].style.backgroundColor = 'gray';
    });
    // 9 - Clicar duas vezes em um item, faz com que ele seja riscado, indicando que foi completo. Deve ser possível desfazer essa ação clicando novamente duas vezes no item
    liItens[i].addEventListener('dblclick', switchCompleted);
  }
}

function clearSelectedListItem(selectedItem) {
  for (let i = 0; i < liItens.length; i += 1) {
    if (i !== selectedItem) {
      liItens[i].style.backgroundColor = 'rgba(255, 255, 255)';
    }
  }
}


function switchCompleted(evento) {
  const element = evento.target;
  if (element.classList.contains('completed')) {
    element.classList.remove('completed');
  } else {
    element.classList.add('completed');
  }
}


// 10 - Adicione um botão com id="apaga-tudo" que quando clicado deve apagar todos os itens da lista

function clearList() {
  const list = document.getElementById('lista-tarefas')
  //Material de consulta  
  //https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
  //https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
  if (list.textContent !== '') {
    list.textContent = '';
  }
  localStorage.clear();
}

// 11 - Adicione um botão com id="remover-finalizados" que quando clicado remove somente os elementos finalizados da sua lista
function clearDone() {
  const nodes = document.getElementsByClassName('completed');
  //https://developer.mozilla.org/pt-BR/docs/Web/API/Node/removeChild
  // Removendo todos os nós filhos de um elemento
  // var elemento = document.getElementById("topo");
  // while (list.firstChild) {
  //   list.removeChild(list.firstChild);
  // }

  for (let i = 0; i < nodes.length; i += 1) {
    if (nodes[i].parentNode) {
      nodes[i].parentNode.removeChild(nodes[i]);
      i--; // compensa o nó removido da lista para calculo do for.
    }
  }
  //addTasksToLocalStorage();
}
// BÔNUS
// 12 - Adicione um botão com id="salvar-tarefas" que salve o conteúdo da lista. Se você fechar e reabrir a página, a lista deve continuar no estado em que estava
// O que será verificado:
// Será verificado que existe um elemento button com o id salvar-tarefas
// Será verificado que, quando a lista tiver vários elementos, alguns dos quais marcados como finalizados, um recarregamento da página mantém a lista exatamente como está.

/*
// function addTasksToLocalStorage() {
//   const oldList = JSON.parse(localStorage.getItem('tasks'));
//   const taskText = inputTextField.value;
//   oldList.push(taskText);
//   localStorage.setItem('tasks', JSON.stringify(oldList));
//   insertPhraseInDOM();
// }
*/

function insertPhraseInDOM() {
  const phrasesList = JSON.parse(localStorage.getItem('tasks'));
  const listLength = phrasesList.length - 1;
  const phraseText = phrasesList[listLength];
  const phrase = document.createElement('li');
  phrase.innerText = phraseText;
  taskList.appendChild(phrase);

}


// function addTasksToLocalStorage() {
//   localStorage.clear(); // remove a lista que existe para criar a nova
//   if (localStorage.getItem('tasks') === null) {
//     localStorage.setItem('tasks', JSON.stringify([]));
//    }
//    const oldList = JSON.parse(localStorage.getItem('tasks'));
//    for(i in liItens){
//      const taskText = liItens[i].innerText; // pega o texto do elemento
//      if(taskText != null){
//        oldList.push(taskText);
//      }
//    }
//    localStorage.setItem('tasks', JSON.stringify(oldList)); // Limpa a lista do save
//   //  insertPhraseInDOM();
// }
function addTasksToLocalStorage() {
  localStorage.clear(); // remove a lista que existe para criar a nova
  if (localStorage.getItem('tasks') === null) {
    localStorage.setItem('tasks', JSON.stringify([]));
   }
   const oldList = JSON.parse(localStorage.getItem('tasks'));
   for(i in liItens){
     const taskText = liItens[i].innerText; // pega o texto do elemento
     const newObj = {};
     if(taskText != null){
      newObj.innerText = liItens[i].innerText;
      newObj.className = liItens[i].className;
      newObj.id = liItens[i].id;
      console.log(newObj)
      oldList.push(newObj);
     }
   }
   localStorage.setItem('tasks', JSON.stringify(oldList)); // Limpa a lista do save
  //  insertPhraseInDOM();
}

// function initialRenderization() {
//   if (localStorage.getItem('tasks') === null) {
//    localStorage.setItem('tasks', JSON.stringify([]));
//   } else {
//     const phrasesList = JSON.parse(localStorage.getItem('tasks'));
//     const listLength = phrasesList.length - 1;
//     for (let index = 0; index <= listLength; index += 1) {
//       console.log(phrasesList[index]);
//       const listElement = document.createElement('li');
//       listElement.innerText = phrasesList[index];
//       taskList.appendChild(listElement);
//     }
//   }
// }
function initialRenderization() {
  
  if (localStorage.getItem('tasks') === null) {
   localStorage.setItem('tasks', JSON.stringify([]));
  } else {
    const phrasesList = JSON.parse(localStorage.getItem('tasks'));
    const listLength = phrasesList.length - 1;
    for (let index = 0; index <= listLength; index += 1) {
      console.log(phrasesList[index]);
      const listElement = document.createElement('li');
      listElement.innerText = phrasesList[index].innerText;
      listElement.className = phrasesList[index].className;
      listElement.id = phrasesList[index].id;
      taskList.appendChild(listElement);
    }
  }
}


window.onload = function () {
  initialRenderization();
  btnClearAll.addEventListener('click', clearList);
  btnClearDone.addEventListener('click', clearDone);
  btnSaveTask.addEventListener('click', addTasksToLocalStorage)
  // btnSaveTask.addEventListener('click', testStorage)
};


// function criarObjetoParaSalvar(elementoOrigem) {
//   const objetoTarefas = {};
//   for (let i = 0; i < elementoOrigem.length; i += 1) {
//     const objetoInterno = {};
//     objetoTarefas[`${i}`] = objetoInterno;
//   }
//   return objetoTarefas;
// }

// function salvarTarefas() {
//   const elementosDaListaDeTarefas = listaDeTarefas.children;
//   const objetoTarefas = criarObjetoParaSalvar(elementosDaListaDeTarefas);

//   for (let i = 0; i < elementosDaListaDeTarefas.length; i += 1) {
//     objetoTarefas[`${i}`].innerHTML = elementosDaListaDeTarefas[i].innerHTML;
//     objetoTarefas[`${i}`].className = elementosDaListaDeTarefas[i].className;
//     objetoTarefas[`${i}`].id = elementosDaListaDeTarefas[i].id;
//   }
//   localStorage.setItem('tarefas', JSON.stringify(objetoTarefas));
// }



// 13 - Adicione dois botões, um com id="mover-cima" e outro com id="mover-baixo", que permitam mover o item selecionado para cima ou para baixo na lista de tarefas
// O que será verificado:
// Será verificada a existência de dois elementos button, um com o id mover-cima e o outro com o id mover-baixo
// Será verificado que, dado que diversos elementos foram acrescentados à lista, movimentá-los de formas diversas os deixa nas posições esperadas
// Será verificado que, caso algum elemento esteja finalizado, este status deve persistir ainda que se mova o elemento
// Será verificado que, caso nenhum elemento esteja selecionado, clicar nos botões não altera a lista
// Será verificado que um elemento que esteja selecionado deve se manter selecionado mesmo depois de movido
// Caso especial! Será verificado que, caso se tente subir o elemento no topo da lista ou, caso se tente descer o último elemento da lista, esta não deve ser alterada



// 14 - Adicione um botão com id="remover-selecionado" que, quando clicado, remove o item selecionado
// O que será verificado:
// Será verificada a presença de um elemento button com um id remover-selecionado
// Será verificado que, no clicar no botão, somente o elemento selecionado é removido
