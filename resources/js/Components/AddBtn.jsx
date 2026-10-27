import '../../css/addbtn.css';

export default function AddBtn({ data, errors, setData, processing }) {

    return(
        <>
            {/* Input */}
            <input
                type="text"
                placeholder="add word"
                value={data.word}
                onChange={(e) => setData('word', e.target.value)}    
            />

            {/* Button */}
            <button id="btn-add" type="submit" disabled={processing}>
                {processing? 'Adding...': 'Add'}
            </button>

            {/* Affichage des erreurs */}
            <div className="errors">
                {errors.word &&
                    <p>→ {errors.word}</p>
                }
            </div>
        </>
    )
}