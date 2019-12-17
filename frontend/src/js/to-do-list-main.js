import "../css/fontello/css/fontello.css";

// button + 6 lists that are permitted
const LISTS_LIMIT = 7;
let listIndex = 0;
let getListFromDB;


const refreshList = ()=> {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://murmuring-ocean-00411.herokuapp.com/api/lists/");
    xhr.setRequestHeader('x-auth-token', window.localStorage.getItem("token"));
    xhr.send();
    

   xhr.onload = function () {
        if (xhr.status != 200) {
            console.log(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
            // remove all the lists 
            $('.list').remove()

            getListFromDB = JSON.parse(xhr.response);
            // ... and recreate all the lists
            for (let i = 0; i < getListFromDB.length; i++) {
                const parentDiv = document.getElementsByClassName('lists')[0];
                // remember about the limit of the number of lists
                if (parentDiv.children.length > LISTS_LIMIT)
                {
                    break;
                }
                // lists
                const listTitle = document.createElement('INPUT');
                listTitle.setAttribute("value", `${getListFromDB[i].name}`);

                let label = "";
                listTitle.addEventListener('keydown', (e) => {
                    setTimeout(()=>{
                        // checking the keys and assigning proper values to the labels
                        label = manageKeysForLabels(listTitle, e, label);
                        listTitle.setAttribute("value", `${getListFromDB[i].name.concat(label)}`);
                        $(listTitle).setCursorPosition(`${listTitle.value.length}`);
                        }, 0)
                    });

                const divList = document.createElement('div');
                $(divList).addClass('list');
                // add divList#number- depending on how many iteams are oldready on the page
                $(divList).addClass(`list${i}`);
                divList.setAttribute('data-id', `${getListFromDB[i]._id}`);
                
                const listHeader = document.createElement('div');
                $(listHeader).addClass('list-header');
                listHeader.appendChild(listTitle);
                divList.appendChild(listHeader);

                const listItems = document.createElement('div');
                $(listItems).addClass('list-items');

                const addAListBTN = document.getElementById("addList");
                
                parentDiv.insertBefore(divList, addAListBTN);

                // items for lists
                for (let j = 0; j < getListFromDB[i].items.length; j++) {
                    // create an item for the to-do list!
                    const listItem = document.createElement('INPUT');
                    listItem.id = `checkbox${j}`;
                    listItem.setAttribute("type", "checkbox");

                    //index - here: j
                    const br = document.createElement("br");
                    const divItem = document.createElement('div');
                    // every div has a unique id- the information needed for the CRUD operations
                    divItem.id = `list${listIndex}todo-item${j}`;
                    $(divItem).addClass('item');

                    const labelItem = document.createElement("INPUT");
                    labelItem.setAttribute("type", "text");
                    labelItem.id = `text${j}`;
                    
                    let isChecked =  getListFromDB[i].items[j].done;  // Is it Done on the DB
                    if (isChecked === true) { //YES
                        $(listItem).attr('checked', 'checked'); //ADD CHECKED
                        $(listItem).trigger('change'); //TRIGGER CHANGE
                    } else { //NO
                        $(listItem).removeAttr('checked'); // Remove CHECKED
                        $(listItem).trigger('change'); // TRIGGER CHANGE
                    }
                    
                    labelItem.setAttribute("value", `${getListFromDB[i].items[j].name}`);
                    let label = "";
                    labelItem.addEventListener('keydown', (e) => {
                        setTimeout(()=>{
                            label = manageKeysForLabels(labelItem, e, label);
                            labelItem.setAttribute("value", `${getListFromDB[i].items[j].name.concat(label)}`);
                            $(labelItem).setCursorPosition(`${labelItem.value.length}`);
                        },0)
                    });
                appendElementsToDiv(divItem, br, listItem, labelItem, listItems);
                listItems.appendChild(divItem);
                }
                appendDivWithElements(divList, listItems);
            }
        }
    };
}

window.onload = () => {
    refreshList();
};

const plusListBtn = document.getElementById('plus-list').addEventListener('click', (e) => {
    if (event.currentTarget.parentNode.parentNode.children.length < LISTS_LIMIT) {
        const listTitle = document.createElement('INPUT');
        let label = "";
        listTitle.addEventListener('keydown', (e) => {
            setTimeout(()=>{
                label = manageKeysForLabels(listTitle, e, label);
                listTitle.setAttribute("value", `${label}`);
                $(listTitle).setCursorPosition(`${listTitle.value.length}`);
                }, 0)
        });

        const divList = document.createElement('div');
        $(divList).addClass('list');
        $(divList).addClass(`list${listIndex}`);

        const listHeader = document.createElement('div');
        $(listHeader).addClass('list-header');
        listHeader.appendChild(listTitle);
        divList.appendChild(listHeader);

        const listItems = document.createElement('div');
        $(listItems).addClass('list-items');

        appendDivWithElements(divList, listItems);

        // add a div to the DOM
        // move the '+Add a list' button to the right of newly inserted list
        event.currentTarget.parentNode.parentNode.insertBefore(divList, event.currentTarget.parentNode);
    } else {
        alert('Too many lists created. You can have up to six lists active!');
    }
});

// event delegation- otherwise this event handler would not work for dynamically created elements
$(document).on('click', '.plus-task', e => {
    // needed for the numeration of divs (needed for handling with the backend which)
    const index = event.target.previousSibling.children.length;

    // create an item for the to-do list!
    const listItem = document.createElement('INPUT');
    listItem.id = `checkbox${index}`;
    listItem.setAttribute("type", "checkbox");  

    // start every item with a new line
    const br = document.createElement("br");
    
    const divItem = document.createElement('div');
    // every div has a unique id- the information needed for the CRUD operations
    divItem.id = `${index}`;
    $(divItem).addClass('item');

    const labelItem = document.createElement("INPUT");
    labelItem.setAttribute("type", "text");
    labelItem.id = `text${index}`;

    let label = "";
    labelItem.addEventListener('keydown', (e) => {
        setTimeout(()=>{
            label = manageKeysForLabels(labelItem, e, label);
            labelItem.setAttribute("value", `${label}`);
            $(labelItem).setCursorPosition(`${labelItem.value.length}`);
            }, 0)
        });

    appendElementsToDiv(divItem, br, listItem, labelItem);

    $(event.target).parents(`.list`).first().children('.list-items').first().append(divItem);
});

$(document).on('click', '#deleteBtn', e => {
    let divToDelete = e.currentTarget.parentNode;
    divToDelete.remove();

    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `https://murmuring-ocean-00411.herokuapp.com/api/lists/${divToDelete.getAttribute("data-id")}`);
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

    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        refreshList();
    }

    list.getAttribute('data-id') ? xhr.open("PUT", `https://murmuring-ocean-00411.herokuapp.com/api/lists/${list.getAttribute('data-id')}`) : xhr.open("POST", "https://murmuring-ocean-00411.herokuapp.com/api/lists");
    xhr.setRequestHeader('x-auth-token', window.localStorage.getItem("token"));
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(POSTObject));
});

