const LISTS_LIMIT = 7;

let listIndex = 0;
const plusListBtn = document.getElementById('plus-list').addEventListener('click', (e) => {
    if(event.target.parentNode.parentNode.children.length < LISTS_LIMIT) {
        let divList = document.createElement('div');

        let listTitle = document.createElement('p');
        let plusBtn = document.createElement('BUTTON');

        listTitle.innerHTML = `List${event.target.parentNode.parentNode.children.length}`;
        plusBtn.innerHTML = "+";
        $(plusBtn).addClass("plus-task");

        divList.appendChild(listTitle);
        divList.appendChild(plusBtn);

        $(divList).addClass('list');
        // add divList#number- depending on how many iteams are aldready on the page
        $(divList).addClass(`list${event.target.parentNode.parentNode.children.length}`);
        
        // add a div to the DOM
        // move the '+Add a list' button to the right of newly inserted list
        event.target.parentNode.parentNode.insertBefore(divList, event.target.parentNode);
        listIndex++;
    } else {
        alert('Too many lists created. You can have up to six lists active!');
    }
});


// event delegation- otherwise this event handler would not work for dynamically created elements
$(document).on('click','.plus-task', e => {
    // start every item with a new line
    const br = document.createElement("br");
    // needed for the numeration of divs (needed for handling with the backend which)
    const index = event.target.parentNode.children.length-1;

    const divItem = document.createElement('div');
    // every div has a unique id- the information needed for the CRUD operations
    divItem.id=`list${listIndex}todo-item${index}`;
    // $(divItem).addClass('item');
    // $(divItem).addClass(`item${index}`);

    // create an item for the to-do list!
    const listItem = document.createElement('INPUT');
    listItem.id = `checkbox${index}`;
    listItem.setAttribute("type", "checkbox");
    
    const labelItem = document.createElement("INPUT");
    labelItem.setAttribute("type", "text");
    labelItem.id = `text${index}`;
    labelItem.htmlFor = `checkbox${index}`;

    const minusButton = document.createElement('BUTTON');
    minusButton.innerHTML = "-";
    $(minusButton).addClass("minus-task");

    divItem.appendChild(br);
    divItem.appendChild(listItem);
    divItem.appendChild(labelItem);
    divItem.appendChild(minusButton);

    e.target.parentNode.insertBefore(divItem, e.target);
});

$(document).on('click','.minus-task', e => {
    // needed to retrieve the information for the db
    const deletedDivId =e.target.parentNode.id;

    let divToDelete = e.target.parentNode;
    divToDelete.remove();
});