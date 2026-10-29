## To do
> Handle uppercase input entries > already works no matter the input (if it's uppercase ou lowercase)

> Fetch the data from the dictionary API when I click on a word. > how to implement it? when i click on a word on the client-side, I need to send that info to the back-end via Laravel. Then, in the WordController or another Controller, I fetch the external API to get all the information about the clicked word.

> Make error messages disappear after 4 seconds (timeout).

> Put design tokens in CSS variables.

> Add remove action in the WordController

> Hide the show URLs when i click on a word 

> Comment gérer correctement les erreurs? dans le controller, on mélange withErro avec un ErrorMessage présent dans $dataPage => what is the best then to deal with error messages in the front end?
Le champ est vide ou contient des symboles >	$request->validate()	errors.word
Le mot existe déjà dans la liste >	back()->withErrors()	errors.word
Le dictionnaire ne reconnaît pas le mot lors de l'ajout >	back()->withErrors()	errors.word
Impossible de récupérer la définition d'un mot existant	> errorMessage	errorMessage sous le mot
Cela évite de mélanger les erreurs de formulaire avec celles qui concernent les définitions.

>Ajouter Lenis Scroll

> Revoir le design : déjà, avoir les mots alpahétiquement. pouvoir cliquer sur une ltettre (par exemple en mobile, avoir la liste des lettre sur le côté?). penser mobile-first, car je vais surtout l'utiliser en mobile.
pour une version application (à développer plus tard), le faire avec React Native et express/node en back end. L'application sera disponible pour quiconque voudrait l'utiliser (d'abord en anglais). Utiliser une autre API (payante?) pour cette version-là. POUR PLUS TARD!!

> en fait, stocker toutes les données sur le mot lorsqu'on l'ajoute, sinon ça prend trop de temps. par contre, si l'on change d'API, penser à incorporer un bouton "reload" ou "refresh" et ajouter une fonction dans le controller pour  update la source (l'API) et récupérer les nouvelles données pour les mots déjà existants !!!!

> protéger la DB en créant un user qui a seulement comme autorisation de lire? mais comment je fais alors? je dois m'enregistrer ?

> sur mobile : une vue single, mais possibilité de cliquer sur la lettre (ou appuyer) pour scroller au bon endroit

// The central concept to remember is that useForm() manages the data being entered and submitted by the frontend.
// The Laravel Word model manages the records stored in the database. Inertia connects those two stages.

> Dans la table words: chaque row correspond à un mot, qui a plusieurs colonnes: word (le mot), phonetics, type1, type2, def1, def1bis, def2, def2bis, source.

> style the error messages

Implement authentication and create your own account.
Disable public registration.
Protect store and destroy with auth middleware.
Hide Add and Delete controls from visitors
Change the word-detail interaction so the URL stays at /.
Test the published app in a logged-out browser to verify that viewing works but adding and deleting do not.

Your dictionary remains public so people can explore it as a portfolio project.
You have a private login page.
Only you can log in because there is no public registration.
Only authenticated users can add or delete words.
Your existing React, Inertia, Laravel and database setup stays in place.

DEPLOYMENT ON RENDER (FREE)
1. Prepare your GitHub repository

Check your environment secrets and make sure the project builds.

2. Set up the production database

Use a separate MySQL-compatible database, without exposing your local database.

3. Prepare the Laravel app for Render

Configure Docker so Render can install PHP dependencies and build your React assets.

4. Deploy and configure environment variables

Set production secrets, run migrations, and get your public URL.

5. Transfer your words and test authentication

Create your production login and verify visitors can't add or delete words.