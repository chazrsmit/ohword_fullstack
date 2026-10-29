<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// Let's import Laravel's HTTP client:
use Illuminate\Support\Facades\Http; // We use this to make HTTP GET requests from Laravel to the external dictionary API.
// Resource on how to make Http requests from Laravel to other servers: https://laravel.com/framework/docs/12.x/http-client.
use App\Models\Word; // We need it to use the model 'Word'.
use Inertia\Inertia; // We need it to use Inertia.

class WordController extends Controller
{
    //////////////////////////////////////////////////////////////
    //// METHOD to display the words on the homepage: INDEX()
    public function index() {
        $words = Word::all(); // Retrieves all the words from the database.

        // Here, it tells Inertia which React page to render and which data to pass to it:
        return Inertia::render('Home', [
            'words' => $words // We create a props called "words" that will be available to use on that React page (Home.jsx).
        ]);
    }
    //////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //// METHOD to create a word and add it to the database: STORE()
    // How it works:
    // 1) React sends the word to Laravel through Inertia's useForm.
    // 2) We check with validate() that the request isn't empty and that it's a string.
    // 3) We then query the dictionary API and check whether it recognizes the word.
    // 4) We save the word and its details or return an error if it's not part of the dictionary.
    public function store(Request $request) {
        $request->validate([
                'word' => 'required|string|regex:/^[a-zA-Z]+$/' // The column word, found in the 'Words' table.
            ]);

        //// To use the submitted word in the fetched url, we first store it in a variable:
        $wordText = $request->word; 
        $response = Http::get('https://freedictionaryapi.com/api/v1/entries/en/'.urlencode($wordText));
        // 'urlencode()' helps safely encode the word for use in a URL, especially if it contains spaces or special characters.

        //// If the response is unsuccesful:
        if (!($response->successful())) return back() -> withErrors(['word' => 'The dictionary service is unavailable.']);

        //// If we have a successful response, we'll store the data returned as json in a variable.
        if ($response->successful()) {
            $data = $response->json();
            $entries = $data['entries']; // In the API, all the info is stored in the 'entries' property.

            //// If there are no entries in the dictionary, we don't save the word:
            if (empty($entries)) return back()->withErrors(['word' => 'The word does not exist.']);
            // NB: 'withErrors()' is a Laraval method that allows to send errors to the browser/navigateur.
            // In the front-end, the Object returned by the useForm() and its 'errors' property will allow us to access the error.

            //// Before saving the word, we need to check if it's not already in the database:
            if (Word::where('word', $wordText)->exists()) return back()->withErrors(['word' => 'The word is already in the list.']);
            
            //// And if it's not in the database yet, we save the word:
            // Using a manual approach:
            $word = new Word();
            $word->word = $wordText;
            // or using the Model's mass assignment feature:
            // Word::create(['word' => $wordText]);

            //// But then, another step: we need to store the details of the word fetched from the database.
            $word->phonetics = $entries[0]['pronunciations'][0]['text'] ?? '';
            $word->type1 = $entries[0]['partOfSpeech'] ?? '';
            $word->type2 = $entries[1]['partOfSpeech'] ?? '';
            $word->def1 = $entries[0]['senses'][0]['definition'] ?? '';
            $word->def1bis =  $entries[0]['senses'][1]['definition'] ?? '';
            $word->def2 = $entries[1]['senses'][0]['definition'] ?? '';
            $word->def2bis = $entries[1]['senses'][1]['definition'] ?? '';
            $word->source = $data['source']['url'] ?? '';
            $word->save();

            return redirect() -> route('home') -> with('success', 'Word successfully added.'); 
        }
        
        //// If the word wasn't found:
        if ($response->notFound()) return back() -> withErrors(['word' => 'The word was not found in the dictionary.']);
    
    }
    //////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //// METHOD to show the details of the word: SHOW()
    public function show($id) {
        // Here, we retrieve the clicked word and send its details (stored in the database) as a variable to the frontend
    
        $word = Word::findOrFail($id);
        $wordId = $word->id;
        $details = [
            'phonetics' => $word->phonetics,
            'type1' => $word->type1,
            'type2' => $word->type2,
            'def1' => $word->def1,
            'def1bis' => $word->def1bis,
            'def2' => $word->def2,
            'def2bis' => $word->def2bis,
            'source' => $word->source
        ];

        // Let's not forget to also include 'words' as a variable
        $words = Word::all();

        // return Inertia::render('Home', [
        //     'wordId' => $wordId,
        //     'details' => $details,
        //     'words' => $words
        //     ]);

        // Some changes: instead of returning an entire Inertia page, Laravel returns a JSON response containing the requested data
        return response()->json([
            'wordId' => $wordId,
            'details' => $details,
            'words' => $words
        ]);
    }
    //////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////
    //// METHOD to delete the word from the database

    public function destroy($id) {

        $word = Word::findOrFail($id);
        $word->delete();

        return redirect() -> route('home') -> with('success', 'Word successfully deleted.');

    }
}
