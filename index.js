const form = document.querySelector('#addForm');
const itemItem = document.querySelector('#items');
const deleteBtn = document.querySelector('#delete');
let msg = document.querySelector('.msg');
let checkBoxes = document.querySelectorAll('.list-group input[type = "checkbox"]')
let lastChecked;

// addForm Function
let addForm = (e) => {
   e.preventDefault();

   //input
   let newItem = document.querySelector('#newItem').value;
   let inputField = document.querySelector('#newItem')

   console.log(newItem);
    
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
    if( newItem === "") {
          msg.style.color = 'red';
          msg.innerText = 'Please fill field'

          setTimeout(() =>msg.remove(), 1000)
    }else{
        itemItem.appendChild(list);

         inputField.value = ""
    }

    localStorage.setItem('itemListing', itemItem.innerHTML)
   
}

//localStorage
const saved = localStorage.getItem('itemListing');

if(saved) {
    itemItem.innerHTML = saved;
}

// remove the item div
let removeItem = (e) => {

    if(e.target.classList.contains('delete')) {
            let list = e.target.parentElement;
            itemItem.removeChild(list);
    };
    
}

// for selecting the list inbetween two lists by holding the shiftKey;
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

//Event Listeners
itemItem.addEventListener('click' , removeItem)

form.addEventListener('submit', addForm)

