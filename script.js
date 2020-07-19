let quest = STORE.questions.length;
let something = STORE.numberQuestion;
//start button begin quiz
function handleStart() {
    $(".js-start-btn").on('click', function(event) {
        console.log("Start");
        $('.progress').show();
        $('#intro').hide();
        $('.final').hide();
        $('.quiz-part').show();
        showQuiz();
    });
}
//display quiz
function showQuiz() {
    questionCount();
    renderQuestion();
    renderOption();
    showScore();
}
//update score
function showScore() {
    $(".progress .score").text(`${STORE.score}/${STORE.numberQuestion}`); 
}
//update question number
function questionCount() {
    $(".progress .question-count").text(`Question ${STORE.numberQuestion + 1} of ${quest}`);
}

//display questions and options
function renderOption() {
    let question = STORE.questions[something];
    for (let i = 0; i < question.options.length; i++) {
        $('.options').append(`
        <input id="option${i+1}" type="radio" name="option1" class="dot">
            <span>${question.options[i]}</span>
        `)
    }
}

function renderQuestion() {
    let question = STORE.questions[something];
    const html = $(`
    <form class="question-form">
        <p> ${question.question}</p>
        <hr>
        <label class="options">
        </label>
        <input type="button" value="Submit" class="submit-btn js-submit-btn">
    </form>`)
    console.log(html);
    $("main").html(html);
}

//make submit button work
function submitAnswer() {
    $('.js-submit-btn').on("click", function(event) {
        console.log("Submit");
        let selected = $("input[type=radio]:checked").val()
        if (selected === undefined) {
            displayPopup(false, selected);
        }
        else{
            $("input[type=radio]:checked").attr("checked", false);
            verifyAnswer(selected);
        }
    });
}
//check if answer selected is right or wrong
function verifyAnswer(selected) {
    let correctAnswer = STORE.questions[STORE.numberQuestion].answer;
    if (selected === correctAnswer) {
        STORE.score++;
        displayPopup(true, correctAnswer);
    }
    else{
        displayPopup(false, correctAnswer);
    }
}
//display feedback
function displayPopup(statusFlag, answer) {
    $(".feedback").show();
    if(statusFlag){
        $(".popup #popup-text").text("CORRECT!");
        $(".popup").show();
    }
    else{
        if(answer === undefined) {
            STORE.numberQuestion--;
            $(".popup popup-text").text("You forgot to select an option");
        }
        else{
            $(".popup #popup-text").text(`Sorry, correct answer was ${answer}`);
        }
    }
    $(".popup").show();
}

//make popup be able to be close
function closePopup() {
    $(".js-close-btn").on("click", function(event) {
        $(".popup").hide();
        $(".feedback").hide();
        $(".quiz-part").hide();
        STORE.numberQuestion++;
        if (STORE.numberQuestion < quest) {
            $(".quiz-part").fadeIn();
            showQuiz();
        }
        else{
            $(".quiz-part").hide();
            finalResults();
        }
    });
}
//show score
function finalResults() {
    $(".final").show();
    $(".final h4").text("Score: " + ((STORE.score / STORE.numberQuestion) * 100));
    $(".correct .count").text("Correct: " + STORE.score);
    $(".incorrect .count").text("Incorrect: " + (STORE.numberQuestion - STORE.score));
    startAgain();
}
//erase score and question number
function startAgain() {
    STORE.numberQuestion = 0;
    STORE.score = 0;
}
//restart quiz with button
function restart() {
    $(".js-restart-btn").on("click", function(event) {
        $(".final").hide();
        $(".quiz-part").show();
        showQuiz();
    })
}
//function to run all functions
function runAll() {
    $(".final").hide();
    $(".progress").hide();
    $(".quiz-part").hide();
    $(".feedback").hide();
    handleStart();
    submitAnswer();
    closePopup();
    restart();
}

$(runAll);