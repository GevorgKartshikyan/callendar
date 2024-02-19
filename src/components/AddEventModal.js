import React from 'react';

function AddEventModal({selectedDays, setSelectedDays,handleAddEvent,closeModal}) {
    const daysOfWeek = [
        {id: 1, label: 'Երկուշաբթի', value: 'Monday'},
        {id: 2, label: 'Երեքշաբթի', value: 'Tuesday'},
        {id: 3, label: 'Չորեքշաբթի', value: 'Wednesday'},
        {id: 4, label: 'Հինգշաբթի', value: 'Thursday'},
        {id: 5, label: 'Ուրբաթ', value: 'Friday'},
        {id: 6, label: 'Շաբաթ', value: 'Saturday'},
        {id: 7, label: 'Կիրակի', value: 'Sunday'}
    ];
    const handleDayChange = (event) => {
        const selectedOption = daysOfWeek.find(day => day.value === event.target.value);
        const index = selectedDays.findIndex(day => day.value === selectedOption.value);
        if (index === -1) {
            setSelectedDays([...selectedDays, {value: selectedOption.value, label: selectedOption.label}]);
        }
    }
    const handleDeleteDay = (day) => {
        setSelectedDays(selectedDays.filter((e) => e.value !== day))
    }
    return (
        <div className='modal' onClick={(e) => e.stopPropagation()}>
            <div className='modal-content'>
                <select onChange={handleDayChange}>
                    <option value="">Ընտրեք օր</option>
                    {daysOfWeek.map((e) => (
                        <option className='option' key={e.id} value={e.value}>
                            {e.label}
                        </option>
                    ))}
                </select>
                <div className='selected-days'>
                    {selectedDays.map((e) => (
                        <button key={e.label} className='selected-day-block'>
                            <span onClick={() => handleDeleteDay(e.value)} className='delet-btn'>x</span>
                            <span>{e.label}</span>
                        </button>
                    ))}
                </div>
                <div className='btns-block'>
                    <button onClick={handleAddEvent} className='save-close-btn'>Պահպանել</button>
                    <button onClick={closeModal} style={{background: '#D9534F'}} className='save-close-btn'>Փակել</button>
                </div>
            </div>
        </div>
    );
}

export default AddEventModal;
