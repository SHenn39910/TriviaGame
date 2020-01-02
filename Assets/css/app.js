var card = $("#quiz-area");
var countStartNumber = 30;

//Question set
var questions = [
    {
        question: "What color is a giraffe's tongue?"
        answers: ["Red", "Blue", "Black", "Green"]
        correctAnswer: "Blue",
    },
    {
        question: "The color of a baboon's buttocks can turn which color?"
        answers: ["blue", "red", "orange", "turquoise"]
        correctAnswer: "red",
        image: "Assets/images/africanmonkeygif.gif",
    },
    {
        question: "What are baby sharks called?"
        answers: ["Calfs", "Pups", "Whales", "Tigers"]
        correctAnswer: "Pups",
        image: "Assets/images/shark.gif",
    },
    {
        question: "The largest African terrestrial animal is?"
        answers: ["Hippos", "Giraffes", "Ostrich", "Elephants"]
        correctAnswer: "Elephants",
    },
    {
        question: "Which animal does not have sweat glands?"
        answers: ["African wild dog", "Gorillas", "Wildebeest", "Elephants"]
        correctAnswer: "Elephants",
    },
    {
        question: "How long do Gorillas live?"
        answers: ["Roughly 10 years", "Roughly 35 years", "Roughly 23 years", "Roughly 50 years"]
        correctAnswer: "Roughly 35 years",
        image: "Assets/images/gorilla.gif",
    },

];

var game = {

    questions: questions, 
    correct: 0,
    incorrect: 0,
    counter: 120,

    countdown: function(){
        game.counter--;
        $("#counter-number").html(game.counter);
        if(game.counter === 0){
            console.log("TIME UP");
            game.done();
        }
    },

    start: function(){

        timer = setInterval(game.countdown.bind(game), 1000);

        card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

        for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
          card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
          + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
        }
        $("#start").remove();

    },
    
loadQuestion: function() {

  timer = setInterval(this.countdown.bind(this), 1000);

  card.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

  for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
    card.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
    + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
  }
},

nextQuestion: function() {
  this.counter = window.countStartNumber;
  $("#counter-number").text(this.counter);
  this.currentQuestion++;
  this.loadQuestion.bind(this)();
},

timeUp: function() {

  clearInterval(window.timer);

  $("#counter-number").text(this.counter);

  card.html("<h2>Out of Time!</h2>");
  card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer);
  card.append("<img src='" + questions[this.currentQuestion].image + "' />");

  if (this.currentQuestion === questions.length - 1) {
    setTimeout(this.results, 3 * 1000);
  }
  else {
    setTimeout(this.nextQuestion, 3 * 1000);
  }
},

results: function() {

  clearInterval(window.timer);

  card.html("<h2>All done, heres how you did!</h2>");

  $("#counter-number").text(this.counter);

  card.append("<h3>Correct Answers: " + this.correct + "</h3>");
  card.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
  card.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
  card.append("<br><button id='start-over'>Start Over?</button>");
},

clicked: function(e) {
  clearInterval(window.timer);
  if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
    this.answeredCorrectly();
  }
  else {
    this.answeredIncorrectly();
  }
},

answeredIncorrectly: function() {

  this.incorrect++;

  clearInterval(window.timer);

  card.html("<h2>Nope!</h2>");
  card.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].correctAnswer + "</h3>");
  card.append("<img src='" + questions[this.currentQuestion].image + "' />");

  if (this.currentQuestion === questions.length - 1) {
    setTimeout(this.results.bind(this), 3 * 1000);
  }
  else {
    setTimeout(this.nextQuestion.bind(this), 3 * 1000);
  }
},

answeredCorrectly: function() {

  clearInterval(window.timer);

  this.correct++;

  card.html("<h2>Correct!</h2>");
  card.append("<img src='" + questions[this.currentQuestion].image + "' />");

  if (this.currentQuestion === questions.length - 1) {
    setTimeout(this.results.bind(this), 3 * 1000);
  }
  else {
    setTimeout(this.nextQuestion.bind(this), 3 * 1000);
  }
},

reset: function() {
  this.currentQuestion = 0;
  this.counter = countStartNumber;
  this.correct = 0;
  this.incorrect = 0;
  this.loadQuestion();
}
};



// CLICK EVENTS

$(document).on("click", "#start", function() {
  game.start();
});

$(document).on("click", "#done", function() {
  game.done();
});
