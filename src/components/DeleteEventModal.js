import React from 'react';

function DeleteEventModal({deleteEvent,closeDeleteModal}) {
    return (
        <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='modal-content'>
                <h1>Ցանկանու՞մ եք ջնջել ներկայությունը</h1>
                <div className='btns-block'>
                <button onClick={deleteEvent} style={{background:'#3085D6' , padding:'15px 25px'}} className='save-close-btn'>Այո՛</button>
                <button onClick={closeDeleteModal} style={{background: '#AAAAAA', padding:'15px 25px'}} className='save-close-btn'>Ոչ</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteEventModal;
