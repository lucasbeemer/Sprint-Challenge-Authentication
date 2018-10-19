<!-- Answers to the Short Answer Essay Questions go here -->

1. What is the purpose of using _sessions_?
Sessions are used to keep data across requests. When a user is using a website that requires authentication, it is better to stay logged in when nagivating the different pages of the site. To do this, sessions uses 'cookies.'

2. What does bcrypt do to help us store passwords in a secure manner.
Bcrypt is a hashing algorithm that takes in a password as a parameter and uses a unique hashing function, implements salting, and adds accumulating hashing rounds.

3. What does bcrypt do to slow down attackers?
In order for the attacker to access the password, they would need to access the hash, know the hashing function, and know exactly how many rounds it took to generate the hash.

4. What are the three parts of the JSON Web Token?
Header - type of token
Payload - information about user
Signiture - contains a secret that is used to identify user.
