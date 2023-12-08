const fetchData = async () => {
  const url = "https://jsonplaceholder.typicode.com/todos?_limit=5";
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

const showOnList = (data) => {
  const list = document.getElementById("listTitle");
  let liElement = document.createElement("li");
  let checkedBox = document.createElement("input");
  let deleteBtn = document.createElement("button");

  //delete button and listener
  deleteBtn.setAttribute("id", data.title);
  deleteBtn.addEventListener("click", function () {
    deleteFromList(liElement);
  });
  deleteBtn.innerText = "X";

  //checked status
  let liTextContainer = document.createElement("span");
  checkedBox.setAttribute("type", "checkbox");
  checkedBox.checked = data.completed;

  liTextContainer.innerText = data.title;
  liTextContainer.appendChild(checkedBox);
  liElement.appendChild(deleteBtn);
  liElement.appendChild(liTextContainer);
  list.appendChild(liElement);
};

const deleteFromList = (liElement) => {
  liElement.classList.add("slide-out");

  liElement.addEventListener("animationend", function () {
    const list = document.getElementById("listTitle");
    list.removeChild(liElement);
  });
};

const listData = (data) => {
  const list = document.getElementById("listTitle");
  console.log(data);

  if (data.length === 0) {
    list.innerText = "List is loading...";
  } else {
    list.innerText = "List";
    data.forEach((element) => {
      showOnList(element);
    });
  }
};

const init = async () => {
  listData([]);
  const data = await fetchData();
  listData(data);
  console.log(data);
  return data;
};

const getValues = () => {
  let element = { title: "", completed: false };
  const titleInput = document.getElementById("title");
  const completedCheckbox = document.getElementById("completed");

  element.title = titleInput.value;
  element.completed = completedCheckbox.checked;

  console.log("title : ", element.title);
  console.log("checkedValue : ", element.completed);
  showOnList(element);

  titleInput.value = "";
  completedCheckbox.checked = false;
};

function validateInput() {
  const textInput = document.getElementById("title");
  const validationMessage = document.getElementById("message");
  const submitButton = document.getElementById("submitBtn");

  //checks if value is not empty or has only spaces
  if (/^\s*$/.test(textInput.value)) {
    validationMessage.innerText = "Title can not be empty.";
    submitButton.disabled = true;
  } else {
    validationMessage.innerText = "";
    submitButton.disabled = false;
  }
}

const textInput = document.getElementById("title");
textInput.addEventListener("input", validateInput);

//submit button listener
document
  .getElementById("submitBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    console.log("clicked");
    getValues();
  });

init();
