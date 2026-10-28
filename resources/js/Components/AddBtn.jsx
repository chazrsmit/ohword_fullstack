import '../../css/addbtn.css';

export default function AddBtn({ data, errors, setData, processing }) {

    return(
        <>
        <div className="add-desktop-container d-flex justify-content-end align-items-baseline">
            {/* Input */}
            <div className="desktop-input  d-flex">
                <input
                    id="add-desktop"
                    type="text"
                    className=""
                    placeholder="Type word..."
                    value={data.word}
                    onChange={(e) => setData('word', e.target.value)}    
                />
            </div>
            
            {/* Button */}
            <div>
                <button id="btn-add" className="" type="submit" disabled={processing}>
                    {processing? '...': 'Add'}
                </button>
            </div>
        </div>
            {/* Affichage des erreurs */}
            <div className="errors">
                {errors.word &&
                    <p>→ {errors.word}</p>
                }
            </div>
        </>
    )
}