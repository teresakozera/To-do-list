import "../css/fontello/css/fontello.css";

// button + when there are lists of a user a hidden initial list + 6 lists that are permitted
const LISTS_LIMIT = 8;
let listIndex = 0;
let getListFromDB;
let isInitialHidden = false;


const refreshList = ()=> {
    const xhr = new XMLHttpRequest();
    const token = window.localStorage.getItem("token");
    xhr.open("GET", "http://localhost:3000/api/lists/");
    xhr.setRequestHeader('x-auth-token', window.localStorage.getItem("token"));
    xhr.send();
    

    xhr.onload = function () {
        if (xhr.status != 200) { // analyze HTTP status of the response
            console.log(`Error ${xhr.status}: ${xhr.statusText}`); // e.g. 404: Not Found
        } else { // show the result
            $('.list').remove()

            getListFromDB = JSON.parse(xhr.response);
            if (getListFromDB.length > 0) {
                isInitialHidden = true;
            } else {
                isInitialHidden = false;
            }

            for (let i = 0; i < getListFromDB.length; i++) {
                const parentDiv = document.getElementsByClassName('lists')[0];

                if (parentDiv.children.length > LISTS_LIMIT)
                {
                    break;
                }
                const divList = document.createElement('div');

                divList.setAttribute('data-id', `${getListFromDB[i]._id}`);
                $(divList).addClass('list');
                // add divList#number- depending on how many iteams are aldready on the page
                $(divList).addClass(`list${i}`);

                const listTitle = document.createElement('INPUT');
                listTitle.setAttribute("value", `${getListFromDB[i].name}`);

                let label = "";
                listTitle.addEventListener('keydown', (e) => {
                    switch(e.key)
                    {
                        case "Backspace": 
                        case "Enter":
                        case "Shift":
                        case "Alt":
                        case "Tab":
                        case "Control":
                        case "CapsLock":
                        case "Escape":
                        case "ContextMenu":
                        case "AltGraph":
                        case "Meta":
                        case "ArrowUp":
                        case "ArrowDown":
                        case "ArrowRight":
                        case "ArrowLeft":
                            break;
                        default:
                            console.log(e.key);
                            label += e.key;
                            break;
                    }

                    listTitle.setAttribute("value", `${label}`);
                });

                const listHeader = document.createElement('div');
                $(listHeader).addClass('list-header');
                listHeader.appendChild(listTitle);

                divList.appendChild(listHeader);

                const plusBtn = document.createElement('BUTTON');
                $(plusBtn).addClass("icon-plus-outline");
                plusBtn.innerHTML = "Add another item";
                $(plusBtn).addClass("plus-task");

                const saveBtn = document.createElement('BUTTON');
                saveBtn.id = "saveBtn";
                saveBtn.innerHTML = "Save list";

                const deleteBtn = document.createElement('BUTTON');
                deleteBtn.id = "deleteBtn";
                deleteBtn.innerHTML = "Delete list";

                const listItems = document.createElement('div');
                $(listItems).addClass('list-items');

                const addAListBTN = document.getElementById("addList");
                
                parentDiv.insertBefore(divList, addAListBTN);
                for (let j = 0; j < getListFromDB[i].items.length; j++) {
                    //index - here: j
                    const br = document.createElement("br");
                    const divItem = document.createElement('div');
                    // every div has a unique id- the information needed for the CRUD operations
                    divItem.id = `list${listIndex}todo-item${j}`;
                    $(divItem).addClass('item');

                    // create an item for the to-do list!
                    const listItem = document.createElement('INPUT');
                    listItem.id = `checkbox${j}`;
                    listItem.setAttribute("type", "checkbox");
                    
                    let isChecked =  getListFromDB[i].items[j].done;  // Is it Done on the DB
                     
                    if (isChecked === true) { //YES
                        $(listItem).attr('checked', 'checked'); //ADD CHECKED
                        $(listItem).trigger('change'); //TRIGGER CHANGE
                    } else { //NO
                        $(listItem).removeAttr('checked'); // Remove CHECKED
                        $(listItem).trigger('change'); // TRIGGER CHANGE
                    }
                    
                    const labelItem = document.createElement("INPUT");
                    labelItem.setAttribute("type", "text");
                    labelItem.id = `text${j}`;
                    labelItem.for = 'check-1';
                    labelItem.htmlFor = `checkbox${j}`;
                    labelItem.setAttribute("value", `${getListFromDB[i].items[j].name}`);

                    let label = "";
                    labelItem.addEventListener('keydown', (e) => {
                        switch(e.key)
                        {
                            case "Backspace": 
                            case "Enter":
                            case "Shift":
                            case "Alt":
                            case "Tab":
                            case "Control":
                            case "CapsLock":
                            case "Escape":
                            case "ContextMenu":
                            case "AltGraph":
                            case "Meta":
                            case "ArrowUp":
                            case "ArrowDown":
                            case "ArrowRight":
                            case "ArrowLeft":
                                break;
                            default:
                                console.log(e.key);
                                label += e.key;
                                break;
                        }

                        labelItem.setAttribute("value", `${label}`);
                    });


                    const deleteButton = document.createElement('BUTTON');
                    $(deleteButton).addClass("icon-trash-empty");
                    $(deleteButton).addClass("minus-task");

                    divItem.appendChild(br);
                    divItem.appendChild(listItem);
                    divItem.appendChild(labelItem);
                    divItem.appendChild(deleteButton);

                    listItems.appendChild(divItem);

                }

                divList.appendChild(listItems);
                divList.appendChild(plusBtn);
                divList.appendChild(saveBtn);
                divList.appendChild(deleteBtn);
                listIndex++;
            }
        }
        
    };
}

