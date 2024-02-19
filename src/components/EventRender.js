export default function renderEventContent(eventInfo) {
    const title = eventInfo.event._def.title;
    let truncatedTitle = title;
    let showTitle = title
    if (title.includes('yesisNotWork')) {
        truncatedTitle = title.substring(0, title.indexOf('yesisNotWork')).trim();
        showTitle = title.substring(0, title.indexOf('yesisNotWork')).trim();
    } else if (title.includes('noisNotWork')) {
        truncatedTitle = title.substring(0, title.indexOf('noisNotWork')).trim();
        showTitle = title.substring(0, title.indexOf('noisNotWork')).trim();
    }
    const isAttended = title.endsWith('yesisNotWork');
    let eventBackgroundColor = '#fcdb03';
    if (isAttended) {
        eventBackgroundColor = '#00ff00';
    }
    truncatedTitle = truncatedTitle.length > 4 ? truncatedTitle.slice(0, 6) + '...' : truncatedTitle;
    return (
        <div
            style={{
                backgroundColor: eventBackgroundColor,
                minHeight: 25,
                overflow: 'hidden',
                color: '#fff'
            }}
            title={showTitle}
        >
            {truncatedTitle}
        </div>
    );
}
