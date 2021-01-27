import Box from "@material-ui/core/Box";
import {Typography} from "@material-ui/core";
import {AiFillDelete, RiPencilFill} from "react-icons/all";
import React, {useState} from "react";
import "./ListItem.css"

export default function ListItem({event,key,removeEvent,setChangedEvent}){
    const [buttonActive,setButtonActive] = useState(false)

    return(
        <Box onMouseOver={()=>setButtonActive(true)} onMouseLeave={()=>setButtonActive(false)} className="list" key={key}>
            <Box className="titleBox">
                <Typography className="listTitle">
                    {event.title}
                </Typography>
                {
                    buttonActive && <Box className="buttonBox">
                        <div className="iconButton" onClick={()=>setChangedEvent(event)} aria-hidden="true"><RiPencilFill size="18px" color="737373" /></div>
                        <div className="iconButton" onClick={()=>removeEvent(event.id)} aria-hidden="true"><AiFillDelete size="20px" color="737373" /></div>
                    </Box>
                }

            </Box>
            {
                event.type === 10 &&
                <Box className="listItem">
                    <Typography>
                        {"Бюджет: "+event.summ+" рублей"}
                    </Typography>
                </Box>
            }
            {
                event.type === 20 &&
                <Box className="listItem1">
                    <Typography className="listItem">
                        {"Адрес: "+event.address}
                    </Typography>
                    <Typography className="listItem">
                        {"Время: "+event.time}
                    </Typography>
                </Box>
            }
            {
                event.type === 30 &&
                <Box className="listItem">
                    <Typography>
                        {event.other}
                    </Typography>
                </Box>
            }
        </Box>
    )
}