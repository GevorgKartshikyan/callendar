export const myResources = [
    {
        "id": "a",
        "title": "Auditorium A"
    },
    {
        "id": "b",
        "title": "Auditorium B",
        "eventColor": "green"
    },
    {
        "id": "c",
        "title": "Auditorium C",
        "eventColor": "orange"
    },
    {
        "id": "d",
        "title": "Auditorium D",
        "children": [
            {
                "id": "d1",
                "title": "Room D1"
            },
            {
                "id": "d2",
                "title": "Room D2"
            }
        ]
    },
    {
        "id": "e",
        "title": "Auditorium E"
    },
    {
        "id": "f",
        "title": "Auditorium F",
        "eventColor": "red"
    },
    {
        "id": "g",
        "title": "Auditorium G"
    },
    {
        "id": "h",
        "title": "Auditorium H"
    },
    {
        "id": "i",
        "title": "Auditorium I"
    },
    {
        "id": "j",
        "title": "Auditorium J"
    },
    {
        "id": "k",
        "title": "Auditorium K"
    },
    {
        "id": "l",
        "title": "Auditorium L"
    },
    {
        "id": "m",
        "title": "Auditorium M"
    },
    {
        "id": "n",
        "title": "Auditorium N"
    },
    {
        "id": "o",
        "title": "Auditorium O"
    },
    {
        "id": "p",
        "title": "Auditorium P"
    },
    {
        "id": "q",
        "title": "Auditorium Q"
    },
    {
        "id": "r",
        "title": "Auditorium R"
    },
    {
        "id": "s",
        "title": "Auditorium S"
    },
    {
        "id": "t",
        "title": "Auditorium T"
    },
    {
        "id": "u",
        "title": "Auditorium U"
    },
    {
        "id": "v",
        "title": "Auditorium V"
    },
    {
        "id": "w",
        "title": "Auditorium W"
    },
    {
        "id": "x",
        "title": "Auditorium X"
    },
    {
        "id": "y",
        "title": "Auditorium Y"
    },
    {
        "id": "z",
        "title": "Auditorium Z"
    }
]

export const myEvents = [
    {
        "resourceId": 1,
        "start": "2024-02-12",
    },
    {
        "resourceId": "c",
        "title": "event 3",
        "start": "2024-02-13T12:00:00+00:00",
        "end": "2024-02-14T06:00:00+00:00"
    },
    {
        "resourceId": "f",
        "title": "event 4",
        "start": "2024-02-13T07:30:00+00:00",
        "end": "2024-02-13T09:30:00+00:00"
    },
    {
        "resourceId": "b",
        "title": "event 5",
        "start": "2024-02-13T10:00:00+00:00",
        "end": "2024-02-13T15:00:00+00:00"
    },
    {
        "resourceId": "e",
        "title": "event 2",
        "start": "2024-02-13T09:00:00+00:00",
        "end": "2024-02-13T14:00:00+00:00"
    }
]

export const courses = [
    {
        id: 1,
        title: 'Մաթեմատիկա',
        date: '2024-02-15',
        paid: true,
        quantity: 7,
        teacher: 'Ադրինե Աբրիկյան',
        teachMoney: 25000
    },
    {
        id: 2,
        title: 'Ֆիզիկա',
        date: '2024-03-20',
        paid: true,
        quantity: 5,
        teacher: 'Այծեմնիկ Ագապերյան',
        teachMoney: 30000
    },
    {
        id: 3,
        title: 'Պատմություն',
        date: '2024-04-10',
        paid: true,
        quantity: 10,
        teacher: 'Արևհատ Ազգալդրյան',
        teachMoney: 20000
    },
    {
        id: 4,
        title: 'Համակարգչային գիտություն',
        date: '2024-05-05',
        paid: true,
        quantity: 8,
        teacher: 'Բյուրաստան Ազատխանյան',
        teachMoney: 28000
    },
    {
        id: 5,
        title: 'Գրականություն',
        date: '2024-06-15',
        paid: true,
        quantity: 6,
        teacher: 'Դեղձանիկ Աբուտխանյան',
        teachMoney: 26000
    },
    {
        id: 6,
        title: 'Երկրաչափություն',
        date: '2024-06-15',
        paid: true,
        quantity: 4,
        teacher: 'Անուշիկ Իսահակյան',
        teachMoney: 12500
    },
    {
        id: 7,
        title: 'Ծրագրավորում',
        date: '2024-06-15',
        paid: true,
        quantity: 13,
        teacher: 'Ստեփան Փոլոյան',
        teachMoney: 4850
    }
]
