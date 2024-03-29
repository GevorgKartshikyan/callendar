import React, {useEffect, useRef, useState} from 'react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import FullCalendar from "@fullcalendar/react";
import {courses} from "../utils/data";
import dayGridPlugin from '@fullcalendar/daygrid'
import AddEventModal from "./AddEventModal";
import getDays from "../helpers/getDays";
import AddAttendedModal from "./AddAttendedModal";
import {v4 as uuidv4} from 'uuid';
import renderEventContent from "./EventRender";
import DeleteEventModal from "./DeleteEventModal";
import interactionPlugin from '@fullcalendar/interaction'

const MyCalendar = () => {
    const [selectedDaysRender, setSelectedDaysRender] = useState([])
    const [selectedResources, setSelectedResources] = useState([])
    const [eventAddModal, setEventAddModal] = useState('')
    const [eventDay, setEventDay] = useState('')
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
                        setResourceId(resource._resource.id)
                        setEventAddModal(true)
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
    const [dataIndex, setDataIndex] = useState(0)
    const calendarRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState({
        month: new Date().getMonth() + 1, year: new Date().getFullYear()
    })
    const [resourceId, setResourceId] = useState(null)
    const [resources, setResources] = useState(
        [
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
    const [selectedDays, setSelectedDays] = useState([])
    const [events, setEvents] = useState([])
    const [attendedModal, setAttendedModal] = useState(false)
    const [clickedEventId, setClickedEventId] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)

    useEffect(() => {
        let count = 0
        const newArray = resources.map((innerArray, index) => {
            if (index === dataIndex) {
                const updatedResources = innerArray.map(resource => {
                    const course = courses.find(course => course.id === resource.courseId);
                    if (course) {
                        count++
                        const eventsCount = events.filter(event => event.resourceId == resource.id);
                        const teacherMoney = course.teachMoney * eventsCount.length;
                        return {
                            ...resource,
                            course: course.title,
                            paid: course.paid ? '✔' : '✕',
                            courseRemaining: course.quantity - eventsCount.length,
                            teacherMoney: teacherMoney,
                            courseConducted: eventsCount.length,
                            price: resource.pricePerLesson * eventsCount.length
                        };
                    }
                    return resource;
                });
                let teacherTotalMoney = 0
                let totalCourseRemaining = 0
                let totalCourseConducted = 0
                let totalPrice = 0
                for (let i = 0; i < updatedResources.length - 1; i++) {
                    if (updatedResources.id !== 'total') {
                        teacherTotalMoney += +updatedResources[i].teacherMoney
                        totalCourseRemaining += +updatedResources[i].courseRemaining
                        totalCourseConducted += +updatedResources[i].courseConducted
                        totalPrice += +updatedResources[i].price
                    }
                }
                const totalResourceIndex = updatedResources.findIndex(resource => resource.id === 'total');
                updatedResources[totalResourceIndex].teacherMoney = teacherTotalMoney
                updatedResources[totalResourceIndex].courseRemaining = totalCourseRemaining
                updatedResources[totalResourceIndex].courseConducted = totalCourseConducted
                updatedResources[totalResourceIndex].price = totalPrice
                updatedResources[totalResourceIndex].course = count
                updatedResources[totalResourceIndex].paid = count
                return updatedResources
            } else {
                return innerArray
            }
        })
        setResources(newArray);
    }, [events, dataIndex]);
    const handleCloseModal = () => {
        setResourceId(null)
        setAttendedModal(false)
        setDeleteModal(false)
        setSelectedDays([])
        setEventAddModal(false)
    };
    const handleAddEvent = (text, attend) => {
        let newEvents = [...events]
        newEvents = [...newEvents, {
            resourceId: resourceId,
            start: eventDay,
            attended: attend === 'yes',
            color: '#fcdb03',
            id: uuidv4(),
            title: text
        }]
        setEvents(newEvents)
        setSelectedDays([])
        setResourceId(null)
        setAttendedModal(false)
    }
    const handleDateSet = (dateInfo) => {
        const startDate = dateInfo.startStr
        if (startDate === '2024-02-01T00:00:00Z') {
            setDataIndex(0)
        } else if (startDate === '2024-03-01T00:00:00Z') {
            setDataIndex(1)
        } else {
            setDataIndex(3)
        }
        setSelectedDate({
            month: new Date(startDate).getMonth() + 1, year: new Date(startDate).getFullYear()
        })
    }
    //
    const closeModal = () => {
        setResourceId(null)
        setSelectedDays([])
        setEventAddModal(false)
        setAttendedModal(false)
    }
    const handleEventClick = (eventInfo) => {
        const {event: {_def}} = eventInfo
        setClickedEventId(_def.publicId)
        setDeleteModal(true)
    }
    const findEventByPublicId = (title, attend) => {
        const cusTitle = title + attend + 'isNotWork'
        const calendarApi = calendarRef.current.getApi();
        const allEvents = calendarApi.getEvents();
        const event = allEvents.filter((e) => e._def.publicId === clickedEventId)
        event.map((e) => {
            e._def.title = cusTitle
            return e
        })
        const newEvents = events.map((e) => {
            if (e.id === clickedEventId) {
                if (attend === 'yes') {
                    e.attended = true
                }
                e.title = cusTitle
            }
            return e
        })
        setEvents(newEvents)
        setAttendedModal(false)
        // const updateResources = resources.map((e) => {
        //     events.forEach((event) => {
        //         if (event.resourceId == e.id) {
        //             if (event.attended && event.id === clickedEventId) {
        //                 e.courseConducted += 1
        //                 return;
        //             }
        //         }
        //     })
        //     return e
        // })
        // setResources(updateResources)
    };
    const deleteEvent = () => {
        const newEvents = events.filter((e) => e.id !== clickedEventId)
        setEvents(newEvents)
        setDeleteModal(false)
    }
    const closeDeleteModal = () => {
        setDeleteModal(false)
    }
    const handleSelect = arg => {
        const exist = events.find((e) => e.start === arg.startStr && e.resourceId == arg.resource._resource.id)
        if (!exist) {
            setEventDay(arg.startStr)
            setResourceId(arg.resource._resource.id)
            setAttendedModal(true)
        }
    };
    const getAllSelectedDays = () => {
        const daysWeek = selectedDays.map((e) => {
            return e.value
        })
        const days = getDays({month: selectedDate.month, year: selectedDate.year, daysOfWeek: daysWeek})
        const allDays = [...days]
        const daysInMonth = allDays.map(function(date_str) {
            let parts = date_str.split('-');
            let day = parseInt(parts[2]);
            return day - 1;
        });
        if (!selectedResources.includes(resourceId)) {
            setSelectedResources([...selectedResources, resourceId])
        }
        const bigElement = document.querySelectorAll('.fc-timeline-body')[0]
        const tr = bigElement.querySelector(`td[data-resource-id="${resourceId}"]`);
        if (tr){
            const div = tr.querySelector('.fc-timeline-events')
            for (let i=0;i < daysInMonth.length;i++){
                const newDiv = document.createElement('div');
                newDiv.className = 'fc-timeline-event-harness';
                newDiv.style = `top: 0px; left:${daysInMonth[i] * 62}px; right: ${(daysInMonth[i]+1) * -62}px;`;
                newDiv.innerHTML = `
            <a  tabindex="0" class="fc-event fc-event-start fc-event-end fc-event-past fc-timeline-event fc-h-event" style="border-color: rgb(252, 219, 3); background-color: rgb(252, 219, 3); z-index: -100000">
              <div class="fc-event-main" style="color: rgb(0, 0, 0);">
                <div style="background-color: #ebde34; min-height: 25px; overflow: hidden; color: rgb(255, 255, 255);"></div>
              </div>
            </a>
          `;
                div.appendChild(newDiv)
            }
        }
        setSelectedDays([])
        setResourceId('')
        setEventAddModal(false)
    }
    return (<>
            <div id='calendar'>
                <FullCalendar
                    dayCellContent={(arg) => {
                        console.log(arg);
                    }}
                    slotLabelFormat={{
                        weekday: "short",
                        day: 'numeric'
                    }}
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin, resourceTimelinePlugin]}
                    timeZone='UTC'
                    aspectRatio={1.5}
                    initialView='resourceTimelineMonth'
                    headerToolbar={{
                        right: 'today prev,next', center: 'title', left: null
                    }}
                    schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
                    resourceAreaColumns={resourceAreaColumns}
                    resources={dataIndex === 0 || dataIndex === 1 ? resources[dataIndex] : []}
                    resourceAreaWidth={'50%'}
                    events={events}
                    eventTextColor='#000'
                    datesSet={handleDateSet}
                    selectable={true}
                    dateClick={(arg) => {
                        console.log(arg)
                    }}
                    select={handleSelect}
                    eventClick={handleEventClick}
                    eventContent={(renderProps, createElement) => renderEventContent(renderProps, createElement)}
                />
            </div>
            {(resourceId && eventAddModal) && (<div className='overlay' onClick={handleCloseModal}>
                <AddEventModal closeModal={closeModal} handleAddEvent={getAllSelectedDays} selectedDays={selectedDays}
                               setSelectedDays={setSelectedDays}/>
            </div>)}
            {attendedModal && <div className='overlay' onClick={handleCloseModal}>
                <AddAttendedModal closeModal={closeModal} handleAddEvent={handleAddEvent}/>
            </div>}
            {
                deleteModal && (<div className='overlay' onClick={handleCloseModal}>
                    <DeleteEventModal closeDeleteModal={closeDeleteModal} deleteEvent={deleteEvent}/>
                </div>)
            }
        </>

    )
};

export default MyCalendar;
