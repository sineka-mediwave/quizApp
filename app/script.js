//Global Variable inialization
const groupSelect = document.querySelector("#selectCategory");
const quizCatBox = document.querySelector("#QuizCategory");
const questionBox = document.querySelector("#Questions");

// const state = {
//   categories: [
//     {
//       id: 1,
//       name: "Computer Science",
//       value: "computer",
//     },
//     {
//       id: 2,
//       name: "Electronis",
//       value: "electronics",
//     },
//     {
//       id: 3,
//       name: "Fundamental Physics",
//       value: "physics",
//     },
//   ],
//   questions: [
//     {
//       id: "cs1",
//       question: "what is brain of computer?",
//       options: [
//         { id: "choice1", text: "CPU", isCorrect: true },
//         { id: "choice2", text: "mouse", isCorrect: false },
//         { id: "choice3", text: "monitor", isCorrect: false },
//         { id: "choice4", text: "ALU", isCorrect: false },
//       ],
//       category: 1,
//     },
//     {
//       id: "cs2",
//       question: "The C programming language was developed by?",
//       options: [
//         { id: "choice1", text: "Dennis Ritchie", isCorrect: true },
//         { id: "choice2", text: "Brendan Eich", isCorrect: false },
//         { id: "choice3", text: "Guido van Rossum", isCorrect: false },
//         { id: "choice4", text: "Elon Musk", isCorrect: false },
//       ],
//       category: 1,
//     },
//     {
//       id: "ec1",
//       question: "Which of the following is an application of Zener diode?",
//       options: [
//         { id: "choice1", text: "Rectifier", isCorrect: false },
//         { id: "choice2", text: "Amplifier", isCorrect: false },
//         { id: "choice3", text: "Voltage Regulator", isCorrect: true },
//         { id: "choice4", text: "Oscillator", isCorrect: false },
//       ],
//       category: 2,
//     },
//   ],
//   page: 0,
// };
const categories = [
  {
    id: 1,
    name: "Computer Science",
    value: "computer",
  },
  {
    id: 2,
    name: "Electronis",
    value: "electronics",
  },
  {
    id: 3,
    name: "Fundamental Physics",
    value: "physics",
  },
];

const questions = [
  {
    id: "cs1",
    question: "what is brain of computer?",
    options: [
      { id: "choice1", text: "CPU", isCorrect: true },
      { id: "choice2", text: "mouse", isCorrect: false },
      { id: "choice3", text: "monitor", isCorrect: false },
      { id: "choice4", text: "ALU", isCorrect: false },
    ],
    category: 1,
  },
  {
    id: "cs2",
    question: "The C programming language was developed by?",
    options: [
      { id: "choice1", text: "Dennis Ritchie", isCorrect: true },
      { id: "choice2", text: "Brendan Eich", isCorrect: false },
      { id: "choice3", text: "Guido van Rossum", isCorrect: false },
      { id: "choice4", text: "Elon Musk", isCorrect: false },
    ],
    category: 1,
  },
  {
    id: "ec1",
    question: "Which of the following is an application of Zener diode?",
    options: [
      { id: "choice1", text: "Rectifier", isCorrect: false },
      { id: "choice2", text: "Amplifier", isCorrect: false },
      { id: "choice3", text: "Voltage Regulator", isCorrect: true },
      { id: "choice4", text: "Oscillator", isCorrect: false },
    ],
    category: 2,
  },
];
// setToLocalStorage();
// function setToLocalStorage() {
//   const str = JSON.stringify(state);
//   localStorage.setItem("Quiz-App", str);
// }

//appends an array of options to a given select element
function appendOptions(selectElement, options) {
  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    const optionElement = document.createElement("option");
    optionElement.textContent = option.name;
    optionElement.value = option.value;
    selectElement.appendChild(optionElement);
  }
}

// append group options
appendOptions(groupSelect, categories);

// Get the selected value and move to the respected page when the button is clicked
document.getElementById("proceed").addEventListener("click", function (e) {
  e.preventDefault();
  openQuestions();
});

