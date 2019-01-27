import * as React from 'react';
import { baseShadow } from '../styles';
import TDButton from '../components/TDButton';
import { ITodo, INotification } from '../interfaces';
import { TDActionsTypes, TDNotificationLevel } from '../enumerations';
import { connect } from 'react-redux';
import { addTodo, addNotification } from '../actions';

class TDInput extends React.Component<{
    onAdd: (todo: ITodo) => ({ type: TDActionsTypes, payload: ITodo })
    onEmpty: () => ({ type: TDActionsTypes, payload: INotification })
}> {

    public state = { value: '' };

    private style = (self: TDInput) => ({
        root: {
            ...baseShadow,
            width: '50%',
            display: 'flex',
            alignItems: 'stretch' as 'stretch'
        },
        input: {
            ...baseShadow, // This a static mixin
            width: 'auto',
            margin: 5,
            borderRadius: 1,
            border: 0,
            flex: 1,
            paddingLeft: 10,
        }
    })

    public mouseOver = () => {
        this.setState({ hover: true });
    }

    public mouseOut = () => {
        this.setState({ hover: false });
    }

    private onAdd = () => {
        this.add();
    }

    private add() {
        if (this.state.value !== '') {
            this.props.onAdd({label: this.state.value});
            this.setState({value: ''});
        } else {
            this.props.onEmpty();
        }
    }

    private onKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.add();
        }
    }

    public render() {
        return (
            <div style={this.style(this).root} >
                <input
                    onKeyDown={this.onKeyDown}
                    type="text"
                    style={this.style(this).input}
                    value={this.state.value}
                    onChange={(event) => this.setState({
                        value: event.target.value
                    })}
                />
                <TDButton label="Add" onClick={this.onAdd} />
            </div>
        );
    }
}

export default connect(null, (dispatch, props) => ({
    onAdd: (todo: ITodo) => {
        dispatch(addNotification({
            level: TDNotificationLevel.SUCCESS,
            header: 'Yeah !',
            content: 'Todo added in your list'
        }));
        dispatch(addTodo(todo));
    },
    onEmpty: () => dispatch(addNotification({
        level: TDNotificationLevel.WARNING,
        header: 'Oops !',
        content: 'Please insert a label for your ticket'
    }))
}))(TDInput);