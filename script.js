document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
    },
  ];

  let score = 0;
  let currentQuestionIndex = 0;
  let answered = false;

  startBtn.addEventListener('click', startQuiz);

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });

  function startQuiz() {
    startBtn.classList.add("hidden");
    resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  }

  function showQuestion() {
    answered = false;
    nextBtn.classList.add("hidden");
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    choicesList.innerHTML = "";

    currentQuestion.choices.forEach((choice) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.classList.add("choice");
      li.tabIndex = 0;

      li.addEventListener("click", () => handleAnswer(li, choice));
      li.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleAnswer(li, choice);
        }
      });

      choicesList.appendChild(li);
    });
  }

  function handleAnswer(selectedLi, choice) {
    if (answered) return; // prevent multiple clicks

    answered = true;
    const correctAnswer = questions[currentQuestionIndex].answer;
    const choices = choicesList.querySelectorAll("li");

    choices.forEach((li) => {
      li.classList.add("disabled");
      if (li.textContent === correctAnswer) {
        li.classList.add("correct");
      }
      if (li !== selectedLi && li.textContent !== correctAnswer) {
        li.classList.add("dim");
      }
    });

    if (choice === correctAnswer) {
      score++;
      selectedLi.classList.add("correct");
    } else {
      selectedLi.classList.add("incorrect");
    }

    nextBtn.classList.remove("hidden");
  }

  function showResult() {
    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `You scored ${score} out of ${questions.length}`;
  }
});
