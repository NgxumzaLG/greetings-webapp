let assert = require("assert");
const greeting = require("../greet-factory");

describe('Greetings webapp' , function(){
    describe('Greet the user' , function(){
        it('Should greet Lusanda in English.' , function(){
            let greetExercise = greeting();

            greetExercise.greetMe('lusanDA', 'english')

            assert.equal('Hello, Lusanda', greetExercise.getMessage());
        });

        it('Should greet Lusanda in Afrikaans.' , function(){
            let greetExercise = greeting();

            greetExercise.greetMe('lusanda', 'afrikaans')

            assert.equal('Hallo, Lusanda', greetExercise.getMessage());
        });

        it('Should greet Lusanda in isiXhosa.' , function(){
            let greetExercise = greeting();

            greetExercise.greetMe('LUSANDA', 'isixhosa')

            assert.equal('Molo, Lusanda', greetExercise.getMessage());
        });
    });

    describe('Greet counter' , function(){
        it('Should increment the counter once a user has been greeted.' , function(){
            let greetExercise = greeting();

            greetExercise.greetMe('lusanDA', 'english');

            assert.deepEqual(1, greetExercise.getCounter());
        });

        it('Should increment the counter to 5, if 5 users have been greeted.' , function(){
            let greetExercise = greeting();

            greetExercise.greetMe('lusanDA', 'english');
            greetExercise.greetMe('sipho', 'isixhosa');
            greetExercise.greetMe('luKHanyo', 'afrikaans');
            greetExercise.greetMe('lEBO', 'afrikaans');
            greetExercise.greetMe('luyolO', 'isixhosa');

            assert.deepEqual(5, greetExercise.getCounter());
        });

        it("Shouldn't increment the counter once a user has been greeted again." , function(){
            let greetExercise = greeting();

            greetExercise.greetMe('lusanDA', 'english');
            greetExercise.greetMe('lusANDa', 'isixhosa');

            assert.deepEqual(1, greetExercise.getCounter());
        });
    });

    describe('Greet errors' , function(){
        it('Should return an error message if the name is not entered.' , function(){
            let greetExercise = greeting();

            greetExercise.greetMe('', 'english')

            assert.equal('Error! name not entered', greetExercise.getMessage());
        });

        it('Should return an error meessage if special charactered were entered.' , function(){
            let greetExercise = greeting();

            greetExercise.greetMe('12345', 'afrikaans')

            assert.equal('Error! special characters entered', greetExercise.getMessage());
        });

        it('Should retrurn an error message if languege is not selected.' , function(){
            let greetExercise = greeting();

            greetExercise.greetMe('LUSANDA', '')

            assert.equal('Error! language not selected', greetExercise.getMessage());
        });
    });
    
});