import {Button, Col, Layout, message, Modal, Row, Select} from "antd";
import React, {useEffect, useState} from 'react';
import {createNewCategory, fetchCategories} from "../../apis/todoApis";
import {Category} from "../category/index.jsx";

export const TodoContainer = () => {
    
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        getCategories();
    }, []);
    
    const getCategories = async () => {
        let resp = await fetchCategories();
        if (resp)
            setCategories(resp)
        else
            message.error("Could not fetch categories, please tey later.")
    }
    
    const saveCategory = async (categoryName) => {
        let resp = await createNewCategory({title: categoryName});
        if (resp)
            getCategories();
        else
            message.error("Failed to sync data");
    }
    
    const renderCategories = () => {
        return categories.map(item => <Col style={{width:"100%"}} key={item.pk} sm={24} md={12} lg={8}><Category
            callback={getCategories} {...item}/></Col>)
    }
    
    return <Layout>
        <Layout.Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
            <NewCategoryForm saveCategory={saveCategory} categories={categories}/>
        </Layout.Header>
        <Layout.Content style={{ marginTop: 100, minHeight: "calc(100vh - 100px)"}}>
            <Row gutter={20}>
                {renderCategories()}
            </Row></Layout.Content>
    </Layout>
    
}

export const NewCategoryForm = (props) => {
    
    const [categoryName, setCategoryName] = useState(null);
    const [visible, setVisible] = useState(false);
    
    const newCategory = () => {
        if (categoryName) {
            props.saveCategory(categoryName);
            setCategoryName(null);
            setVisible(false)
        }
    }
    
    const setName = (val) => val && setCategoryName(val)
    
    return <div>
        <Button onClick={() => setVisible(true)}>New Bucket</Button>
        <Modal
            title={"New Category"}
            visible={visible}
            onCancel={() => setVisible(false)}
            onOk={newCategory}
        >
            <Select
                showSearch
                value={categoryName}
                style={{width: 200}}
                placeholder={"category name"}
                defaultActiveFirstOption={false}
                showArrow={false}
                optionFilterProp="children"
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                onSearch={setName}
                onSelect={setName}
                notFoundContent={null}
            >
                {props.categories.map(item => <Select.Option key={item.pk} value={item.title}
                                                             label={item.title}>{item.title}</Select.Option>)}
            </Select>
        </Modal>
    </div>
    
}