window.onload = () => {
    refreshList();
};

const plusListBtn = document.getElementById('plus-list').addEventListener('click', (e) => {
    if (event.currentTarget.parentNode.parentNode.children.length < LISTS_LIMIT) {
        const divList = document.createElement('div');
        $(divList).addClass('list');

        $(divList).addClass(`list${listIndex}`);
        const listTitle = document.createElement('INPUT');
        let label = "";
        listTitle.addEventListener('keydown', (e) => {
            switch(e.key)
        {
            case "Backspace": 
            case "Enter":
            case "Shift":
            case "Alt":
            case "Tab":
            case "Control":
            case "CapsLock":
            case "Escape":
            case "ContextMenu":
            case "AltGraph":
            case "Meta":
            case "ArrowUp":
            case "ArrowDown":
            case "ArrowRight":
            case "ArrowLeft":
                break;
            default:
                console.log(e.key);
                label += e.key;
                break;
        }

            listTitle.setAttribute("value", `${label}`);
        });

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

        const saveBtn = document.createElement('BUTTON');
        saveBtn.id = "saveBtn";
        saveBtn.innerHTML = "Save list";

        const deleteBtn = document.createElement('BUTTON');
        deleteBtn.id = "deleteBtn";
        deleteBtn.innerHTML = "Delete list";

        divList.appendChild(listItems);
        divList.appendChild(plusBtn);
        divList.appendChild(saveBtn);
        divList.appendChild(deleteBtn);

        // add a div to the DOM
        // move the '+Add a list' button to the right of newly inserted list
        event.currentTarget.parentNode.parentNode.insertBefore(divList, event.currentTarget.parentNode);
        listIndex++;
    } else {
        alert('Too many lists created. You can have up to six lists active!');
    }
});


// event delegation- otherwise this event handler would not work for dynamically created elements
$(document).on('click', '.plus-task', e => {
    // start every item with a new line
    const br = document.createElement("br");
    // needed for the numeration of divs (needed for handling with the backend which)
    const index = event.target.previousSibling.children.length;

    const divItem = document.createElement('div');
    // every div has a unique id- the information needed for the CRUD operations
    divItem.id = `${index}`;
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
    let label = "";
    labelItem.addEventListener('keydown', (e) => {

        switch(e.key)
        {
            case "Backspace": 
            case "Enter":
            case "Shift":
            case "Alt":
            case "Tab":
            case "Control":
            case "CapsLock":
            case "Escape":
            case "ContextMenu":
            case "AltGraph":
            case "Meta":
            case "ArrowUp":
            case "ArrowDown":
            case "ArrowRight":
            case "ArrowLeft":
                break;
            default:
                console.log(e.key);
                label += e.key;
                break;
        }

        labelItem.setAttribute("value", `${label}`);
    });

    const deleteButton = document.createElement('BUTTON');
    $(deleteButton).addClass("icon-trash-empty");
    $(deleteButton).addClass("minus-task");

    divItem.appendChild(br);
    divItem.appendChild(listItem);
    divItem.appendChild(labelItem);
    divItem.appendChild(deleteButton);

    $(event.target).parents(`.list`).first().children('.list-items').first().append(divItem);
});

// DB deleting
$(document).on('click', '#deleteBtn', e => {
    let divToDelete = e.currentTarget.parentNode;
    divToDelete.remove();

    var xhr = new XMLHttpRequest(); // new HttpRequest instance 
    xhr.open("DELETE", `http://localhost:3000/api/lists/${divToDelete.getAttribute("data-id")}`);
    xhr.setRequestHeader('x-auth-token', window.localStorage.getItem("token"));
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send();
});

$(document).on('click', '#saveBtn', e => {
    const list = document.getElementsByClassName(e.currentTarget.parentNode.className.split(" ")[1])[0];

    // list's name
    const listName = list.children[0].children[0].attributes[0] ? list.children[0].children[0].attributes[0].value : ' ';

    const listItemsNumber = list.children[1].children.length;
    let listItems = [];

    for (let i = 0; i < listItemsNumber; i++)
    {
        listItems.push({
            name: list.children[1].children[i].children[2].attributes[2] ? list.children[1].children[i].children[2].attributes[2].value : ' ',
            done: $(list.children[1].children[i].children[1]).is(":checked")            
        });
    }

    let POSTObject = {};
    POSTObject.name = listName;
    POSTObject.items = listItems;

    var xhr = new XMLHttpRequest(); // new HttpRequest instance 

    xhr.onload = function () {
        refreshList();
    }

    list.getAttribute('data-id') ? xhr.open("PUT", `http://localhost:3000/api/lists/${list.getAttribute('data-id')}`) : xhr.open("POST", "http://localhost:3000/api/lists/");
    xhr.setRequestHeader('x-auth-token', window.localStorage.getItem("token"));
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(POSTObject));
});

$(document).on('click', '.minus-task', e => {
    alert("In order for changes to get saved please press button 'Save list'");

    let divToDelete = e.currentTarget.parentNode;
    divToDelete.remove();
});