import * as React from 'react';
import { baseShadow } from '../styles';
import TDButton from '../components/TDButton';
import { ITodo, INotification, IState } from '../interfaces';
import { TDActionsTypes, TDNotificationLevel, TDTodoCategory } from '../enumerations';
import { connect } from 'react-redux';
import { addNotification, connectWebSocket } from '../actions';
import { Style } from '../builder';

class TDInput extends React.Component<{
    todos: ITodo[],
    onAdd: (peerPort: string) => ({ type: TDActionsTypes, payload: string })
    onEmpty: () => ({ type: TDActionsTypes, payload: INotification })
    onExists: () => ({ type: TDActionsTypes, payload: INotification })
}> {

    private input: HTMLInputElement;

    public state = { value: '' };

    private style = (self: TDInput) => ({
        root: new Style({
            ...baseShadow,
            width: '50%',
            display: 'flex',
            alignItems: 'stretch' as 'stretch'
        }).mobile({
            width: '90%'
        }).build(),
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

    /**
     * This method is responsible for calling the correct behavior
     * depending on wether the added ITodo is empty or already exists.
     */
    private onAdd = () => {
        if (this.props.todos.some((todo: ITodo) => {
            return todo.label === this.state.value
                && todo.category !== TDTodoCategory.NULL;
        })) {
            this.props.onExists();
        } else if (this.state.value !== '') {
            this.props.onAdd(this.state.value);
            this.setState({value: ''});
        } else {
            this.props.onEmpty();
        }
    }

    private onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            this.onAdd();
        }
    }

    componentDidMount() {
        this.input.focus();
    }

    public render() {
        return (
            <div style={this.style(this).root} >
                <input
                    type="text"
                    ref={(element: HTMLInputElement) => this.input = element}
                    onKeyDown={this.onKeyDown}
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

export default connect((state: IState) => ({
    todos: state.todos
}), (dispatch, props) => ({
    onAdd: (peerPort: string) => {
        dispatch(connectWebSocket(peerPort.replace(':', '')));
    },
    onEmpty: () => dispatch(addNotification({
        level: TDNotificationLevel.DANGER,
        header: 'Oops !',
        content: 'Please insert a label for your ticket'
    })),
    onExists: () => dispatch(addNotification({
        level: TDNotificationLevel.WARNING,
        header: 'Are you sure ?',
        content: 'A ticket with the same label already exists.'
    }))
}))(TDInput);