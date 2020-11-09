const form = document.querySelector('#addForm');
const itemItem = document.querySelector('#items');
let arr =JSON.parse(localStorage.getItem("todos")) || [];
const deleteBtn = document.querySelector('#delete');
let msg = document.querySelector('.msg');
let checkBoxes = document.querySelectorAll('.list-group input[type = "checkbox"]');
const date = document.querySelector('.date');
const checkedArr = [];
let lastChecked;

const week= [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
]

const months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]

let d = new Date();
let dateOfTheWeek = d.getDate();

const newWeek = week[d.getDay()];
const newMonth = months[d.getMonth()]
const newDate =  dateOfTheWeek < 10 ? "0" + dateOfTheWeek : dateOfTheWeek;
const newYear = d.getFullYear();
date.textContent = `${newWeek}, ${newDate} ${newMonth} ${newYear}`

console.log(newDate)
// addForm Function
let addForm = (e) => {
    e.preventDefault()
   //inpu
   let newItem = document.querySelector('#newItem').value;
   let inputField = document.querySelector('#newItem')
    
   // creating a new list with className
   let list = document.createElement('li');
   list.classList = 'list-group-item mb-3';
   let text = document.createTextNode(newItem)
   
   
   //create label

   let label = document.createElement('label');
   label.classList = 'text'
   label.appendChild(text)
  
   //delete button
   let delBtn = document.createElement('button');
   delBtn.classList = 'btn btn-danger delete  float-right'

  delBtn.appendChild(document.createTextNode('Delete'));
  list.appendChild(delBtn);

  //checkBox
  let checkBox = document.createElement('input');
   checkBox.type = 'checkbox';
   checkBox.classList = 'float-left checkbox mt-2 strike'
   checkbox = document.createElement('label')
   list.appendChild(checkBox);
   list.appendChild(label)


   //if input is "" do this : that
    if( newItem.trim() === "" || newItem.trim() === " " || newItem.trim() === null) {
          msg.style.color = 'red';
          msg.innerText = 'Please fill field'
          setTimeout(() =>msg.remove(), 1000)
          return false;
       
    }else{
        itemItem.prepend(list);
        arr.unshift(newItem);
        inputField.value = "";
        localStorage.setItem('todos', JSON.stringify(arr));
    }
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Task Added',
        showConfirmButton: false,
        timer: 1500
      })

      let handleCheck = (e) => {
        console.log('click')
      if(e.shiftKey && this.checked) {
          let inBetween = false;
           console.log(checkBoxes)
          checkBoxes.forEach(checkbox => {
              if(checkbox === this || checkbox === lastChecked) inBetween = !inBetween
        
              if(inBetween)checkbox.checked = true;
          })
      }
      lastChecked = this;
  }
  
  checkBoxes.forEach(checkbox => {
      checkbox.addEventListener('click', handleCheck)
  })
}

//localStorage

// remove the item div
let removeItem = (e) => {
    if(e.target.classList.contains('delete')) {
            let list = e.target.parentElement;
            itemItem.removeChild(list);
            listText = list.childNodes[2].textContent;
            let index = arr.indexOf(listText);
            arr.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(arr))
    }
}

// for selecting the list inbetween two lists by holding the shiftKey;

let fetchTodos = () => JSON.parse(localStorage.getItem("todos"))


 let reLoad = () => {
     const arr = fetchTodos()
    arr.forEach(value=>{
        itemItem.innerHTML += `
        <li class="list-group-item mb-3">
        <button class="btn btn-danger delete  float-right">Delete</button>
        <input type="checkbox" class="float-left checkbox mt-2 strike">
        <label class="text">${value}</label>
        </li>`;
    })
 }
 console.log(arr)
//Event Listeners
itemItem.addEventListener('click' , removeItem)

form.addEventListener('submit', addForm)

// console.log(arr.push(itemItem.appendChild(list)))

document.addEventListener('DOMContentLoaded', reLoad)

 