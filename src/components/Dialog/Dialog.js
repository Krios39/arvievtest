import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import DialogTitle from "@material-ui/core/DialogTitle";
import {Button, FormControl, FormHelperText, Typography} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";

import DialogActions from "@material-ui/core/DialogActions";
import "./Dialog.css"

export default function DIalog({dialogOpen, setDialogOpen, addEvent,changedEvent,changeEvent}) {
    const [selectedType, setSelectedType] = useState(10)
    const [eventTitle, setEventTitle] = useState("")
    const [summ, setSumm] = useState(0)
    const [address, setAddress] = useState("")
    const [time, setTime] = useState("")
    const [other, setOther] = useState("")

    useEffect(()=>{
        if (changedEvent.id){
            setSelectedType(changeEvent.type)
            if (changedEvent.type === 10) setSumm(changedEvent.summ)
            if (changedEvent.type === 20) {
                setAddress(changedEvent.address)
                setTime(changedEvent.time)
            }
            if (changedEvent.type === 30) setOther(changedEvent.other)
        }
    },[changeEvent.type, changedEvent])
    
    const typeHandleChange = (event) => {
        setSelectedType(event.target.value)
    }

    const check = () => {
        if (eventTitle.trim() !== "") {
            if (selectedType === 10 && summ >= 0) add()
            else if (selectedType === 20 && address.trim() !== "") add()
            else if (selectedType === 30 && other.trim() !== "") add()
        }
    }

    const add = () => {
        const event = {
            title: eventTitle,
            type: selectedType,
        }
        if (selectedType === 10) event.summ = summ
        if (selectedType === 20) {
            event.address = address
            event.time = time
        }
        if (selectedType === 30) event.other = other
        if(changedEvent.id===undefined) addEvent(event)
        else {
            event.id=changedEvent.id
            event.date = changedEvent.date
            changeEvent(event)
        }
        setDialogOpen(false)
    }

    return (
        <Dialog
            onClose={() => setDialogOpen(false)}
            open={dialogOpen}>
            <DialogTitle className="title">Добавить событие</DialogTitle>
            <DialogContent className="container">
                <FormControl className="form">
                    <InputLabel>Нзвание события</InputLabel>
                    <Input value={eventTitle} onChange={(event) => setEventTitle(event.target.value)}/>
                </FormControl>
                <FormControl className="form">
                    <InputLabel>Тип события</InputLabel>
                    <Select className="select" input={<Input/>} onChange={typeHandleChange} value={selectedType}>
                        <MenuItem value={10}>Праздник</MenuItem>
                        <MenuItem value={20}>Мероприятие</MenuItem>
                        <MenuItem value={30}>Другое</MenuItem>
                    </Select>
                </FormControl>
                {
                    selectedType === 10 &&
                    <FormControl className="form">
                        <InputLabel>Сумма</InputLabel>
                        <Input type="number" value={summ} onChange={(event => setSumm(event.target.value))}/>
                    </FormControl>
                }
                {
                    selectedType === 20 &&
                    <Box className="container">
                        <FormControl className="form">
                            <InputLabel>Куда идти</InputLabel>
                            <Input value={address} onChange={(event) => setAddress(event.target.value)}/>
                        </FormControl>
                        <FormControl className="form">
                            <Typography>Во сколько</Typography>
                            <Input className="select" type="time" value={time} onChange={(event) => setTime(event.target.value)}/>
                        </FormControl>
                    </Box>
                }
                {
                    selectedType === 30 &&
                    <FormControl className="form">
                        <InputLabel>Заметка</InputLabel>
                        <Input value={other} onChange={(event) => setOther(event.target.value)}/>
                    </FormControl>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>Отмена</Button>
                <Button onClick={check}>Сохранить</Button>
            </DialogActions>
        </Dialog>
    )
}