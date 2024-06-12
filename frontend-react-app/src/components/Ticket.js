import {Alert, Button, Col, Form, Input, message, Row, Space, Table} from "antd";
import {useEffect, useState} from "react";
import {createTicketAPI, deleteTicketAPI, getTicketAPI, updateTicketAPI} from "../datas/ticket-service";


const Ticket = () => {
    const [data, setData] = useState([]);
    const [issueForm] = Form.useForm();
    const [messageApi, messageContextHolder] = message.useMessage();

    const columns = [
        {
            title: 'Title',
            dataIndex: 'ticket_name',
            key: 'ticket_name',
        },
        {
            title: 'Description',
            dataIndex: 'ticket_description',
            key: 'ticket_description',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={()=>{editTicket(record)}}>Edit</Button>
                    <Button type="link" onClick={()=>{deleteTicket(record.ticket_id)}}>Delete</Button>
                </Space>
            ),
        },
    ];



    // ----- get data ------
    useEffect( () => {
        fetchData();
    },[])

    async function fetchData() {
        setData(await getTicketAPI("all"));
    }



    // ------ add ticket ------
    const createTicket = async () => {
        const data = {
            ticket_name: issueForm.getFieldValue('ticket_name'),
            ticket_description: issueForm.getFieldValue('ticket_description')
        }


        if(onUpdateItem === null){ // add new ticket
            // refresh data
            setData(await createTicketAPI(data));
            messageApi.success('Ticket added successfully!');

        } else{ // update ticket
            // refresh data
            setData(await updateTicketAPI(onUpdateItem.ticket_id, data));

            // remove onUpdateId
            setOnUpdateItem(null);
            messageApi.success('Ticket updated successfully!');
        }

        // clear form
        issueForm.resetFields();

    }


    // ------ edit ticket ------
    const [onUpdateItem, setOnUpdateItem] = useState(null);
    const editTicket = (ticket) => {
        issueForm.setFieldsValue({
            ticket_name: ticket.ticket_name,
            ticket_description: ticket.ticket_description
        })

        setOnUpdateItem(ticket);
    }



    // ------ delete ticket ------
    const deleteTicket = async (ticketId) => {
        setData(await deleteTicketAPI(ticketId));
        messageApi.success('Ticket deleted successfully!');
    }



    return (
        <>
            {messageContextHolder}
            <Row>
                <Col span={14}>
                    <h3>📋 List View</h3>
                    <Table dataSource={data} columns={columns}/>
                </Col>


                <Col span={2}></Col>


                <Col span={8}>
                    <h3>🖊️ Add Ticket</h3>
                    {
                        onUpdateItem !== null &&
                        <>
                            <Alert message={`Currently Editing "` + onUpdateItem.ticket_name + `"`} type="info" showIcon />
                            <br/>
                        </>
                    }

                    <Form
                        name="layout-multiple-horizontal"
                        form={issueForm}
                        layout="vertical"
                        onFinish={createTicket}
                    >
                        <Form.Item
                            layout="vertical"
                            label="Title"
                            name="ticket_name"
                            rules={[
                                {
                                required: true,
                                message: 'Ticket title is required'
                                }
                            ]}

                        >
                            <Input
                                placeholder="Enter ticket title"
                            />
                        </Form.Item>

                        <Form.Item
                            layout="vertical"
                            label="Description"
                            name="ticket_description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ticket title is required'
                                }
                            ]}
                        >
                            <Input.TextArea
                                rows={10}
                                placeholder="Enter ticket description"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {onUpdateItem === null ? "Add Ticket" : "Update Ticket"}
                            </Button>
                        </Form.Item>

                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default Ticket;