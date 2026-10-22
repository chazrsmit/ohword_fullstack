<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// let's import Laravel's HTTP client:
use Illuminate\Support\Facades\Http; // we use this to make HTTP GET requests from Laravel to the external dictionary API
use App\Models\Word; // to use the model Word
use Inertia\Inertia; // to return an Inertia page

// source on making Http requests from Laravel to other servers: https://laravel.com/framework/docs/12.x/http-client

// Here, the central concept to remember is that useForm() manages the data being entered and submitted by the frontend.
// The Laravel Word model manages the records stored in the database. Inertia connects those two stages.

class WordController extends Controller
{
    // method to display the words on the homepage
    public function index() {
        $words = Word::all(); // retrieves all the word from the database
        // here, it tells Inertia which React page to render and which data to pass to it

        return Inertia::render('Home', [
            'words' => $words // we create a props called "words" that will be available to use on that React page (Home.jsx)
        ]);
    }

    // method to create a word and add it to the database
    // HOW IT WORKS:
    // 1) React sends the word to Laravel.
    // 2) We check with validate() that the request it isn't empty and is a string.
    // 3) We then query the dictionary API and check wether it recognizes the word
    // 4) We save the word or return an error if it's not part of the dictionary
    public function store(Request $request) {
        $request->validate([
                'word' => 'required|string|regex:/^[a-zA-Z]+$/' // issue: it cannot have numeric values or symbols [a-zA-Z]
            ]);

        // to use the submitted word in the fetched url, we first store it in a variable:
        $wordText = $request->word; 
        $response = Http::get('https://freedictionaryapi.com/api/v1/entries/en/'.urlencode($wordText));
        // urlencode() helps safely encode the word for use in a URL, especially if it contains spaces or special characters
       
        if ($response->successful()) {
            // before saving it, we need to check if it's not already in the database:
            if (Word::where('word', $wordText)->exists()) return back()->withErrors(['word'=>'The word is already in the list.']);
            // if it's in the dictionary and not in the database yet, we save the word:
            // manual approach:
            $word = new Word();
            $word->word = $wordText;
            $word->save();
            // or using the Model's mass assignment feature:
            // Word::create(['word' => $wordText]);
            return redirect() -> route('home');
        }

        if ($response->notFound()) return back() -> withErrors(['word'=>'The word was not found in the dictionary.']);
        
        return back() -> withErrors(['word'=>'The dictionary service is unavailable.']);
    }

    public function show($id) {
        // write here the method to call the API and receive the information about the clicked word.
        $word = Word::findOrFail($id);
        $clickedWord = $word->word;
        $response = Http::get('https://freedictionaryapi.com/api/v1/entries/en/'.urlencode($clickedWord));

        $dataPage = [
                'words' => Word::all(),
                'wordId' => $word->id,
                'details' => null, // c'est ici qu'on va ajouter les détails du json
                'errorMessage' => null // si on a des erreurs, on va le mettre ici
        ];  

        if(!$response->successful()) {
            $dataPage['errorMessage'] = "Error";
            return Inertia::render('Home', $dataPage);
        };
        
        // on récupère les données du JSON
        // phonétique, définition1, def2, def3, type de mot 1, type de mot 2, source
        $data = $response->json();
        $entries = $data['entries'] ?? [];

        // If there's a successful response but no entry:
        if (empty($entries)) {
            $dataPage['errorMessage'] = "No entry";
            return Inertia::render('Home', $dataPage);
        };
        
        // otherwise, we store the info in the $dataPage > details variable
         $dataPage['details'] = [
            'phonetics' =>
                $entries[0]['pronunciations'][0]['text'] ?? '',

            'type1' =>
                $entries[0]['partOfSpeech'] ?? '',

            'type2' =>
                $entries[1]['partOfSpeech'] ?? '',

            'def1' =>
                $entries[0]['senses'][0]['definition'] ?? '',

            'def2' =>
                $entries[0]['senses'][1]['definition'] ?? '',

            'def3' =>
                $entries[1]['senses'][0]['definition'] ?? '',

            'def4' =>
                $entries[1]['senses'][1]['definition'] ?? '',

            'source' =>
                $data['source']['url'] ?? '',
        ];

        // we return the same page with the new info
        return Inertia::render('Home', $dataPage);
    }
}
