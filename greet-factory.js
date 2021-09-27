
module.exports = function greeting(database) {
    let strMessage = "";
    const RegExp = /^[A-Za-z]+$/;
    const pool =  database

    async function poolUsername(poolUser) {
        const sql = await pool.query (`SELECT * FROM users WHERE username  = $1`, [poolUser]);

        if (sql.rows.length == 0) {
            await pool.query(`INSERT INTO users (username, greet) values ($1, $2)`, [poolUser, 1]);

        } else {
            await pool.query(`UPDATE users SET greet = greet + 1 WHERE username = $1`, [poolUser]);

        }
    }

    async function poolCounter() {
        const sqlCounter = await pool.query(`SELECT COUNT(*) FROM users`);

        return sqlCounter.rows[0].count;
    }

    async function poolGreet() {
        const sqlOrder = await pool.query(`SELECT username, greet FROM users ORDER BY username`);

        return sqlOrder.rows;
    }

    async function poolUserGreeted (name) {
        const sqlUser = await pool.query(`SELECT * FROM users WHERE username = $1`, [name]);
        const userCounter = sqlUser.rows;

        return userCounter[0].greet;
    }

    async function resetData() {
        strMessage = "The page has been succesfully reset!";

        return pool.query(`DELETE FROM users`);
    }

    async function greetMe(myName, lang) {
        let theName = "";
        let strName = myName.trim();
        
        try {
            if (strName !== "" ) {
                if (strName.match(RegExp)) {
                    theName = strName.charAt(0).toUpperCase() + strName.slice(1).toLowerCase();
                    
                    if (lang === "english" || lang === "afrikaans" || lang === "isixhosa" ) {
                        if (lang === "english") {
                            strMessage = "Hello, " + theName;
                 
                        } else if (lang === "afrikaans") {
                            strMessage = "Hallo, " + theName;
                
                        } else if (lang === "isixhosa") {
                            strMessage = "Molo, " + theName;
                
                        }
                        poolUsername(theName)
    
                    } else {
                        strMessage = "Error! language not selected";

                    }
    
                } else {
                    strMessage = "Error! special characters entered";
    
                }
    
            } else {
                strMessage = "Error! name not entered";

            }
            
        }

        catch(err) {
            console.error('Error has occured',err );
            throw err;
        }

       
    }

    function getMessage() {
        return strMessage;
    }

    function addAlertClass() {
        if (strMessage === "Error! name not entered" ||
            strMessage === "Error! special characters entered" || 
            strMessage === "Error! language not selected") {

            return "error";

        } else {
            return "proceed";

        }
    }

    return {
        greetMe,
        addAlertClass,
        getMessage,
        poolUsername,
        poolCounter,
        poolGreet,
        poolUserGreeted,
        resetData

    }
}