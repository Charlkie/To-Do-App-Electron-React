import React from 'react'
import List from './Todo'
import { Menu, Layout, Icon,} from 'antd';

import 'antd/dist/antd.css';

// const blurredImage = require('static/media/3.0b83bb35.jpg'); 

const { Header, Content, Sider } = Layout;

export default class Layout_ extends React.Component{
    constructor() {
        super()
        this.index = 1
        this.menu = []
        this.todolists = []
        this.allLists = [[]]
        this.hidden = ['']
        this.state = {
            list: 0,
            newlist : false,
            new_list_name: ''
        }
    }
    state = {
        collapsed: false,
      };
    
      onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
      }

      newTodoList() {
          console.log('new todo')
          this.setState({newlist: true})
      }

    newListName(e) {
        if (e.key === 'Enter') {
            this.todolists.push(e.target.value)
            this.setState({newlist: false})
            this.allLists.push([])
            this.changeList(this.hidden.length)
        } else {
            this.setState({new_list_name: e.target.value})
        }
    }

    changeList(key) {
        this.hidden = this.hidden.map(function(item) { return item === '' ? "hidden" : item; });
        this.hidden[key] = ''
        this.index = key + 1
        console.log(this.hidden)
        this.setState({list: key})
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          theme='light'
        >
          <div className="logo" />
          <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="0" onClick={() => this.changeList(0)}>
              <Icon type="pushpin-o" />
              <span>To-Do</span>
            </Menu.Item>
            {this.todolists.map((todolist, index) =>
                <Menu.Item key={index+1} onClick={() => this.changeList(index+1)}>
                    <Icon type="pushpin-o" />
                    <span>{todolist}</span>
                </Menu.Item>
            )}
            { this.state.newlist === true &&
                <Menu.Item>
                    <input className='new-todo-list' type="text" onKeyPress={e => this.newListName(e) } placeholder='.... Name of To-Do'/>
                </Menu.Item>
            }
            <Menu.Item onClick={() => this.newTodoList()}>
                <Icon type="plus" />
                <span>New To-Do</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{backgroundImage: 'url(' + require('./blurred/'+this.index+'.jpg') + ')'}} />
          <Content>
            {this.allLists.map((list, index) =>
                <List index={index+1} hidden={this.hidden[index]} list_={this.allLists[index]}/>
            )}
          </Content>
        </Layout>
      </Layout>
        )
    }
}