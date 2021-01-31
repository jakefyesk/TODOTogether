const addButton = document.querySelector('.addButton');
let input = document.querySelector('.input');
const timeSelect = document.querySelector('#timeSelector');
const taskSelect = document.querySelector('#taskSelector');
const personalContainer = document.querySelector('#personalTasks');
const teamContainer = document.querySelector('#teamTasks');
const openContainer = document.querySelector('#openTasks');

class item{
    constructor(itemName, taskList, itemTime, tagsList){
        this.itemName = itemName;
        this.taskList = taskList;
        this.itemTime = itemTime;
        this.tags = tagsList;
        this.element = this.createDiv();

    }

    createDiv(){
        let sectionTop = document.createElement('div');
        sectionTop.classList.add('top-section');

        let input = document.createElement('textarea');
        input.value = this.itemName;
        input.disabled = true;
        input.classList.add('item_input');
        input.text = 'text';

        let itemBox = document.createElement('div');
        itemBox.classList.add('item');

        let checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.classList.add('checkbox');
        checkbox.addEventListener('change', function() {
            if (checkbox.checked) {
                itemBox.classList.add('fade-out');
                setTimeout(() => itemBox.remove(),1000);
            }
        });

        let editButton = document.createElement('button');
        editButton.innerHTML = "edit";
        editButton.classList.add('editButton');

        let removeButton = document.createElement('button');
        removeButton.innerHTML = "x";
        removeButton.classList.add('removeButton');

        if (this.taskList === "personalTasks"){
            personalContainer.appendChild(itemBox);
        } else if (this.taskList === "teamTasks") {
            teamContainer.appendChild(itemBox);
        } else {
            openContainer.appendChild(itemBox);
        }

        sectionTop.appendChild(checkbox);
        sectionTop.appendChild(input);
        sectionTop.appendChild(editButton);
        sectionTop.appendChild(removeButton);

        itemBox.appendChild(sectionTop);

        let sectionBottom = document.createElement('div');
        sectionBottom.classList.add('bottom-section');

        if (!(this.itemTime === null)) {
            switch (this.itemTime) {
                case "1-2hr": {
                    let twoTag = document.createElement("h3");
                    twoTag.innerText = "1-2hr";
                    twoTag.classList.add('timeTag');
                    sectionBottom.appendChild(twoTag);
                }
                    break;
                case "3-5hr": {
                    let fiveTag = document.createElement('h3');
                    fiveTag.innerText = "3-5hr";
                    fiveTag.classList.add('timeTag');
                    sectionBottom.appendChild(fiveTag);
                }
                    break;
                case "+5hr": {
                    let moreTag = document.createElement('h3');
                    moreTag.innerText = "+5hr";
                    moreTag.classList.add('timeTag');
                    sectionBottom.appendChild(moreTag);
                }break;
            }
        }

        if (!(this.tags === null)) {
            this.tags.forEach(element => {
                switch (element.substring(1)) {
                    case "Marketing": {
                        let marketingTag = document.createElement("h3");
                        marketingTag.innerText = "Marketing";
                        marketingTag.classList.add('marketingTag');
                        sectionBottom.appendChild(marketingTag);
                    } break;
                    case "Design": {
                        let designTag = document.createElement('h3');
                        designTag.innerText = "Design";
                        designTag.classList.add('designTag');
                        sectionBottom.appendChild(designTag);
                    } break;
                    case "Finance": {
                        let financeTag = document.createElement('h3');
                        financeTag.innerText = "Finance";
                        financeTag.classList.add('financeTag');
                        sectionBottom.appendChild(financeTag);
                    } break;
                    case "Research": {
                        let researchTag = document.createElement('h3');
                        researchTag.innerText = "Research";
                        researchTag.classList.add('researchTag');
                        sectionBottom.appendChild(researchTag);
                    } break;
                    case "DrugA": {
                        let drugATag = document.createElement('h3');
                        drugATag.innerText = "DrugA";
                        drugATag.classList.add('drugATag');
                        sectionBottom.appendChild(drugATag);
                    } break;
                    case "DrugB": {
                        let drugBTag = document.createElement('h3');
                        drugBTag.innerText = "DrugB";
                        drugBTag.classList.add('drugBTag');
                        sectionBottom.appendChild(drugBTag);
                    } break;
                    case "Help": {
                        let helpTag = document.createElement('h3');
                        helpTag.innerText = "Help";
                        helpTag.classList.add('helpTag');
                        sectionBottom.appendChild(helpTag);
                    } break;

                }
            })
        }

        itemBox.appendChild(sectionBottom);




        editButton.addEventListener('click',() => {
            this.edit(input)
            if (input.disabled) {
                editButton.innerHTML = "edit";
            } else {
                editButton.innerHTML = "save";
            }


        });

        removeButton.addEventListener('click',() => this.remove());

        return itemBox;
    }
    edit(input) {
        input.disabled = !input.disabled;
    }
    remove(){
        this.element.parentNode.removeChild(this.element);
    }
}

function check () {
    if(input.value != ""){
        let tags = input.value.match(/(#)\w+/g);
        let correctedText = input.value.replace(/(#)\w+/g,"");
        console.log(tags);
        new item(correctedText, taskSelect.value, timeSelect.value, tags);
        input.value = "";
        timeSelect.selectedIndex = 0;
    }
}

addButton.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
    if(e.key === 'Enter'){
        check();
    }
})

//DRAG AND DROP
//
// function allowDrop(ev) {
//     ev.preventDefault();
// }
//
// function drag(ev) {
//     ev.dataTransfer.setData("text", ev.target.id);
// }
//
// function drop(ev) {
//     ev.preventDefault();
//     const data = ev.dataTransfer.getData("text");
//     ev.target.appendChild(document.getElementById(data));
// }

dragula([personalContainer, teamContainer, openContainer]);