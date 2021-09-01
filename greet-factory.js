
module.exports = function greeting(database) {
    var storeNames =    [];
    var strAlert = "";
    let strMessage = "";
    const RegExp = /^[A-Za-z]+$/;
    const pool =  database

    async function poolUsername(poolUsers) {
        if (poolUsers !== "" && poolUsers.match(RegExp)) {
            let strPool = poolUsers.charAt(0).toUpperCase() + poolUsers.slice(1).toLowerCase();
            const sql = await pool.query (`SELECT * FROM users WHERE username  = $1`, [strPool]);
            if (sql.rows.length == 0) {
                await pool.query(`INSERT INTO users (username, greet) values ($1, $2)`, [strPool, 1]);
            } else {
                await pool.query(`UPDATE users SET greet = greet + 1 WHERE username = $1`, [strPool])
            }
        }

    }

    async function poolCounter() {
        const sqlCounter = await pool.query("SELECT COUNT(*) FROM users");
        return sqlCounter.rows[0].count;
    }

    async function poolGreet() {
        const sqlOrder = await pool.query("SELECT * FROM users ORDER BY username");
        return sqlOrder.rows;
    }

    async function poolUserGreeted (name) {
        const sqlUser = await pool.query("SELECT * FROM users WHERE username = $1", [name]);
        const userCounter = sqlUser.rows
        return userCounter[0].greet
    }

    async function resetData() {
        strMessage = "The page has been succesfully reset!"
        return pool.query(`DELETE FROM users`);
    }

    function greetMe(myName, lang) {
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
    
                        strAlert = "proceed";
    
                        if (storeNames.length == 0) {
                            storeNames.push({
                                name: theName,
                                greet: 1,
                                username: theName
    
                            });
    
                        }
                         else {
                            if(!storeNames.some(storeNames => storeNames.name === theName)){
                                storeNames.push({
                                    name: theName,
                                    greet: 1,
                                    username: theName
        
                                });
                            }else {
                                storeNames.forEach(element => {
                                    if(element.name === theName){
                                        element.greet++
                                        
                                    }
                                });
                            }
                        }
    
                    } else {
                        strMessage = "Error! language not selected";
                        strAlert = "error";
    
                    }
    
                } else {
                    strMessage = "Error! special characters entered";
                    strAlert = "error";
    
                }
    
            } else {
                strMessage = "Error! name not entered";
                strAlert = "error";
    
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


    function usernameFor(user) {
        let userInfo;

        storeNames.forEach(element => {
            if(element.username === user){
                userInfo = {
                    name: element.name,
                    greet: element.greet

                };
            }
        });

        return userInfo;
        
    }

    function getCounter(){
        return storeNames.length;

    }

    function namesAdded(){ 
        return storeNames;

    }

    function addAlertClass() {
        if (strAlert === "error") {
            return "error";

        } else {
            return "proceed";

        }
    }

    return {
        greetMe,
        usernameFor,
        getCounter,
        namesAdded,
        addAlertClass,
        getMessage,
        poolUsername,
        poolCounter,
        poolGreet,
        poolUserGreeted,
        resetData

    }
}