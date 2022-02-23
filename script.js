const inputTextField = document.getElementById('texto-tarefa');
const taskList = document.querySelector('#lista-tarefas'); //ol
const liItens = document.getElementsByTagName('li');

const btnAdd = document.getElementById('criar-tarefa');
const btnClearAll = document.getElementById('apaga-tudo');
const btnClearCompleted = document.getElementById('remover-finalizados');
const btnMoveUp = document.getElementById('mover-cima');
const btnMoveDown = document.getElementById('mover-baixo');
const btnDelete = document.querySelector('#remover-selecionado');
const saveButton = document.querySelector('#salvar-tarefas');

//-- Adiciona um novo elemento(li)/item a lista.
function addTask() {
  if (inputTextField.value !== ''){
    const newTask = document.createElement('li');
    newTask.innerText = inputTextField.value;
    taskList.appendChild(newTask);
    inputTextField.value = ''; // Limpa o campo do input.
  }else {
    alert('Error: Digite ao menos 1 caractere.');
  }
}
btnAdd.addEventListener('click', addTask);

//-- Seleciona um elemento(li)/item da lista
function selectTask() {
  taskList.addEventListener('click', function(event) {
    for (let i = 0; i < taskList.children.length; i++) {
      if (taskList.children[i].classList.contains('selected')) {
        taskList.children[i].classList.remove('selected');
      }
    }
    event.target.classList.add('selected');
  });
}
selectTask();

//-- Comuta entre riscado e normal(completado e não completado) se um elemento(li)/item for 'clicado' duas vezes
function commuteTo(event) {
  const dblclick = event.target;
  if (dblclick.classList.contains('completed')) {
    dblclick.classList.remove('completed');
  } else {
    dblclick.classList.add('completed');
  }
}
taskList.addEventListener('dblclick', commuteTo);

// 10 - Adicione um botão com id="apaga-tudo" que quando clicado deve apagar todos os itens da lista
function clearList() {
  //Material de consulta  
  //https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
  //https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
  // if (taskList.textContent !== '') {
  //   taskList.textContent = '';
  // }
  taskList.innerHTML = '';// taskList  
}

// 11 - Adicione um botão com id="remover-finalizados" que quando clicado remove somente os elementos finalizados da sua lista
// function clearDone() {
//   const nodes = document.getElementsByClassName('completed');
//   //https://developer.mozilla.org/pt-BR/docs/Web/API/Node/removeChild
//   // Removendo todos os nós filhos de um elemento
//   // var elemento = document.getElementById("topo");
//   // while (parent.firstChild) {
//   //   parent.removeChild(parent.firstChild);
//   // }

//   for (let i = 0; i < nodes.length; i += 1) {
//     if (nodes[i].parentNode) {
//       nodes[i].parentNode.removeChild(nodes[i]);
//       i--; // compensa o nó removido da lista para calculo do for.
//     }
//   }
//   addTasksToLocalStorage();
// }

function clearCompletedTasks() {
  for (let i = 0; i < taskList.children.length; i += 1) {
    /* if (list[i].classList.contains('completed')) {
      list.removeChild(list[i]);
    } */
    const completed = document.querySelector('.completed');
    completed.remove();
  }
}
btnClearCompleted.addEventListener('click', clearCompletedTasks);

// function insertPhraseInDOM() {
//   const storageTaskList = JSON.parse(localStorage.getItem('tasks'));
//   const listLength = storageTaskList.length - 1;
//   const phraseText = storageTaskList[listLength];
//   const phrase = document.createElement('li');
//   phrase.innerText = phraseText;
//   taskList.appendChild(phrase);
// }

// Adiciona os objetos a lista
// function addTasksToLocalStorage() {
//   localStorage.clear(); // remove a lista que existe para criar a nova
//   if (localStorage.getItem('tasks') === null) {
//     localStorage.setItem('tasks', JSON.stringify([]));
//   }
//   const oldList = JSON.parse(localStorage.getItem('tasks'));
//   for (i in liItens) {
//     const taskText = liItens[i].innerText; // pega o texto do elemento
//     const newObj = {};
//     if (taskText != null) {
//       newObj.innerText = liItens[i].innerText;
//       newObj.className = liItens[i].className;
//       newObj.id = liItens[i].id;
//       console.log(newObj)
//       oldList.push(newObj);
//     }
//   }
  //localStorage.setItem('tasks', JSON.stringify(oldList)); // Limpa a lista do save
  
// }
//-- 12 - Ao clicar no botão 'Salvar Lista', salve o conteúdo da lista, para que quando o navegador seja fechado, retome a lista no estado salvo. Feito com ajuda de Airel Ribeiro =)
// Old - 
// function initialRenderization() {
//   if (localStorage.getItem('tasks') === null) {
//     localStorage.setItem('tasks', JSON.stringify([])); // Caso não tenha a lista ainda, ela é criada
//   } else { // caso a lista exista, ela é carregada
//     const storageTaskList = JSON.parse(localStorage.getItem('tasks'));
//     const listLength = storageTaskList.length - 1;
//     for (let index = 0; index <= listLength; index += 1) {
//       console.log(storageTaskList[index]);
//       const listElement = document.createElement('li');
//       listElement.innerText = storageTaskList[index].innerText;
//       listElement.className = storageTaskList[index].className;
//       listElement.id = storageTaskList[index].id;
//       taskList.appendChild(listElement);
//     }
//   }
// }

// Otimizado
//-- Códigos abaixo foram criados com o auxílio do código do Daniel Tostes, Turma 20 -Tribo B
function saveList() {
  localStorage.setItem('list', taskList.innerHTML);
}
//-- 13-1 - move o item selecionado para cima
function moveUp() {
  const selectedItem = document.querySelector('.selected');
  const firstChild = taskList.firstElementChild;
  if (selectedItem !== null && selectedItem !== firstChild) {
    const previousElement = selectedItem.previousElementSibling;
    previousElement.insertAdjacentElement('beforebegin', selectedItem);
  }
}

//-- 13-2 - move o item selecionado para baixo.
function moveDown() {
  const selectedItem = document.querySelector('.selected');
  const lastChild = taskList.lastElementChild;
  if (selectedItem !== null && selectedItem !== lastChild) {
    const nextElement = selectedItem.nextElementSibling;
    nextElement.insertAdjacentElement('afterend', selectedItem);
  }
}

//-- 14 - Remover o item selecionado
function deleteSelected() {
  const selected = document.querySelector('.selected');
  selected.remove();
}

window.onload = function () {
  const renderLi = localStorage.getItem('list');
  taskList.innerHTML = renderLi;
  btnClearAll.addEventListener('click', clearList);
  saveButton.addEventListener('click', saveList);
  btnMoveUp.addEventListener('click', moveUp);
  btnMoveDown.addEventListener('click', moveDown);
  btnDelete.addEventListener('click', deleteSelected);
};
