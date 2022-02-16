

const btnAdd = document.getElementById('criar-tarefa');
btnAdd.addEventListener('click', function () {
  let inputTextField = document.getElementById('texto-tarefa');
  let taskList = document.querySelector('#lista-tarefas');
  
  if (inputTextField.value.length > 0) {  
    let newLi = document.createElement('li');
    newLi.innerText = inputTextField.value;
    taskList.appendChild(newLi);
    inputTextField.value = '';
  } else {
    alert('Error: Digite ao menos 1 caractere.');
  }
  
});



// const listItens = document.getElementsByClassName('li')

// for(let i in listItens){
//   listItens[i].addEventListener('click', function (event) {
//     let inputTextField = document.getElementById('texto-tarefa');
//     let taskList = document.querySelector('#lista-tarefas');
    
//     if (inputTextField.value.length > 0) {  
//       let newLi = document.createElement('li');
//       newLi.innerText = inputTextField.value;
//       taskList.appendChild(newLi);
//       inputTextField.value = '';
//     } else {
//       alert('Error: Digite ao menos 1 caractere.');
//     }
    
//   });

// }



function taskAdd() {
  let taskList = document.getElementById('lista-tarefas');
  
  
  // console.log(taskList);


}

taskAdd();