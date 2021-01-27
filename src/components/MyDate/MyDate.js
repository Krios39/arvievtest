import React, {useEffect, useState} from "react";
import {Button, Input} from "@material-ui/core";
import Calendar from 'react-calendar';
import Box from "@material-ui/core/Box";
import "./MuDate.css"
import DatePicker from "react-date-picker";


export default function MyDate({dialogOpen, date, changeDate}) {

    const [inputDate, setInputDate] = useState("")
    useEffect(() => {
        setInputDate("                            " + date.getDate() + "." + date.getMonth() + 1 + "." + date.getFullYear())
    }, [date])

    return (
        <Box>
            <Input className="input" readOnly value={inputDate}/>
            {
                false && <DatePicker  value={date} onChange={changeDate}/>
            }
            <Calendar value={date} onChange={changeDate}/>
            <Button on className="button" onClick={() => dialogOpen(true)}>Добавить</Button>
        </Box>

    );
};
