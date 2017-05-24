
//code that loads the common words and common passwords file

$(document).ready(function() {
    fetch('10k_most_common.txt').then(function(response) {
        if (response.ok) {
            response.text().then(function(text) {

                commonpasswords = text.split('\n');
            });
        } else {
            console.log('Network request for products.json failed with response ' + response.status + ': ' + response.statusText);
        }
    })

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

var strengthResults = [0,0,0,0,0]
function guruStrengthTest(username, password) {

	var pass1 = password;

        var specialCharCount = 0;
        var numberCount = 0;
        var letterCount = 0;
        var leetCount = 0;

        var specialCharList = "`~!@#$%^&*()_+-=-[]{}\|;:'<<,>.?//*-";
        var numberList = "1234567890";
        var leets = "48({<31057";

		var upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        for (i = 0; i < pass1.length; i++) {
            var characterValue = pass1[i];
            console.log(characterValue);

            if (leets.includes(characterValue)) {
                leetCount++;
            } else if (numberList.includes(characterValue)) {
                numberCount++;
            } else if (specialCharList.includes(characterValue)) {
                specialCharCount++;
            } else {
                letterCount++;
            }
        }

        var leet = {
            "0": "o",
			"!": "i",
            "1": "i",
            "3": "e",
            "4": "a",
            "5": "s",
            "7": "t",
            "8": "b",
            "@": "a",
            "(": "c",
            "{": "c",
            "<": "c"
        }



        //creates a new password with common leetspeak taken out
        var simplePassword = pass1;
        var commonSubstitutions = 0;
        for (var leetChar in leet) {
			console.log(leetChar);
			console.log(leet[leetChar]);
            simplePassword = simplePassword.replace(leetChar, leet[leetChar]);
        }

        simplePassword = simplePassword.toLowerCase();
        console.log(simplePassword + specialCharCount + numberCount + letterCount + leetCount);
  
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

var longest = true;
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


  var commonwordcount = containslist.length;
  console.log(containslist);
  console.log(commonwordcount);
      // should clear containslist here but we're doing it later since that's where we do score calculations and we need it

      if(commonwordcount > 1) {
          document.getElementById("picture4").src = "cross.jpg";
          commonwordscore = 0;
      } else if (commonwordcount == 1) {
    document.getElementById("picture4").src = "cross.jpg";
          commonwordscore = 0;
      } else {
    document.getElementById("picture4").src = "che.jpg";
    commonwordscore++;
      }
  console.log(commonwordcount);
      commonwordcount = 0;


  totalscore = lengthscore + commonpasswordscore + commonwordscore;

  if (simplePassword.length == 0) {
    document.getElementById("picture1").src = "che.jpg";
    totalscore = 0;
  }

  if(totalscore < 0) {
    totalscore = 0;
  }

  //we want the user to get a total score out of 100. Trying to balance these scores to that scale... we'll also send
  //a response as to what the lowest score was.
  
  
  //begining with a simple length test
  if (simplePassword.length > 9) {
	  //do not allow 8 or lower
    lengthscore = -100;
	strengthResults[1] = 0;
  }
   else if (simplePassword.length == 9) {
	  // still short
    lengthscore = -20;
  }
		else  if (simplePassword.length == 10){
			//basically fine
			 strengthResults[1] = 1;
			lengthscore = 0;
	} else if (simplePassword.length >= 18){
		//don't want to give them too many points for length so that other things can still weigh them down
			lengthscore = 80;
  } else {
	  //11-17 is between 10-70 points extra
	  //maybe some form of logarithm would be better 
	  lengthscore = ((simplePassword.length - 10) * 10);
  }

  //now checking if the words in the password are in the common passwords list
  if (commonpasswords.includes(simplePassword) ||  commonpasswords.includes(pass1) && simplePassword != "") {
        commonpasswordscore = -100;
		strengthResults[2] = 1;
  } else {
        commonpasswordscore = 0;
		strengthResults[2] = 0;
  }
  
  
  //checking the common words combinations list
  if ((containslist.length == 1 && containslist[0].length < 4) || containslist.length == 0) {
	  //we don't care if there's just one value of some short word, or if there are none
        commonwordscore = 0;
  } else if (containslist.length == 1){
	  //if they are using a substantial common word, give them a minus
        commonwordscore = -20;
  } else {
	  //if there are more than one common word I feel like its maybe better since its longer? idk anymore
	  commonwordscore = -10;
  }

  //spaghetti, sorry. Should be up with common words double jeopardy check.
  containslist = [""];
  
  
  var specialCharScore = 0;
  var numberScore = 0;
  var lowercaseScore = 0;
  var uppercaseScore = 0;
  
 if(specialCharCount == 0){
	specialCharScore = -5;
 }  else if (specialCharCount > 1) {
	specialCharScore  = 5;
 }
 
 if(numberCount == 0){
	 numberScore = -5;
 } else if (numberCount > 1){
	 numberScore = 5;
 }
 
 if(lowercaseCount == 0){
	 lowercaseScore = -5;
 } else if (lowercaseCount > 1){
	 lowercaseScore = 5;
 } 
 
 if(uppercaseCount == 0){
	 uppercaseScore = -5;
 } else if (uppercaseCount > 1){
	 uppercaseScore = 5;
 }
	
	charscore = specialCharScore + numberScore + lowercaseScore + uppercaseScore;
  
  
  totalscore = lengthscore + commonpasswordscore + commonwordscore + charscore;
  
  strengthResults[0] = totalscore;

  console.log(strengthResults);
  return strengthResults;

}


