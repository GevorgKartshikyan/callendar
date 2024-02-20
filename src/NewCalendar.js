import React, {useRef, useState} from 'react';
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import dayGridPlugin from "@fullcalendar/daygrid";
import renderEventContent from "./components/EventRender";
import FullCalendar from "@fullcalendar/react";

function NewCalendar(props) {
    const [resources, setResources] = useState([
        [{
        id: 1,
        courseId: 1,
        name: 'Գագիկ Պողոսյան',
        course: '',
        paid: '',
        courseRemaining: '',
        teacherMoney: '',
        pricePerLesson: 1500,
        courseConducted: 0,
        price: '',
    },
        {
            id: 2,
            courseId: 2,
            name: 'Արամ Գրիգորյան',
            course: '',
            paid: '',
            courseRemaining: '',
            teacherMoney: '',
            pricePerLesson: 2000,
            courseConducted: 0,
            price: ''
        },
        {
            id: 3,
            courseId: 3,
            name: 'Նարեկ Աբրահամյան',
            course: '',
            paid: '',
            courseRemaining: '',
            teacherMoney: '',
            pricePerLesson: 1800,
            courseConducted: 0,
            price: ''
        },
        {
            id: 4,
            courseId: 4,
            name: 'Լիլիթ Մարտիրոսյան',
            course: '',
            paid: '',
            courseRemaining: '',
            teacherMoney: '',
            pricePerLesson: 2200,
            courseConducted: 0,
            price: ''
        },
        {
            id: 5,
            courseId: 5,
            name: 'Վարդան Արշակյան',
            course: '',
            paid: '',
            courseRemaining: '',
            teacherMoney: '',
            pricePerLesson: 1700,
            courseConducted: 0,
            price: ''
        },
        {
            id: 'total',
            name: 'Ընդհանուր',
            course: 0,
            paid: 0,
            courseRemaining: 0,
            teacherMoney: 0,
            courseConducted: 0,
            price: 0
        }],
        [{
            id: 6,
            courseId: 6,
            name: 'Գեւորգ Մաթեւոսյան',
            course: '',
            paid: '',
            courseRemaining: '',
            teacherMoney: '',
            pricePerLesson: 4260,
            courseConducted: 0,
            price: ''
        },
            {
                id: 7,
                courseId: 7,
                name: 'Սամվել Սիմոնյան',
                course: '',
                paid: '',
                courseRemaining: '',
                teacherMoney: '',
                pricePerLesson: 2250,
                courseConducted: 0,
                price: ''
            }, {
            id: 'total',
            name: 'Ընդհանուր',
            course: 5,
            paid: 5,
            courseRemaining: 0,
            teacherMoney: 0,
            courseConducted: 0,
            price: 0
        }]])
    const resourceAreaColumns = [
        {
            id: 'day',
            field: 'day',
            headerContent: 'Օրեր',
            width: '5%',
            cellContent: (component) => {
                if (component.resource._resource.id === 'total') {
                    return null
                }
                return (<img
                    onClick={() => {
                        const {resource} = component
                        // setResourceId(resource._resource.id)
                    }}
                    style={{
                        width: 20,
                        height: 20,
                        cursor: 'pointer'
                    }}
                    alt='icon'
                    src='https://cdn-icons-png.flaticon.com/512/3652/3652191.png'
                />)
            },
        },

        {
            id: 'title',
            field: 'name',
            headerContent: 'Անուն Ազգանուն',
            width: '19%'
        },
        {
            width: '19%',
            id: 'course',
            field: 'course',
            headerContent: 'Դասընթաց'
        },
        {
            id: 'paid',
            field: 'paid',
            headerContent: 'Վճարված'
        },
        {
            id: 'courseRemaining',
            field: 'courseRemaining',
            headerContent: 'Մնացորդ դասերի քանակ'
        },
        {
            id: 'teacherMoney',
            field: 'teacherMoney',
            headerContent: 'Ուսուցչի գումար'
        },
        {
            id: 'pricePerLesson',
            field: 'pricePerLesson',
            headerContent: 'Մեկ դասի գինը'
        },
        {
            id: 'courseConducted',
            field: 'courseConducted',
            headerContent: 'Իրականացված դասերի քանակ (ներկաներ)'
        },
        {

            id: 'price',
            field: 'price',
            headerContent: 'Գումար'
        },
    ]
    const calendarRef = useRef()
    return (
        <FullCalendar
            initialView='dayGridMonth'
        />
    );
}

export default NewCalendar;
