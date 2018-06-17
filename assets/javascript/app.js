// Button to start the game 
// Need an array of questions 
// randomly select a question and display it to the user 
// based on the selection, display the list of options 
// Each round player must answer the question within the alotted a time 
// if counter is greater than 0 then user can select an anwer 
// -------Select an answer------
// When an answer is selected, compare the value of the input to the answer 
// if correct - display congratulation message and image to user for x time
// if incorrect - display incorrect message and image to user  for x time
// If selecting random questions then would need a function to remove each question from the list 
// if not random then once then game is over after the last question 
// ------Time remaining-----------
// Initialize a counter 30 seconds 
// have a function to reduce counter by 1 
// Setinterval to run function ever 1 seconds so that the counter can be reduced 
// Counter for time running out 
// if time runs out (counter is o)
// Display correct answer for x amount of time then move to another question 


$(document).ready(function () {
    var counterId;

    var game = {
        gameOn: false,
        questions: ["What is my name?", "How old am I?", "How many siblings do I have?"],
        ans: [["James", "Tobi", "Frank", "Tom"],
        [29, 33, 25, 35],
        [0,2,3,4] 
        ],
        answers: {
            qOne: ["James", "Tobi", "Frank", "Tom"],
            qTwo: [29, 33, 25, 35],
            qThree: [0,2,3,4]
        },
        answerValue:[1,0,2],
        timesUp: false,
        timer: 10,
        // decrease timmer by 1
        decrease: function() {
            game.timer--;
            $(".time-remaining").text("Time Remaining: " + game.timer);
            if (game.timer === 5){
                console.log("time is up")
                clearInterval(counterId);
                game.timesUp = true;
            }
        
        }, 
        timerFunction: function(){
             counterId = setInterval(game.decrease, 1000);
            // console.log(game.decrease() + game.timer)
        }
       
    };

    var myQuestion = [
        {
          question: "Who is the strongest?",
          answers: {
            a: "Superman",
            b: "The Terminator",
            c: "Waluigi, obviously"
          },
          correctAnswer: "c"
        },
        {
          question: "What is the best site ever created?",
          answers: {
            a: "SitePoint",
            b: "Simple Steps Code",
            c: "Trick question; they're both the best"
          },
          correctAnswer: "c"
        }
    
    ];



    console.log("ans " + game.ans[0][1]);
    

        $("#button").on('click', function (){
            game.gameOn = true;
            // set timesup to false so that timer can decrease 
            game.timesUp = false;
            // reset game timer 
            game.timer = 11;
            // Display the current timer to the user 
            $(".time-remaining").html("Time Remaining: " + game.timer);

            // Creating container for the question with a new div
            var questionContainer = $("<div>");
            // add class to the new div 
            questionContainer.addClass("card-header");
            // add new div to the game area 
            $(".game-area").html(questionContainer);

            questionContainer.html(" <strong> Your Question: </strong> <br>" + game.questions[0] );
            var answerContainer =$("<div>");
            answerContainer.addClass("card-body answer-body");
            $(".game-area").append(answerContainer);

            // For each option from the list of answers 
            for (var i = 0; i < game.answers.qOne.length; i++) {
                // create a new DIV
                var option = $("<div>");
                // give it a class of option 
                option.addClass("option");
                // give it a data attribute which has a value of the option 
                option.attr("data-value", game.answers.qOne[i]);
                // write the option to the new div 
                option.html(game.answers.qOne[i] + " <hr> ");
                // add the option to the body of options 
                $(".answer-body").append(option);
                
            };
           
            console.log(game.timer + "current time")
           
            game.timerFunction(); 
            
            $(".option").on("click", function(){
                console.log(this)
            });
        


        });

        



});

