import React from "react";
import Box from "@material-ui/core/Box";
import "./List.css"
import ListItem from "../ListItem/ListItem";

export default function  List({events,removeEvent,setChangedEvent}){

    return(
        <Box className="listsContainer">
            {events.map((event,key)=>
                <ListItem event={event} key={key} removeEvent={removeEvent} setChangedEvent={setChangedEvent}/>
            )}
        </Box>
    )
}