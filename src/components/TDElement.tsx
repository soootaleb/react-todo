import * as React from 'react';
import { TDActionsTypes } from '../enumerations';
import { ITodo } from '../interfaces';
import TDButton from './TDButton';
import { baseShadow } from '../styles';

export default class TDElement extends React.Component<{
    todo: ITodo,
    onCompleteClicked: (todo: ITodo) => { type: TDActionsTypes, payload: ITodo }
}> {

    private style = (self: TDElement) => ({
        root: {
            ...baseShadow,
            borderRadius: 3,
            width: '100%',
            paddingLeft: 10,
            boxSizing: 'border-box ',
            listStyleType: 'none',
            display: 'flex',
            justifyContent: 'space-between' as 'space-between',
            alignItems: 'center' as 'center',
            position: 'relative' as 'relative',
            marginTop: 10,
            backgroundColor: 'white'
        }
    })

    public render() {
        return (
            <li style={this.style(this).root} >
                {this.props.todo.label}
                <TDButton label="Complete" onClick={() => this.props.onCompleteClicked(this.props.todo)} />
            </li>
        );
    }
}