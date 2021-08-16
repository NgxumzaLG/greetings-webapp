
module.exports = function greeting() {
    // var theName = "";
    var storeNames = {};
    var strAlert = "";
    var counter = 0;
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

                    if(!storeNames[theName]) {
                        storeNames[theName] = 1;
                        counter++;
                        
                    } else {
                        storeNames[theName]++;
    
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

    // function addNames(name, lang) {
    //     if(name !=="" && lang !== ""){
    //         if (name.match(RegExp)) {
    //             var strName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    //             if(!storeNames[strName]) {
    //                 storeNames[strName] = 1;
    //                 counter++;
                    
    //             } else {
    //                 storeNames[strName]++;

    //             }
    //         } 
    //     }
        
    // }

    function getCounter(){
        return Object.keys(storeNames).length;

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
        // addNames,
        getCounter,
        namesAdded,
        addAlertClass,
        getMessage

    }
}