const form = document.querySelector("#question-form");
const computer = [
  "Computer Science",
  {
    id: "cs1",
    question: "what is brain of computer?",
    options: [
      {
        id: "choice1",
        value: "CPU",
      },
      {
        id: "choice2",
        value: "mouse",
      },
      {
        id: "choice3",
        value: "keyboard",
      },
      {
        id: "choice4",
        value: "ALU",
      },
    ],
    correct: "CPU",
  },
  {
    id: "cs2",
    question: "The C programming language was developed by?",
    options: [
      {
        id: "choice1",
        value: "Dennis Ritchie",
      },
      {
        id: "choice2",
        value: "Brendan Eich",
      },
      {
        id: "choice3",
        value: "Guido van Rossum",
      },
      {
        id: "choice4",
        value: "Elon Musk",
      },
    ],
    correct: "Dennis Ritchie",
  },
  {
    id: "cs3",
    question: "What does CC mean in emails?",
    options: [
      {
        id: "choice1",
        value: "Carbon Copy",
      },
      {
        id: "choice2",
        value: "Creative Commons",
      },
      {
        id: "choice3",
        value: "common Copy",
      },
      {
        id: "choice4",
        value: "Other",
      },
    ],
    correct: "Carbon Copy",
  },
];
const electro = [
  "Electronics",
  {
    id: "ec2",
    question: "Which of the following is an application of Zener diode?",
    options: [
      {
        id: "choice1",
        value: "Voltage Regulator",
      },
      {
        id: "choice2",
        value: "Rectifier",
      },
      {
        id: "choice3",
        value: "Amplifier",
      },
      {
        id: "choice4",
        value: "Oscillator",
      },
    ],
    correct: "choice1",
  },
];
const questionCollection = {
  computer: computer,
  electro: electro,
};

const urlParams = new URLSearchParams(window.location.search);
const myType = urlParams.get("type");
const currentTest = questionCollection[myType];
console.log(questionCollection[myType]);

function updateUi() {
  // clearApp();
  const heading = document.createElement("h1");
  heading.innerText = currentTest[0];
  form.appendChild(heading);
  for (let i = 1; i < currentTest.length; i++) {
    const question = displayQuestionCard(currentTest[i]);
    form.appendChild(question);
  }
  submitFn();
}

function displayQuestionCard(qn) {
  // Form styling
  const fieldset = document.createElement("fieldset");
  // Question displaying format
  const legend = document.createElement("legend");
  legend.innerText = qn["question"];
  const optionGrid = document.createElement("div");
  optionGrid.setAttribute("class", "grid-box");

  let option = qn["options"];

  for (let i = 0; i < option.length; i++) {
    const optionDiv = document.createElement("div");
    const radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = qn["id"] + option["id"];
    radioBtn.id = option["id"] + "btn";
    radioBtn.value = option["value"];
    const label = document.createElement("label");
    label.for = option["id"] + "btn";
    label.innerText = option[i]["value"];
    optionDiv.append(radioBtn, label);
    optionGrid.append(optionDiv);
  }

  const displayAnswer = document.createElement("div");
  displayAnswer.setAttribute("class", "answerDiv");
  displayAnswer.innerText = "Answer: " + qn["correct"];
  displayAnswer.style.visibility = "hidden";

  fieldset.append(legend, optionGrid, displayAnswer);
  return fieldset;
}

function submitFn() {
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.innerText = "Check Answer";
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    checkAnswer();
  });
  form.appendChild(submitBtn);
}

updateUi();
function checkAnswer() {
  displayAnswer.style.visibility = "visible";
}