function clearApp() {
  questionBox.innerHTML = " ";
}
function openQuestions() {
  clearApp();
  const selectedCat = categories.findIndex(
    (cat) => cat.value == groupSelect.value
  );
  quizCatBox.style.display = "none";
  questionBox.style.visibility = "inherit";
  const selectedcategory = categories[selectedCat];
  contentDiv();
  ButtonDiv();
  questionCategory(selectedcategory);
}

function contentDiv() {
  const appDiv = document.createElement("div");
  appDiv.id = "app";

  const buttonsDiv = document.createElement("div");
  buttonsDiv.id = "buttons";
  // Append the created div elements to the document's body or another parent element
  questionBox.append(appDiv, buttonsDiv);
}

function questionCategory(cat) {
  const app = document.querySelector("#app");
  const h1 = document.createElement("h1");
  h1.innerText = cat.name;
  app.appendChild(h1);

  const qnArray = findQuestion(cat.id);
  for (let i = 0; i < qnArray.length; i++) {
    const question = displayQuestionCard(qnArray[i]);
    app.append(question);
  }
  // updateUi(qnList);
}

function ButtonDiv() {
  const buttonDiv = document.querySelector("#buttons");

  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("id", "submitBtn");
  submitBtn.innerHTML = "Check Answer";
  const backBtn = document.createElement("button");
  backBtn.innerText = "Go Back";
  backBtn.addEventListener("click", function () {
    // e.preventDefault();
    questionBox.style.visibility = "hidden";
    quizCatBox.style.display = "block";
    displayAnswerBool = false;
  });
  buttonDiv.append(backBtn, submitBtn);
}

function findQuestion(categoryId) {
  const filterArrray = questions.filter((qn) => qn["category"] == categoryId);
  return filterArrray;
}

function displayQuestionCard(qn) {
  const div = document.createElement("div");
  div.setAttribute("class", "question-container");
  div.setAttribute("id", `question-${qn["id"]}`);
  // Form styling
  const fieldset = document.createElement("fieldset");
  // Question displaying format
  const legend = document.createElement("legend");
  legend.innerText = qn["question"];
  const optionGrid = document.createElement("div");
  optionGrid.setAttribute("class", "grid-box");

  let option = qn["options"];
  for (let i = 0; i < option.length; i++) {
    const op = option[i];
    const optionDiv = document.createElement("div");
    const radioBtn = document.createElement("input");
    radioBtn.type = "radio";
    radioBtn.name = `${qn.id}qn`;

    radioBtn.id = `${op.id}btn`;
    radioBtn.value = op.text;
    const label = document.createElement("label");
    label.htmlFor = op.id + "btn";
    label.innerText = op["text"];
    optionDiv.append(radioBtn, label);
    optionGrid.append(optionDiv);
    // if (op.isCorrect) {
    //   console.log(op.text);
    // }
  }

  const resultdiv = document.createElement("div");
  const resultId = `result-${qn["id"]}`;
  resultdiv.setAttribute("id", resultId);
  resultdiv.className = "ansDiv";

  fieldset.append(legend, optionGrid);

  const submit = document.querySelector("#submitBtn");

  submit.addEventListener("click", function () {
    const selected = document.querySelector(`input[name="${qn.id}qn"]:checked`);
    if (selected) {
      const userAnswer = selected.value;
      for (let i = 0; i < qn["options"].length; i++) {
        const op = option[i];
        if (op.isCorrect) {
          if (userAnswer === op.text) {
            resultdiv.innerText = "correct: " + op.text;
            resultdiv.style.color = "green";
          } else {
            resultdiv.innerText = "correct: " + op.text;
            resultdiv.style.color = "red";
          }
          console.log("correct", userAnswer === op.text);
        }
      }
    } else {
      resultdiv.innerText = "select answer";
    }
  });
  div.append(fieldset, resultdiv);
  return div;
}
