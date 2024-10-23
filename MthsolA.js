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
const app = document.getElementById('app');
const questionBlockContainer = document.getElementById('question-block-container');

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

    // Set persistence to 'local' to ensure user session is remembered
    setPersistence(auth, browserLocalPersistence)
        .then(() => {
            // Check if user is authenticated
            onAuthStateChanged(auth, (user) => {
                loader.style.display = 'none'; // Hide loader

                if (user) {
                    // Log the user object
                    console.log("User is signed in:", user);
        // Get reference to app div
        const app = document.getElementById('app');
        const questionDivs = document.querySelectorAll('.question-block div');
        
        // Add the HTML for the question block dynamically
        content.innerHTML = `
            <div class="container" id="question-blocks">
                <h1>Select a Question</h1>
                <div class="question-block" id="question-block-container"></div>
            </div>

            <!-- Question Page -->
            <div id="question-container" class="container hidden">
                <div class="navigation-header">
                    <a href="#" class="back-button" onclick="goBack()">Go Back</a>
                </div>

                <h1 id="question-title"></h1>
                <p id="question-text"></p>

                <!-- Image will appear here -->
                <img id="question-image" src="" alt="Question Image" class="hidden" style="max-width: 100%; margin-bottom: 20px;">

                <div class="answer" id="correct-answer"></div>
                <div id="steps-container" class="steps"></div>

                <div class="navigation-buttons">
                    <a href="#" class="nav-button" id="prev-button" onclick="navigateQuestion('prev')">Previous</a>
                    <a href="#" class="nav-button" id="next-button" onclick="navigateQuestion('next')">Next</a>
                </div>
            </div>
        `;
questionDivs.forEach((div, index) => {
        div.style.animationDelay = `${index * 0.2}s`;
        div.classList.add('animate-question'); // Add a class for CSS animations
    });
    content.style.display = 'block'; // Show content

                    // Call your function to display questions
                    displayQuestions();

                    // Logout functionality
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
                } else {
                    console.log("No user signed in.");
                    unauthorized.style.display = 'block'; // Show unauthorized message
                    setTimeout(() => {
                        window.location.href = 'Logineasy.html'; // Redirect to login page
                    }, 1000);
                }
            });
        })
        .catch((error) => {
            console.error("Error setting persistence:", error);
        });
}

loadFirebaseModules();

