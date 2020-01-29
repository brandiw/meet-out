import React, {useState} from 'react'
import {
    Calendar,
    // DateLocalizer,
    momentLocalizer,
    // globalizeLocalizer,
    // move,
    // Views,
    // Navigate,
    // components,
  } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import {MeetForCalendar} from './Content'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Meet from '../../../meet-out-server/src/models/meet'

interface CalendarProps {
    allMeets: MeetForCalendar[],
    // buttonLabel?: string,
    className?: string
}

interface DefaultMeetForCalendar {
    _id: null,
    title: null,
    date: null,
    start: null,
    end: null,
    description: null,
    users: null,
    activity: {
        name: null,
        locations: {
            name: null;
            address: null;
            city: null;
            state: null;
            zip: null;
            lat: null;
            long: null;
          }
    }
}


const MyCalendar: React.FC<CalendarProps> = (props) => {

    //setup moment to localize the calendar
    const localizer = momentLocalizer(moment);

    //function to show more details on a meet
    // const showMeetDetails = (props: any) => {
        const {
        //   buttonLabel,
          className
        } = props;
      
        const [modal, setModal] = useState(false);
        const [currentMeet, setCurrentMeet] = useState<MeetForCalendar | DefaultMeetForCalendar>({
            _id: null,
            title: null,
            date: null,
            start: null,
            end: null,
            description: null,
            users: null,
            activity: {
                name: null,
                locations: {
                    name: null,
                    address: null,
                    city: null,
                    state: null,
                    zip: null,
                    lat: null,
                    long: null
                  }
            }
        })
      
        const toggle = () => setModal(!modal);
        
        
        const showDetails = (meet: MeetForCalendar) => {
            setCurrentMeet(meet)
            toggle()
        }
        

    //     //create bootstrap modal with meet details included
            // include:
                //delete button/functionality
                //if not already a user on the event, button to "add myself" to event that updates the meet with current user id
                //edit button/functionality? -- confirm waht this looks like if clicked

    //function to add event
    // const addMeetOnSelect = ({start, end}: { start: string | Date, end: string | Date }) => {
    //     create bootstrap modal with add meet form
    // }
    
    return (
        <div className='calendar'>
            <Calendar
                selectable
                localizer={localizer}
                events={props.allMeets}
                views={['month', 'week', 'day', 'agenda']}
                // startAccessor="start"
                // endAccessor="end"
                onSelectEvent={meet => showDetails(meet)} //show more details - function to be created
                onSelectSlot={({ start, end }) => window.prompt('New Event Name')} //add event when selecting a certain day/time - function to be created
                // drilldownView="agenda"
                // components={components} -can create custom components to replace existing components
            />
            <div>
            {/* <Button color="danger" onClick={toggle}>{buttonLabel}</Button> */}
            <Modal isOpen={modal} toggle={toggle} className={className}>
              <ModalHeader toggle={toggle}>{currentMeet.title}</ModalHeader>
              <ModalBody>
                <h3>{currentMeet.date}</h3>
                <h3>{currentMeet.start} - {currentMeet.end}</h3>
                <h3>{currentMeet.activity.locations.name}</h3> {/* make link to location on google maps */}
                <p>{currentMeet.description}</p>
                <h4>Who's attending:</h4>
                {/* if multiple users - show all users attending, else: */}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
    )
}

export default MyCalendar