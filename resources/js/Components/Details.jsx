import '../../css/details.css'
import { motion, AnimatePresence } from 'motion/react';
import { router } from '@inertiajs/react'

export default function Details({ details, word, onDeleteSuccess }) {

    const def1Capitalized = details.def1.charAt(0).toUpperCase().concat(details.def1.slice(1));
    const def2Capitalized = details.def2? details.def2.charAt(0).toUpperCase().concat(details.def2.slice(1)) : null;
    // NB: the function charAt only works with strings and not with arrays

    function handleDelete(id) {
        router.delete(`/words/delete/${id}`, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => onDeleteSuccess()
        })
    };

    return (
            <>
            <motion.div
                className="div-infos"
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {/* phonetic et types et remove */}
                <div className=" d-flex align-items-start justify-content-between">
                    {/* bloc 1 */}
                    <div className="d-flex">
                        {details.phonetics && 
                            <div className="me-3">
                                <p id="phonetic">{details.phonetics}</p>
                            </div>
                        }
                        <div className="types d-flex gap-1">
                            (
                            <p>{details.type1}</p>
                            {details.type2 &&
                            <div className="d-flex gap-1">
                                <p>•</p>
                                <p>{details.type2}</p>
                            </div>
                            }
                            )
                        </div>
                    </div>
                    {/* bloc 2 */}
                    <div className="div-remove d-flex align-items-end">
                        <button id="btn-remove" onClick={() => handleDelete(word.id)}>remove</button>
                    </div>
                </div>

                {/* définitions */}
                <div className=" div-defs">
                    <div className="d-flex gap-3">
                        <div className="d-flex align-items-start">
                            <div className="lilbtn"><p>1</p></div>
                        </div>
                        <p className="p-def">
                            {def1Capitalized}
                        </p>
                    </div>
                    {details.def2 &&
                    <div className=" d-flex gap-3">
                        <div className="">
                            <div className="lilbtn"><p>2</p></div>
                        </div>
                        <p className="p-def">
                            {def2Capitalized}
                        </p>
                    </div>
                    }
                    {/* Background text */}
                    <div className=" div-bg">
                        <p>{word.word}</p>
                    </div>
                </div>

                {/* source */}
                <div className=" d-flex justify-content-between">
                    <a id="more" href={details.source} target="_blank" rel="noreferrer">→ source</a>
                </div>
            </motion.div>
        </>
    )
}