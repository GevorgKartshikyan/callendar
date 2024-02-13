import React from 'react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from "@fullcalendar/react";
import {myResources,myEvents} from "../utils/data";
const MyCalendar = () => {
    return (
      <div id='calendar'>
          <FullCalendar
              plugins={[resourceTimelinePlugin, interactionPlugin]}
              timeZone='UTC'
              aspectRatio={1.5}
              initialView={'resourceTimelineDay'}
              headerToolbar={{
                  left: 'prev,next',
                  center: 'title',
                  right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
              }}
              editable={true}
              eventResizableFromStart={true}
              resourceAreaHeaderContent={'Rooms'}
              resources={myResources}
              events={myEvents}
          />
      </div>
  )
};

export default MyCalendar;
