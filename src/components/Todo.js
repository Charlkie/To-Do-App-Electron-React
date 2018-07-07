import React from 'react'
import { Icon } from 'antd';

export default class TodoList extends React.Component {
    constructor(props) {
        super(props)
        // console.log(this.props.list_)
        this.state = {
            value: '', 
            color: ''
        }
        this.style = []
        this.todos = this.props.list_
        this.DoneItem = this.DoneItem.bind(this)
    }

    NewValue(e) {
        this.setState({value: e.target.value, color:''})
    }
     
    RenderListItem() {
        if (this.state.value === '') {
            this.setState({value:'Please Enter a To-Do', color:'red'})
            return
        } 
        this.todos.push(this.state.value)
        this.style.push('none')
        this.setState({value:''})
        console.log("Here: "+this.todos)
    }

    RemoveItem(index) {
        console.log("Second: "+this.todos)
        this.style.splice(index,1, this.style[index]+' fadeOut')
        console.log('Third: '+this.todos)
        setTimeout(() => {
            console.log(this.todos)
            if (index !== -1) {
                console.log(this.todos)
                this.todos.splice(index, 1)
                this.style.splice(index, 1)
            } else {
                this.todos.splice(0, -1)
                this.style.splice(0, -1)
            }
            this.setState({})
        }, 500)
        this.setState({})
    }

    DoneItem = (e, index)  => {
        this.style.splice(index,1, 'finished')
        this.setState({})
    }

    render() {
        return (
            <div className={'todos '+this.props.hidden}>
                <ul className='todo-list'>
                    {this.todos.map((todo, index) => 
                        <li key={index} className={'todo '+this.style[index]}>
                            <div className='done'>
                                <button onClick={e => this.DoneItem(e, index)}><Icon type="check" /></button>
                            </div>
                            <div className='todo-span'>
                                <span>{todo}</span>
                            </div>
                            <div className='remove'>
                                <button onClick={() => this.RemoveItem(index)}>
                                    <Icon type="cross" />
                                </button>
                            </div>
                        </li>                        
                    )}
                </ul>
                <div className='new-todo'>
                    <input style={{color: this.state.color}} value={this.state.value} onChange={e => this.NewValue(e)} type="text" placeholder='New To-Do'/>
                    <div>
                        <button style={{backgroundImage: 'url(' + require('./blurred/'+this.props.index+'.jpg') + ')'}} type='primary' onClick={() => this.RenderListItem()}>
                            <Icon type="plus" style={{ fontSize: 15 }}/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}