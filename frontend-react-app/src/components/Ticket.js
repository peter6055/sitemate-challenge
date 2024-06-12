import {Button, Col, Form, Input, Row, Space, Table} from "antd";
import {useEffect, useState} from "react";
import {createTicketAPI, deleteTicketAPI, getTicketAPI, updateTicketAPI} from "../datas/ticket-service";


const Ticket = () => {
    const [data, setData] = useState([]);
    const [issueForm] = Form.useForm();

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


        if(onUpdateId === null){ // add new ticket
            // refresh data
            setData(await createTicketAPI(data));

        } else{ // update ticket
            // refresh data
            setData(await updateTicketAPI(onUpdateId, data));

            // remove onUpdateId
            setOnUpdateId(null);
        }

        // clear form
        issueForm.resetFields();

    }


    // ------ edit ticket ------
    const [onUpdateId, setOnUpdateId] = useState(null);
    const editTicket = (ticket) => {
        issueForm.setFieldsValue({
            ticket_name: ticket.ticket_name,
            ticket_description: ticket.ticket_description
        })

        setOnUpdateId(ticket.ticket_id);

        console.log(ticket.ticket_id)
    }



    // ------ delete ticket ------
    const deleteTicket = async (ticketId) => {
        setData(await deleteTicketAPI(ticketId));
    }



    return (
        <>
            <Row>
                <Col span={14}>
                    <h3>📋 List View</h3>
                    <Table dataSource={data} columns={columns}/>
                </Col>


                <Col span={2}></Col>


                <Col span={8}>
                    <h3>🖊️ Add Ticket</h3>
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
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            layout="vertical"
                            label="Description"
                            name="ticket_description"
                            rules={[{ required: true }]}
                        >
                            <Input.TextArea rows={10} />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                {onUpdateId === null ? "Add Ticket" : "Update Ticket"}
                            </Button>
                        </Form.Item>

                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default Ticket;