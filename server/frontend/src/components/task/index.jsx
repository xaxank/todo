import {CloseSquareOutlined, EditOutlined} from "@ant-design/icons";
import {Button, Input, message, Space} from "antd";
import React, {useState} from 'react';
import {deleteTask, updateTask} from "../../apis/todoApis";
import './task.scss';

export const Task = props => {
    
    const [title, setTitle] = useState(props.task.title);
    const [completed, setCompleted] = useState(props.task.completed);
    const [edit, setEdit] = useState(false);
    
    const handleNewTitle = ({target}) => setTitle(target.value);
    const resetForm = () => {
        setTitle(props.task.title);
        setEdit(false)
    };
    
    const toggleTaskStatus = async () => {
        let resp = await updateTask({
            pk: props.task.pk,
            completed: !completed,
            title: title
        });
        
        if (resp) {
            setCompleted(!completed);
            props.callback();
        } else {
            message.error("could not update, please try later")
        }
    }
    
    const changeTitle = async () => {
        let resp = await updateTask({
            pk: props.task.pk,
            completed: completed,
            title: title
        });
        
        if (resp) {
            setCompleted(!completed);
            setEdit(false);
        } else {
            message.error("could not update, please try later")
        }
    }
    
    const delTask = async () => {
        let resp = await deleteTask({pk: props.task.pk});
        if (resp)
            props.callback();
    }
    
    
    if (edit)
        return <React.Fragment>
            <Input
                style={{width: "90%"}}
                value={title}
                placeholder={"New task"}
                onChange={handleNewTitle}
                onPressEnter={changeTitle}
            />
            <CloseSquareOutlined onClick={resetForm}/>
        </React.Fragment>
    
    return <div className={"task "}>
        <div className={"title " + (completed ? "done" : "")} onClick={toggleTaskStatus}>{title}</div>
        <Button.Group size={"small"}>
            <Button icon={<EditOutlined/>} onClick={() => setEdit(true)} className={"edit-task"}/>
            <Button icon={<CloseSquareOutlined/>} onClick={delTask} className={"edit-task"}/>
        </Button.Group>
    
    </div>
}
