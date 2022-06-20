// VARIABLES
// getting vars
var mainSectionEl = document.querySelector("#main"); // OFFICE HOURS: Is getting an element by its class appropriate? Should it always be by its id?
var timeLeftEl = document.querySelector("#time-counter");
var timer = document.querySelector(".time");
// created elements
var h1El = document.createElement("h1");
var pEl = document.createElement("p");
var newBtn = document.createElement("button");
var answerFeedback = document.createElement("h2");
var startBtnEl = newBtn;
var answer1 = newBtn;
var answer2 = newBtn;
var answer3 = newBtn;
var rightAnswer = newBtn;
var moreQuestions = true;
var countNum = 50;
var countNum2 = 0;
var timerBreakout = 0;
var nextQuestionCounter = 0;
// question / answer objects
var q1 = {
    question: "What do you think about Question 1?",
    answers: ["Question 1 Answers", "Question 1 Answers", "Question 1 Answers", "Right Answer"],
    rightAnswer: "Right Answer"
}
var q2 = {
    question: "What do you think about Question 2?",
    answers: ["Question 2 Answers", "Question 2 Answers", "Question 2 Answers", "Right Answer"],
    rightAnswer: "Right Answer"
}
var q3 = {
    question: "What do you think about Question 3?",
    answers: ["Question 3 Answers", "Question 3 Answers", "Question 3 Answers", "Right Answer"],
    rightAnswer: "Right Answer"
}
var q4 = {
    question: "What do you think about Question 4?",
    answers: ["Question 4 Answers", "Question 4 Answers", "Question 4 Answers", "Right Answer"],
    rightAnswer: "Right Answer"
}
var q5 = {
    question: "What do you think about Question 5?",
    answers: ["Question 5 Answers", "Question 5 Answers", "Question 5 Answers", "Right Answer"],
    rightAnswer: "Right Answer"
}
var q6 = {
    question: "What do you think about Question 6?",
    answers: ["Question 6 Answers", "Question 6 Answers", "Question 6 Answers", "Right Answer"],
    rightAnswer: "Right Answer"
}
// arrays
var questionsArr = [q1, q2, q3, q4, q5, q6];
var homePage = [h1El, pEl, startBtnEl];
questionPage = [h1El, answersListEl, answerFeedback]
var finishedQuestions = [];
// current question
var currentQuestion = null;


// HOME SCREEN
// time starter value
timeLeftEl.textContent = 50;
// setting main
mainSectionEl.setAttribute("id", "main");
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
startBtnEl.innerHTML = "<p>Start Quiz<p>";
mainSectionEl.appendChild(startBtnEl);
// Create a ul in mainSectionEl for later (must be global so answers can be checked
var answersListEl = document.createElement("ul");
answersListEl.setAttribute("id", "answers");
mainSectionEl.appendChild(answersListEl);

// CREATE PAGE FUNCTIONS
function createQuizPage(){
    // Pick a questions/answers
    // debugger;
    if(nextQuestionCounter < questionsArr.length){
        currentQuestion = questionsArr[nextQuestionCounter];
        console.log("The current question is: ", currentQuestion)
        var currentAnswer = currentQuestion.answers;
    }

    // Change h1 to a random question
    h1El.textContent = "" + currentQuestion.question;
    // Create an li for each item in currentAnswer array
    // NOTE: forEach() reference from: https://gomakethings.com/two-more-ways-to-create-html-from-an-array-of-data-with-vanilla-js/
    var x = 1;
    currentAnswer.forEach(function(currentAnswer){ //Couldn't I simplify the shuffle array and buttons if i just made this a "if(mainSectionEl.children.length < 4){make buttons}"?
        var answer = document.createElement("li");
        answer.innerHTML = "<button id='data-answer-btn" + x.toString() + "' class='btn'>" + currentAnswer + "</button>";
        answersListEl.appendChild(answer);
        x++;
    });
    x = 1;
    // Create a response category
    answerFeedback.className = "answer-h2";
    answersListEl.appendChild(answerFeedback);
}

