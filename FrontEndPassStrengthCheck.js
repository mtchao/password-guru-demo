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


function guruStrengthTest(username, password) {
	
	var pass1 = password;

        var specialCharCount = 0;
        var numberCount = 0;
        var letterCount = 0;
        var leetCount = 0;

        var specialCharList = "`~!@#$%^&*()_+-=-[]{}\|;:'<<,>.?//*-";
        var numberList = "1234567890";
        var leets = "48({<31057";

        for (i = 0; i < pass1.length; i++) {
            var at = pass1[i];
            console.log(at);

            if (leetList.includes(at)) {
                leetCount++;
            } else if (numberList.includes(at)) {
                numberCount++;
            } else if (specialCharCountList.includes(at)) {
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



	

  //begining with a simple length test
  if (pass1.length > 9) {
    lengthscore = 1;
  }

   else if (pass1.length <= 9 && pass1.length >=8) {
    lengthscore = 0.5;
  }
  else {
    lengthscore = 0;
  }


  //now checking if the words in the password are in a common words list
  if (commonpasswords.includes(pass1) && pass1 != "") {
        commonpasswordscore = -10;
  } else {
        commonpasswordscore = 2;
  }

  if (commonwords.includes(pass1) && pass1 != "") {
        commonwordscore = 0;
  } else {
        commonwordscore = 1;
  }


  var containslist = [""];

  var i;
  var j;
  var alreadycontained = false;
  var longest = true;
  for (i = 0; i <= commonwords.length; i++) {
    if(pass1.includes(commonwords[i]) && commonwords[i].length > 2) {
      containslist.push(commonwords[i]);

      /*
       //trying not to put the user in double jeopardy, i.e. registering "too" and "tool" as two separate instances
              //this only works if the shorter of the two instances is inputted first. But I'm dumb someone fix this
              for (j = 0; j < containslist.length; j++) {

         console.log(containslist[j]);
                  console.log(commonwords[i]);
                  if ((commonwords[i].includes(containslist[j]) || containslist[j].includes(commonwords[i])) && commonwords[i].length > containslist[j].length){
                      containslist.splice(j, 1);
          var longest = true;
                  } else if (containslist[j].includes(commonwords[i]) || commonwords[i].includes(containslist[j])) {
                      alreadycontained = true;
          //containslist.push(commonwords[i]);
          //j++;
                  }

        if(!alreadycontained){
          containslist.push(commonwords[i]);
        }
        if(longest){
          containslist.push(commonwords[i]);
        }


              }
          }
    */
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
      containslist = [""];

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

  if (pass1.length == 0) {
    document.getElementById("picture1").src = "che.jpg";
    totalscore = 0;
  }

  if(totalscore < 0) {
    totalscore = 0;
  }

  return totalscore * 20;
}
