const feedbackContainer = 
document.querySelector('.feedback_message')

const feedback_message = 
document.querySelector('.feedback_message p')

const AddItemInput = 
document.querySelector('#AddItemInput');

const AddItemBtn = 
document.querySelector('#AddItemBtn')

const Todo_wrapper = 
document.querySelector('.cards_wrapper')

const count_todo = 
document.querySelector('.count_todo')


const count_todo_completed = 
document.querySelector('.count_todo_completed')

const Todo_completed_wrapper = 
document.querySelector('.Todo_completed_wrapper')

const Todo_array  = JSON.parse(localStorage.getItem('todo') || '[]')

const Todo_completed = 
JSON.parse(localStorage.getItem('completedTodo')|| '[]')


function checkTodo()
{
  if (Todo_array) {
    count_todo.innerHTML = `To Do - ${Todo_array.length}`
  }else {
    count_todo.innerHTML = 'To Do - 0'
  }
  
}



checkTodo()





function pushTodo()
{
  if (AddItemInput.value == '' || AddItemInput. value == ' ') {
    feedbackContainer.classList.add('active');
    feedback_message.innerHTML = 'Task cannot be empty'
    setTimeout(() => {
      feedbackContainer.classList.remove('active');
    }, 3000)
    return ;
  }
  

if (localStorage.length === 0) {
  feedbackContainer.classList.add('active');
  feedback_message.innerHTML = 'Local storage is disabled. Please enable it to continue.';
  setTimeout(() => {
    feedbackContainer.classList.remove('active');
  }, 3000);
  return;
}

var date = new Date();
var hours = date.getHours() % 12 || 12
var isAm = date.getHours() < 12
var minutes = date.getMinutes()
var seconds = date.getSeconds()
var year = date.getFullYear()
var day = date.getDay();
var day_number = date.getDate()
var month = date.getMonth()

var days = 
['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
var months = 
['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct', 'Nov','Dec']

try {
    // Add the new item to local storage
    Todo_array.push({
      todo: AddItemInput.value,
      date: `${days[day]}, ${months[month]} ${day_number} -${year} at ${hours}:${minutes} ${isAm ? 'am' : 'pm'}`
    });
    localStorage.setItem('todo', JSON.stringify(Todo_array));
    showTodo()
    feedback_message.innerHTML = 'Task added';
      setTimeout(() => {
        feedbackContainer.classList.remove('active');
      }, 3000);
  } catch (e) {
    if (e instanceof QuotaExceededError) {
      feedbackContainer.classList.add('active');
      feedback_message.innerHTML = 'Not enough storage space. Please clear some items to continue.';
      setTimeout(() => {
        feedbackContainer.classList.remove('active');
      }, 3000);
      return;
    }
  }
  
}

AddItemBtn.onclick = pushTodo


function showTodo()
{
  let matchesTodo = 0
  let html = ''
  for (var i = 0; i < Todo_array.length; i++) {
   matchesTodo++
   let newHtml = `
    <div class="card">
    <div class="left_side">
      <button class="markDone material-symbols-outlined">
        radio_button_unchecked
      </button>
    </div>
     <div class="todo" data-change="${matchesTodo}">
       ${Todo_array[i].todo}
     </div>
     <div class="right_side">
     
   <button data-change="${matchesTodo}" class="saveTodo material-symbols-outlined">
         check
     </button>
     
     
      <button data-change="${matchesTodo}" class="editTodo material-symbols-outlined">
        edit
      </button> 
      
     <button class="removeTodoBtns material-symbols-outlined">
        delete
      </button> 
      
      
     </div>
     <div class="data_wrapper">
     ${Todo_array[i].date}
     </div>
   </div>
   `
   html += newHtml
  }
  
  Todo_wrapper.innerHTML = html
  
  let checkMatches = ''
  
  const EditTodoBtn = 
  Array.from(document.querySelectorAll('.editTodo'))
  
  const AllTodoTextes = 
  Array.from(document.querySelectorAll('.todo'))
  
  const saveTodo = Array.from(document.querySelectorAll('.saveTodo'))
  
  const removeTodoBtns = 
  Array.from(document.querySelectorAll('.removeTodoBtns'))
  
  
  
  saveTodo.forEach(btn =>{
    btn.style.display = 'none'
  })
   
  
  saveTodo.forEach(TodoSave => {
    TodoSave.addEventListener('click',function(e){
      e.preventDefault()
     e.stopPropagation()
     e.stopImmediatePropagation()
     
     checkMatches = this.getAttribute('data-change')
     
 for (var i = 0; i < AllTodoTextes.length; i++) {
      
     if (checkMatches == AllTodoTextes[i].getAttribute('data-change')) {
       AllTodoTextes[i].removeAttribute('contenteditable')
      AllTodoTextes[i].classList.remove('editable')

       Todo_array[saveTodo.indexOf(this)].todo = AllTodoTextes[i].innerHTML.trim()
         localStorage.setItem('todo',JSON.stringify(Todo_array))
         
     EditTodoBtn[i].style.display = 'inline-block'
         TodoSave.style.display = 'none'
   feedbackContainer.classList.add('active');
  feedback_message.innerHTML = 'Task edited'
  setTimeout(()=>{
  feedbackContainer.classList.remove('active');
  },3000)
     } 
       
     }
     
    })
    
   
  
   removeTodoBtns.forEach(remove => {
   remove.addEventListener('click',function(e){
     e.preventDefault()
     e.stopPropagation()
     e.stopImmediatePropagation()
     
     Todo_array.splice(removeTodoBtns.indexOf(this), 1)
     showTodo()
     checkTodo()
     localStorage.setItem('todo', JSON.stringify(Todo_array))
     
     feedbackContainer.classList.add('active');
     feedback_message.innerHTML = 'Task deleted'
     setTimeout(() => {
       feedbackContainer.classList.remove('active');
     }, 3000)
     })
   })
    
    
  })
  
  
  
  
  
  EditTodoBtn.forEach(EditBtn => {
  EditBtn.addEventListener('click',function(e){
    e.preventDefault()
     e.stopPropagation()
     e.stopImmediatePropagation()
     
    checkMatches = this.getAttribute('data-change')
    for (var i = 0; i < AllTodoTextes.length; i++) {
      if (checkMatches == AllTodoTextes[i].getAttribute('data-change')) {
        AllTodoTextes[i].setAttribute('contenteditable','true')
        AllTodoTextes[i].classList.add('editable')
        AllTodoTextes[i].focus()
        EditTodoBtn[i].style.display = 'none'
     saveTodo[i].style.display = 'inline-block'
      }
    }
    
    
    })
  })
  
  
  
  const markDone = Array.from(document.querySelectorAll('.markDone'))
  
  markDone.forEach(radioBtn =>{
    
    radioBtn.addEventListener('click',function(e){
      e.preventDefault()
     e.stopPropagation()
     e.stopImmediatePropagation()
     
      this.innerHTML = 'radio_button_checked'
      
      Todo_completed.push({
        todo:Todo_array[markDone.indexOf(this)].todo, 
        date : Todo_array[markDone.indexOf(this)].date
      })
      localStorage.setItem('completedTodo',JSON.stringify(Todo_completed))
      showCompletedTodo()
      Todo_array.splice(markDone.indexOf(this),1)
        showTodo()
        checkTodo()
      localStorage.setItem('todo',JSON.stringify(Todo_array))
      feedbackContainer.classList.add('active');
      feedback_message.innerHTML = 'Task completed'
      setTimeout(() => {
        feedbackContainer.classList.remove('active');
      }, 3000)
    })
  })
  
}

showTodo()


function showCompletedTodo()
{
  let html =''
  for (var i = 0; i < Todo_completed.length; i++) {
    let newHtml = `
          <div class="card">
    <div class="left_side">
      <button class="checked material-symbols-outlined">
        radio_button_checked
      </button>
    </div>
     <div class="todo">
       ${Todo_completed[i].todo}
     </div>
     <div class="right_side">
     
      <button class="cancel material-symbols-outlined">
        cancel
      </button> 
      
     <button class="material-symbols-outlined">
        check
      </button> 
      
     </div>
     <div class="data_wrapper">
    Completed -  ${Todo_completed[i].date}
     </div>
   </div>
    `
   html += newHtml 
    
  }
  
  Todo_completed_wrapper.innerHTML = html
  
  const allCancelbtns = 
  Array.from(document.querySelectorAll('.cancel'))
  
  const removeTodoBtns = 
  Array.from(document.querySelectorAll('.removeTodoBtns'))
  
  
  const checked = Array.from(document.querySelectorAll('.checked'))
  
  checked.forEach(checkbtn =>{
    checkbtn.addEventListener('click',function(e){
      e.preventDefault()
     e.stopPropagation()
     e.stopImmediatePropagation()
      Todo_array.push({
        todo:Todo_completed[checked.indexOf(this)].todo,
        date : Todo_completed[checked.indexOf(this)].date
      })
        localStorage.setItem('todo',JSON.stringify(Todo_array))
        showTodo()
        checkTodo()
    Todo_completed.splice(checked.indexOf(this),1)
      localStorage.setItem('completedTodo',JSON.stringify(Todo_completed))
         showCompletedTodo()
       feedbackContainer.classList.add('active');
       feedback_message.innerHTML = 'Task restored'
       setTimeout(() => {
         feedbackContainer.classList.remove('active');
       }, 3000)
    })
    
    
  })
  
  
  
  
  
  
  
  allCancelbtns.forEach(cancel =>{
   cancel.addEventListener('click',function(e){
      e.preventDefault()
     e.stopPropagation()
     e.stopImmediatePropagation()

      Todo_completed.splice(allCancelbtns.indexOf(this),1)
      localStorage.setItem('completedTodo',JSON.stringify(Todo_completed))
       showCompletedTodo()
      feedbackContainer.classList.add('active');
      feedback_message.innerHTML = 'Task deleted'
      setTimeout(() => {
        feedbackContainer.classList.remove('active');
      }, 3000)
    })
  })
  
  
  
}
showCompletedTodo()


