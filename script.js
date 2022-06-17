// VARIABLES
// getting vars
var mainSectionEl = document.querySelector("#main"); // OFFICE HOURS: Is getting an element by its class appropriate? Should it always be by its id?
var time = document.querySelector(".time");
// created elements
var h1El = document.createElement("h1");
var pEl = document.createElement("p");
var newBtn = document.createElement("button");
var startBtnEl = newBtn;
var answer1 = newBtn;
var answer2 = newBtn;
var answer3 = newBtn;
var rightAnswer = newBtn;
var feedback = document.createElement("h2");
// question / answer objects
var q1 = {
    question: "What do you think about Question 1?",
    answers: ["Question 1 Answers", "Question 1 Answers", "Question 1 Answers", "Right Answer"]
}
var q2 = {
    question: "What do you think about Question 2?",
    answers: ["Question 2 Answers", "Question 2 Answers", "Question 2 Answers", "Right Answer"]
}
var q3 = {
    question: "What do you think about Question 3?",
    answers: ["Question 3 Answers", "Question 3 Answers", "Question 3 Answers", "Right Answer"]
}
var q4 = {
    question: "What do you think about Question 4?",
    answers: ["Question 4 Answers", "Question 4 Answers", "Question 4 Answers", "Right Answer"]
}
var q5 = {
    question: "What do you think about Question 5?",
    answers: ["Question 5 Answers", "Question 5 Answers", "Question 5 Answers", "Right Answer"]
}
var q6 = {
    question: "What do you think about Question 6?",
    answers: ["Question 6 Answers", "Question  Answers", "Question 6 Answers", "Right Answer"]
}
// arrays
var questionsArr = [q1, q2, q3, q4, q5, q6];
var homePage = [h1El, pEl, startBtnEl];
var finishedQuestions = [];

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
function clearHomePage(){
    // Remove home page
    for(var i = 1; i < homePage.length; i++){
        homePage[i].remove();
    }
};

function createNewPage(){
    // Store random number so that it doesn't randomize whenever mentioned
    var randomQuestionNum = randomize(0, questionsArr.length);
    console.log("Array value", randomQuestionNum);
    // Stores value of the current question object
    var currentQuestion = questionsArr[randomQuestionNum];

    // Change h1 to a random question
    h1El.textContent =  currentQuestion.question;
    // Create a current question "answers value var"
    var currentAnswer = currentQuestion.answers;

    // Create a ul in mainSectionEl
    var answersListEl = document.createElement("ul");
    answersListEl.setAttribute("id", "answers");
    mainSectionEl.appendChild(answersListEl);
    // Randomize current answer array
    shuffle(currentAnswer);
    // Create an li for each item in currentAnswer array
    // NOTE: forEach() reference from: https://gomakethings.com/two-more-ways-to-create-html-from-an-array-of-data-with-vanilla-js/
    currentAnswer.forEach(function(currentAnswer){
        var answer = document.createElement("li");
        answer.innerHTML = "<button id='answer-btn' class='btn'>" + currentAnswer + "</button>";
        answersListEl.appendChild(answer);
    });
}

// RANDOMIZER
function randomize(min, max){
    // Creating randomizer function
    var randomValue = Math.floor((Math.random() * max - min) + min);
    return randomValue;
}

// INDEX SHUFFLER (source: https://www.youtube.com/watch?v=tLxBwSL3lPQ)
function shuffle(arr){
    // In one line of code, create three vars that store the i's length, randomized j and the random index position
    var i = arr.length, j, indexPosition;
    // Starting at arr.length (ie. "i") and incremening DOWN until 1...
    while(--i > 0){
        // Assign j a random value between arr's index length + 1 and 0
        j = randomize(0, i+1);
        // indexPosition will placehold the randomly selected index value
        indexPosition = arr[j];
        // random index placement = incremental index placement
        arr[j] = arr[i];
        // incremental index placement will claim indexPosition's value
        arr[i] = indexPosition;
    }
    // Return shuffled index
    return arr;
}

function startQuiz(){
    clearHomePage();
    createNewPage();
    startTimer();
    
    

    finishedQuestionsHandler();
}

function finishedQuestionsHandler(){
    // Remove question objects that have already been asked, by pushing them to a different array. (Might hypothetically be useful to keep questions and values for feature updates)
    currentQuestion.push(finishedQuestions);
    console.log(finishedQuestions);
    delete currentQuestion;
}
    