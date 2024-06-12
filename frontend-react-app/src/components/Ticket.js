import {Button, Col, Form, Input, Row, Space, Table} from "antd";
import {useState} from "react";


const Ticket = () => {
    const [data, setData] = useState([
        {
            ticket_name: '1',
            ticket_description: 'Mike',

        },
        {
            ticket_name: '2',
            ticket_description: 'John',
        }
    ]);

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
                    <Button type="link">Edit</Button>
                    <Button type="link">Delete</Button>
                </Space>
            ),
        },
    ];


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
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default Ticket;