let assert = require("assert");
const greeting = require("../greet-factory");
const {Pool} = require("pg");

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings_test';

const pool = new Pool({
    connectionString,
    ssl : {
        rejectUnauthorized:false
    }
  });

  beforeEach(async function(){
    // clean the tables before each test run
    await pool.query("delete from users;");
});

describe('Greetings webapp' , function(){

    describe('Greet the user' , function(){
        it('Should greet Lusanda in English.' , async function(){
            let greetExercise = greeting();

            await greetExercise.greetMe('lusanDA', 'english')

            assert.equal('Hello, Lusanda', greetExercise.getMessage());
        });

        it('Should greet Lusanda in Afrikaans.' , async function(){
            let greetExercise = greeting();

            await greetExercise.greetMe('lusanda', 'afrikaans')

            assert.equal('Hallo, Lusanda', greetExercise.getMessage());
        });

        it('Should greet Lusanda in isiXhosa.' , async function(){
            let greetExercise = greeting();

            await greetExercise.greetMe('LUSANDA', 'isixhosa')

            assert.equal('Molo, Lusanda', greetExercise.getMessage());
        });
    });

    describe('Greet counter' , function(){
        it('Should increment the counter once a user has been greeted.' , async function(){
            let greetExercise = greeting();

            await greetExercise.greetMe('lusanDA', 'english');

            assert.deepEqual(1, greetExercise.getCounter());
        });

        it('Should increment the counter to 5, if 5 users have been greeted.' , async function(){
            let greetExercise = greeting();

            await greetExercise.greetMe('lusanDA', 'english');
            await greetExercise.greetMe('sipho', 'isixhosa');
            await greetExercise.greetMe('luKHanyo', 'afrikaans');
            await greetExercise.greetMe('lEBO', 'afrikaans');
            await greetExercise.greetMe('luyolO', 'isixhosa');

            assert.deepEqual(5, greetExercise.getCounter());
        });

        it("Shouldn't increment the counter once a user has been greeted again." , async function(){
            let greetExercise = greeting();

            await greetExercise.greetMe('lusanDA', 'english');
            await greetExercise.greetMe('lusANDa', 'isixhosa');

            assert.deepEqual(1, greetExercise.getCounter());
        });
    });

    describe('Greet errors' , function(){
        it('Should return an error message if the name is not entered.' , async function(){
            let greetExercise = greeting();

            await greetExercise.greetMe('', 'english')

            assert.equal('Error! name not entered', greetExercise.getMessage());
        });

        it('Should return an error meessage if special charactered were entered.' , async function(){
            let greetExercise = greeting();

            await greetExercise.greetMe('12345', 'afrikaans')

            assert.equal('Error! special characters entered', greetExercise.getMessage());
        });

        it('Should retrurn an error message if languege is not selected.' , async function(){
            let greetExercise = greeting();

            await greetExercise.greetMe('LUSANDA', '')

            assert.equal('Error! language not selected', greetExercise.getMessage());
        });
    });

    
});

after(function(){
    pool.end();
})