function clearHomePage(){
    for(var i = 1; i < homePage.length; i++){
        homePage[i].remove();
    }
};

function clearQuestionPage(){
    // Clear main element children (except h1)
    while(answersListEl.childElementCount > 0){
        answersListEl.children[0].remove();
    }
    if(currentQuestion !== questionsArr[5]){
        console.log("Printing new array:");
        createQuizPage();
    }
    else{
        moreQuestions = false;
    }
}

function createFinalScorePage(){
    // Remove seeFeedback incase it's still on screen
    answerFeedback.remove();
    // Change h1 header
    h1El.textContent = "All Done!";
    // Show score
    var scoreEl = document.createElement("li");
    scoreEl.setAttribute("id", "main-p");
    scoreEl.textContent = "Your score is " + countNum;
    answersListEl.appendChild(scoreEl);
    // Input player name
    var playerNameListEl = document.createElement("li");
    var playerNameEl = document.createElement("input");
    playerNameListEl.appendChild(playerNameEl);
    answersListEl.appendChild(playerNameListEl);
}

// RIGHT/WRONG ANSWER HANDLER
function answerHandler(event){
    var targetEl = event.target;
    // if it's target is the right answer button...
    if(targetEl.textContent === currentQuestion.rightAnswer){
        answerFeedback.textContent = "Correct!";
        console.log("Right answer!");
        nextQuestionCounter++;
        seeFeedback();
        clearQuestionPage();
    }
    // if the incorrect target button is clicked...
    if(targetEl.matches(".btn") && targetEl.textContent !== currentQuestion.rightAnswer){
        // Show incorrect answer for a sec
        answerFeedback.textContent = "Incorrect...";
        console.log("Wrong answer...");
        seeFeedback();
        countNum -= 10;
        timerWarning();
    }
}

// TIMERS
// Countdown timer
function timerHandler(){
    var timerInterval = setInterval(function(){
        // If the still has time left...
        if(countNum > 1){
            if(!moreQuestions){
                timeLeftEl.textContent = countNum;
                clearInterval(timerInterval);
                clearQuestionPage();
                createFinalScorePage();
            }
            // If the player has finished all the questions in questionArr...
            countNum--;
            timeLeftEl.textContent = countNum;

        } // If the player runs out of time...    
        else{
            countNum = 0;
            timeLeftEl.textContent = countNum;
            clearInterval(timerInterval);
            createFinalScorePage();
        }
        console.log(countNum);
    }, 1000);
    console.log("countNum", countNum);
    // Why isn't this working?
    if(countNum === 5){
        timerWarning();
    }
}
// Draw attention to time with flashing red color
function timerWarning(){
    var timerInterval = setInterval(function(){
        if(timer.style.color === "white"){
            timer.style.color = "red";
            timerBreakout++;
        }
        else{
            timer.style.color = "white";
            timerBreakout++;
        }
        console.log(timerBreakout)
        if(timerBreakout >= 4){
            clearInterval(timerInterval);
        }
    }, 500);
    timer.style.color = "white";
    timerBreakout = 0;
}
// Give user time to see answer feedback
function seeFeedback(){
    var timerInterval = setInterval(() => {
        console.log("NEW TIMER", countNum2);
        countNum2++;
        if(countNum2 > 1){
            clearInterval(timerInterval);
            answerFeedback.innerHTML = "";
            countNum2 = 0;
        }
    }, 1000);
}

// GET PLAYER NAME FUNCTION


// STORAGE FUNCTIONS

// START FUNCTION
function startQuiz(){
    clearHomePage();
    createQuizPage();
    timerHandler();
    // wait for answerHandler() event "click"
}

startBtnEl.addEventListener("click", startQuiz);
answersListEl.addEventListener("click", answerHandler);