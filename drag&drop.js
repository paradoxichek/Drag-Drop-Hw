let boxes = document.querySelectorAll(".todos__column");
let ageInput = document.querySelector(".inp2");
let formElement = document.forms.form;

let db = [
  {
    name: "Charles Ross",
    age: 21
  },
  {
    name: "Timothy Guerrero",
    age: 21
  },
  {
    name: "Addam Hoffman",
    age: 21
  },
  {
    name: "Chris Diaz",
    age: 41
  },
  {
    name: "Terry Guerrero",
    age: 54
  }, 
  {
    name: "Alan Adams",
    age: 89
  }
];

let mainBox = document.querySelector('.todos__box');
let inProgressBox = document.querySelector('#in-progress');
let doneBox = document.querySelector('#done');

formElement.onsubmit = (e) => {
  e.preventDefault();
  
  let formData = new FormData(formElement);
  
  let data = {};
  
  formData.forEach((val, key) => {
    data[key] = val;
  });
  
  if(ageInput.value <= 25) {
    db.push(data);
    reload(db);
  } else if(ageInput.value > 21 && ageInput.value <= 50) {
    db.push(data);
    reload(db);
  } else if(ageInput.value > 50) {
    db.push(data);
    reload(db);
  }  
};

function reload(arr) {
    mainBox.textContent = "";
    inProgressBox.textContent = "";
    doneBox.textContent = "";
    
    for (let item of arr) {
        let elem = document.createElement("div");
        let h1 = document.createElement("h1");
        let details = document.createElement("div");
        let h5 = document.createElement("h5");
        let span = document.createElement("span");

        function dragStart(e) {
            e.dataTransfer.setData("text/plain", e.target.id);
            setTimeout(() => {
                elem.classList.add("hide");
            }, 0);
        }

        elem.addEventListener("dragstart", dragStart);
        elem.setAttribute("id", Math.random());
        elem.setAttribute("draggable", true);
        elem.classList.add("elem-2");
        details.classList.add("details");

        h1.textContent = item.name;
        h5.textContent = "Age";
        span.textContent = item.age;
        elem.append(h1, details);
        details.append(h5, span);

        if (item.age <= 25) {
            mainBox.append(elem);
        } else if (item.age > 21 && item.age <= 50) {
            inProgressBox.append(elem);
        } else if (item.age > 50) {
            doneBox.append(elem);
        }
    }
}

reload(db);

function dragEnter(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

function dragOver(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}
function dragLeave(e) {
  e.preventDefault();
  e.target.classList.remove("drag-over");
}

function drop(e) {
    e.preventDefault();
    e.target.classList.remove("drag-over");
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);


    if (draggable.classList.contains("elem-2")) {
  
      if (e.target.classList.contains("todos__column")) {
        const columnAge = e.target.getAttribute("data-age")
        const cardAge = draggable.querySelector("span").textContent
        


          e.target.lastElementChild.append(draggable);
          draggable.classList.remove("hide");

      } else {

        const parentColumn = e.target.closest(".todos__column");
        if (parentColumn) {
          const columnAge = parseInt(parentColumn.getAttribute("data-age"));
          const cardAge = parseInt(draggable.querySelector("span").textContent);
          

      
            parentColumn.lastElementChild.append(draggable);
            draggable.classList.remove("hide");
      
        }
      }
    }
}

boxes.forEach((box) => {
  box.addEventListener("dragenter", dragEnter);
  box.addEventListener("dragover", dragOver);
  box.addEventListener("dragleave", dragLeave);
  box.addEventListener("drop", drop);
});





