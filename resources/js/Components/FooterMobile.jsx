import '../../css/footer.css'
import {AnimatePresence, motion} from 'motion/react'

export default function FooterMobile({ handleSubmit, data, errors, setData, processing, flash, showMessage }) {

    return (
        <div className="wrapping-footer">
            <form onSubmit={handleSubmit}>
                {/* error or success messages */}
                <div className="mobile-div-messages">
                    <AnimatePresence>
                    {showMessage && errors.word &&
                        <motion.p
                            key="word-error"
                            className="messages-mobile"
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
                        className="messages-mobile"
                        initial={{opacity:0}}
                        animate={{opacity:1}}
                        exit={{opacity:0}}
                        transition={{duration:0.25, ease:"easeInOut"}}
                    >
                        → {flash.success}
                    </motion.p>
                    }
                    </AnimatePresence>
                </div>
                <div className="div-input-btn d-flex gap-2 justify-content-between">
                    {/* left side - input area */}
                    <div className="div-mobile-input h-100">
                        <input
                            id="mobile-input"
                            className="w-100 h-100"
                            type="text"
                            placeholder="Add word..."
                            value={data.word}
                            onChange={(e) => setData('word', e.target.value)}    
                        />
                    </div>
                    {/* Right side - button */}
                    <div className="div-mobile-add">
                        <button id="mobile-add" className="h-100 w-100" type="submit" disabled={processing}>
                            {processing? '...': '→'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )

}