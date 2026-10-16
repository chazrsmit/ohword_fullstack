import { Head, useForm } from '@inertiajs/react';

export default function Home({words}) {

    // We need to load useForm(), which is part of the Inertia's React library (so not regular React nor Laravel)

    // Javascript object destructuring:
    // The useForm function returns an object with several properties
    // Destructuring lets us take selected properties from that object and assign them to individual variables
    const { data, setData, post, processing, errors, reset } = useForm({
        word: '', // We pass to the function a JS object (front-end object) as an argument.
                  // It tells the function which form fields to initialise and their starting values.
        // Conceptually, we're telling Inertia: "I'm managing a form with one field called word.
        // Its value starts empty. Please give me the tools to update it, submit it, track its errors, and reset it."
        // The returned object's 'data' property holds the current form values.
    })

    // without object destructuring:
    //const form = useForm({ word: '' });
    //const data = form.data;
    //const setData = form.setData;
    //const post = form.post; etc...

    // we need to create a function for when we submit the form
    function handleSubmit(e) {
        e.preventDefault();
        // here, we send the request to Laravel:
        post('/words', {
            onSuccess: () => reset('word')
        })
    }

    return(
        <>
            <Head title="Oh word"/>

            <main className="home d-flex">
                <div className="col-6">
                    {words.length === 0 ? (
                        <p>NO WORDS YET</p>
                     ) : (
                        // in Javascript, curly braces require an explicit return
                        // wiht parentheses, the return is implicit
                         words.map(word => (
                            <p key={word.id}>{word.word}</p>
                         ))
                    )}
                </div>
                <div className="col-6">
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="add word"
                            value={data.word}
                            onChange={(e) => setData('word', e.target.value)}    
                        />
                        <button type="submit" disabled={processing}>
                            {processing? 'Adding...': 'Add'}
                        </button>
                        {errors.word && <p>{errors.word}</p>}
                    </form>
                </div>
               
            </main>
        </>
    )
}