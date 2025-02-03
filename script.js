const quizContainer = document.getElementById('quiz');
const questionElement = document.getElementById('question');
const optionsList = document.getElementById('options-list');
const submitButton = document.getElementById('submit');
const resultsSection = document.getElementById('results-section');
const resultsSummary = document.getElementById('results-summary');
const detailedResults = document.getElementById('detailed-results');

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
      "Hyper Text Markup Language",
      "High Text Machine Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which attribute is used to specify the action of a form in HTML?",
    options: ["method", "action", "submit", "link"],
    answer: "action"
  },
  {
    question: "Which tag is used to define an internal style sheet in HTML?",
    options: ["css", "style", "script", "link"],
    answer: "style"
  },
  {
    question: "Which attribute is used to define inline styles in HTML?",
    options: ["class", "style", "font", "styles"],
    answer: "style"
  },
  {
    question: "Which tag is used to create a numbered list in HTML?",
    options: ["ul", "ol", "li", "list"],
    answer: "ol"
  },
  {
    question: "Which tag is used to create a checkbox in HTML?",
    options: [
      "input type='text'",
      "input type='checkbox'",
      "checkbox",
      "input type='button'"
    ],
    answer: "input type='checkbox'"
  },
  {
    question: "Which tag is used to create a table row in HTML?",
    options: ["td", "tr", "th", "table"],
    answer: "tr"
  },
  {
    question: "Which tag is used to create a heading in HTML?",
    options: ["h1", "head", "header", "heading"],
    answer: "h1"
  },
  {
    question: "Which tag is used to create a paragraph in HTML?",
    options: ["p", "para", "paragraph", "text"],
    answer: "p"
  },
  {
    question: "Which tag is used to create a line break in HTML?",
    options: ["br", "lb", "break", "line"],
    answer: "br"
  }
];

function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  optionsList.innerHTML = '';
  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="radio" name="answer" class="answer" id="option-${index}" value="${option}">
      <label for="option-${index}">${option}</label>
    `;
    li.addEventListener('click', () => {
      document.getElementById(`option-${index}`).checked = true;
      li.classList.add('selected');
      Array.from(optionsList.children).forEach(child => {
        if (child !== li) child.classList.remove('selected');
      });
    });
    optionsList.appendChild(li);
  });
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  if (selectedOption) {
    const userAnswer = selectedOption.value;
    const correctAnswer = questions[currentQuestionIndex].answer;

    userAnswers.push({
      question: questions[currentQuestionIndex].question,
      userAnswer: userAnswer,
      correctAnswer: correctAnswer
    });

    if (userAnswer === correctAnswer) {
      score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  } else {
    alert('Please select an answer!');
  }
}

function showResults() {
  quizContainer.style.display = 'none';
  resultsSection.style.display = 'block';

  resultsSummary.textContent = `You scored ${score} out of ${questions.length}!`;

  detailedResults.innerHTML = userAnswers.map((answer, index) => `
    <div class="result-item">
      <h3>Question ${index + 1}: ${answer.question}</h3>
      <p>Your Answer: ${answer.userAnswer}</p>
      <p>Correct Answer: ${answer.correctAnswer}</p>
    </div>
  `).join('');
}

submitButton.addEventListener('click', checkAnswer);

loadQuestion();
