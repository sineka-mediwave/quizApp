# Quiz App

Quiz App contains two screen. In the first screen, we are going to choose the categories which the questions will be asked. In the Second screen, question for the selected category will be displayed with minimum 5 questions check the answer and go to back to the home page.

## Quiz home page

created a form with dropdown box and select the category and by clicking proceed navigate to next page.

## Checking the answer

```
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
```
