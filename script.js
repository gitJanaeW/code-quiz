// VARIABLES
// getting vars
var mainSectionEl = document.querySelector("#main");
var mainP = document.querySelector("#main-p");
var timeLeftEl = document.querySelector("#time-counter");
var timer = document.querySelector(".time");
var highScoreBtn = document.querySelector("#high-score-btn");
// created elements
var h1El = document.createElement("h1");
var pEl = document.createElement("p");
var messageEl = document.createElement("p");
var answerFeedback = document.createElement("h2");
var formEl = document.createElement("form");
var playerNameEl = document.createElement("input");
var answersListEl = document.createElement("ul");
var startBtnEl = document.createElement("button");
var homePageBtn = document.createElement("button");
// incrementors
var countNum = 50;
var countNum2 = 0;
var countNum3 = 0;
var countNum4 = 0;
var timerBreakout = 0;
var nextQuestionCounter = 0;
// question / answer objects
var q1 = {
    question: "Which command allows you to pull back a previous GitHub file state?",
    answers: ["git repull", "git reelback", "git recapture", "git revert"],
    rightAnswer: "git revert"
}
var q2 = {
    question: "What does Math.floor() do?",
    answers: ["Round down to the nearest argued number", "Round down to the nearest multiple of 10", "Round down to the nearest floor", "Round down to the nearest whole number"],
    rightAnswer: "Round down to the nearest whole number"
}
var q3 = {
    question: "How do you create an attribute with no value in JavaScript",
    answers: ["var element.setAttribute(\"hidden\")", "var element.setAttribute = \"hidden\"", "var element.setAttribute() = \"hidden\"", "var element.setAttribute(\"hidden\", \"\")"],
    rightAnswer: "var element.setAttribute(\"hidden\", \"\")"
}
var q4 = {
    question: "What does API stand for?",
    answers: ["Application Programming Icons", "Automatic Program Inferencing", "Automated Programming Interaction", "Application Programming Interface"],
    rightAnswer: "Application Programming Interface"
}
var q5 = {
    question: "Which is an example of a Web API?",
    answers: ["Moment.js", "jQuery", "Bootstrap", "DevTools"],
    rightAnswer: "DevTools"
}
var q6 = {
    question: "Which of the following can be substituted for a \"var example = function(par){}\"?",
    answers: ["example=>(par){}", "example = (par)=>{})", "example === (par)=>{}", "example = (par)=>{}"],
    rightAnswer: "example = (par)=>{}"
}
// arrays
var questionsArr = [q1, q2, q3, q4, q5, q6];
var homePage = [h1El, pEl, startBtnEl];
questionPage = [h1El, answersListEl, answerFeedback]
var finishedQuestions = [];
// misc
var currentQuestion = null;
var moreQuestions = true;
var quizLive = false;

function createHomePage(){
    // HOME SCREEN
    // reset starter value
    timeLeftEl.textContent = 50;
    // Clear results page, if any
    clearFinalScorePage();
    clearHighScores();
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
    // Setting a ul in mainSectionEl for later (must be global so answers can be checked later)
    answersListEl.setAttribute("id", "answers");
    mainSectionEl.appendChild(answersListEl);
}


// CREATE PAGE FUNCTIONS
function createQuizPage(){
    // Pick a questions/answers
    if(nextQuestionCounter < questionsArr.length){
        // Disable the "High Scores" button
        highScoreHandler();
        // Print new question
        currentQuestion = questionsArr[nextQuestionCounter];
        console.log("The current question is: ", currentQuestion)
        var currentAnswer = currentQuestion.answers;
    } else if (nextQuestionCounter === questionsArr.length){
        // fire off your endquiz function or change screen
        clearQuestionPage();
        createFinalScorePage();
    }
    // Randomize current answer array
    shuffle(currentAnswer);

    // Change h1 to new question
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
    // Enable the "High Scores" page
    quizLive = false;
    highScoreHandler();
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

    createHomePageBtn();
    formEl.appendChild(homePageBtn);
}

function createHighScorePage(){
    // Clear previous pages
    clearHomePage();
    clearQuestionPage();

    // Change header text
    h1El.textContent = "High Scores";
    // create ol for scores
    var highScoreList = document.createElement("ol");
    highScoreList.className = "highscores";
    mainSectionEl.appendChild(highScoreList);
    
    // Retrieve localStorage
    var highscores = JSON.parse(localStorage.getItem("userScores")) || [];

    highscores.forEach(function(score){
        var scoreItemEl = document.createElement("li");
        // assign them different classes
        if(countNum4 === 0){
            scoreItemEl.className = "grey-bar";
            countNum4--;
        }else{
            scoreItemEl.className = "pale-bar";
            countNum4++;
        };
        scoreItemEl.innerHTML = "<span>" + score.name + "</span>" + "<span>" + score.score + "</span>";
        console.log("scores forEAch", score.name, score.score);
        //var highScoreListEl = document.createElement("ul");
        highScoreList.append(scoreItemEl);
    }); 

    createHomePageBtn();
    mainSectionEl.appendChild(homePageBtn);
}

