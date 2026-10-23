import '../../css/details.css'
import { motion, AnimatePresence } from 'motion/react';

export default function Details({ details }) {

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
                <div className="d-flex justify-content-between">
                    {/* bloc 1 */}
                    <div className="d-flex">
                        {details.phonetic && 
                            <div className="me-3">
                                <p id="phonetic">{details.phonetic}</p>
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
                    <div className="d-flex align-items-end">
                        <button id="btn-remove">― remove</button>
                    </div>
                </div>
                {/* définitions */}
                <div className="div-defs">
                    <p>
                        <b className="pe-1 ps-1">1</b> {details.def1}
                        {details.def2 && <>&nbsp;<b className="pe-1 ps-1">2</b> {details.def2}</>}
                        {/* {details.def3 && <>&nbsp;<b className="pe-1 ps-1">3</b> {details.def3}</>}
                        {details.def4 && <>&nbsp;<b className="pe-1 ps-1">4</b> {details.def4}</>} */}
                    </p>
                </div>
                {/* source */}
                <div className="d-flex justify-content-between">
                    <a id="more" href={details.source} target="_blank" rel="noreferrer">→ source</a>
                </div>
            </motion.div>
        </>
    )
}