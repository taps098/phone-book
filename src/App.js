import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';
import {Form, Input, Button, Radio, Select, Cascader, DatePicker, InputNumber, TreeSelect, Switch, Modal,Layout, Menu} from 'antd';
import styles from './App.module.css';
const { Header, Content, Footer } = Layout;


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      phone : [],
      contact : {firstName : 'Tapaswini', lastName : 'Behera', phoneNumber : '823456790'}
    }
  }
  showModal = (record) => {
    this.setState({
      visible: true,
    });
  };
  handleOk = (contact) => {
    console.log('handleok event',contact);

    const phone = [...this.state.phone];
    // const toBeEdited = phone.indexOf(contact);
    // phone.map(index => index.id === contact.id ? contact:this.state.contact);
    this.setState({
      phone: phone,
      visible : false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  fieldChangeHandler = e => {
    const {name, value} = e.target
    const newContact = {...this.state.contact}
    newContact [name] = value;
    this.setState({contact : newContact});
  }


  AddToPhoneBook = () => {
    const phone = [...this.state.phone];
    // this.state.contact.id += 1 ;
    // if (!this.state.contact.firstName || !this.state.contact.lastName || !this.state.contact.phone) return
    phone.push({...this.state.contact});
    this.setState({
      phone :phone,
      contact : {}
    });
    // console.log('current phone id array is :', phone);
  }
  deleteHandler = (record) => {
    console.log('in deleteHandler ', record);
    const phone = [...this.state.phone];
    const toBedeleted = phone.indexOf(record);
    phone.splice(toBedeleted,1);
    this.setState({phone});
  }

    render(){
      const dataSource = this.state.phone;
      const columns = [
        {
          title: 'First Name',
          dataIndex: 'firstName',
          key: 'firstName',
        },
        {
          title: 'Last Name',
          dataIndex: 'lastName',
          key: 'lastName',
        },
        {
          title: 'Phone',
          dataIndex: 'phoneNumber',
          key: 'phoneNumber',
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <Space size="middle">
              {/*<a>Invite {record.name}</a>*/}
              <a onClick={()=>this.deleteHandler(record)}>Delete</a>
              <a onClick={()=>this.showModal(record)}>Edit</a>
            </Space>
          ),
        },
      ];
      return (
        <div>

          <Layout className="layout">
            <Header>
              <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                <Menu.Item key="1">Home</Menu.Item>
                <Menu.Item key="2">Login</Menu.Item>
              </Menu>
            </Header>
          </Layout>

          <div className={styles.FormDiv1}>
            <Form
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
            >
              <Form.Item label="First Name">
                <Input type={"text"} name = 'firstName' value = {this.state.contact.firstName || ''} onChange={this.fieldChangeHandler}/>
              </Form.Item>
              <Form.Item label="Last Name">
                <Input type={"text"} name = 'lastName' value = {this.state.contact.lastName || ''} onChange={this.fieldChangeHandler}/>
              </Form.Item>
              <Form.Item label="Phone Number">
                <Input type={"text"} name = 'phoneNumber' value = {this.state.contact.phoneNumber || ''} onChange={this.fieldChangeHandler}/>
              </Form.Item>
            </Form>
          </div>

          <div className={styles.AddButton}>
            <Button type="primary" onClick={this.AddToPhoneBook}>
              Add
            </Button>
          </div>

          <div className={styles.TableDiv}>
            <Table dataSource={dataSource} columns={columns} />
          </div>

          <Modal
            title="contact Details"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}s
            >
              <Form>

                <Form.Item label="First Name">
                  <Input type={"text"} name = 'firstName' value = {this.state.contact.firstName} onChange={this.fieldChangeHandler}/>
                </Form.Item>
                <Form.Item label="Last Name">
                  <Input type={"text"} name = 'lastName' value = {this.state.contact.lastName} onChange={this.fieldChangeHandler}/>
                </Form.Item>
                <Form.Item label="Phone Number">
                  <Input type={"text"} name = 'phoneNumber' value = {this.state.contact.phoneNumber} onChange={this.fieldChangeHandler}/>
                </Form.Item>

              </Form>
            </Modal>
        </div>
      );
    }
}

export default App;
