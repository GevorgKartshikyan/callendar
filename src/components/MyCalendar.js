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

function getNextCompactMonth() {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;

    if (month === 12) {
        month = 1;
        year++;
    } else {
        month++;
    }

    return year + "-" + (month < 10 ? "0" : "") + month;
}

const nextCompactMonth = getNextCompactMonth();

function getNextMonth(dateString) {
    let parts = dateString.split('-');
    let year = parseInt(parts[0]);
    let month = parseInt(parts[1]);
    month++;
    if (month === 13) {
        year++;
        month = 1;
    }
    let formattedMonth = month < 10 ? '0' + month : month.toString();
    return year + '-' + formattedMonth;
}

function compareMonths(month1, month2) {
    const [year1, monthNum1] = month1.split('-');
    const [year2, monthNum2] = month2.split('-');
    const month1Int = parseInt(monthNum1);
    const month2Int = parseInt(monthNum2);
    if (year1 !== year2) {
        return parseInt(year1) > parseInt(year2);
    }
    return month1Int > month2Int;
}


const MyCalendar = () => {
    const [finalyDays, setFinalyDays] = useState(JSON.parse(localStorage.getItem('finalyDays')) || [])
    const [selectedMonth, setSelectedMonth] = useState(nextCompactMonth)
    const [daysForUse, setDaysForUse] = useState(JSON.parse(localStorage.getItem('daysForUse')) || [])
    const [eventAddModal, setEventAddModal] = useState(false)
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
                        cursor: 'pointer',
                        objectFit:'cover'
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
        JSON.parse(window.localStorage.getItem('resources')) ||
        [
            [
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
                    price: '',
                    date: '2024-04'
                }, {
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
                date: '2024-04'

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
                    price: '',
                    date: '2024-04'
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
                    price: '',
                    date: '2024-04'
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
                    price: '',
                    date: '2024-04'
                },
                {
                    id: 'total',
                    name: 'Ընդհանուր',
                    course: 0,
                    paid: 0,
                    courseRemaining: 0,
                    teacherMoney: 0,
                    courseConducted: 0,
                    price: 0,
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
                price: '',
                date: '2024-05'
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
                    price: '',
                    date: '2024-05'
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
    const [selectedDays, setSelectedDays] = useState(JSON.parse(window.localStorage.getItem('selectedDays')) || [])
    const [events, setEvents] = useState(JSON.parse(window.localStorage.getItem('events')) || [])
    const [attendedModal, setAttendedModal] = useState(false)
    const [clickedEventId, setClickedEventId] = useState(null)
    const [deleteModal, setDeleteModal] = useState(false)
    useEffect(() => {
        const newArray = resources.map((innerArray, index) => {
            let count = 0;
            if (index === dataIndex) {
                const updatedResources = innerArray.map((resource, index) => {
                    const course = courses.find(course => course.id === resource.courseId);
                    const prevResource = resources[dataIndex - 1];
                    let isPrev = false;

                    if (prevResource) {
                        prevResource.forEach(prev => {
                            const eventsCount = events.filter(event =>
                                +event.resourceId === +prev.id && prev.date === event.start.slice(0, 7) && resource.id === prev.id
                            );
                            if (eventsCount.length > 0) {
                                isPrev = true;
                            }
                        });
                    }
                    const allEventsCount = events.filter(event => +event.resourceId === resource.id);
                    const isNextEventsCount = events.filter(event =>
                        +event.resourceId === +resource.id && resource.date !== event.start.slice(0, 7) && !compareMonths(selectedMonth, event.start.slice(0, 7))
                    ).length
                    if (course) {
                        count++;
                        const eventsCount = events.filter(event =>
                            +event.resourceId === +resource.id && resource.date === event.start.slice(0, 7)
                        );
                        const prevEventsCount = events.filter(event =>
                            prevResource && prevResource.some(prev => +event.resourceId === +prev.id)
                        );
                        const teacherMoney = isPrev && prevEventsCount.length > 0 ? '' : resource.pricePerLesson * course.quantity;
                        return {
                            ...resource,
                            course: course.title,
                            paid: course.paid ? '✔' : '✕',
                            courseRemaining: (course.quantity - allEventsCount.length) + isNextEventsCount || "0",
                            teacherMoney: teacherMoney,
                            courseConducted: eventsCount.length,
                            price: resource.pricePerLesson * eventsCount.length,
                        };
                    }
                    return resource;
                });

                let teacherTotalMoney = 0;
                let totalCourseRemaining = 0;
                let totalCourseConducted = 0;
                let totalPrice = 0;
                let totalPricePerLesson = 0;
                updatedResources.forEach(updatedResource => {
                    if (updatedResource.id !== 'total') {
                        teacherTotalMoney += +updatedResource.teacherMoney;
                        totalCourseRemaining += +updatedResource.courseRemaining;
                        totalCourseConducted += +updatedResource.courseConducted;
                        totalPrice += +updatedResource.price;
                        totalPricePerLesson += +updatedResource.pricePerLesson
                    }
                });

                const totalResourceIndex = updatedResources.findIndex(resource => resource.id === 'total');
                updatedResources[totalResourceIndex].teacherMoney = teacherTotalMoney;
                updatedResources[totalResourceIndex].courseRemaining = totalCourseRemaining;
                updatedResources[totalResourceIndex].courseConducted = totalCourseConducted;
                updatedResources[totalResourceIndex].price = totalPrice;
                updatedResources[totalResourceIndex].course = count;
                updatedResources[totalResourceIndex].paid = count;
                updatedResources[totalResourceIndex].pricePerLesson = totalPricePerLesson;
                return updatedResources;
            } else {
                return innerArray;
            }
        });
        newArray.forEach((innerArray, index) => {
            if (index === dataIndex) {
                innerArray.forEach((e) => {
                    if (+e.courseRemaining > 0) {
                        if (Array.isArray(newArray[dataIndex + 1])) {
                            if (!newArray[dataIndex + 1].some(obj => obj.id === e.id)) {
                                newArray[dataIndex + 1].push({
                                    ...e,
                                    date: index < 1 ? selectedMonth : getNextMonth(selectedMonth),
                                });
                            }
                        } else {
                            newArray[dataIndex + 1] = [{...e}];
                        }
                    } else {
                        newArray[dataIndex + 1] = newArray[dataIndex + 1].filter(obj => obj.id !== e.id);
                    }
                });
            }
        });
        setResources(newArray);
        window.localStorage.setItem('resources', JSON.stringify(newArray))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [events, dataIndex, selectedMonth]);
    const handleCloseModal = () => {
        setResourceId(null)
        setAttendedModal(false)
        setDeleteModal(false)
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
            title: text,
            dataIndex
        }]
        setEvents(newEvents)
        window.localStorage.setItem('events', JSON.stringify(newEvents))
        setResourceId(null)
        setAttendedModal(false)
    }
    const handleDateSet = (dateInfo) => {
        const startDate = dateInfo.startStr
        setSelectedMonth(startDate.slice(0, 7))
        if (startDate === '2024-04-01T00:00:00Z') {
            setDataIndex(0)
        } else if (startDate === '2024-05-01T00:00:00Z') {
            setDataIndex(1)
        } else if (startDate === '2024-06-01T00:00:00Z') {
            setDataIndex(2)
        } else if (startDate === '2024-07-01T00:00:00Z') {
            setDataIndex(3)
        } else if (startDate === '2024-08-01T00:00:00Z') {
            setDataIndex(4)
        } else if (startDate === '2024-09-01T00:00:00Z') {
            setDataIndex(5)
        }
        setSelectedDate({
            month: new Date(startDate).getMonth() + 1, year: new Date(startDate).getFullYear()
        })
    }
    //
    const closeModal = () => {
        setResourceId(null)
        setEventAddModal(false)
        setAttendedModal(false)
    }
    const handleEventClick = (eventInfo) => {
        const {event: {_def}} = eventInfo
        setClickedEventId(_def.publicId)
        setDeleteModal(true)
    }


    useEffect(() => {
        if (calendarRef.current) {
            const calendarApi = calendarRef.current.getApi();
            calendarApi.setOption('dayCellContent')
        }
    }, []);
    // const findEventByPublicId = (title, attend) => {
    //     const cusTitle = title + attend + 'isNotWork'
    //     const calendarApi = calendarRef.current.getApi();
    //     const allEvents = calendarApi.getEvents();
    //     const event = allEvents.filter((e) => e._def.publicId === clickedEventId)
    //     event.map((e) => {
    //         e._def.title = cusTitle
    //         return e
    //     })
    //     const newEvents = events.map((e) => {
    //         if (e.id === clickedEventId) {
    //             if (attend === 'yes') {
    //                 e.attended = true
    //             }
    //             e.title = cusTitle
    //         }
    //         return e
    //     })
    //     setEvents(newEvents)
    //     window.localStorage.setItem('events', JSON.stringify(newEvents))
    //     setAttendedModal(false)
    //     // const updateResources = resources.map((e) => {
    //     //     events.forEach((event) => {
    //     //         if (event.resourceId == e.id) {
    //     //             if (event.attended && event.id === clickedEventId) {
    //     //                 e.courseConducted += 1
    //     //                 return;
    //     //             }
    //     //         }
    //     //     })
    //     //     return e
    //     // })
    //     // setResources(updateResources)
    // };
    const deleteEvent = () => {
        const newEvents = events.filter((e) => e.id !== clickedEventId)
        setEvents(newEvents)
        window.localStorage.setItem('events', JSON.stringify(newEvents))
        setDeleteModal(false)
    }
    const closeDeleteModal = () => {
        setDeleteModal(false)
    }
    const handleSelect = arg => {
        const remaining = arg.resource._resource.extendedProps.courseRemaining
        const exist = events.find((e) => e.start === arg.startStr && +e.resourceId === +arg.resource._resource.id)
        if (!exist && +remaining > 0 && arg.resource._resource.id !== 'total') {
            setEventDay(arg.startStr)
            setResourceId(arg.resource._resource.id)
            setAttendedModal(true)
        }
    };
    const getAllSelectedDays = async () => {
        const updatedSelectedDays = selectedDays.filter(day => day.resourceId === resourceId);
        const updatedDays = getDays({
            month: selectedDate.month,
            year: selectedDate.year,
            daysOfWeek: updatedSelectedDays.map(day => day.value)
        });
        await setFinalyDays([...finalyDays, ...updatedDays])
        localStorage.setItem('finalyDays', JSON.stringify([...finalyDays, ...updatedDays]))
        const daysInMonth = {
            days: updatedDays.map(function (date_str) {
                let parts = date_str.split('-');
                let day = parseInt(parts[2]);
                return day - 1;
            }),
            resourceId: resourceId,
            date: selectedMonth
        };

        let resourceIdFound = false;
        const updatedDaysForUse = daysForUse.map((day) => {
            if (day.resourceId === daysInMonth.resourceId) {
                resourceIdFound = true;
                return {
                    ...day,
                    days: [...daysInMonth.days],
                    date: selectedMonth
                };
            }
            return day;
        });
        if (!resourceIdFound) {
            updatedDaysForUse.push({
                resourceId: daysInMonth.resourceId,
                days: daysInMonth.days,
                date: selectedMonth
            });
        }
        setDaysForUse(updatedDaysForUse);
        localStorage.setItem('daysForUse', JSON.stringify(updatedDaysForUse))
        const bigElement = document.querySelectorAll('.fc-timeline-body')[0]
        const tr = bigElement.querySelector(`td[data-resource-id="${resourceId}"]`);
        if (tr) {
            const div = tr.querySelector('.fc-timeline-events')
            div.innerHTML = '';
            for (let i = 0; i < daysInMonth.days.length; i++) {
                if (dataIndex === 0 && daysInMonth.date === selectedMonth) {
                    const newDiv = document.createElement('div');
                    newDiv.className = `fc-timeline-event-harness ${selectedMonth}`;
                    newDiv.style = `top: 0px; width: 62px; left:${daysInMonth.days[i] * 62}px; right: ${(daysInMonth.days[i] + 1) * -62}px;`;
                    newDiv.innerHTML = `
          <a  tabindex="0" class="fc-event fc-event-start fc-event-end fc-event-past fc-timeline-event fc-h-event " style="border-color: rgb(252, 219, 3); background-color: rgb(252, 219, 3); z-index: -100000">
            <div class="fc-event-main" style="color: rgb(0, 0, 0);">
              <div style="background-color: #ebde34; min-height: 25px; overflow: hidden; color: rgb(255, 255, 255);"></div>
            </div>
          </a>
        `;
                    div.appendChild(newDiv)
                }
            }
        }
        setResourceId('')
        setEventAddModal(false)
    }
    useEffect(() => {
        const bigElement = document.querySelectorAll('.fc-timeline-body')[0]
        daysForUse.forEach((e) => {
            const tr = bigElement.querySelector(`td[data-resource-id="${e.resourceId}"]`);
            if (tr) {
                const div = tr.querySelector('.fc-timeline-events')
                div.innerHTML = ''
                for (let i = 0; i < e.days.length; i++) {
                    const newDiv = document.createElement('div');
                    newDiv.className = `fc-timeline-event-harness`;
                    newDiv.style = `top: 0px; width: 62px; left:${e.days[i] * 62}px; right: ${(e.days[i] + 1) * -62}px;`;
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
        })

    }, [daysForUse, resourceId, selectedMonth]);

    return (<div>
            <div id='calendar'>
                <FullCalendar
                    slotLabelFormat={{
                        weekday: "short",
                        day: 'numeric'
                    }}
                    ref={calendarRef}
                    plugins={[dayGridPlugin, interactionPlugin, resourceTimelinePlugin]}
                    timeZone='UTC'
                    aspectRatio={3.5}
                    initialView='resourceTimelineMonth'
                    headerToolbar={{
                        right: 'today prev,next', center: 'title', left: null
                    }}
                    resourceOrder={'courseRemaining'}
                    schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
                    resourceAreaColumns={resourceAreaColumns}
                    resources={resources[dataIndex] || []}
                    resourceAreaWidth={'50%'}
                    events={events}
                    allDayClassNames={()=>{
                        console.log(8)
                    }}
                    eventTextColor='#000'
                    datesSet={handleDateSet}
                    selectable={true}
                    select={handleSelect}
                    eventClick={handleEventClick}
                    eventContent={(renderProps, createElement) => renderEventContent(renderProps, createElement)}
                />
            </div>
            {(resourceId && eventAddModal) && (<div className='overlay' onClick={handleCloseModal}>
                <AddEventModal resourceId={resourceId} closeModal={closeModal} handleAddEvent={getAllSelectedDays}
                               selectedDays={selectedDays}
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
            <button onClick={() => {
                localStorage.clear()
                window.location.reload()
            }}>Clear
            </button>
        </div>

    )
};

export default MyCalendar;
