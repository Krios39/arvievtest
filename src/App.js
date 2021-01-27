import React, {useEffect, useState} from "react";
import DIalog from "./components/Dialog/Dialog";
import List from "./components/List/List";
import MyDate from "./components/MyDate/MyDate";
import Box from "@material-ui/core/Box";
import "./App.css"

export default function App() {

    const [date, changeDate] = useState(new Date());
    const [dialogOpen, setDialogOpen] = useState(false)
    const [events,setEvents] = useState([])
    const [todayEvents,setTodayEvents] = useState([])
    const [changedEvent,setChangedEvent] = useState({})

    const addEvent=(event)=>{
        event.date = getNewDate(date)
        event.id = getNewId()
        setEvents(prevState =>prevState.concat(event))
    }

    const getNewId =()=>{
        if (events.length>0) return events[events.length-1].id+1
        else return 0
    }

    useEffect(()=>{
        let a=[]
        for(let eve of events) if (eve.date===getNewDate(date)) a.push(eve)
        setTodayEvents(a)
    },[date,dialogOpen,events])

    useEffect(()=>{
        if(changedEvent.id) setDialogOpen(true)
    }, [changedEvent])

    const getNewDate =(date)=>{
        return date.getDate()+"."+date.getMonth()+1+"."+date.getFullYear()
    }

    const removeEvent =(id)=>{
        let a = []
        for(let eve of events) if (id!==eve.id) a.push(eve)
        setEvents(a)
    }

    const changeEvent =(event)=>{
        let a = []
        for(let eve of events) if (event.id!==eve.id) a.push(eve)
        setEvents(a.concat(event))
        setChangedEvent({})
    }

    const foo=(event)=>{
        console.log(event)
        setChangedEvent(event)
        setDialogOpen(true)
    }

    return (
        <Box className="App">
            <MyDate date={date} changeDate={changeDate} dialogOpen={setDialogOpen}/>
            <List setChangedEvent={foo} removeEvent={removeEvent} events={todayEvents}/>
            {dialogOpen && <DIalog changedEvent={changedEvent} changeEvent={changeEvent} addEvent={addEvent} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}/>}
        </Box>
    );
}

