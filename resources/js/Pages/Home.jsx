import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Details from '../Components/Details';
import AddBtn from '../Components/AddBtn';
import { motion, AnimatePresence } from 'motion/react';

export default function Home({words, wordId=null, details=null, errorMessage=null}) {

    // We need to load useForm(), which is part of the Inertia's React library (so not regular React nor Laravel)

    // Javascript object destructuring:
    // The useForm function returns an object with several properties
    // Destructuring lets us take selected properties from that object and assign them to individual variables
    const { data, setData, post, processing, errors, reset } = useForm({
        word: '', // We pass to the function a JS object (front-end object) as an argument.
                  // It tells the function which form fields to initialise and their starting values.
        // Conceptually, we're telling Inertia: "I'm managing a form with one field called 'word'.
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
                {/* LEFT COLUMN: words */}
                <div className="col-12 col-lg-9 border">
                    {words.length === 0 ? (
                        <p>NO WORDS YET</p>
                        ) : (
                        // REMINDER: in Javascript, curly braces require an explicit RETURN
                        // with parentheses, the return is implicit
                         words.map(word => (
                            <motion.div  className="div-word" key={word.id}>
                                {/* THE WORD */}
                                <div
                                    className={`li-word ${clickedId === word.id && 'open'}`}
                                    onClick={() => handleMoreInfo(word.id)}
                                >
                                    <p>{word.word}</p>
                                </div>

                                {/* ADDITIONAL INFO */}
                                <AnimatePresence>

                                {clickedId === word.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{  height: 200, opacity: 1 }}
                                        exit={{  height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    >
                                        {wordId === word.id && errorMessage && (
                                            <p>{errorMessage}</p>
                                        )}
                                        <AnimatePresence>
                                        {wordId === word.id && details ? (
                                            <Details details={details}/>
                                        ) :
                                        (
                                            <p></p>
                                        )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}
                                </AnimatePresence>
                            </motion.div>
                         ))
                    )}
                </div>

                {/* RIGHT COLUMN: add bouton */}
                {/* <div className="add col-5 col-md-4 col-lg-3 d-flex flex-column align-items-end border"> */}
                <div className="add">
                    <form onSubmit={handleSubmit}>
                        <AddBtn data={data} errors={errors} setData={setData} processing={processing} />
                    </form>
                </div>
            </main>
        </>
    )
}

