//Global Variable inialization
const groupSelect = document.querySelector("#selectCategory");
const quizCatBox = document.querySelector("#QuizCategory");
const questionBox = document.querySelector("#Questions");
let displayAnswerBool = false;
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
setToLocalStorage();
function setToLocalStorage() {
  const str = JSON.stringify(questions);
  localStorage.setItem("Quiz-Questions", str);
}

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
  const cat = categories[selectedCat];
  questionCategory(cat);
}

function questionCategory(cat) {
  const h1 = document.createElement("h1");
  h1.innerText = cat.name;
  questionBox.appendChild(h1);

  const qnList = findQuestion(cat.id);
  updateUi(qnList);
  gotoBegin();

  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("class", "submitBtn");
  submitBtn.type = "submit";
  submitBtn.innerText = "Check Answer";
  submitBtn.addEventListener("click", function (e) {
    // e.preventDefault();
    radioChecked(qnList);
  });
  questionBox.append(submitBtn);
}

function gotoBegin() {
  const backBtn = document.createElement("button");
  backBtn.innerText = "Go Back";
  backBtn.addEventListener("click", function () {
    // e.preventDefault();
    questionBox.style.visibility = "hidden";
    quizCatBox.style.display = "block";
    displayAnswerBool = false;
  });
  questionBox.append(backBtn);
}

function findQuestion(categoryId) {
  const filterArrray = questions.filter((qn) => qn["category"] == categoryId);
  return filterArrray;
}

function updateUi(qnArray) {
  const form = document.createElement("form");
  form.innerHTML = " ";
  form.setAttribute("id", "questionForm");
  for (let i = 0; i < qnArray.length; i++) {
    const question = displayQuestionCard(qnArray[i]);
    form.append(question);
  }
  questionBox.append(form);
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

    if (op.isCorrect) {
      const ans = op.text;
      console.log(ans);

      const displayAnswer = document.createElement("div");
      displayAnswer.setAttribute("class", "answerDiv");
      displayAnswer.innerText = ans;
      if (displayAnswerBool) {
        displayAnswer.style.display = "block";
      } else {
        displayAnswer.style.display = "none";
      }
      fieldset.appendChild(displayAnswer);
    }
  }

  fieldset.append(legend, optionGrid);

  return fieldset;
}

function radioChecked(qnList) {
  console.log("check");
  // console.log(`${qn.id}qn`);
  // const value = `input[name="${qn.id}qn"]:checked`;
  displayAnswerBool = true;
  openQuestions();
}
