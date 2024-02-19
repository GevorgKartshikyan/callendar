import React, {useState} from 'react';

function AddAttendedModal({onAttend,setAttendedModal}) {
    const [inputText,setInputText]=useState('')
    const [attended , setAttended] = useState('no')

    return (
        <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='modal-content'>
                <div className='input-block'>
                    <textarea value={inputText} onChange={(e)=>setInputText(e.target.value)} placeholder='Մեկնաբանություն' className='text-area'/>
                </div>
                <select onChange={(e)=>setAttended(e.target.value)} name="" id="">
                    <option value=''>Վճարված դաս</option>
                    <option value='yes'>Այո՛</option>
                    <option value='no'>Ոչ</option>
                </select>
                <div className='btns-block'>
                    <button onClick={()=>onAttend(inputText,attended)} className='save-close-btn'>Ավելացնել</button>
                    <button onClick={()=>setAttendedModal(false)} style={{background: '#D9534F'}} className='save-close-btn'>Փակել</button>
                </div>
            </div>
        </div>
    );
}

export default AddAttendedModal;
