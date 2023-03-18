const startBtn = document.querySelector('.startBtn button');
const infoBox = document.querySelector('.infoBox');
const exitBtn = infoBox.querySelector('.buttons .quit');
const continueBtn = infoBox.querySelector('.buttons .restart');
const quizBox = document.querySelector('.quizBox');
const timeCount = document.querySelector('.timer .timerSec');
const timeLine = document.querySelector('header .timeLine');
const timeOff = document.querySelector('header .timeText');

const optionList = document.querySelector('.optionList');


//   START BUTTON CLICKED (show information box)
startBtn.onclick = () => {
    infoBox.classList.add('activeInfo');
}

//   EXIT BUTTON CLICKED (hide information box)
exitBtn.onclick = () => {
    infoBox.classList.remove('activeInfo');
}

//   CONTINUE BUTTON CLICKED (hide information box and show quiz box)
continueBtn.onclick = () => {
    infoBox.classList.remove('activeInfo');
    quizBox.classList.add('activeQuiz');
    showQuestions(0);
    queCounter(1);
    startTimerLine(0),
    startTimer(15);
}

let queCount = 0;
let queNumb = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;


const nextBtn = quizBox.querySelector('.nextBtn');
const resultBox = document.querySelector('.resultBox');
const restartQuiz = resultBox.querySelector('.buttons .restart');
const quitQuiz = resultBox.querySelector('.buttons .quit');

restartQuiz.onclick = () =>{
    quizBox.classList.add('activeQuiz');
    resultBox.classList.remove('activeResult');
    let queCount = 0;
    let queNumb = 1;
    let timeValue = 15;
    let widthValue = 0;
    let userScore = 0;
    showQuestions(queCount);
    queCounter(queNumb);
    clearInterval(counter);
    startTimer(timeValue);
    clearInterval(counterLine);
    startTimerLine(widthValue);
    nextBtn.style.display = 'none';
    timeOff.textContent = 'Time Left';
}

quitQuiz.onclick = () =>{
    window.location.reload();
}

nextBtn.onclick = () => {

    if (queCount < questions.length - 1) {
        queCount++;
        queNumb++;
        showQuestions(queCount);
        queCounter(queNumb);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        nextBtn.style.display = 'none';
        timeOff.textContent = 'Time Left';
    } else {
        clearInterval(counter);
        clearInterval(counterLine);
        console.log('Question Complete');
        showResultBox();
    }

}

function showQuestions(index) {
    const queText = document.querySelector('.queText');
    let queTag = '<span>' + questions[index].numb + '. ' + questions[index].question + '</span>';
    let optionTag = '<div class = "option">' + questions[index].options[0] + '<span></span></div>' +
        '<div class = "option">' + questions[index].options[1] + '<span></span></div>' +
        '<div class = "option">' + questions[index].options[2] + '<span></span></div>' +
        '<div class = "option">' + questions[index].options[3] + '<span></span></div>';
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;

    const option = optionList.querySelectorAll('.option');

    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}


let tickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fas fa-times"></i></div>';

function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    let allOptions = optionList.children.length;
    
    if (userAns == correctAns) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add('correct');
        console.log('Answer is correct');
        answer.insertAdjacentHTML('beforeend', tickIcon);
    } else {

        answer.classList.add('incorrect');
        console.log('Answer is incorrect');
        answer.insertAdjacentHTML('beforeend', crossIcon);


        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAns) {
                optionList.children[i].setAttribute('class', 'option correct');
                optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);
            }
        }

    }

    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    nextBtn.style.display = 'block';

}

function showResultBox(){
    infoBox.classList.remove('activeInfo');
    quizBox.classList.remove('activeQuiz');
    resultBox.classList.add('activeResult');
    const scoreText = resultBox.querySelector('.scoreText');
    if(userScore > 3){
        let scoreTag = '<span>and Great Job!, You got  <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 1){
        let scoreTag = '<span>and not bad, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>and sorry, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}


function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCount.textContent = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = '0' + addZero;
        }
        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = '00';
            timeOff.textContent = 'Time Off';

            let correctAns = questions[queCount].answer;
            let allOptions = optionList.children.length;


            for (let i = 0; i < allOptions; i++) {
                if (optionList.children[i].textContent == correctAns) {
                    optionList.children[i].setAttribute('class', 'option correct');
                    optionList.children[i].insertAdjacentHTML('beforeend', tickIcon);
                }
            }
            for (let i = 0; i < allOptions; i++) {
                optionList.children[i].classList.add('disabled');
            }
            nextBtn.style.display = 'block';
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 34);

    function timer() {
        time += 1;
        timeLine.style.width = time + 'px';
        if (time == 480) {
            clearInterval(counterLine);
        }
    }
}



function queCounter(index) {
    const bottomQueCounter = quizBox.querySelector('.totalQue');
    let totalQuesCounting = '<span><p>' + index + '</p>of<p>' + questions.length + '</p>Questions</span>';
    bottomQueCounter.innerHTML = totalQuesCounting;
}