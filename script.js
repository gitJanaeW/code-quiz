// VARIABLES
// getting vars
var mainSectionEl = document.querySelector("#main"); // OFFICE HOURS: Is getting an element by its class appropriate? Should it always be by its id?

// created elements
var h1El = document.createElement("h1");
var pEl = document.createElement("p");
var startBtnEl = document.createElement("button");
var answer1 = document.createElement("button");
var answer2 = document.createElement("button");
var answer3 = document.createElement("button");
var rightAnswer = document.createElement("button");
var feedback = document.createElement("h2");
// answer array
var questionsArr = [ // Use this to do h1El.textContent = questionsArr[i];
    "Placeholder",
    "Placeholder",
    "Placeholder",
    "Placeholder",
    "Placeholder",
    "Placeholder",
    "Placeholder"
];
var answersArr = [answer1, answer2, answer3, rightAnswer];
// page objects
var homePage = [h1El, pEl, startBtnEl];
var newScreen = [h1El, answersArr, feedback];

// HOME SCREEN
// setting main
mainSectionEl.setAttribute("id", "main")

// setting h1El
h1El.setAttribute("id", "main-h1");
h1El.textContent = "Coding Quiz Challenge";
mainSectionEl.appendChild(h1El);

// Setting pEl
pEl.setAttribute("id", "main-p");
pEl.innerHTML = "Try to answer the following code-related questions within the time limit.<br>Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
mainSectionEl.appendChild(pEl);

// Setting startBtnEl
startBtnEl.className = "btn";
startBtnEl.setAttribute("id", "start-btn");
startBtnEl.setAttribute("onclick", "startQuiz()");
startBtnEl.innerHTML = "<p>Start Quiz<p>";
mainSectionEl.appendChild(startBtnEl);

// QUESTION SETUP


// START QUIZ FUNCTION
function startQuiz(){
    console.log("QUIZ STARTED");
    // Remove home page
    for(var i = 0; i < mainSectionEl.childElementCount; i++){
        homePage[i].remove();
        console.log(homePage[i]);
    }



    // mainSectionEl.removeChild(); TRY THIS TOO

    // h1El.remove();
    // pEl.remove();
    // startBtnEl.remove();


};

// function printNewScreen(){
//     // reset textContent

//     // establish new textContent
//     newH1El.textContent = "Example";
// }

