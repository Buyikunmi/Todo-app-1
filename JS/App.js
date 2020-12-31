const input_field = document.querySelector('#input-field'),
         checkbox = document.querySelector('.checkbox'),
       to_do_list = document.querySelector('.todo-list'),
       items_left = document.querySelector('.counter'),
              all = document.querySelector('#all'),
           active = document.querySelector('#active'),
        completed = document.querySelector('#completed'),
  clear_completed = document.querySelector('#clear_completed');
        
var randomID = () => Math.floor(Math.random() * 1000);

let taskList = [];

document.addEventListener('keypress', e => {
    if (e.key === 'Enter' && input_field.value) {
       
        taskList.push({
            id: randomID(), 
            name_task: input_field.value, 
            status: true});

        input_field.value = '';

        showItemsIntDOM();
        incrementCounter();
    }
})

const showItemsIntDOM = () => {
    removeAllLiToList();
    taskList.forEach(createLi);
}

const createLi = task => {
    let li = document.createElement('li');

    if (!task.status) checkedElement(li);

    let ul = document.querySelector('#list');
    li.innerHTML = `<div class="checkbox">
                        <span id="${task.id}" class="checkbox-icon"></span>
                    </div>
                    <p>${task.name_task}</p>
                    <img onClick="deleteLiFromTheTaskListArray(${task.id})"class="icon-cross" src="images/icon-cross.svg" alt="icon cross" srcset="">`
    ul.prepend(li);
}

const removeAllLiToList = () => {
    let li  = document.querySelectorAll('#list li');
    li.forEach(element => {
        element.remove();
    });
}

to_do_list.addEventListener('click', e => {
    const item = e.target;
     if (item.classList == 'checkbox-icon') {
        let li = item.parentNode;
        checkedElement(li.parentNode);
        changeStatusElement(item.id);
    }
});

const changeStatusElement = (id) => {
    taskList.forEach(element => {
        if (element.id == id) {
            element.status = false;}
        decrementCounter();
});}

const checkedElement = element => element.classList.add('complet');

const deleteLiFromTheTaskListArray  = (ID) => {
    taskList = taskList.filter(task => task.id !== ID);
    showItemsIntDOM(); 

    let listItemsComplet = taskList.filter(task => task.status == true);
    updateCounterOfRemainingItems(listItemsComplet.length);
}

// Filters
completed.addEventListener('click', () => filterElement(false));

active.addEventListener('click', () => filterElement(true));

all.addEventListener('click', showItemsIntDOM);

function filterElement(type){
    removeAllLiToList();
    listElementsFilters = taskList.filter(task => task.status == type);

    listElementsFilters.forEach(element => {
        createLi(element);
    });  
}

// Remove elements Complete
clear_completed.addEventListener('click', () => {
    taskList = taskList.filter(task => task.status == true);
    showItemsIntDOM();
})


// Counter
const incrementCounter = () => updateCounterOfRemainingItems(taskList.length);

const decrementCounter = () => {
    let task_list_updated = taskList.filter(task => task.status == false);
    updateCounterOfRemainingItems(taskList.length - task_list_updated.length);
}

const updateCounterOfRemainingItems = length => items_left.innerHTML = length;
