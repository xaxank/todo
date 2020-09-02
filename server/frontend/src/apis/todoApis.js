// Category APIS

import {encodeParams} from "./apiHelpers";
const HOST_IP = window.location.hostname;

export const fetchCategories = async () => {
    const response = await fetch("http://"+HOST_IP+":8000/todo/api/category/");
    const body = await response.json();
    if (response.status >= 400) return false;
    return body;
};


export const createNewCategory = async (params) => {
    
    try {
        let response = await fetch("http://"+HOST_IP+":8000/todo/api/category/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
        
        if (response.status >= 400)
            return false;
        
        const body = await response.json();
        return body;
        
    } catch (e) {
        console.log(e);
        return false;
    }
    
}


export const updateCategoryName = async (params) => {
    
    try {
        let response = await fetch("http://"+HOST_IP+":8000/todo/api/category_update/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        
        if (response.status >= 400)
            return false;
        
        const body = await response.json();
        return body;
        
    } catch (e) {
        console.log(e);
        return false;
    }
    
}

export const deleteTaskCategory = async (params) => {
    const response = await fetch("http://"+HOST_IP+":8000/todo/api/category_delete/?" + encodeParams(params));
    const body = await response.json();
    if (response.status >= 400) return false;
    return body;
}

export const fetchTaskList = async (params) => {
    const response = await fetch("http://"+HOST_IP+":8000/todo/api/task/?" + encodeParams(params));
    const body = await response.json();
    if (response.status >= 400) return false;
    return body;
};

export const newTask = async (params) => {
    
    try {
        let response = await fetch("http://"+HOST_IP+":8000/todo/api/task/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        
        if (response.status >= 400)
            return false;
        
        const body = await response.json();
        return body;
        
    } catch (e) {
        console.log(e);
        return false;
    }
    
}

export const updateTask = async (params) => {
    
    try {
        let response = await fetch("http://"+HOST_IP+":8000/todo/api/task_update/", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        });
        
        if (response.status >= 400)
            return false;
        
        const body = await response.json();
        return body;
        
    } catch (e) {
        console.log(e);
        return false;
    }
    
}

export const deleteTask = async (params) => {
    const response = await fetch("http://"+HOST_IP+":8000/todo/api/task_delete/?" + encodeParams(params));
    const body = await response.json();
    if (response.status >= 400) return false;
    return body;
};

