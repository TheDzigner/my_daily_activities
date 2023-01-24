

   
   var taskContainer = document.getElementById('demo')
   var taskCount = document.getElementById('taskCount')
   var taskDoneCounting = document.getElementById('taskDone')
   let count = 0;
   let taskDoneCount = 0;
   
    function addTask(){
      let newTask = window.prompt('add new task')
      if (newTask == '' || newTask == null) {
         alert('invalid task') 
        return false;
      } else {
        
        
   var NewTask = document.createElement('b',)
   var addNewTask = document.createTextNode( '📌' + newTask)
   NewTask.appendChild(addNewTask)
   NewTask.classList.add('active')
   taskContainer.append(NewTask)
   count++
   taskCount.innerText = count
   document.getElementById('DoneOne').innerHTML =  count 
      }
     
     
    taskContainer.querySelectorAll('b').forEach(function(taskDone){
  taskDone.addEventListener('click',e=>{
    if (confirm('mark as Done? ✅'  )) {
      taskDoneCount ++; 
      taskDoneCounting.innerHTML =  taskDoneCount ;
       if (taskDoneCount == count) {
         setTimeout(function(){
      alert('Hooray 🎉, you have done all of your activities for today ! , Keep going 📌 ')
       
         },700)
       }
      document.getElementById('DoneOne').innerHTML =  count 
      taskDone.style.backgroundColor ='#F1EDEF'
      taskDone.style.pointerEvents = 'none'
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
    } else {
     taskDone.style.backgroundColor =''
    taskDoneCounting.innerHTML = taskDoneCount 
      e.preventDefault()
      e.stopPropagation()
      e.stopImmediatePropagation()
    }
    
  })
     }) 
      
      }
     
    
