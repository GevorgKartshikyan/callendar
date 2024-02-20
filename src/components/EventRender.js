export default function renderEventContent(eventInfo) {
    return (
        <div
            style={{
                backgroundColor: eventInfo.event._def.extendedProps.attended ? '#2EDB2E':'red' ,
                minHeight: 25,
                overflow: 'hidden',
                color: '#fff'
            }}
        >
            {eventInfo.event._def.title}
        </div>
    );
}
