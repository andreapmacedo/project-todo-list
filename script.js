const btnAdd = document.getElementById('criar-tarefa');
btnAdd.addEventListener('click', function () {
  let inputTextField = document.getElementById('texto-tarefa');
  let taskList = document.querySelector('#lista-tarefas');

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

let selectedItem = 0;
let liItens = document.getElementsByTagName('li');

function addBackGroundColor(){
  for (let i =0; i < liItens.length; i++){
    console.log(liItens[i]);

    liItens[i].addEventListener('click', function(event){
      
      selectedItem = i;
      clearSelectedListItem(selectedItem);
      liItens[i].style.backgroundColor = 'gray';

    });

    liItens[i].addEventListener('dblclick', switchCompleted);
  
  }
}
// este código foi elaborado por João Pster - Trybe - turma 20 - tribo B
function switchCompleted(evento) {
  const elemento = evento.target;
  if (!elemento.classList.contains('completed')) {
    elemento.classList.add('completed');
  } else if (elemento.classList.contains('completed')) {
    elemento.classList.remove('completed');
  }
}



function clearSelectedListItem (selectedItem){
  for (let i = 0; i < liItens.length; i += 1) {
    if(i !== selectedItem){
      liItens[i].style.backgroundColor = 'rgba(255, 255, 255)';
    }
  }
}


function taskAdd() {
  let taskList = document.getElementById('lista-tarefas');


  // console.log(taskList);


}

taskAdd();
