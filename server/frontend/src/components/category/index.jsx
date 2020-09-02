import {CloseSquareOutlined, EditOutlined} from '@ant-design/icons'
import {Card, Input, message} from "antd";
import React, {useEffect, useState} from 'react';
import {deleteTaskCategory, fetchTaskList, newTask, updateCategoryName} from "../../apis/todoApis";
import {Task} from "../task/index.jsx";
import './category.scss';


export const Category = (props) => {
    
    const [taskList, setTaskList] = useState([]);
    const [editable, setEditable] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [task, setTask] = useState("");
    const [deleteCategory, setDeleteCategory] = useState(false);
    
    useEffect(() => {
        getTaskList();
    }, [])
    
    useEffect(() => {
        checkCategoryStatus();
    }, [taskList]);
    
    const getTaskList = async () => {
        let resp = await fetchTaskList({category_id: props.pk});
        if (resp) {
            setTaskList(resp);
            setTask("");
        } else {
            message.error("Failed to fetch task list");
        }
    }
    
    const handleNewTask = ({target}) => setTask(target.value);
    const handleNewTitle = ({target}) => setTitle(target.value);
    const resetForm = () => {
        setEditable(false);
        setTitle(props.title);
    }
    
    const updateTitle = async () => {
        let resp = await updateCategoryName({title: title, pk: props.pk})
        
        if (!resp) {
            setTitle(props.title);
            message.error("Could not save changes, please try later.")
        }
        
        setEditable(false)
    }
    
    const addNewTask = async (e) => {
        let resp = await newTask({title: task, category: props.pk});
        if (resp)
            await getTaskList();
        else
            message.error("Cannot process request, please try later.");
    }
    
    const renderTaskList = () => {
        return taskList.map(item => <Task key={item.pk} task={item} callback={getTaskList}/>)
    }
    
    const checkCategoryStatus = () => {
        let allDone = taskList.reduce((a, b) => a && b.completed, true);
        if (allDone)
            setDeleteCategory(true);
        else
            setDeleteCategory(false);
        
    }
    
    const getHeader = () => {
        if (!editable)
            return <h3> {title} <EditOutlined style={{float: 'right'}} onClick={() => setEditable(true)}/></h3>
        else
            return <Input value={title} onChange={handleNewTitle} onPressEnter={updateTitle}
                          suffix={<CloseSquareOutlined onClick={resetForm}/>}/>
    }
    
    const getExtra = () => {
        if (deleteCategory)
            return <CloseSquareOutlined onClick={delCategory} className={"delete-icon"}/>;
        return null
    }
    
    const delCategory = async () => {
        let resp = await deleteTaskCategory({pk: props.pk});
        if (resp)
            props.callback(props.pk);
    }
    
    
    return <Card hoverable title={getHeader()} style={{margin: 20}}>
        {getExtra()}
        <Input value={task} placeholder={"New task"} onChange={handleNewTask} onPressEnter={addNewTask}/>
        <div>{renderTaskList()}</div>
    </Card>
}