function displayQuestions() {
        // Data for questions
        const questionsData = {
        "questions": [
  {
  "Q": "From the graph below, evaluate f(2).",
   "img": "IMG_20241008_165808.jpg",
  "A": "2",
  "B": "3",
  "C": "1",
  "D": "7",
  "E": "10",
  "Ans": "C",
},
{
  "Q": "Evaluate \\(f(x) = x^2 + 3x - 4\\) at \\(\\frac{f(a+h) - f(a)}{h}\\)",
  "A": "2a + h + 3",
  "B": "a + h + 2",
  "C": "a + 3",
  "D": "a - h + 3",
  "E": "2a - h - 3",
  "Ans": "A",
  "Solution": "Step 1: Find \\(f(a)\\) and \\(f(a + h)\\)<br><br>Given \\(f(x) = x^2 + 3x - 4\\), substitute \\(x = a\\) to get \\(f(a) = a^2 + 3a - 4\\). Next, substitute \\(x = a + h\\) to get \\(f(a + h) = (a + h)^2 + 3(a + h) - 4\\).<br><br>Step 2: Simplify \\(f(a + h) - f(a)\\)<br><br>Now, subtract \\(f(a)\\) from \\(f(a + h)\\):<br><br>\\(f(a + h) - f(a) = (a + h)^2 + 3(a + h) - 4 - (a^2 + 3a - 4)\\). Simplifying further:<br><br>\\(= a^2 + 2ah + h^2 + 3a + 3h - 4 - a^2 - 3a + 4\\)<br><br>\\(= 2ah + h^2 + 3h\\)<br><br>Step 3: Divide by \\(h\\)<br><br>\\(\\frac{f(a + h) - f(a)}{h} = \\frac{2ah + h^2 + 3h}{h}\\) simplifies to \\(2a + h + 3\\).<br><br>Conclusion: The correct answer is Option A."
},
{
  "Q": "Given the function \\(h(p) = p^2 + 2p\\), evaluate \\(h(4)\\).",
  "A": "25",
  "B": "4",
  "C": "24",
  "D": "26",
  "E": "15",
  "Ans": "C",
  "Solution": "Step 1: Substitute \\(p = 4\\) into the function<br><br>The function is given as \\(h(p) = p^2 + 2p\\). Substitute \\(p = 4\\) into the function:<br><br>\\(h(4) = 4^2 + 2(4)\\).<br><br>Step 2: Simplify the expression<br><br>\\(h(4) = 16 + 8 = 24\\).<br><br>Conclusion: The correct answer is Option C."
},
{
  "Q": "Express the relationship \\(2n + 6p = 12\\) as a function \\(p = f(n)\\).",
  "A": "\\(p = f(n) = 1 - \\frac{1}{3}n\\)",
  "B": "\\(p = f(n) = 1 + \\frac{1}{3}n\\)",
  "C": "\\(p = f(n) = 2 + \\frac{1}{3}n\\)",
  "D": "\\(p = f(n) = 1 - \\frac{1}{3}n\\)",
  "E": "\\(p = f(n) = 2 - \\frac{1}{3}n\\)",
  "Ans": "E",
  "Solution": "Step 1: Start with the equation \\(2n + 6p = 12\\)<br><br>Step 2: Solve for \\(p\\)<br><br>First, isolate the term with \\(p\\) by subtracting \\(2n\\) from both sides:<br><br>\\(6p = 12 - 2n\\)<br><br>Next, divide both sides by 6 to solve for \\(p\\):<br><br>\\(p = \\frac{12 - 2n}{6}\\)<br><br>Simplify further:<br><br>\\(p = 2 - \\frac{n}{3}\\)<br><br>So, the function is \\(p = f(n) = 2 - \\frac{1}{3}n\\).<br><br>Conclusion: The correct answer is Option E."
},
{
  "Q": "Given the function \\(h(p) = p^2 + 2p\\), solve for \\(h(p) = 3\\).",
  "A": "p = -3, 1",
  "B": "p = 1, 3",
  "C": "p = -1, -3",
  "D": "p = 4, 0",
  "E": "p = 3, -1",
  "Ans": "A",
  "Solution": "Step 1: Set the function equal to 3<br><br>Given the function \\(h(p) = p^2 + 2p\\), we need to solve \\(p^2 + 2p = 3\\).<br><br>Step 2: Rearrange the equation to standard quadratic form<br><br>Subtract 3 from both sides:<br><br>\\(p^2 + 2p - 3 = 0\\)<br><br>Step 3: Factor the quadratic equation<br><br>The quadratic equation factors as \\((p - 1)(p + 3) = 0\\).<br><br>Step 4: Solve for \\(p\\)<br><br>Setting each factor equal to zero gives us the solutions \\(p = -3\\) and \\(p = 1\\).<br><br>Conclusion: The correct answer is Option A."
},
{
  "Q": "Given the function \\(g(m) = \\sqrt{m-4}\\), solve \\(g(m) = 2\\).",
  "A": "7",
  "B": "3",
  "C": "1",
  "D": "8",
  "E": "9",
  "Ans": "D",
  "Solution": "Step 1: Start with the equation \\(g(m) = \\sqrt{m-4}\\).<br><br>Step 2: Set \\(g(m) = 2\\) and solve for \\(m\\).<br><br>\\(2 = \\sqrt{m-4}\\)<br><br>Step 3: Square both sides to eliminate the square root.<br><br>\\(4 = m - 4\\)<br><br>Step 4: Add 4 to both sides to solve for \\(m\\).<br><br>\\(m = 8\\)<br><br>Conclusion: The correct answer is Option D."
},
{
  "Q": "Given the function \\(g(n) = \\sqrt{n-5}\\), evaluate \\(g(5)\\).",
  "A": "0",
  "B": "1",
  "C": "2",
  "D": "3",
  "E": "5",
  "Ans": "A",
  "Solution": "Step 1: Substitute \\(n = 5\\) into the function \\(g(n) = \\sqrt{n-5}\\).<br><br>Step 2: Evaluate the expression.<br><br>\\(g(5) = \\sqrt{5-5} = \\sqrt{0} = 0\\)<br><br>Conclusion: The correct answer is Option A."
},
  {
  "Q": "Using the graphs, evaluate \\(f(g(1))\\).",
   "img": "IMG_20241008_165852.jpg",
  "A": "1",
  "B": "2",
  "C": "5",
  "D": "3",
  "E": "6",
  "Ans": "E",
},
{
  "Q": "Find the domain of the function \\(f(x) = x^2 - 1\\) in interval form.",
  "A": "\\((-\\infty, \\infty)\\)",
  "B": "\\([-\\infty, \\infty]\\)",
  "C": "\\([-\\infty, \\infty)\\)",
  "D": "\\((-\\infty, \\infty]\\)",
  "E": "None of these",
  "Ans": "A",
  "Solution": "Step 1: Recognize that \\(f(x) = x^2 - 1\\) is a polynomial function.<br><br>Step 2: Polynomial functions are defined for all real numbers, meaning there are no restrictions on \\(x\\).<br><br>Step 3: The domain of a function is the set of all possible input values (\\(x\\)) for which the function is defined.<br><br>Conclusion: The domain of \\(f(x) = x^2 - 1\\) is \\((-\\infty, \\infty)\\). The correct answer is Option A."
},
{
  "Q": "A cell phone company uses the function below to determine the cost, \\(C\\), in dollars, for \\(g\\) gigabytes of data transfer.<br><br>\\(C(g)= \\begin{cases}25 & \\text{if } 0 < g < 2 \\\\ 25 + 10(g - 2) & \\text{if } g \\geq 2 \\end{cases}\\)<br><br>Find the cost of using 4 gigabytes of data.",
  "A": "$43",
  "B": "$40",
  "C": "$45",
  "D": "$20",
  "E": "$25",
  "Ans": "C",
  "Solution": "Step 1: Determine which part of the piecewise function applies for \\(g = 4\\).<br><br>Step 2: Since \\(g = 4\\) is greater than 2, use the second part of the function: \\(C(g) = 25 + 10(g - 2)\\).<br><br>Step 3: Substitute \\(g = 4\\) into the function:<br><br>\\(C(4) = 25 + 10(4 - 2)\\)<br><br>Step 4: Simplify the expression:<br><br>\\(C(4) = 25 + 10(2) = 25 + 20 = 45\\)<br><br>Conclusion: The cost of using 4 gigabytes of data is $45. The correct answer is Option C."
},
{
  "Q": "Find the domain and range of \\(f(x) = 2x^3 - x\\).",
  "A": "\\((-\\infty, \\infty) and (-\\infty, \\infty)\\)",
  "B": "\\((-\\infty, \\infty] and (-\\infty, \\infty)\\)",
  "C": "\\((-\\infty, \\infty) and (-\\infty, 2)\\)",
  "D": "\\((-\\infty, \\infty) and [-\\infty, \\infty)\\)",
  "E": "\\((-\\infty, \\infty)\\)",
  "Ans": "A",
  "Solution": "Step 1: Recognize that \\(f(x) = 2x^3 - x\\) is a polynomial function.<br><br>Step 2: The domain of a polynomial function is all real numbers, \\((-\\infty, \\infty)\\), because there are no restrictions on the values \\(x\\) can take.<br><br>Step 3: To determine the range, consider the behavior of the function as \\(x\\) approaches positive and negative infinity.<br><br>Step 4: Since the highest degree term is \\(2x^3\\), which dominates the function, the range of \\(f(x)\\) will also be all real numbers, \\((-\\infty, \\infty)\\).<br><br>Conclusion: The domain and range of \\(f(x) = 2x^3 - x\\) are both \\((-\\infty, \\infty)\\). The correct answer is Option A."
},
{
  "Q": "Find and simplify the function \\((g-f)(x)\\), given that \\(f(x) = x - 1\\) and \\(g(x) = x^2 - 1\\).",
  "A": "x - 1",
  "B": "x + 1",
  "C": "x - 2",
  "D": "x(x - 1)",
  "E": "x + 2",
  "Ans": "A",
  "Solution": "Step 1: Understand that \\((g - f)(x)\\) represents the difference between the two functions \\(g(x)\\) and \\(f(x)\\).<br><br>Step 2: Substitute the given functions into the expression:<br><br>\\((g - f)(x) = (x^2 - 1) - (x - 1)\\)<br><br>Step 3: Distribute the subtraction across the terms:<br><br>\\((g - f)(x) = x^2 - 1 - x + 1\\)<br><br>Step 4: Simplify the expression by combining like terms:<br><br>\\((g - f)(x) = x^2 - x\\)<br><br>Conclusion: The simplified expression for \\((g - f)(x)\\) is \\(x^2 - x\\), which corresponds to Option A."
},
{
  "Q": "Find the average rate of change of \\(g(t) = t^2 + 3t + 1\\) on the interval \\([0, a]\\).",
  "A": "a - 3",
  "B": "a + 3",
  "C": "a - 2",
  "D": "a + 2",
  "E": "a - 4",
  "Ans": "B",
  "Solution": "Step 1: The average rate of change of a function on an interval \\([0, a]\\) is given by \\(\\frac{g(a) - g(0)}{a - 0}\\).<br><br>Step 2: First, calculate \\(g(a)\\):<br><br>\\(g(a) = a^2 + 3a + 1\\).<br><br>Step 3: Now, calculate \\(g(0)\\):<br><br>\\(g(0) = 0^2 + 3(0) + 1 = 1\\).<br><br>Step 4: Substitute these values into the average rate of change formula:<br><br>\\(\\frac{g(a) - g(0)}{a - 0} = \\frac{a^2 + 3a + 1 - 1}{a} = \\frac{a^2 + 3a}{a} = a + 3\\).<br><br>Conclusion: The average rate of change of \\(g(t)\\) on the interval \\([0, a]\\) is \\(a + 3\\), which corresponds to Option B."
},
{
  "Q": "Using the function provided, find \\(f(g(x))\\). Given \\(f(x) = 2x + 1\\) and \\(g(x) = 3 - x\\).",
  "A": "7 + 2x",
  "B": "7 - 2x",
  "C": "-2x + 2",
  "D": "2x - 1",
  "E": "5x - 4",
  "Ans": "B",
  "Solution": "Step 1: To find \\(f(g(x))\\), substitute \\(g(x)\\) into \\(f(x)\\):<br><br>\\(f(g(x)) = 2(3 - x) + 1\\).<br><br>Step 2: Distribute and simplify:<br><br>\\(f(g(x)) = 6 - 2x + 1 = 7 - 2x\\).<br><br>Conclusion: The expression for \\(f(g(x))\\) is \\(7 - 2x\\), which corresponds to Option B."
},
{
  "Q": "Find the domain of the function \\(f(x) = \\sqrt{7 - x}\\).",
  "A": "\\((-\\infty, 7)\\)",
  "B": "\\((-\\infty, 7]\\)",
  "C": "\\((-\\infty, -7)\\)",
  "D": "\\((-\\infty, 4)\\)",
  "E": "\\((-\\infty, \\infty)\\)",
  "Ans": "A",
  "Solution": "Step 1: The domain of a square root function is the set of all values for which the expression inside the square root is non-negative.<br><br>Step 2: For \\(\\sqrt{7 - x}\\), we need to solve the inequality \\(7 - x \\geq 0\\).<br><br>Step 3: Solving the inequality, we get \\(x \\leq 7\\).<br><br>Conclusion: The domain of the function \\(f(x) = \\sqrt{7 - x}\\) is \\((-\\infty, 7]\\), which corresponds to Option A."
},
  {
  "Q": "Write the formula for the graph shown below.",
   "img": "IMG_20241008_165914.jpg",
  "A": "\\(h(x) = \\sqrt{x + 1} + 2\\)",
  "B": "\\(h(x) = \\sqrt{x - 1} + 2\\)",
  "C": "\\(h(x) = \\sqrt{x - 2} + 2\\)",
  "D": "\\(h(x) = \\sqrt{x - 1}\\)",
  "E": "\\(h(x) = \\sqrt{x - 5} + 2\\)",
  "Ans": "B",
},
  {
  "Q": "A function g(x) is given in the figure below, <brFind g(3).",
   "img": "IMG_20241008_165937.jpg",
  "A": "4",
  "B": "2",
  "C": "5",
  "D": "1",
  "E": "6",
  "Ans": "D",
},
  {
  "Q": "A function g(x) is given in the figure below, <br>Find \\(g^{-1}(3)\\).",
   "img": "IMG_20241008_165937.jpg",
  "A": "1",
  "B": "5",
  "C": "7",
  "D": "9",
  "E": "2",
  "Ans": "B",
},
{
  "Q": "For the function \\(f(x) = |4x + 1| - 7\\), find the values of x such that \\(f(x) = 0\\).",
  "A": "x = 1.5 or x = -2",
  "B": "x = 1.6 or x = -2",
  "C": "x = 1.5 or x = 2",
  "D": "x = 1.4 or x = -2",
  "E": "x = 1.5 or x = -1",
  "Ans": "A",
  "Solution": "Step 1: Set the function equal to 0: \\(f(x) = |4x + 1| - 7 = 0\\).<br><br>Step 2: Isolate the absolute value term: \\(|4x + 1| = 7\\).<br><br>Step 3: Solve the equation by considering both the positive and negative cases of the absolute value:<br><br>Case 1: \\(4x + 1 = 7\\)<br><br>Solve for x: \\(4x = 6\\), so \\(x = 1.5\\).<br><br>Case 2: \\(4x + 1 = -7\\)<br><br>Solve for x: \\(4x = -8\\), so \\(x = -2\\).<br><br>Conclusion: The values of x such that \\(f(x) = 0\\) are \\(x = 1.5\\) or \\(x = -2\\), which corresponds to Option A."
},
{
  "Q": "If \\(f(x) = \\frac{1}{x+2}\\) and \\(g(x) = \\frac{1}{2} - x\\), is \\(g = f^{-1}\\)?",
  "A": "Yes",
  "B": "No",
  "C": "Maybe",
  "D": "Not applicable",
  "E": "All of the above",
  "Ans": "B",
  "Solution": "Step 1: To determine if \\(g(x)\\) is the inverse of \\(f(x)\\), we need to verify if \\(f(g(x)) = x\\) and \\(g(f(x)) = x\\).<br><br>Step 2: Compute \\(f(g(x))\\):<br><br>\\(f(g(x)) = f\\left(\\frac{1}{2} - x\\right) = \\frac{1}{\\left(\\frac{1}{2} - x\\right) + 2} = \\frac{1}{\\frac{5}{2} - x}\\).<br><br>This does not simplify to x, so \\(g(x)\\) is not the inverse of \\(f(x)\\).<br><br>Conclusion: \\(g(x)\\) is not the inverse of \\(f(x)\\), so the correct answer is Option B."
},
{
  "Q": "Find the inverse of the function \\(f(x)=\\frac{2}{x-3}+4\\)",
  "A": "\\(f^{-1}(1)=\\frac{2}{x+4}+3\\)",
  "B": " \\(f^{-1}(1)=\\frac{2}{x-4}+3\\)",
  "C": "\\(f^{-1}(1)=\\frac{5}{x+4}+3\\)",
  "D": "\\(f^{-1}(1)=\\frac{2}{x+4}-3\\)",
  "E": "\\(f^{-1}(1)=\\frac{2}{x+4}+4\\)",
  "Ans": "B",
  "Solution": "Step 1: Start with the function \\(f(x)=\\frac{2}{x-3}+4\\).<br><br>Step 2: Replace \\(f(x)\\) with y: \\(y = \\frac{2}{x-3}+4\\).<br><br>Step 3: Solve for x in terms of y:<br>\\(y - 4 = \\frac{2}{x-3}\\)<br>\\(x - 3 = \\frac{2}{y-4}\\)<br>\\(x = \\frac{2}{y-4} + 3\\)<br><br>Step 4: Replace y with x to express the inverse: \\(f^{-1}(x) = \\frac{2}{x-4}+3\\).<br><br>Conclusion: The inverse function \\(f^{-1}(x)\\) is \\(\\frac{2}{x-4}+3\\), which corresponds to Option B."
},
{
  "Q": "The circumference C of a circle as a function of its radius is given by \\(C(r)= 2πr\\).<br>Express the radius of a circle as a function of its circumference. Call this function r(C).",
  "A": "\\(r(c)=\\frac{2π}{c}\\)",
  "B": "\\(r(c)=\\frac{π}{c}\\)",
  "C": "\\(r(c)=\\frac{C}{2π}\\)",
  "D": "\\(r(c)=\\frac{2π}{9}\\)",
  "E": "\\(r(c)=\\frac{4π}{c}\\)",
  "Ans": "C",
  "Solution": "Step 1: Start with the given function \\(C(r) = 2πr\\).<br><br>Step 2: Solve for r in terms of C:<br>\\(r = \\frac{C}{2π}\\)<br><br>Step 3: Express the radius as a function of the circumference:<br>\\(r(C) = \\frac{C}{2π}\\).<br><br>Conclusion: The radius function \\(r(C)\\) is \\(\\frac{C}{2π}\\), which corresponds to Option C."
},
{
  "Q": "The circumference C of a circle as a function of its radius is given by \\(C(r)= 2πr\\).<br> Find r(36π).",
  "A": "8 units",
  "B": "4 units",
  "C": "3 units",
  "D": "7 units",
  "E": "18 units",
  "Ans": "E",
  "Solution": "Step 1: Start with the given circumference formula: \\(C(r) = 2πr\\).<br><br>Step 2: To find r when \\(C = 36π\\), set up the equation:<br>\\(36π = 2πr\\)<br><br>Step 3: Solve for r:<br>\\(r = \\frac{36π}{2π} = 18\\) units.<br><br>Conclusion: The radius r is 18 units, which corresponds to Option E."
},
{
  "Q": "Find the inverse of the function \\(f(x)=2+\\sqrt{x+4}\\).",
  "A": "\\(f^{-1}(x)=(x-2)^2+4\\)",
  "B": "\\(f^{-1}(x)=(x+2)^2+4\\)",
  "C": "\\(f^{-1}(x)=(x-2)^2-4\\)",
  "D": "\\(f^{-1}(x)=(x-3)^2+4\\)",
  "E": "\\(f^{-1}(x)=(x-2)^2+5\\)",
  "Ans": "C",
  "Solution": "Step 1: Start with the function \\(f(x) = 2 + \\sqrt{x+4}\\).<br><br>Step 2: Replace \\(f(x)\\) with y: \\(y = 2 + \\sqrt{x+4}\\).<br><br>Step 3: Solve for x in terms of y:<br>\\(y - 2 = \\sqrt{x+4}\\)<br>\\((y - 2)^2 = x + 4\\)<br>\\(x = (y - 2)^2 - 4\\)<br><br>Step 4: Replace y with x to express the inverse: \\(f^{-1}(x) = (x - 2)^2 - 4\\).<br><br>Conclusion: The inverse function \\(f^{-1}(x)\\) is \\((x - 2)^2 - 4\\), which corresponds to Option C."
},
{
  "Q": "Function h is defined by \\(h(x) = 3x^2 - 7x - 5\\). Find \\(h(x - 2)\\).",
  "A": "3x² - 19x + 21",
  "B": "3x² + 19x + 21",
  "C": "3x² - 19x + 1",
  "D": "3x² - 19x + 2",
  "E": "x² - 19x + 21",
  "Ans": "A",
  "Solution": "Step 1: Start with the given function \\(h(x) = 3x^2 - 7x - 5\\).<br><br>Step 2: Substitute \\(x - 2\\) into the function in place of x:<br>\\(h(x - 2) = 3(x - 2)^2 - 7(x - 2) - 5\\).<br><br>Step 3: Expand and simplify the expression:<br>\\(h(x - 2) = 3(x^2 - 4x + 4) - 7(x - 2) - 5\\)<br>\\(= 3x^2 - 12x + 12 - 7x + 14 - 5\\)<br>\\(= 3x^2 - 19x + 21\\).<br><br>Conclusion: The correct expression is \\(3x^2 - 19x + 21\\), which corresponds to Option A."
},
{
  "Q": "Let \\(A = \\{1, 2, 3\\}\\) and \\(B = \\{a, b, c, d\\}\\). Which of the following is a one-to-one function?",
  "A": "{(1, c), (2, c), (2, c)}",
  "B": "{(1, a), (2, b), (3, c)}",
  "C": "{(1, b), (2, c), (2, c)}",
  "D": "{(1, c), (2, d), (2, c)}",
  "E": "{(1, c), (2, c), (2, d)}",
  "Ans": "B",
  "Solution": "Step 1: A one-to-one function must map each element in set A to a unique element in set B.<br><br>Step 2: Examine each option to see if each element in set A is mapped to a distinct element in set B:<br>- Option A: {(1, c), (2, c), (2, c)} has repeated mappings for 2, so it's not one-to-one.<br>- Option B: {(1, a), (2, b), (3, c)} maps 1 to a, 2 to b, and 3 to c, which is a one-to-one function.<br>- Option C: {(1, b), (2, c), (2, c)} has repeated mappings for 2, so it's not one-to-one.<br>- Option D: {(1, c), (2, d), (2, c)} has repeated mappings for 2, so it's not one-to-one.<br>- Option E: {(1, c), (2, c), (2, d)} has repeated mappings for 2, so it's not one-to-one.<br><br>Conclusion: The correct one-to-one function is Option B."
},
{
  "Q": "The function \\(f(x) = -2x^3 - 9x^2 - 12x + 1\\) is an increasing function in the interval",
  "A": "-2 < x < -1",
  "B": "-2 < x < 1",
  "C": "-1 < x < 2",
  "D": "1 < x < 2",
  "E": "None",
  "Ans": "A",
  "Solution": "Step 1: Find the derivative of the function to determine where it is increasing or decreasing:<br>\\(f'(x) = -6x^2 - 18x - 12\\).<br><br>Step 2: Set the derivative equal to zero to find critical points:<br>\\(-6x^2 - 18x - 12 = 0\\).<br>Divide through by -6:<br>\\(x^2 + 3x + 2 = 0\\).<br><br>Step 3: Factor the quadratic equation:<br>\\((x + 1)(x + 2) = 0\\).<br><br>Step 4: The critical points are \\(x = -1\\) and \\(x = -2\\).<br>Use these points to test intervals around them to determine where the function is increasing:<br>For \\(-2 < x < -1\\), the derivative is positive, indicating that the function is increasing in this interval.<br><br>Conclusion: The function is increasing in the interval \\(-2 < x < -1\\), which corresponds to Option A."
},
{
  "Q": "If \\(f(x) = x - 7\\) and \\(g(x) = 2x + 9\\), find \\((f + g)(x)\\)",
  "A": "x - 2",
  "B": "3x + 2",
  "C": "2x + 3",
  "D": "x - 3",
  "E": "x - 1",
  "Ans": "B",
  "Solution": "Step 1: The sum of two functions \\(f(x)\\) and \\(g(x)\\) is given by \\((f + g)(x) = f(x) + g(x)\\).<br><br>Step 2: Substitute the given functions into the expression:<br>\\((f + g)(x) = (x - 7) + (2x + 9)\\).<br><br>Step 3: Simplify the expression:<br>\\((f + g)(x) = x - 7 + 2x + 9\\)<br>\\((f + g)(x) = 3x + 2\\).<br><br>Conclusion: The correct expression is \\(3x + 2\\), which corresponds to Option B."
},
{
  "Q": "If we find that \\(\\left(\\frac{f}{g}\\right) (x) = \\frac{7x + 1}{x + 2}\\), what restriction do we have to put on x, so that we don't end up with a zero denominator?",
  "A": "x ≠ 0",
  "B": "x ≠ 2",
  "C": "x ≠ -2",
  "D": "x ≠ 3",
  "E": "x ≠ 4",
  "Ans": "C",
  "Solution": "Step 1: Identify the denominator of the fraction, which is \\(x + 2\\).<br><br>Step 2: Set the denominator equal to zero to find the restriction on x:<br>\\(x + 2 = 0\\).<br><br>Step 3: Solve for x:<br>\\(x = -2\\).<br><br>Conclusion: To avoid a zero denominator, x must not equal -2. Therefore, the restriction is \\(x ≠ -2\\), which corresponds to Option C."
},
{
  "Q": "Find the range of \\(f(x) = |x - 2| + 3\\)",
  "A": "(3, +∞)",
  "B": "(-∞, +∞)",
  "C": "(3, +∞)",
  "D": "(2, +∞)",
  "E": "(-∞, 4)",
  "Ans": "C",
  "Solution": "Step 1: The function \\(f(x) = |x - 2| + 3\\) represents a vertical shift of the absolute value function \\(|x - 2|\\) upwards by 3 units.<br><br>Step 2: The minimum value of the absolute value function \\(|x - 2|\\) is 0, which occurs when \\(x = 2\\).<br><br>Step 3: Therefore, the minimum value of \\(f(x)\\) is \\(0 + 3 = 3\\). The function increases without bound as \\(x\\) moves away from 2.<br><br>Conclusion: The range of the function is \\((3, +∞)\\), which corresponds to Option C."
},
{
  "Q": "Functions g and h are given by g(x) = \\(\\sqrt{x-1}\\) and h(x) = x² + 1. Find the composite function (g ° h)(x).",
  "A": "x²",
  "B": "2x",
  "C": "x³",
  "D": "|x|",
  "E": "4x²",
  "Ans": "D",
  "Solution": "Step 1: Start with the definition of the composite function \\((g ° h)(x)\\), which means applying h(x) first and then applying g(x) to the result.<br><br>Step 2: Substitute the expression for h(x) into g(x):<br>\\(h(x) = x² + 1\\), so \\(g(h(x)) = g(x² + 1)\\).<br><br>Step 3: Now apply the function g(x) to this result:<br>\\(g(x² + 1) = \\sqrt{(x² + 1) - 1} = \\sqrt{x²} = |x|\\).<br><br>Conclusion: The composite function \\((g ° h)(x)\\) simplifies to \\(|x|\\), which corresponds to Option D."
},
{
  "Q": "Find the range of f(x) = -x² - 10.",
  "A": "(-∞, 10)",
  "B": "(-∞, 9)",
  "C": "(-∞, -10)",
  "D": "(-∞, 9)",
  "E": "(∞, 10)",
  "Ans": "C",
  "Solution": "Step 1: Recognize that the function is a downward-opening parabola, as indicated by the negative sign in front of the x² term.<br><br>Step 2: The vertex form of a quadratic function is given by \\(f(x) = a(x-h)² + k\\), where the vertex is at the point \\((h, k)\\).<br><br>Step 3: For the function \\(f(x) = -x² - 10\\), the vertex occurs at the maximum point. Since there's no horizontal shift, the vertex is at \\((0, -10)\\).<br><br>Step 4: Because the parabola opens downwards, the range is all the values below -10, meaning \\(-∞ < y ≤ -10\\).<br><br>Conclusion: The correct range is \\((-∞, -10)\\), which corresponds to Option C."
},
{
  "Q": "Is the graph shown below that of a function?",
  "img": "IMG_20241008_170004.jpg",
  "A": "yes",
  "B": "no",
  "C": "maybe",
  "D": "none of the above",
  "E": "all of the above",
  "Ans": "B",
},
{
  "Q": "Evaluate the function f(x) = x² - 3x + 4 at a + h.",
  "A": "a² + 2ah + h² - 3a - 3h + 4",
  "B": "a² + ah + h² - 3a - 3h - 4",
  "C": "a² + 2ah + h² - 3a - 5h + 4",
  "D": "2a² + 2ah + h² - 3a - 3h + 4",
  "E": "2a² + 2ah + 2h² - 3a - 3h + 4",
  "Ans": "A",
  "Solution": "Step 1: Start by substituting \\(a + h\\) into the function f(x):<br>\\(f(a + h) = (a + h)² - 3(a + h) + 4\\).<br><br>Step 2: Expand \\((a + h)²\\) and \\(-3(a + h)\\):<br>\\((a + h)² = a² + 2ah + h²\\)<br>\\(-3(a + h) = -3a - 3h\\).<br><br>Step 3: Combine all the terms:<br>\\(f(a + h) = a² + 2ah + h² - 3a - 3h + 4\\).<br><br>Conclusion: The correct expanded form is \\(a² + 2ah + h² - 3a - 3h + 4\\), which corresponds to Option A."
},
{
  "Q": "Given the graph below, solve for f(x) = -3",
  "img": "IMG_20241008_170031.jpg",
  "A": "2",
  "B": "-3",
  "C": "4",
  "D": "1",
  "E": "5",
  "Ans": "A",
},
{
  "Q": "Given the function g(x) = 5 - x², simplify \\(\\frac{g(x + h) - g(x)}{h}, h ≠ 0.\\)",
  "A": "2x + h",
  "B": "x + h",
  "C": "-(2x + h)",
  "D": "x - h",
  "E": "-(x + h)",
  "Ans": "C",
  "Solution": "Step 1: Calculate \\(g(x + h)\\):<br>\\(g(x + h) = 5 - (x + h)² = 5 - (x² + 2xh + h²) = 5 - x² - 2xh - h²\\).<br><br>Step 2: Subtract \\(g(x)\\) from \\(g(x + h)\\):<br>\\(g(x + h) - g(x) = (5 - x² - 2xh - h²) - (5 - x²) = -2xh - h²\\).<br><br>Step 3: Divide by \\(h\\) (since \\(h ≠ 0\\)):<br>\\(\\frac{g(x + h) - g(x)}{h} = \\frac{-2xh - h²}{h} = -2x - h\\).<br><br>Conclusion: The simplified expression is \\(-(2x + h)\\), which corresponds to Option C."
},
{
  "Q": "Evaluate the function f(x) = |x - 1| - |x + 1| at f(2)",
  "A": "2",
  "B": "-1",
  "C": "-3",
  "D": "-2",
  "E": "4",
  "Ans": "D",
  "Solution": "Step 1: Substitute \\(x = 2\\) into the function \\(f(x)\\):<br>\\(f(2) = |2 - 1| - |2 + 1| = |1| - |3|\\).<br><br>Step 2: Simplify the absolute values:<br>\\(|1| = 1\\) and \\(|3| = 3\\).<br><br>Step 3: Subtract the absolute values:<br>\\(f(2) = 1 - 3 = -2\\).<br><br>Conclusion: The value of \\(f(2)\\) is \\(-2\\), which corresponds to Option D."
},
{
  "Q": "Given that the function k(t) = 2t - 1; solve k(t) = 7.",
  "A": "3",
  "B": "2",
  "C": "1",
  "D": "9",
  "E": "4",
  "Ans": "E",
  "Solution": "Step 1: Set the function equal to 7 and solve for t:<br>\\(k(t) = 2t - 1\\).<br>\\(2t - 1 = 7\\).<br><br>Step 2: Add 1 to both sides:<br>\\(2t = 8\\).<br><br>Step 3: Divide both sides by 2:<br>\\(t = 4\\).<br><br>Conclusion: The solution for \\(t\\) is 4, which corresponds to Option E."
},
{
  "Q": "Given that the function f(x) = x² + 2x, simplify \\(\\frac{g(x)-g(a)}{x - a}, x≠ a\\).",
  "A": "a + 2",
  "B": "x + 2",
  "C": "x + a + 1",
  "D": "x - a + 1",
  "E": "x + a + 2",
  "Ans": "E",
  "Solution": "Step 1: Substitute \\(f(x) = x² + 2x\\) into the difference quotient:\\(\\frac{f(x) - f(a)}{x - a}\\).<br><br>Step 2: Expand \\(f(x)\\) and \\(f(a)\\):<br>\\(f(x) = x² + 2x\\)<br>\\(f(a) = a² + 2a\\).<br><br>Step 3: Subtract \\(f(a)\\) from \\(f(x)\\):<br>\\(\\frac{(x² + 2x) - (a² + 2a)}{x - a}\\).<br><br>Step 4: Factor the expression:<br>\\(\\frac{(x + a)(x - a) + 2(x - a)}{x - a}\\).<br><br>Step 5: Simplify by canceling out \\(x - a\\):<br>\\(x + a + 2\\).<br><br>Conclusion: The simplified expression is \\(x + a + 2\\), which corresponds to Option E."
},
{
  "Q": "Use the information provided to answer this question.<br> Consider the relationship 3r +2t =18. <br>Write the relationship as a function r = f(t).",
  "A": "\\(r = f(t) = 6 - \\frac{2}{3} t\\)",
  "B": "\\(r = f(t) = 3 - \\frac{2}{3} t\\)",
  "C": "\\(r = f(t) = 6 + \\frac{2}{3} t\\)",
  "D": "\\(r = f(t) = 4 - \\frac{2}{3} t\\)",
  "E": "\\(r = f(t) = 5 + \\frac{2}{3} t\\)",
  "Ans": "A",
  "Solution": "Step 1: Start with the given equation:<br>\\(3r + 2t = 18\\).<br><br>Step 2: Solve for \\(r\\) in terms of \\(t\\):<br>Subtract \\(2t\\) from both sides:<br>\\(3r = 18 - 2t\\).<br><br>Step 3: Divide both sides by 3 to isolate \\(r\\):<br>\\(r = \\frac{18 - 2t}{3}\\).<br><br>Step 4: Simplify the expression:<br>\\(r = 6 - \\frac{2}{3}t\\).<br><br>Conclusion: The relationship as a function of \\(t\\) is \\(r = f(t) = 6 - \\frac{2}{3}t\\), which corresponds to Option A."
},
{
  "Q": "Use the information provided to answer this question. <br>Consider the relationship 3r + 2t = 18.<br>Evaluate f(-3).",
  "A": "5",
  "B": "4",
  "C": "3",
  "D": "6",
  "E": "8",
  "Ans": "E",
  "Solution": "So first of all, the correct option is not in the Maths manual, but we'll still go ahead to solve the correct answer<br><br>Step 1: Start with the given equation:<br>\\(3r + 2t = 18\\).<br><br>Step 2: Write the relationship as a function of \\(r\\) in terms of \\(t\\):<br>Subtract \\(2t\\) from both sides:<br>\\(3r = 18 - 2t\\).<br><br>Step 3: Divide both sides by 3 to isolate \\(r\\):<br>\\(r = 6 - \\frac{2}{3}t\\).<br><br>Step 4: To find \\(f(-3)\\), substitute \\(t = -3\\) into the function:<br>\\(r = 6 - \\frac{2}{3}(-3)\\).<br><br>Step 5: Simplify the expression:<br>\\(r = 6 + 2 = 8\\).<br><br>Conclusion: The value of \\(f(-3)\\) is 8, which corresponds to Option E."
},
{
  "Q": "Use the information provided to answer this question. <br>Consider the relationship 3r + 2t = 18.<br>Solve f(t) = 2",
  "A": "5",
  "B": "4",
  "C": "3",
  "D": "6",
  "E": "8",
  "Ans": "D",
  "Solution": "Step 1: Given the relationship 3r + 2t = 18, express r in terms of t: <br>r = f(t) = 6 - \\(\\frac{2}{3}\\)t.<br><br>Step 2: Set f(t) equal to 2 and solve for t: <br>\\(6 - \\frac{2}{3}t = 2\\)<br><br>Step 3: Subtract 6 from both sides: <br>-\\(\\frac{2}{3}t = -4\\)<br><br>Step 4: Multiply both sides by \\(-\\frac{3}{2}\\) to isolate t: <br>t = 6.<br><br>Conclusion: The correct value of t is 6, which corresponds to Option D."
},
{
  "Q": "Evaluate the expression 3f(1) - 4g(-2) given functions f(x) = 3x - 2 and g(x) = 5 - x².",
  "A": "0",
  "B": "1",
  "C": "-1",
  "D": "2",
  "E": "3",
  "Ans": "C",
  "Solution": "Step 1: Evaluate f(1): <br>f(1) = 3(1) - 2 = 3 - 2 = 1.<br><br>Step 2: Evaluate g(-2): <br>g(-2) = 5 - (-2)² = 5 - 4 = 1.<br><br>Step 3: Substitute f(1) and g(-2) into the expression: <br>3f(1) - 4g(-2) = 3(1) - 4(1) = 3 - 4 = -1.<br><br>Conclusion: The correct answer is -1, which corresponds to Option C."
},
{
  "Q": "Use the given table to answer this question.<br> Evaluate g(3).",
  "img": "IMG_20241008_170056~2.jpg",
  "A": "4",
  "B": "2",
  "C": "5",
  "D": "4",
  "E": "7",
  "Ans": "E",
  "Solution": "Step 1: From the table, when n = 3, g(n) = 7.<br><br>Conclusion: The correct answer is 7, which corresponds to Option E."
},
{
  "Q": "Use the given table to answer this question.<br> Solve g(n) = 6.",
    "img": "IMG_20241008_170056~2.jpg",
  "A": "2 and 4",
  "B": "2 and 3",
  "C": "-2 and 4",
  "D": "5 and 7",
  "E": "1 and 3",
  "Ans": "A",
  "Solution": "Step 1: From the table, g(n) = 6 when n = 2 and n = 4.<br><br>Conclusion: The correct answer is 2 and 4, which corresponds to Option A."
},
{
  "Q": "Evaluate g(10), given the function g(x) = \\((x - 1)^{\\frac{3}{2}}\\).",
  "A": "21",
  "B": "27",
  "C": "9",
  "D": "10",
  "E": "7",
  "Ans": "B",
  "Solution": "Step 1: Substitute x = 10 into the function g(x):<br>g(10) = \\((10 - 1)^{\\frac{3}{2}}\\).<br><br>Step 2: Simplify the expression:<br>g(10) = \\(9^{\\frac{3}{2}}\\) = \\((\\sqrt{9})^3\\) = 3^3 = 27.<br><br>Conclusion: The correct answer is 27, which corresponds to Option B."
},
{
  "Q": "Given the function \\(h(n) = \\sqrt{n - 4}\\), solve h(n) = 2.",
  "A": "1",
  "B": "3",
  "C": "4",
  "D": "8",
  "E": "9",
  "Ans": "D",
  "Solution": "Step 1: Set h(n) equal to 2 and solve for n:<br>\\(\\sqrt{n - 4} = 2\\).<br><br>Step 2: Square both sides to eliminate the square root:<br>n - 4 = 4.<br><br>Step 3: Add 4 to both sides to isolate n:<br>n = 8.<br><br>Conclusion: The correct answer is 8, which corresponds to Option D."
},
{
  "Q": "Identify the graph of the function \\(f(x) =\\frac{1}{x}\\).",
    "img": "IMG_20241008_170056~2.jpg",
  "A": "A",
  "B": "B",
  "C": "C",
  "D": "D",
  "E": "E",
  "Ans": "A"
}
]
    };

        // Populate question block divs
        const questionBlockContainer = document.getElementById('question-block-container');
        questionsData.questions.forEach((question, index) => {
            const div = document.createElement('div');
            div.textContent = `Question ${index + 1}`;
            div.onclick = function() {
                loadQuestion(index + 1);
            };
            questionBlockContainer.appendChild(div);
        });

        // Function to load the selected question
        window.loadQuestion = function(id) {
          currentQuestion = id;
            displayQuestion(id);
        };

        function displayQuestion(id) {
            const question = questionsData.questions[id - 1];
            document.getElementById('question-title').innerText = `Question ${id}`;
            document.getElementById('question-text').innerHTML = question.Q;

            const correctOption = question.Ans;
            const correctAnswerValue = question[correctOption];
            document.getElementById('correct-answer').innerHTML = `Answer: ${correctOption} <br>(${correctAnswerValue})`;

            // Handle image
            const imageElement = document.getElementById('question-image');
            if (question.image) {
                imageElement.src = question.image;
                imageElement.classList.remove('hidden');
            } else {
                imageElement.classList.add('hidden');
            }

            const stepsContainer = document.getElementById('steps-container');
            stepsContainer.innerHTML = formatSolutionSteps(question.Solution);

            document.getElementById('question-blocks').classList.add('hidden');
            document.getElementById('question-container').classList.remove('hidden');

            // Render MathJax (if you're using MathJax)
            MathJax.typeset();

            updateNavButtons();
        }

        function formatSolutionSteps(solution) {
            const stepsArray = solution.split("Step ");
            let formattedSolution = "";

            stepsArray.forEach((step, index) => {
                if (step.trim() !== "") {
                    formattedSolution += `<div class="step"><b>Step ${index}:</b> ${step.trim()}</div>`;
                }
            });

            return formattedSolution;
        }

        // Navigation functions
        window.navigateQuestion = function(direction) {
        if (direction === 'next' && currentQuestion < questionsData.questions.length) {
            currentQuestion++;
            displayQuestion(currentQuestion);
        } else if (direction === 'prev' && currentQuestion > 1) {
            currentQuestion--;
            displayQuestion(currentQuestion);
        }
    };

    // Function to update navigation buttons
    function updateNavButtons() {
        document.getElementById('prev-button').style.visibility = currentQuestion > 1 ? 'visible' : 'hidden';
        document.getElementById('next-button').style.visibility = currentQuestion < questionsData.questions.length ? 'visible' : 'hidden';
    }

        window.goBack = function() {
            document.getElementById('question-blocks').classList.remove('hidden');
            document.getElementById('question-container').classList.add('hidden');
        };
    
                    
    // Data for questions
    
}