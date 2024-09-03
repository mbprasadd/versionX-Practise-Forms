let listContainerEl = document.getElementById("listContainer");
let formEl = document.getElementById("myForm")
let saveButton = document.getElementById("saveButton");

let inputColorEl = document.getElementById("inputColor");
let inputNameEl = document.getElementById("inputName");
let inputEMailEl = document.getElementById("inputEMail");
let inputPasswordEl = document.getElementById("inputpassword");
let inputNumberEl = document.getElementById("inputNumber");
let inputCheckIn = document.getElementById("inputCheckIn");
let inputCheckOut = document.getElementById("inputCheckOut");
let inputSelect = document.getElementById("inputSelect");
let inputSkillsSelect = document.getElementById("inputSkillsSelect");
let genderValue = document.getElementsByName("gender");

let inputCheckOut1 = document.getElementById("inputCheckOut1");
let inputCheckOut2 = document.getElementById("inputCheckOut2");
let inputCheckOut3 = document.getElementById("inputCheckOut3");
let inputCheckOut4 = document.getElementById("inputCheckOut4");
let checkedValues = [inputCheckOut1, inputCheckOut2, inputCheckOut3, inputCheckOut4];

let listData = [];
let getListData = localStorage.getItem("listData");
let parsedData = JSON.parse(getListData);

if (parsedData) {
    listData = parsedData
}

saveButton.addEventListener("click", function(event) {
    let jsonData = JSON.stringify(listData);
    localStorage.setItem("listData", jsonData);
})

function onDeleteList(list, listId) {
    let elemenet = document.getElementById(listId);
    listContainerEl.removeChild(elemenet);

    let deleteElementIndex = listData.findIndex(function(eachTodo) {
        if (eachTodo.id === list.id) {
            return true;
        } else {
            return false;
        }
    });
    listData.splice(deleteElementIndex, 1);
}

function displayListItems(list) {
    let listId = listData.length + list.name;

    let listEl = document.createElement("li");
    listEl.id = listId;
    listEl.classList.add("list");
    listContainerEl.appendChild(listEl);

    let colorEl = document.createElement("p");
    colorEl.textContent = "Fav-Color:- " + list.color;
    listEl.appendChild(colorEl);

    let nameEl = document.createElement("p");
    nameEl.textContent = "Name:- " + list.name;
    nameEl.classList.add("nameEl");
    listEl.appendChild(nameEl);

    let emailEl = document.createElement("p");
    emailEl.textContent = "E-Mail:- " + list.email;
    listEl.appendChild(emailEl);

    let passwordEl = document.createElement("p");
    passwordEl.textContent = "Password:- " + list.password;
    listEl.appendChild(passwordEl);

    let numberEl = document.createElement("p");
    numberEl.textContent = "Number:- " + list.number;
    listEl.appendChild(numberEl);

     let checkIn = document.createElement("p");
    checkIn.textContent = "CheckIn Time:- " + list.checkIn;
    checkIn.classList.add("checkIn");
    listEl.appendChild(checkIn);

    let hobbies = document.createElement("p");
    hobbies.textContent = "Hobbies:- "  + list.hobbies;
    hobbies.classList.add("checkOut");
    listEl.appendChild(hobbies);

    let genderEl = document.createElement("p")
    genderEl.classList.add("genderEl");
    genderEl.textContent = "Gender:- " + list.gender; 
    listEl.appendChild(genderEl);

    let designationEl = document.createElement("p");
    designationEl.textContent = "Work:- "  + list.designation;
    designationEl.classList.add("designationEl");
    listEl.appendChild(designationEl);

    let inputSkillsSelectEl = document.createElement("p");
    inputSkillsSelectEl.textContent = "Skills: " + list.skills;
    inputSkillsSelectEl.classList.add("inputSkillsSelect");
    listEl.appendChild(inputSkillsSelectEl);

    let buttonsConsEl = document.createElement("div");
    buttonsConsEl.classList.add("buttonsConsEl");
    listEl.appendChild(buttonsConsEl);

    let deleteEl = document.createElement("button");
    deleteEl.textContent = "Delete"
    deleteEl.classList.add("delete-button");
    deleteEl.addEventListener("click", function(event) {
       onDeleteList(list, listId);
    });
    buttonsConsEl.appendChild(deleteEl);

    let editEl = document.createElement("button");
    editEl.textContent = "Edit";
    editEl.classList.add("delete-button");
    editEl.addEventListener("click", function(event){
        onDeleteList(list, listId);
        
        inputColorEl.value = list.color;
        inputNameEl.value = list.name;
        inputEMailEl.value = list.email;
        inputPasswordEl.value = list.password;
        inputNumberEl.value =list.number;
        inputCheckIn.value = list.checkIn;
        selectedCheckBoxes = list.hobbies;
        genderValue.value = list.gender;
        inputSelect.value = list.designation;
        inputSkillsSelect.value = list.skills;
    });
    buttonsConsEl.appendChild(editEl);
}

formEl.addEventListener("submit", function(event) {
    event.preventDefault();

    let selectedGender = ""
    for (let each of genderValue) {
        if (each.checked) {
            selectedGender = each.value
            break
        }
    }

    let selectedCheckBoxes = []
    for (let eachBox of checkedValues) {
        if (eachBox.checked) {
            selectedCheckBoxes += eachBox.value + ",  "; 
        }
    }

    let newData =  {
        id: listData.length + inputNameEl.value,
        color : inputColorEl.value,
        name : inputNameEl.value,
        email: inputEMailEl.value,
        password : inputPasswordEl.value,
        number: inputNumberEl.value,
        checkIn : inputCheckIn.value,
        hobbies : selectedCheckBoxes,
        gender : selectedGender,
        designation : inputSelect.value,
        skills : inputSkillsSelect.value,
    };

    listData = [...listData, newData]
    displayListItems(newData);

    inputNameEl.value = "";
    inputCheckIn.value = "";
    inputEMailEl.value = "";
    inputNumberEl.value = "";
});


function renderDataList() {
    if (parsedData != "") {
        for (let eachlist in parsedData ) {
            let index = eachlist
            let list = parsedData[index]
            displayListItems(list);
        };
    };
}
renderDataList();

// localStorage.clear("listData");