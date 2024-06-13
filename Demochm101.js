document.addEventListener('DOMContentLoaded', function() {
    let score = 0;
    let askedQuestions = [];
    let currentQuestionIndex = 0;
    let currentQuestion = null;
const questions= [
  {
    "Q": "The minimum amount of energy needed to remove an electron from gaseous atom to form a gaseous ion with positive charge is called __________.",
    "A": "electron affinity",
    "B": "ionization energy",
    "C": "electronegativity",
    "D": "binding energy",
    "Ans": "ionization energy"
  },
  {
    "Q": "Mention the fundamental particles of an atom.",
    "A": "Proton, neutron, electron",
    "B": "Quarks, leptons, bosons",
    "C": "Neutrino, positron, gluon",
    "D": "Photon, neutron, muon",
    "Ans": "Proton, neutron, electron"
  },
  {
    "Q": "Balance the chemical equation Ca + H₂O → Ca(OH)₂ + H₂.",
    "A": "Ca + H₂O → Ca(OH)₂ + H₂",
    "B": "Ca + 2H₂O → Ca(OH)₂ + H₂",
    "C": "2Ca + H₂O → 2Ca(OH)₂ + H₂",
    "D": "Ca + H₂O → Ca(OH)₂ + 2H₂",
    "Ans": "Ca + 2H₂O → Ca(OH)₂ + H₂"
  },
  {
    "Q": "Charcoal is an example of __________.",
    "A": "crystalline solids",
    "B": "amorphous solids",
    "C": "ionic solids",
    "D": "molecular solids",
    "Ans": "amorphous solids"
  },
  {
    "Q": "The basic repeating units in a crystal lattice is known as __________.",
    "A": "unit cell",
    "B": "lattice point",
    "C": "primitive cell",
    "D": "crystal system",
    "Ans": "unit cell"
  },
            ];
// Define the questions array
let userAnswers = [];
const questionContainer = document.getElementById('question');
        const optionsContainer = document.getElementById('options');
    function getRandomQuestion() {
        let index;
        do {
            index = Math.floor(Math.random() * questions.length);
        } while (askedQuestions.includes(index));
        askedQuestions.push(index);
        currentQuestionIndex = index;
        return questions[index];
    }

    function renderQuestion() {
        const questionContainer = document.getElementById('question');
        const optionsContainer = document.getElementById('options');
        currentQuestion = getRandomQuestion();

        // Render question
        questionContainer.textContent = currentQuestion.Q;

        // Render options
        optionsContainer.innerHTML = '';
        for (let option in currentQuestion) {
            if (option !== 'Q' && option !== 'Ans') {
                const btn = document.createElement('div');
                btn.className = 'btn';
                btn.dataset.option = currentQuestion[option];
                const letterSpan = document.createElement('span');
                letterSpan.className = 'option-letter';
                letterSpan.textContent = option;
                btn.appendChild(letterSpan);
                const textSpan = document.createElement('span');
                textSpan.textContent = currentQuestion[option];
                btn.appendChild(textSpan);
                optionsContainer.appendChild(btn);
                btn.addEventListener('click', function() {
                    checkAnswer(currentQuestion[option], currentQuestion.Ans);
                });
            }
        }
    }

    function checkAnswer(selectedOption, correctAnswer) {
        userAnswers.push({
            question: currentQuestion.Q,
            correctAnswer: correctAnswer,
            userAnswer: selectedOption
        });

        if (selectedOption === correctAnswer) {
            score++;
            document.getElementById('score').textContent = 'Score: ' + score;
        }

        // Mark the selected option and the correct option
        markOptions(selectedOption, correctAnswer);

        // Move to the next question
        if (askedQuestions.length < 4) {
            setTimeout(renderQuestion, 1900); // Move to the next question after 2 seconds
        } else {
            setTimeout(showPopup, 2000); // Show the popup after the last question
        }
    }

    function markOptions(selectedOption, correctAnswer) {
        // Mark all options
        const options = document.querySelectorAll('.btn');
        options.forEach(option => {
            if (option.dataset.option === correctAnswer) {
                option.style.backgroundColor = 'green';
            } else if (option.dataset.option === selectedOption) {
                option.style.backgroundColor = 'red';
            } else {
                option.style.backgroundColor = ''; // Reset any other buttons if needed
            }
            option.style.pointerEvents = 'none';
        });
    }

    function showPopup() {
        const overlay = document.getElementById('overlay');
        const popup = document.getElementById('popup');
        const finalScore = document.getElementById('finalScore');

        finalScore.textContent = `You scored ${score*2} / 70!`;
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }

    function closePopup() {
        const overlay = document.getElementById('overlay');
        const popup = document.getElementById('popup');

        overlay.style.display = 'none';
        popup.style.display = 'none';
    }

    function tryAgain() {
        score = 0;
        askedQuestions = [];
        userAnswers = [];
        document.getElementById('score').textContent = 'Score: ' + score;
        document.getElementById('assessment').style.display = 'none';
        closePopup();
        renderQuestion();
    }

    function showAssessment() {
        const assessmentContainer = document.getElementById('assessment');
        assessmentContainer.innerHTML = '';

        userAnswers.forEach(answer => {
            const questionDiv = document.createElement('div');
            questionDiv.innerHTML = `<strong>Question:</strong> ${answer.question}`;
            const answerDiv = document.createElement('div');
            answerDiv.innerHTML = `<strong>Your Answer:</strong> <span class="${answer.userAnswer === answer.correctAnswer ? 'correct' : 'incorrect'}">${answer.userAnswer}</span>`;
            const correctAnswerDiv = document.createElement('div');
            correctAnswerDiv.innerHTML = `<strong>Correct Answer:</strong> ${answer.correctAnswer} <br><br>`;
correctAnswerDiv.style.color = 'green';
            questionDiv.appendChild(answerDiv);
            questionDiv.appendChild(correctAnswerDiv);
            assessmentContainer.appendChild(questionDiv);
        });
questionContainer.style.display = 'none';
optionsContainer.style.display = 'none';
        assessmentContainer.style.display = 'block';
        closePopup();
    }

    // Ensure functions are globally accessible
    window.tryAgain = tryAgain;
    window.showAssessment = showAssessment;

        renderQuestion();
});
            