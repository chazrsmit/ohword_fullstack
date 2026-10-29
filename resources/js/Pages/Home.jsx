import { Head, useForm, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Details from '../Components/Details';
import AddBtn from '../Components/AddBtn';
import NavMobile from '../Components/NavMobile';
import FooterMobile from '../Components/FooterMobile';
import LenisScroll from '../Components/LenisScroll';

export default function Home({ words, wordId=null, details=null, flash={}, auth={} }) {

    // Are we on mobile or not?
    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        function resize() {
            if (window.innerWidth < 768) return setIsMobile(true);
            else return setIsMobile(false);
        }
        // We call resize() immediately when the component mounts
        resize();

        // In case of window resizing:
        window.addEventListener("resize", resize)
        
        // Clean up, we remove the event listener 
        return () => window.removeEventListener("resize", resize);
    }, [])

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
        post('/', {
            preserveState:true,
            preserveScroll:true,
            onSuccess: () => reset('word')
        })
    }
    //  we use clickedId to decide whether we open or close the panel
    const [clickedId, setClickedId] = useState(null);

    async function handleMoreInfo(id) {
        if (clickedId == id) return setClickedId(null); // we close the word

        // otherwise, if the id clicked isn't the current clicked one, we set it to the new id
        setClickedId(id)
        
        // Option 1:
        // we send a GET request to Laravel using the word's id:
        // router.get(url, data, options);
        router.get(`/words/show/${id}`, {}, {
            preserveState:true,
            preserveScroll:true
        })

        // Option 2:
        // We use a fetch() to retrieve the json data from the backend, returned by the show() function
        // const response = await fetch(`/words/show/$id`);
        // if (!response.ok) {
        //     throw new Error('Error loading data.');
        // }
        // const data = await response.json();
        // Then, we use useState to store details and wordId.
    }

    // Sorting alphabetically
    const sortedWords =
        // we create a copy before sorting, leaving the original list intact
        [...words].sort((a,b) => {
            return a.word.localeCompare(b.word);
        });

    // We make error and flash messages disappear after 4 seconds:
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        // If there are no messages:
        if (!flash.success && !errors.word) return;

        setShowMessage(true);

        const timer = setTimeout(() => {
            setShowMessage(false);
        }, 3000)
        // In JavaScript, people often use lambda to refer to an anonymous function or an arrow function,
        // particularly when it's passed as an argument.

        return () => clearTimeout(timer); // it gives React a function to execute later, not now.
    }, [flash.success, errors.word])

    return(
        <>
            <Head title="Oh word"/>
            {isMobile &&
                <NavMobile />
            }
  
           
            <main className={`home d-flex ${isMobile? 'flex-column-reverse' : null}`}>
                {/* LEFT COLUMN: words */}
                <div className="d-flex flex-wrap col-12 col-md-9">
                    <AnimatePresence initial={false} mode="popLayout">
                        // REMINDER: in Javascript, curly braces require an explicit RETURN
                        // with parentheses, the return is implicit
                        {sortedWords.map(word => (
                            <div className="div-word mb-2 col-12 col-md-4" key={word.id}>
                                <motion.div
                                    className="word-motion"
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -8 }}
                                    transition={{
                                        opacity: { duration: 0.5 },
                                        y: { duration: 0.5 }
                                    }}
                                >
                                {/* THE WORD */}
                                <div
                                    className={`li-word ${clickedId === word.id && 'open'}`}
                                    onClick={() => handleMoreInfo(word.id)}
                                >
                                    <p>{word.word}</p>
                                </div>

                                {/* ADDITIONAL INFO */}
                                <AnimatePresence >
                                {clickedId === word.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{  height: wordId === word.id && details ? "auto" : 0, opacity: 1 }}
                                        exit={{  height: 0, opacity: 0 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}                                       
                                    >
                                        <AnimatePresence >
                                        {wordId === word.id && details ? (
                                            <Details word={word} details={details} onDeleteSuccess={() => setClickedId(null)} canDelete={Boolean(auth.user)} />
                                        ) :
                                        (
                                            null
                                        )}
                                        </AnimatePresence>
                                    </motion.div>
                                )}
                                </AnimatePresence>
                                </motion.div>
                            </div>
                        ))}
                    </AnimatePresence>
                    {/* Empty state */}
                    {sortedWords.length === 0 && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            NO WORDS YET
                        </motion.p>
                    )}
                </div>

                {/* RIGHT COLUMN: add bouton */}
                {/* <div className="add col-5 col-md-4 col-lg-3 d-flex flex-column align-items-end border"> */}
                {!isMobile &&
                (<div className={'add-desktop'}>
                    <form onSubmit={handleSubmit}>
                        <AddBtn auth={auth} data={data} errors={errors} showMessage={showMessage} flash={flash} setData={setData} processing={processing} />
                    </form>
                </div>
                )}

                {/* Logging out */}
                {auth.user &&
                <div className="btn-logout">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            router.post('/logout');
                        }}
                    >
                        <button type="submit">Log out</button>
                    </form>
                </div>
                }
            </main>


            {isMobile &&
                <FooterMobile auth={auth} flash={flash} showMessage={showMessage} handleSubmit={handleSubmit} data={data} errors={errors} setData={setData} processing={processing} />
            }
        </>
    )
}

