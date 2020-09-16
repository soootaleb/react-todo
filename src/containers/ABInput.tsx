import * as React from 'react';
import { baseShadow } from '../styles';
import ABButton from '../components/ABButton';
import { INotification, IState, INode } from '../interfaces';
import { ABActionsTypes, ABNotificationLevel } from '../enumerations';
import { connect } from 'react-redux';
import { addNotification, connectWebSocket } from '../actions';
import { Style } from '../builder';

class ABInput extends React.Component<{
    nodes: {[key: string]: INode},
    onAdd: (port: string) => ({ type: ABActionsTypes, payload: string })
    onEmpty: () => ({ type: ABActionsTypes, payload: INotification })
    onExists: () => ({ type: ABActionsTypes, payload: INotification })
}> {

    private input: HTMLInputElement;

    public state = { value: '' };

    private style = (self: ABInput) => ({
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
        if (Object.keys(this.props.nodes).indexOf(this.state.value) !== -1) {
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
                        value: event.target.value.replace(':', '')
                    })}
                />
                <ABButton label="Add" onClick={this.onAdd} />
            </div>
        );
    }
}

export default connect((state: IState) => ({
    nodes: state.nodes
}), (dispatch, props) => ({
    onAdd: (port: string) => {
        dispatch(connectWebSocket(port));
    },
    onEmpty: () => dispatch(addNotification({
        level: ABNotificationLevel.DANGER,
        header: 'Oops !',
        content: 'Please insert a label for your ticket'
    })),
    onExists: () => dispatch(addNotification({
        level: ABNotificationLevel.WARNING,
        header: 'Are you sure ?',
        content: 'A ticket with the same label already exists.'
    }))
}))(ABInput);