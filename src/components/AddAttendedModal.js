import React, {useState} from 'react';

function AddAttendedModal({handleAddEvent,closeModal}) {
    const [inputText,setInputText]=useState('')
    const [attended , setAttended] = useState('yes')

    return (
        <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='modal-content'>
                <div className='input-block'>
                    <textarea value={inputText} onChange={(e)=>setInputText(e.target.value)} placeholder='Մեկնաբանություն' className='text-area'/>
                </div>
                <select onChange={(e)=>setAttended(e.target.value)} name="" id="">
                    <option value='yes'>Վճարված դաս</option>
                    <option value='no'>Չ՛վճարված դաս</option>
                </select>
                <div className='btns-block'>
                    <button onClick={()=>handleAddEvent(inputText,attended)} className='save-close-btn'>Ավելացնել</button>
                    <button onClick={closeModal} style={{background: '#D9534F'}} className='save-close-btn'>Փակել</button>
                </div>
            </div>
        </div>
    );
}

export default AddAttendedModal;
