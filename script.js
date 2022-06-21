// VARIABLES
// getting vars
var mainSectionEl = document.querySelector("#main"); // OFFICE HOURS: Is getting an element by its class appropriate? Should it always be by its id?
var timeLeftEl = document.querySelector("#time-counter");
var timer = document.querySelector(".time");
var highScoreBtn = document.querySelector("#high-score-btn");
// created elements
var h1El = document.createElement("h1");
var pEl = document.createElement("p");
var answerFeedback = document.createElement("h2");
var formEl = document.createElement("form");
var playerNameEl = document.createElement("input");
var answersListEl = document.createElement("ul");
var startBtnEl = document.createElement("button");
var rightAnswer = document.createElement("button");
// incrementors
var countNum = 50;
var countNum2 = 0;
var countNum3 = 0;
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
// misc
var userScore = {
    name: "",
    score: 0
};
var currentQuestion = null;
var moreQuestions = true;

function createHomePage(){
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
    // Setiing a ul in mainSectionEl for later (must be global so answers can be checked
    answersListEl.setAttribute("id", "answers");
    mainSectionEl.appendChild(answersListEl);
}


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

function createFinalScorePage(){
    // Remove previous elements
    answerFeedback.remove();
    answersListEl.remove();
    // New main element append
    mainSectionEl.appendChild(formEl);
    // Change h1 header
    h1El.textContent = "All Done!";
    // Show score
    var scoreEl = document.createElement("p");
    scoreEl.setAttribute("id", "results-p");
    scoreEl.textContent = "Your score is " + countNum + ".";
    formEl.appendChild(scoreEl);
    // Label for input
    var labelEl = document.createElement("label");
    labelEl.setAttribute("for", "username");
    labelEl.textContent = ("Your username: ");
    formEl.appendChild(labelEl);
    // Input player name
    playerNameEl.setAttribute("id", "username");
    formEl.appendChild(playerNameEl);
    // Insert line break
    var brEl = document.createElement("br");
    formEl.appendChild(brEl);
    // Submit button
    var submitEl = document.createElement("input");
    submitEl.setAttribute("type", "submit");
    submitEl.setAttribute("id", "submit-btn");
    submitEl.className = "btn";
    submitEl.innerHTML = "<p>Submit</p>";
    formEl.appendChild(submitEl);
}

function createHighScorePage(){
    // Change header text
    h1El.textContent = "High Scores";
    // create ol for scores
    var highScoreListEl = document.createElement("ul");
    mainSectionEl.appendChild(highScoreListEl);
    // Retrieve localStorage
    var collectObj = {};
    var keys = Object.keys(localStorage);
    var i = keys.length;
    while (i--){
        collectObj[keys[i]] = localStorage.getItem(keys[i]);
        console.log(collectObj)
    }
    // Print scores
    var x = 0;
    if(collectObj.length){
        var scoreItemEl = document.createElement("li");
        scoreItemEl.textContent = archive.userScore.name + " " + archive.userScore.score;
        highScoreListEl.appendChild(scoreItemEl);
        x++;
    }

        
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

// RIGHT/WRONG ANSWER HANDLER
function answerHandler(event){
    var targetEl = event.target;
    // if it's target is the right answer button...
    if(targetEl.textContent === currentQuestion.rightAnswer){
        answerFeedback.textContent = "Correct!";
        console.log("Right answer!");
        nextQuestionCounter++;
        seeFeedback(1000);
        clearQuestionPage();
    }
    // if the incorrect target button is clicked...
    if(targetEl.matches(".btn") && targetEl.textContent !== currentQuestion.rightAnswer){
        // Show incorrect answer for a sec
        answerFeedback.textContent = "Incorrect...";
        console.log("Wrong answer...");
        seeFeedback(1000);
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
function seeFeedback(time){
    var timerInterval = setInterval(() => {
        console.log("NEW TIMER", countNum2);
        countNum2++;
        if(countNum2 > 1){
            clearInterval(timerInterval);
            answerFeedback.innerHTML = "";
            countNum2 = 0;
        }
    }, time);
}

// GET PLAYER NAME FUNCTION
function getUserName(){
    debugger;
    // if(!playerNameEl.value){
    //     var messageEl = document.createElement("p");
    //     messageEl.style.color = "red";
    //     messageEl.textContent = "Please enter a username.";
    //     formEl.appendChild(messageEl);
    //     createFinalScorePage();
    // }
    // else{
        var scores = [];
        userScore.name = playerNameEl.value;
        userScore.score = countNum;
        scores.push(userScore);
        console.log(scores);
        localStorage.setItem("User Score - " + countNum3, JSON.stringify(scores));
        countNum3++;
    // }
}


// START QUIZ
createHomePage();
function startQuiz(){
    clearHomePage();
    createQuizPage();
    timerHandler();
}

startBtnEl.addEventListener("click", startQuiz);
answersListEl.addEventListener("click", answerHandler);
formEl.addEventListener("submit", getUserName);
highScoreBtn.addEventListener("click", createHighScorePage);

