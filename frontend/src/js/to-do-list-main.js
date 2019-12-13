import "../css/fontello/css/fontello.css";
const LISTS_LIMIT = 7;

let listIndex = 0;
const plusListBtn = document.getElementById('plus-list').addEventListener('click', (e) => {
    if(event.currentTarget.parentNode.parentNode.children.length < LISTS_LIMIT) {
        const divList = document.createElement('div');
        $(divList).addClass('list');
        // add divList#number- depending on how many iteams are aldready on the page
        $(divList).addClass(`list${event.currentTarget.parentNode.parentNode.children.length}`);

        const listTitle = document.createElement('p');
        listTitle.innerHTML = `List${event.currentTarget.parentNode.parentNode.children.length}`;
    
        const listHeader = document.createElement('div');
        $(listHeader).addClass('list-header');
        listHeader.appendChild(listTitle);

        divList.appendChild(listHeader);

        const listItems = document.createElement('div');
        $(listItems).addClass('list-items');

        const plusBtn = document.createElement('BUTTON');
        $(plusBtn).addClass("icon-plus-outline");
        plusBtn.innerHTML = "Add another item";        
        $(plusBtn).addClass("plus-task");

        divList.appendChild(listItems);
        divList.appendChild(plusBtn);
        
        // add a div to the DOM
        // move the '+Add a list' button to the right of newly inserted list
        event.currentTarget.parentNode.parentNode.insertBefore(divList, event.currentTarget.parentNode);
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
    console.log(`list${listIndex}todo-item${index}`);
    // every div has a unique id- the information needed for the CRUD operations
    divItem.id=`list${listIndex}todo-item${index}`;
    $(divItem).addClass('item');

    // create an item for the to-do list!
    const listItem = document.createElement('INPUT');
    listItem.id = `checkbox${index}`;
    listItem.setAttribute("type", "checkbox");
    
    const labelItem = document.createElement("INPUT");
    labelItem.setAttribute("type", "text");
    labelItem.id = `text${index}`;
    labelItem.for = 'check-1';
    labelItem.htmlFor = `checkbox${index}`;

    const deleteButton = document.createElement('BUTTON');
    $(deleteButton).addClass("icon-trash-empty");
    $(deleteButton).addClass("minus-task");

    divItem.appendChild(br);
    divItem.appendChild(listItem);
    divItem.appendChild(labelItem);
    divItem.appendChild(deleteButton);

    $(event.target).parents(`.list`).first().children('.list-items').first().append(divItem);
});

$(document).on('click','.minus-task', e => {
    // needed to retrieve the information for the db
    const deletedDivId =e.currentTarget.parentNode.id;

    let divToDelete = e.currentTarget.parentNode;
    divToDelete.remove();
});