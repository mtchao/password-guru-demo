Project overview: Password Guru provides a javascript toolbox for web developers to deploy either client side via linked Javascript 
or serverside via NodeJS package to provide feedback on user password strength validated by actual password hash cracking techniques.
It is intended as a tool for developers to ensure safety of their users following a breach, relieving personal and company liability.

List of contents: Password Guru library, Password-Guru node.js package

List of features: Protects against brute force attacks by enforcing length and complexity requirements,
Protects against password dictionaries by comparing passwords to top 1,000,000 common passwords,
Protects against common word dictionaries in similar fashion,
Protects against simple substitutions by simplifying user input down to the most simple form using regex, then comparing to dictionaries,
Protects against shoulder surfing by not allowing too many characters to be the same,
Doesn't allow password to be too similar to username,
Protects against rainbow tables by enforcing complexity and by using a very robust salting and hashing algorithm.
Easy to implement, open source, can be run client side with little performance loss.

Summary of major technology decisions: The reason we chose to use Javascript is that virtually all major browsers use Javascript.
One of our initial goals was that it should be ubiquitous and easy to integrate for devs, and so choosing a server side language
didn't give us the kind of universality that we desired. Node was the easy choice because it runs javascript, so our methods will work the same.
The node package has some more functionality by offering hashing and salting algorithms for password storage, which our test app employs.
As for the client side library, we included some links to alternative packages that handle hashing.

Stack and justifications: We needed an environment to test our methods, so we built our stack on NodeJS connected to a MySQL database.
We decided to deploy to Heroku when we migrated to the cloud because it plays nicely with Node. High availability, cheap, easy to deploy.

Contact info: Quinn Shumaker: quinnshu@uw.edu, Dimtcho Dimov: dimidimov@uw.edu, Mark Tchao: mtchao@uw.edu

Link to deployment: https://guru-test-environment.herokuapp.com/