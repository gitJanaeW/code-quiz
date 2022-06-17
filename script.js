// VARIABLES
// getting vars
var mainSectionEl = document.querySelector("#main"); // OFFICE HOURS: Is getting an element by its class appropriate? Should it always be by its id?
var answersBox = document.querySelector("#answer");
var time = document.querySelector(".time");
// created elements
var h1El = document.createElement("h1");
var pEl = document.createElement("p");
var startBtnEl = document.createElement("button");
var answer1 = document.createElement("button");
var answer2 = document.createElement("button");
var answer3 = document.createElement("button");
var rightAnswer = document.createElement("button");
var feedback = document.createElement("h2");
// question / answer objects
var q1 = {
    question: "What do you think about Question 1?",
    answers: {
        answer1: "Question 1 Answers",
        answer2: "Question 1 Answers",
        answer3: "Question 1 Answers",
        rightAnswer: "Question 1 Right Answer"
    }
}
var q2 = {
    question: "What do you think about Question 2?",
    answers: {
        answer1: "Question 2 Answers",
        answer2: "Question 2 Answers",
        answer3: "Question 2 Answers",
        rightAnswer: "Question 2 Right Answer"
    }
}
var q3 = {
    question: "What do you think about Question 3?",
    answers: {
        answer1: "Question 3 Answers",
        answer2: "Question 3 Answers",
        answer3: "Question 3 Answers",
        rightAnswer: "Question 3 Right Answer"
    }
}
var q4 = {
    question: "What do you think about Question 4?",
    answers: {
        answer1: "Question 4 Answers",
        answer2: "Question 4 Answers",
        answer3: "Question 4 Answers",
        rightAnswer: "Question 4 Right Answer"
    }
}
var q5 = {
    question: "What do you think about Question 5?",
    answers: {
        answer1: "Question 5 Answers",
        answer2: "Question 5 Answers",
        answer3: "Question 5 Answers",
        rightAnswer: "Question 5 Right Answer"
    }
}
var q6 = {
    question: "What do you think about Question 6?",
    answers: {
        answer1: "Question 6 Answers",
        answer2: "Question 6 Answers",
        answer3: "Question 6 Answers",
        rightAnswer: "Question 6 Right Answer"
    }
}
// questions/answers arrays
var questionsArr = [q1, q2, q3, q4, q5, q6];
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
    for(var i = 1; i < homePage.length; i++){
        homePage[i].remove();
    }
    printQuestion();
};

// RANDOMIZER
function randomize(min, max){
    // Creating randomizer function
    var randomValue = Math.floor((Math.random() * max + 1 - min) + min);
    return randomValue;
}

function printQuestion(){
    // Store random number so that it can be tracked throughout function
    var randomQuestionNum = randomize(0, questionsArr.length);
    console.log("Array value", randomQuestionNum);

    // Change h1 to random question
    h1El.textContent =  questionsArr[randomQuestionNum].question;
    
    // Print a random object's question
    for(var i = 0; i < questionsArr[randomQuestionNum].answers; i++){
        answersBox.appendChild(questionsArr[randomQuestionNum].answers[i]);
    }
    
    // Print out the questions answers in a random order (NOT RANDOMIZED YET)
    for(var i = 0; i < answersArr.length; i++){
        answersArr[i].className = "btn";
        answersArr[i].setAttribute("id", "answer-btn");
        answersArr[i].innerHTML = "<p>" + answersArr[i] + "<p>";
        answersBox.appendChild(answersArr[i]);
    }
    // Remove question objects that have already been asked, by pushing them to a different array. (Might hypothetically be useful to keep questions and values for feature updates)
}