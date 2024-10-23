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
                    content.innerHTML = `    <div class="container">
        <h1>Quiz Flashcards</h1>
        <div class="grid-container" id="gridContainer">
            <!-- Cards will be populated by JavaScript -->
        </div>
    </div>

    <!-- Full screen card (hidden initially) -->
    <div class="full-screen" id="fullScreenCard" style="display: none;">
        <div class="card">
            <div class="card__inner" id="fullScreenCardInner">
                <div class="card__face card__face--front">
                    <h2 id="cardQuestion">Question</h2>
                </div>
                <div class="card__face card__face--back">
                    <p id="cardAnswer">Answer</p>
                </div>
            </div>
            <button class="cancel-btn" id="closeCardButton">X</button>
        </div>

        <!-- Prev and Next buttons -->
        <button class="nav-btn prev-btn" id="prevCardButton">Prev</button>
        <button class="nav-btn next-btn" id="nextCardButton">Next</button>
    </div>`;
 

                    content.style.display = 'block';
                    populateQuizCards();

                    // Logout function
                    document.getElementById('logout-button').addEventListener('click', () => {
                        signOut(auth)
                            .then(() => {
                                console.log("User signed out.");
                                window.location.href = 'login.html'; // Redirect after logout
                            })
                            .catch((error) => {
                                console.error("Error signing out:", error);
                                alert("Logout failed: " + error.message);
                            });
                    });
                } else {
                    // No user is signed in, show unauthorized message and redirect
                    unauthorized.style.display = 'block';
                    setTimeout(() => {
                        window.location.href = 'Logineasy.html'; // Redirect to login
                    }, 1000);
                }
            });
        })
        .catch((error) => {
            console.error("Error setting persistence:", error);
        });
}

// Function to populate quiz cards
function populateQuizCards() {
        const quizData = [
{
  Q: "The process where a common specie evolve to give rise to two or more distinct species is",
  A: "Convergent evolution",
  B: "Parallel evolution",
  C: "Divergent evolution",
  D: "Artificial selection",
  Ans: "Divergent evolution"
},
{
  Q: "The process whereby organisms not closely related, independently evolve similar traits to adapt to similar environment is",
  A: "Divergent evolution",
  B: "Parallel evolution",
  C: "Convergent evolution",
  D: "Natural selection",
  Ans: "Convergent evolution"
},
{
  Q: "Who proposed the theory of biological evolution by Natural Selection",
  A: "Gregor Mendel",
  B: "Charles Darwin",
  C: "Jean-Baptiste Lamarck",
  D: "Alfred Wallace",
  Ans: "Charles Darwin"
},
{
  Q: "In ___ Darwin wrote a book titled On the Origin of Species",
  A: "1840s",
  B: "1850s",
  C: "1860s",
  D: "1870s",
  Ans: "1850s"
},
{
  Q: "Darwin illustrated his idea in a sketch he called",
  A: "Branch of life",
  B: "Web of life",
  C: "Tree of life",
  D: "Cycle of life",
  Ans: "Tree of life"
},
        ];

        let currentIndex = 0;
        const gridContainer = document.getElementById('gridContainer');
        const fullScreenCard = document.getElementById('fullScreenCard');
        const fullScreenCardInner = document.getElementById('fullScreenCardInner');
        const cardQuestion = document.getElementById('cardQuestion');
        const cardAnswer = document.getElementById('cardAnswer');

const nextButton = document.getElementById('nextCardButton');
    const prevButton = document.getElementById('prevCardButton');
    const closeButton = document.getElementById('closeCardButton');

        // Populate grid with cards
        quizData.forEach((item, index) => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.innerHTML = `<p>Card ${index + 1}</p>`;
            gridItem.onclick = () => showCard(index);
            gridContainer.appendChild(gridItem);
        });

        function showCard(index) {
            currentIndex = index;
            cardQuestion.textContent = quizData[currentIndex].Q;
            cardAnswer.textContent = quizData[currentIndex].Ans;

            // Show the full-screen card
            fullScreenCard.style.display = 'flex';
        }

        function closeCard() {
            // Hide the full-screen card
            fullScreenCard.style.display = 'none';
            fullScreenCardInner.classList.remove('is-flipped');
        }

        fullScreenCardInner.addEventListener('click', function () {
            fullScreenCardInner.classList.toggle('is-flipped');
        });

        function nextCard() {
            currentIndex = (currentIndex + 1) % quizData.length;
            showCard(currentIndex);
        }

        function prevCard() {
            currentIndex = (currentIndex - 1 + quizData.length) % quizData.length;
            showCard(currentIndex);
        }
nextButton.addEventListener('click', nextCard);
    prevButton.addEventListener('click', prevCard);
    closeButton.addEventListener('click', closeCard);
}

loadFirebaseModules();

