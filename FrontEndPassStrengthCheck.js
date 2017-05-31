
//code that loads the common words and common passwords file

$(document).ready(function() {

    fetch('10_million_password_list_top_1000000.txt').then(function(response) {
        if (response.ok) {
            response.text().then(function(text) {

                commonpasswords = text.split('\n');

                //10_million_password_list_top_100000.txt
                //10k_most_common.txt
            });
        } else {
            console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
        }
    });

    fetch('google-10000-english-usa.txt').then(function(response) {
        if (response.ok) {
            response.text().then(function(text) {

                commonwords = text.split('\n');
            });
        } else {
            console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
        }
    });
});

var strengthResults = [0,0,0,0,0];
function guruStrengthTest(username, password) {

    var pass1 = password;

    var specialCharCount = 0;
    var numberCount = 0;
    var uppercaseCount = 0;
    var leetCount = 0;

    var specialCharList = "`~!@#$%^&*()_+-=-[]{}\|;:'<<,>.?//*-";
    var numberList = "1234567890";
    var leets = "48({<31057$@!";
    var upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    tooManyConsecutive = false;
    var consecutive = 0;

    //this part could be rewritten to define "special character" as anything except a defined list (more exhaustive else case)
    for (i = 0; i < pass1.length; i++) {
        var characterValue = pass1[i];

        if(i > 0) {
            if (pass1[i].toLowerCase().includes(pass1[i-1].toLowerCase())) {
                consecutive++;
            } else {
                consecutive = 0;
            }

            if (consecutive > (pass1.length / 2) + 1) {
                tooManyConsecutive = true;
            }
        }

        if (numberList.includes(characterValue)) {
            numberCount++;
        } else if (leets.includes(characterValue)) {
            leetCount++;
        } else if (specialCharList.includes(characterValue)) {
            specialCharCount++;
        } else if (upperCase.includes(characterValue)) {
            uppercaseCount++;
        }
    }

    var leet = {
        "0": "o",
        "!": "i",
        "1": "i",
        "3": "e",
        "4": "a",
        "5": "s",
        "$": "s",
        "7": "t",
        "8": "b",
        "@": "a",
        "(": "c",
        "{": "c",
        "<": "c"
    };


    String.prototype.replaceAll = function(str1, str2, ignore)
    {
        return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)==="string")?str2.replace(/\$/g,"$$$$"):str2);
    };

    //creates a new password with common leetspeak taken out
    var simplePassword = pass1;
    var commonSubstitutions = 0;
    for (var leetChar in leet) {
        simplePassword = simplePassword.replaceAll(leetChar, leet[leetChar]);
    }

    simplePassword = simplePassword.toLowerCase();

    var simpleUsername = username;
    for (var leetChar in leet) {
        simpleUsername = simpleUsername.replaceAll(leetChar, leet[leetChar]);
    }

    simpleUsername = simpleUsername.toLowerCase();

    sameAsUsername = false;
    if(simpleUsername === simplePassword) {
        sameAsUsername = true;
    }

    console.log(simplePassword + specialCharCount + numberCount + uppercaseCount + leetCount);

    //filtering out "double jeopardy" matches
    var containslist = [""];

    var i;
    var j;
    var alreadycontained = false;
    var longest = true;
    for (i = 0; i <= commonwords.length; i++) {
        if(simplePassword.includes(commonwords[i]) && commonwords[i].length > 2) {
            containslist.push(commonwords[i]);
        }
    }
    var word;
    for(i = 0; i < containslist.length; i++){
        longest = true;
        word = containslist[i];
        for (j = 0; j < containslist.length; j++){
            if (containslist[j].includes(word)) {
                longest = false;
            }
            //if we find a word that's included in our word and shorter
            if (word.includes(containslist[j]) && (word.length > containslist[j].length)){
                containslist.splice(j, 1);
            }
        }
        if(!longest) {
            containslist.splice(containslist.indexOf(word), 1);
            i = 0;
        }
    }



    console.log(containslist);
    // should clear containslist here but we're doing it later since that's where we do score calculations and we need it


    //we want the user to get a total score out of 100. Trying to balance these scores to that scale... we'll also send
    //a response as to what the lowest score was.


    //begining with a simple length test
    lengthscore = 0;

    if (simplePassword.length < 7) {
        //do not allow 7 or lower
        lengthscore = -101;
        strengthResults[1] = 0;
    }
    else if (simplePassword.length === 7) {
        // still short
        lengthscore = 4;
        strengthResults[1] = 0;
    }
    else  if (simplePassword.length === 8){
        //basically fine
        strengthResults[1] = 1;
        lengthscore = 20;
    }
    else  if (simplePassword.length === 9) {
        //basically fine
        strengthResults[1] = 1;
        lengthscore = 30;
    } else if (simplePassword.length > 13){
        //don't want to give them too many points for length so that other things can still weigh them down
        //actually if its long enough its probably fine
        lengthscore = 100;
        strengthResults[1] = 1;
    } else {
        //10-17 is between 10-70 points extra
        //maybe some form of logarithm would be better
        strengthResults[1] = 1;
        lengthscore = 27;
        for(i = 1; i <= simplePassword.length - 9; i++) {
            lengthscore = lengthscore + (18 - (i));
        }
    }

    commonpasswordscore = 0;
    //now checking if the words in the password are in the common passwords list
    if (commonpasswords.includes(simplePassword) ||  commonpasswords.includes(pass1) && simplePassword !== "") {
        commonpasswordscore = -100;
        strengthResults[2] = 0;
    } else {
        commonpasswordscore = 0;
        strengthResults[2] = 1;
    }


    commonwordscore = 0;
    //checking the common words combinations list
    if ((containslist.length === 1 && containslist[0].length < 4) || containslist.length === 0) {
        //we don't care if there's just one value of some short word, or if there are none
        commonwordscore = 0;
        strengthResults[3] = 1;
        //if the password is sufficiently long we don't care about these common words
    } else if (containslist.length === 1 && simplePassword.length < 14){
        //if they are using a substantial common word, give them a minus
        commonwordscore = -35;
        strengthResults[3] = 0;
        //if there are more than one common word I feel like its maybe better since its longer? idk anymore
        commonwordscore = -20;
        strengthResults[3] = 2;
    } else {
        //spaghetti
        commonwordscore = 0;
        strengthResults[3] = 1;
    }

    //more spaghetti, sorry. Should be up with common words double jeopardy check, but needs to be here.
    containslist = [""];


    specialCharScore = 0;
    numberScore = 0;
    lowercaseScore = 0;
    uppercaseScore = 0;

    if(specialCharCount > 1){
        specialCharScore = 12;
    }   else if (specialCharCount === 0 && leetCount > 0) {
        specialCharScore  = 4;
    }  else if (specialCharCount > 0 && leetCount === 0) {
        specialCharScore  = 9;
    }  else if (specialCharCount === 0) {
        specialCharScore  = -15;
    }


    if(numberCount === 0){
        numberScore = -10;
    } else if (numberCount > 1){
        numberScore = 7;
    }

    if(uppercaseCount === 0){
        uppercaseScore = -5;
    } else if (uppercaseCount > 1){
        uppercaseScore = 7;
    }

    charscore = specialCharScore + numberScore + uppercaseScore;

    consecutiveScore = 0;
    if(tooManyConsecutive) {
        consecutiveScore = -50;
        strengthResults[4] = 0;
    } else {
        strengthResults[4] = 1;
    }

    usernameScore = 0;
    if(sameAsUsername) {
        usernameScore = -1000;
    }

    console.log(lengthscore + " " + commonpasswordscore + " " + commonwordscore + " " + charscore + " " + consecutiveScore);


    totalscore = lengthscore + commonpasswordscore + commonwordscore + charscore + consecutiveScore + usernameScore;
    console.log(totalscore);

    //return a value between 0 and 100
    if(totalscore > 100) {
        strengthResults[0] = 100;
    } else if (totalscore < 0){
        strengthResults[0] = 0;
    } else {
        strengthResults[0] = totalscore;
    }

    //create recommendation string

    lowestScore = Math.min(lengthscore, commonpasswordscore, commonwordscore, specialCharScore, lowercaseScore, uppercaseScore, numberScore, usernameScore);
    if(lowestScore === 0){
        strengthResults[5] = "Try making your password longer."
    } else if(tooManyConsecutive === true) {
        strengthResults[5] = "Don't use too many of the same character. Someone might be watching you type!"
    } else if(lowestScore === lengthscore) {
        strengthResults[5] = "Try making your password longer."
    } else if (lowestScore === commonpasswordscore) {
        strengthResults[5] = "This is a commonly used password. Please try another."
    } else if (lowestScore === commonwordscore) {
        strengthResults[5] = "Common words are easy to guess in passwords. Try using more uncommon words, or even better, an easy to remember acronym. However, if your password is long enough, that's fine too."
    } else if (lowestScore === specialCharScore) {
        strengthResults[5] = "Try to use special characters in addition to letters, but avoid common substitutions such as an @ for an A."
    } else if (lowestScore === lowercaseScore) {
        strengthResults[5] = "Use lower case letters in addition to capitals"
    } else if (lowestScore === uppercaseScore) {
        strengthResults[5] = "Use capital letters in addition to lower case."
    } else if (lowestScore === numberScore) {
        strengthResults[5] = "Try adding numbers."
    } else if (lowestScore === usernameScore) {
        strengthResults[5] = "Password cannot be too similar to username."
    }
    if(totalscore >= 80){
        strengthResults[5] = "This looks like a strong password."
    }

    console.log(strengthResults);


    return strengthResults;

}