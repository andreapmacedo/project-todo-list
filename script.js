const btnAdd = document.getElementById('criar-tarefa');
btnAdd.addEventListener('click', function () {
  let inputTextField = document.getElementById('texto-tarefa');
  let taskList = document.querySelector('#lista-tarefas');

  if (inputTextField.value.length > 0) {
    let newLi = document.createElement('li');
    newLi.innerText = inputTextField.value;
    newLi.className = 'itemList;'
    taskList.appendChild(newLi);
    inputTextField.value = '';
    addBackGroundColor();
  } else {
    alert('Error: Digite ao menos 1 caractere.');
  }

});



let liItens = document.getElementsByTagName('li');

function addBackGroundColor(){
  for (let i =0; i < liItens.length; i++){
    console.log(liItens[i]);
    liItens[i].addEventListener('click', function(event){
      // liItens[i].className = 'item-todo';
      liItens[i].style.backgroundColor = 'gray';
    });
  
  }
}



function taskAdd() {
  let taskList = document.getElementById('lista-tarefas');


  // console.log(taskList);


}

taskAdd();
