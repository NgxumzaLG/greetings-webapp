
module.exports = function greeting() {
    var storeNames = [];
    var strAlert = "";
    let strMessage = "";
    const RegExp = /^[A-Za-z]+$/;

    function greetMe(myName, lang) {
        let theName = "";
        let strName = myName.trim();

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

                    } else {
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
        getMessage

    }
}