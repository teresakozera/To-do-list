const LISTS_LIMIT = 7;

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
    } else {
        alert('Too many lists created. You can have up to six lists active!');
    }
});

// event delegation- otherwise this event handler would not work for dynamically created elements
let index = 1;
$(document).on('click','.plus-task', e => {
    // create an item for the to-do list!
    let listItem = document.createElement('INPUT');
    listItem.setAttribute("type", "checkbox");
    listItem.setAttribute("id", index);

    let labelItem = document.createElement('label');
    labelItem.htmlFor = index;
    labelItem.appendChild(document.createTextNode('text for label after checkbox'));

    e.target.parentNode.appendChild(listItem);
    e.target.parentNode.appendChild(labelItem);

    let br = document.createElement("br");
    e.target.parentNode.appendChild(br);
    index++;
});
