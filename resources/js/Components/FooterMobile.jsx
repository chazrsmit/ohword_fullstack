import '../../css/footer.css'

export default function FooterMobile({ handleSubmit, data, errors, setData, processing, flash }) {

    return (
        <div className="wrapping-footer">
            <form onSubmit={handleSubmit}>
                {/* error or success messages */}
                <div className="mobile-messages">
                    {errors.word &&
                        <p>→ {errors.word}</p>
                    }
                    {flash.success &&
                    <p className="success-message-mobile">→ {flash.success}</p>
                    }
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