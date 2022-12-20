const input_note = 

document.querySelector('#input_note');

let add_note = document.getElementById('add_note')

const noteWrapper =

document.querySelector('.container')

let obj = JSON.parse(localStorage.getItem('mynotes') || '[]')

function getValue(note)

{

 

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

 

 obj.push({

    note : `📍${note}`, 

    date : `Created on - ${days[day]}, ${months[month]},${day_number} -${year} at ${hours}:${minutes} ${isAm ? 'am' : 'pm'}`, 

  })

  

 localStorage.setItem('mynotes', JSON.stringify(obj))

}

function showNote()

{

  

  let newNote = ''

  for (var i = 0; i < obj.length; i++) {

    var new__ = `

          <div class="note__">

      <div class="date__">

        <h5>

        ${obj[i].date}

        </h5>

      </div>

      <p>

      ${obj[i].note}

      </p>

    </div>

    

    

        `

   newNote += new__

  }

  noteWrapper.innerHTML = newNote

  

  const all_notes =

  Array.from(document.querySelectorAll('.note__'));

  

  all_notes.forEach(note =>{

    note.addEventListener('dblclick',function(){

      if (confirm('Do you want to delete that note ?')) {

        

        note.classList.add('remove')

       obj.splice(all_notes.indexOf(this),1)

        localStorage.setItem('mynotes', JSON.stringify(obj))

      } 

      })

  })

      

   

  

}

showNote()

function add_note_fun()

{

  if (input_note.value.length == 0) {

    return ;

  } else {

    getValue(input_note.value)

    input_note.value = ''

    showNote()

  }

  

}

add_note.onclick = add_note_fun

window.onkeypress = add_note_fun