$(document).on('click', '.minus-task', e => {
    alert("In order for changes to get saved please press button 'Save list'");

    let divToDelete = e.currentTarget.parentNode;
    divToDelete.remove();
});

$.fn.setCursorPosition = function(pos) {
    this.each(function(index, elem) {
      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        var range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
    });
    return this;
  };

  const manageKeysForLabels = (title, e, label) => {
    //setting the coursor not to appear at the beginning of the input (it didn't have any impact on the value but looked confusing..)
    $(title).setCursorPosition(`${title.value.length}`);
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
        case "End":
        case "Home":
            break;
        default:
            label += e.key;
            break;
    }
    return label;
  };

  const appendElementsToDiv = (divItem, br, listItem, labelItem) => {
    const deleteButton = document.createElement('BUTTON');
    $(deleteButton).addClass("icon-trash-empty");
    $(deleteButton).addClass("minus-task");

    divItem.appendChild(br);
    divItem.appendChild(listItem);
    divItem.appendChild(labelItem);
    divItem.appendChild(deleteButton);
  };

  const createSaveBtn = () => {
    const saveBtn = document.createElement('BUTTON');
    saveBtn.id = "saveBtn";
    saveBtn.innerHTML = "Save list";
    return saveBtn;
  };
  
  const createDeleteBtn = () => {
    const deleteBtn = document.createElement('BUTTON');
    deleteBtn.id = "deleteBtn";
    deleteBtn.innerHTML = "Delete list";
    return deleteBtn;
  };

  const createPlusBtn = () => {
    const plusBtn = document.createElement('BUTTON');
    $(plusBtn).addClass("icon-plus-outline");
    plusBtn.innerHTML = "Add another item";
    $(plusBtn).addClass("plus-task");
    return plusBtn;
  };

  const appendDivWithElements = (divList, listItems) => {
    const plusBtn = createPlusBtn();
    const saveBtn = createSaveBtn();
    const deleteBtn = createDeleteBtn();

    divList.appendChild(listItems);
    divList.appendChild(plusBtn);
    divList.appendChild(saveBtn);
    divList.appendChild(deleteBtn);

    listIndex++;
  };