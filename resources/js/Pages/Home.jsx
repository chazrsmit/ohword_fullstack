import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Details from '../Components/Details';

export default function Home({words, wordId=null, details=null, errorMessage=null}) {

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
    //  we use clickedId to decide whether we open or close the panel
    const [clickedId, setClickedId] = useState(null);

    function handleMoreInfo(id) {
        if (clickedId == id) return setClickedId(null); // we close the word

        // otherwise, if the id clicked isn't the current clicked one, we set it to the new id
        setClickedId(id)
        
        // we send a GET request to Laravel using the word's id:
        // router.get(url, data, options);
        router.get(`/words/show/${id}`, {}, {
            preserveState:true,
            preserveScroll:true
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
                            <div className="col-12 col-lg-4">
                            <p key={word.id} className={`li-word ${wordId === word.id && 'open'}`} onClick={() => handleMoreInfo(word.id)}>{word.word}</p>

                            {/* additional info */}
                            
                            {clickedId === word.id && (
                                
                                <div>
                                    {wordId === word.id && errorMessage && (
                                        <p>{errorMessage}</p>
                                    )}

                                    {wordId === word.id && details && (
                                        <Details details={details}/>
                                //         <>
                                //             {details.phonetics && (
                                //                 <p>{details.phonetics}</p>
                                //             )}

                                //             {details.type1 && (
                                //                 <p>{details.type1}</p>
                                //             )}

                                //             {details.def1 && (
                                //                 <p>{details.def1}</p>
                                //             )}

                                //             {details.def2 && (
                                //                 <p>{details.def2}</p>
                                //             )}

                                //             {details.type2 && (
                                //                 <p>{details.type2}</p>
                                //             )}

                                //             {details.def3 && (
                                //                 <p>{details.def3}</p>
                                //             )}

                                //             {details.def4 && (
                                //                 <p>{details.def4}</p>
                                //             )}

                                //             {details.source && (
                                //                 <p>
                                //                     <a
                                //                         href={details.source}
                                //                         target="_blank"
                                //                         rel="noreferrer"
                                //                     >
                                //                         Dictionary source
                                //                     </a>
                                //                 </p>
                                //             )}
                                //         </>
                                   )}
                                </div>
                            )}

                            </div>
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