function createHomePageBtn(){
    homePageBtn.className = "btn";
    homePageBtn.setAttribute("id", "start-btn");
    homePageBtn.innerHTML = "<p>Home Page</p>";
}

function clearHomePage(){
    // Delete everything on the homepage except the header (which will be reused)
    for(var i = 1; i < homePage.length; i++){
        homePage[i].remove();
    }
    // Reset quiz values
    nextQuestionCounter = 0;
    moreQuestions = true;
};

function clearQuestionPage(){
    // Clear main element children (except h1)
    while(answersListEl.childElementCount > 0){
        answersListEl.children[0].remove();
    }
    // Launch createQuizPage()
    if(currentQuestion !== questionsArr[5]){
        console.log("Printing new array:");
        if(quizLive){
            createQuizPage();  
        }
    }
    else{
        moreQuestions = false;
    }
}

function clearHighScores(){
    while(mainSectionEl.children.length > 0){
        mainSectionEl.children[0].remove();
    }
}

function clearFinalScorePage(){
    while(formEl.children.length > 0){
        formEl.children[0].remove();
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
        return;
    }
    // if the incorrect target button is clicked...
    if(targetEl.matches(".btn") && targetEl.textContent !== currentQuestion.rightAnswer){
        // Show incorrect answer for a sec
        answerFeedback.textContent = "Incorrect...";
        console.log("Wrong answer...");
        seeFeedback(1000);
        countNum -= 10;
        timerWarning();
        return;
    }
}

// ACCESS HIGH SCORES HANDLER
function highScoreHandler(){
    if(quizLive){
        highScoreBtn.setAttribute("disabled", "");
    }
    else{
        highScoreBtn.removeAttribute("disabled", "");
    }
}

// TIMERS
// Countdown timer
function timerHandler(){    
    var timerInterval = setInterval(function(){

        // If the still has time left...
        if(countNum > 0){
            if(!moreQuestions){
                timeLeftEl.textContent = countNum;
                countNum = 50;
                clearInterval(timerInterval);
                createFinalScorePage();
            } // If the player has finished all the questions in questionArr...
            else{
                countNum--;
                timeLeftEl.textContent = countNum;
            }

        } // If the player runs out of time...    
        else{
            countNum = 50;
            timeLeftEl.textContent = countNum;
            clearInterval(timerInterval);
            createFinalScorePage();
        }
        console.log(countNum);
    }, 1000);
    console.log("countNum", countNum);
    // Warn player of low time
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
        countNum2++;
        if(countNum2 > 1){
            clearInterval(timerInterval);
            answerFeedback.innerHTML = "";
            countNum2 = 0;
        }
    }, time);
}

// GET PLAYER NAME FUNCTION
function getUserNameScore(event){
    event.preventDefault();
    messageEl.textContent = "Score saved";
    if(playerNameEl.value === ""){
        messageEl.style.color = "red";
        messageEl.textContent = "Please enter a username.";
        formEl.appendChild(messageEl);
    }
    else{
        messageEl.textContent = "Score saved.";
        formEl.appendChild(messageEl);
        var userScore = {
            name: "",
            score: 0
        };

        userScore.name = playerNameEl.value;
        userScore.score = countNum;
        // Check if localStorage. If not, grab new array
        var highscores = JSON.parse(localStorage.getItem("userScores")) || [];
        // Whatever highscores already contains + new user score is pushed
        highscores.push(userScore);
        // Set new highscores value in localStorage as string
        localStorage.setItem("userScores" , JSON.stringify(highscores));
    }
}

// RANDOMIZERS
function randomize(min, max){
    // Creating randomizer function
    var randomValue = Math.floor((Math.random() * max - min) + min);
    return randomValue;
}

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



// START QUIZ
createHomePage();
function startQuiz(){
    quizLive = true;
    clearHomePage();
    createQuizPage();
    timerHandler();
}

startBtnEl.addEventListener("click", startQuiz);
answersListEl.addEventListener("click", answerHandler);
homePageBtn.addEventListener("click", createHomePage);
formEl.addEventListener("submit", getUserNameScore);
var viewHighScore = highScoreBtn.addEventListener("click", createHighScorePage);
viewHighScore;
