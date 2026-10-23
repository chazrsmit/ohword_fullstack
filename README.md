## To do
Handle uppercase input entries > already works no matter the input (if it's uppercase ou lowercase)

Fetch the data from the dictionary API when I click on a word. > how to implement it? when i click on a word on the client-side, I need to send that info to the back-end via Laravel. Then, in the WordController or another Controller, I fetch the external API to get all the information about the clicked word.

Make error messages disappear after 4 seconds (timeout).

In CSS, make sure that the displayed words are in text-transform: capitalize;

Pput design tokens in CSS variables.

Add remove action in the WordController

Hide the show URLs when i click on a word 

Add a 'loading' sign for when a word is loading

If there are no entries in the database for a word, don't add it > change in the controller

Comment gérer correctement les erreurs? dans le controller, on mélange withErro avec un ErrorMessage présent dans $dataPage => what is the best then to deal with error messages in the front end?

Le champ est vide ou contient des symboles >	$request->validate()	errors.word
Le mot existe déjà dans la liste >	back()->withErrors()	errors.word
Le dictionnaire ne reconnaît pas le mot lors de l'ajout >	back()->withErrors()	errors.word
Impossible de récupérer la définition d'un mot existant	> errorMessage	errorMessage sous le mot

Cela évite de mélanger les erreurs de formulaire avec celles qui concernent les définitions.