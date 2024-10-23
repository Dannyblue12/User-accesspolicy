const themeCheckbox = document.getElementById('theme-checkbox');
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply the saved theme on page load
if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeCheckbox.checked = true;
}

themeCheckbox.addEventListener('change', () => {
    if (themeCheckbox.checked) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});
const loader = document.getElementById('loader');
const content = document.getElementById('content');
const unauthorized = document.getElementById('unauthorized');


loader.style.display = 'block';

// Lazy load Firebase modules
async function loadFirebaseModules() {
    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js");
    const { getAuth, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js");
    const { getFirestore, doc, setDoc, getDoc } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js");



    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyAf0mERQ9WiocU34BQx4Isr48Hs1VfpbDU",
        authDomain: "database-login-530f7.firebaseapp.com",
        projectId: "database-login-530f7",
        storageBucket: "database-login-530f7.appspot.com",
        messagingSenderId: "280997222442",
        appId: "1:280997222442:web:ad80301ccb4337dfb70b53"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getFirestore(app);

    // Set persistence to 'local' to ensure user session is remembered even when the browser is closed
    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            // Check if user is authenticated
            onAuthStateChanged(auth, (user) => {
                loader.style.display = 'none'; // Hide loader

                if (user) {
                    // Log the user object to check if it’s being detected
                    console.log("User is signed in:", user);
                    // User is signed in, render the protected content
                    content.innerHTML = `
                     <div class="container">
    <div class="question-section">
<div id="question"></div>
<div id="options"></div>
<button id="solutionButton">Show Solution</button>
<div id="solution" style="display:none;"></div>
</div>
</div>`;
 

                    content.style.display = 'block'; // Ensure content is visible

                    // Logout function
                    document.getElementById('logout-button').addEventListener('click', () => {
                        signOut(auth)
                            .then(() => {
                                console.log("User signed out.");
                                window.location.href = 'login.html'; // Redirect to login page after logout
                            })
                            .catch((error) => {
                                console.error("Error signing out:", error);
                                alert("Logout failed: " + error.message);
                            });
                    });

const questions = [
{
  "Q": "____ is the type of natural environment in which a particular species of organism lives",
  "A": "Habitat",
  "B": "Niche",
  "C": "Biome",
  "D": "Ecosystem",
  "Ans": "Habitat"
},
{
  "Q": "There are two types of habitats namely ___ & ____ habitats.",
  "A": "Marine & freshwater",
  "B": "Desert & forest",
  "C": "Aquatic & terrestrial",
  "D": "Temperate & tropical",
  "Ans": "Aquatic & terrestrial"
},
{
  "Q": "The ___ habitat is the largest of all habitats.",
  "A": "Forest",
  "B": "Desert",
  "C": "Marine",
  "D": "Grassland",
  "Ans": "Marine"
},
{
  "Q": "The marine habitat occupies ___ of the earth's surface",
  "A": "60%",
  "B": "70%",
  "C": "80%",
  "D": "90%",
  "Ans": "70%"
},
{
  "Q": "The average depth of the marine habitat is ____ feet",
  "A": "10,000",
  "B": "12,500",
  "C": "15,000",
  "D": "20,000",
  "Ans": "12,500"
},
{
  "Q": "The average variation in concentration of various salts NaCl=2.35, MgCl_2=0.5, NaSO_4= __ & CaCl_2=__",
  "A": "0.3 & 0.1",
  "B": "0.4 & 0.11",
  "C": "0.5 & 0.2",
  "D": "0.6 & 0.25",
  "Ans": "0.4 & 0.11"
},
{
  "Q": "In marine biota, the animals are grouped into ___ & ____ forms",
  "A": "Planktonic & Nektonic",
  "B": "Pelagic & Benthic",
  "C": "Sessile & Motile",
  "D": "Neritic & Oceanic",
  "Ans": "Pelagic & Benthic"
},
{
  "Q": "Pelagic organisms are divided into two groups ___ & ____",
  "A": "Plankton",
  "B": "Benthos",
  "C": "Nekton",
  "D": "Holoplankton",
  "Ans": "Plankton & Nekton"
},
{
  "Q": "The planktonic forms belonging to plant kingdom is ___ while animal forms are ____.",
  "A": "Phytoplankton",
  "B": "Zooplankton",
  "C": "Holoplankton",
  "D": "Meroplankton",
  "Ans": "Phytoplankton & Zooplankton"
},
{
  "Q": "The Zooplankton are divided into ____ & __.",
  "A": "Holoplankton",
  "B": "Phytoplankton",
  "C": "Meroplankton",
  "D": "Nekton",
  "Ans": "Holoplankton & Meroplankton"
},
{
  "Q": "___ habitat/ zone is formed in those regions where a river meets a sea.",
  "A": "Marine",
  "B": "Estuarine",
  "C": "Littoral",
  "D": "Pelagic",
  "Ans": "Estuarine"
},
{
  "Q": "The lowest recorded temperature in terrestrial habitat is ___ while the highest recorded temperature is ___",
  "A": "-60°C",
  "B": "-70°C",
  "C": "50°C",
  "D": "60°C",
  "Ans": "-60°C & 60°C"
}
{
  "Q": "The arctic region of North America, Europe and Asia is known as ____ region.",
  "A": "Tundra",
  "B": "Taiga",
  "C": "Desert",
  "D": "Grassland",
  "Ans": "Tundra"
},
{
  "Q": "The broad band just south of the tundra region of Eurasia and North America is known as ___ region.",
  "A": "Tundra",
  "B": "Taiga",
  "C": "Desert",
  "D": "Grassland",
  "Ans": "Taiga"
},
{
  "Q": "The rainfall in grassland is usually __ to __ inches per year.",
  "A": "5 & 15",
  "B": "12 & 40",
  "C": "25 & 50",
  "D": "30 & 60",
  "Ans": "12 & 40"
},
{
  "Q": "The average rainfall in deserts is less than ___ inches per year.",
  "A": "5",
  "B": "7",
  "C": "10",
  "D": "12",
  "Ans": "10"
},
{
  "Q": "___ & ___ are the dominant plants in deserts",
  "A": "Cacti & Yucca",
  "B": "Grass & Trees",
  "C": "Shrubs & Flowers",
  "D": "Ferns & Mosses",
  "Ans": "Cacti & Yucca"
}
];

let score = 0;
let askedQuestions = [];
let currentQuestionIndex = 0;
let currentQuestion = null;

let userAnswers = [];
const questionContainer = document.getElementById('question');
        const optionsContainer = document.getElementById('options');
function getSequentialQuestion() {
    const question = questions[currentQuestionIndex];
    currentQuestionIndex++; // Move to the next question for future calls
    return question;
}

function renderQuestion() {
    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    currentQuestion = getSequentialQuestion(); // Get the next question in sequence

    // Render question text
    questionContainer.innerHTML = currentQuestion.Q;
    renderMathInElement(questionContainer, {
        throwOnError: false
    });


    // Render options
    optionsContainer.innerHTML = '';
    for (let option in currentQuestion) {
        if (option !== 'Q' && option !== 'Ans' && option !== 'Solution') {
            const btn = document.createElement('div');
            btn.className = 'btn';
            btn.dataset.option = option;
            const letterSpan = document.createElement('span');
            letterSpan.className = 'option-letter';
            letterSpan.textContent = option;
            btn.appendChild(letterSpan);
            const textSpan = document.createElement('span');
            textSpan.innerHTML = currentQuestion[option];
            btn.appendChild(textSpan);
            optionsContainer.appendChild(btn);
            renderMathInElement(textSpan, {
                throwOnError: false
            });
            btn.addEventListener('click', function() {
                checkAnswer(option, currentQuestion.Ans);
            });
        }
    }

    // Show solution button if there is a solution
    const solutionButton = document.getElementById('solutionButton');
    if (currentQuestion.Solution) {
        solutionButton.style.display = 'block';
    } else {
        solutionButton.style.display = 'none';
    }
}

function checkAnswer(selectedOption, correctAnswer) {
    const optionsText = {};
    for (let option in currentQuestion) {
        if (option !== 'Q' && option !== 'Ans' && option !== 'Solution') {
            optionsText[option] = currentQuestion[option];
        }
    }

    userAnswers.push({
        question: currentQuestion.Q,
        correctAnswer: correctAnswer,
        userAnswer: selectedOption,
        optionsText: optionsText
    });

    if (selectedOption === correctAnswer) {
        score++;
        document.getElementById('score').textContent = 'Score: ' + score;
    }

    // Mark the selected option and the correct option
    markOptions(selectedOption, correctAnswer);

if (currentQuestionIndex < questions.length) {
        setTimeout(renderQuestion, 2000); // Move to the next question after 2 seconds
    } else {
        setTimeout(showPopup, 2000); // Show the popup after the last question
    }
}


function markOptions(selectedOption, correctAnswer) {
    // Find and mark the selected option
    const selectedBtn = document.querySelector(`.btn[data-option="${selectedOption}"]`);
    selectedBtn.style.backgroundColor = selectedOption === correctAnswer ? 'green' : 'red';

    // Find and mark the correct option
    const correctBtn = document.querySelector(`.btn[data-option="${correctAnswer}"]`);
    correctBtn.style.backgroundColor = 'green';

    // Disable all buttons
    const options = document.querySelectorAll('.btn');
    options.forEach(option => {
        option.style.pointerEvents = 'none';
    });
}

function showSolution() {
    const solutionContainer = document.getElementById('solution');
    const solutionButton = document.getElementById('solutionButton');
    const solutionImage = document.querySelector('.show-solution-img');

    if (solutionContainer.style.display === 'none' || solutionContainer.style.display === '') {
        solutionContainer.style.display = 'block';
        solutionContainer.innerHTML = currentQuestion.Solution;
        renderMathInElement(solutionContainer, {
            throwOnError: false
        });
        solutionButton.textContent = 'Hide Solution';
        solutionImage.src = 'see.png'; // Change to a new image URL for 'Hide Solution'
    } else {
        solutionContainer.style.display = 'none';
        solutionButton.textContent = 'Show Solution';
        solutionImage.src = 'eye.png'; // Change back to the original image URL
    }
}

// Initial render of the first question
function showPopup() {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const finalScore = document.getElementById('finalScore');

    finalScore.textContent = `You scored ${score*2} out of ${questions.length}!`;
    overlay.style.display = 'block';
    popup.style.display = 'block';
}

function closePopup() {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');

    overlay.style.display = 'none';
    popup.style.display = 'none';
}

document.getElementById('solutionButton').addEventListener('click', showSolution);

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
        
        const userAnswerText = answer.optionsText[answer.userAnswer];
        const correctAnswerText = answer.optionsText[answer.correctAnswer];

        const answerDiv = document.createElement('div');
        answerDiv.innerHTML = `<strong>Your Answer:</strong> <span class="${answer.userAnswer === answer.correctAnswer ? 'correct' : 'incorrect'}">${userAnswerText}</span>`;
        
        const correctAnswerDiv = document.createElement('div');
        correctAnswerDiv.innerHTML = `<strong>Correct Answer:</strong> ${correctAnswerText} <br><br>`;
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
console.log(questions.length);
// Initialize the first question

        renderQuestion();
                } else {
                    // Log the lack of user authentication
                    console.log("No user signed in.");
                    
                    // No user is signed in, show unauthorized message and redirect
                    unauthorized.style.display = 'block';
                    setTimeout(() => {
                        window.location.href = 'Logineasy.html'; // Replace 'login.html' with the actual path to your login page
                    }, 1000); // Redirect after 1 second
                }
            });
        })
        .catch((error) => {
            console.error("Error setting persistence:", error);
        });
}

loadFirebaseModules();

