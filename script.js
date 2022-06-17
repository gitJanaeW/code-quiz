// VARIABLES
// getting vars
var mainSectionEl = document.querySelector("#main");

// new vars
var h1El = document.createElement("h1");
var pEl = document.createElement("p");
var startBtnEl = document.createElement("button");

// HOME SCREEN
// setting h1El
h1El.setAttribute("id", "main-h1");
h1El.textContent = "Coding Quiz Challenge";
h1El.appendChild(mainSectionEl);

// Setting pEl
pEl.setAttribute("id", "main-p");
pEl.textContent = "Try to answer the following code-related questions within the time limit.<br>Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
pEl.appendChild(mainSectionEl);

// Setting startBtnEl
startBtnEl.className = "btn";
startBtnEl.setAttribute("id", "start-btn");
startBtnEl.innerHTML = "<p>Start Quiz<p>";
startBtnEl.appendChild(mainSectionEl);

// function printNewQuestion(){
//     // reset textContent

//     // establish new textContent
//     newH1El.textContent = "Example";
// }