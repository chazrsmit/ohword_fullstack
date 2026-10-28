import '../../css/addbtn.css';
import {AnimatePresence, motion} from 'motion/react'

export default function AddBtn({ data, errors, setData, processing, flash, showMessage, auth }) {

    return(
        <>
        <div className="add-desktop-container d-flex justify-content-end align-items-baseline">
            {/* Input */}
            <div className="desktop-input  d-flex">
                {auth.user &&
                <input
                    id="add-desktop"
                    type="text"
                    className=""
                    placeholder={auth.user ? 'Type word...' : '...'}
                    value={data.word}
                    onChange={(e) => setData('word', e.target.value)}    
                /> }
            </div>
            
            {/* Button */}
            <div>
                <button id="btn-add" className={`${auth.user ? 'btn-on' : 'btn-disabled'}`} type="submit" disabled={!auth.user || processing}>
                    {processing? '...': 'Add'}
                </button>
            </div>
        </div>
        {/* Affichage des erreurs ou flash messages */}
        <div className="div-messages-desktop">
            <AnimatePresence>
            {showMessage && errors.word &&
                <motion.p
                    key="word-error"
                    className="messages-desktop"
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    transition={{duration:0.25, ease:"easeInOut"}}
                >
                    → {errors.word}
                </motion.p>
            }

            {showMessage && flash.success &&
                <motion.p
                    key="word-success"
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    transition={{duration:0.25, ease:"easeInOut"}}
                    className="messages-desktop"
                >
                    → {flash.success}
                </motion.p>
            }
            </AnimatePresence>
        </div>
        </>
    )
}