import * as React from 'react';
import { baseShadow } from '../styles';
import TDButton from '../components/TDButton';
import { TDActionsTypes, TDNotificationLevel } from '../enumerations';
import { connect } from 'react-redux';
import { addNotification, setRequest } from '../actions';
import { Style } from '../builder';
import { IRequest } from '../interfaces';

class TDInput extends React.Component<{
    onSubmit: (request: IRequest) => ({ type: TDActionsTypes, payload: IRequest })
}> {

    public state: IRequest = {
        cpu: null,
        ram: null,
        disk: null,
        gpu: null,
        virt: null,
        ssd: null,
        hdd: null,
    };

    private style = (self: TDInput) => ({
        root: new Style({
            ...baseShadow,
            width: '50%',
            display: 'flex',
            alignItems: 'stretch' as 'stretch'
        }).flex('column')
        .mobile({
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
            lineHeight: '4vh'
        }
    })

    /**
     * This method is responsible for calling the correct behavior
     * depending on wether the added ITodo is empty or already exists.
     */
    private onSubmit = () => {
        for (let key of Object.keys(this.state)) {
            if (this.state[key]) {
                this.state[key] = parseInt(this.state[key], 10);
            } else {
                this.state[key] = null;
            }
        }

        this.props.onSubmit(this.state);
    }

    public render() {
        return (
            <div style={this.style(this).root} >
                <input
                    placeholder="CPU: Number of threads"
                    type="text"
                    style={this.style(this).input}
                    onChange={(event) => this.setState({...this.state, cpu: event.target.value})}
                />
                <input
                    placeholder="RAM: Number of GB"
                    type="text"
                    style={this.style(this).input}
                    onChange={(event) => this.setState({...this.state, ram: event.target.value})}
                />
                <input
                    placeholder="STORAGE: Number of persistant GB (can be block, ssd or hdd)"
                    type="text"
                    style={this.style(this).input}
                    onChange={(event) => this.setState({...this.state, disk: event.target.value})}
                />
                <input
                    placeholder="GPU: Number of GPUs"
                    type="text"
                    style={this.style(this).input}
                    onChange={(event) => this.setState({...this.state, gpu: event.target.value})}
                />
                <input
                    placeholder="VM: 0 for bare metal, 1 for a virtual machine"
                    type="text"
                    style={this.style(this).input}
                    onChange={(event) => this.setState({...this.state, virt: event.target.value})}
                />
                <input
                    placeholder="SSD: Number of SSDs"
                    type="text"
                    style={this.style(this).input}
                    onChange={(event) => this.setState({...this.state, ssd: event.target.value})}
                />
                <input
                    placeholder="HDD: Number of HDDs"
                    type="text"
                    style={this.style(this).input}
                    onChange={(event) => this.setState({...this.state, hdd: event.target.value})}
                />
                <TDButton label="Suggest" onClick={this.onSubmit} />
            </div>
        );
    }
}

export default connect((state) => ({}), (dispatch, props) => ({
    onSubmit: (request: IRequest) => {
        dispatch(addNotification({
            level: TDNotificationLevel.SUCCESS,
            content: 'Request submited'
        }));
        dispatch(setRequest(request));
    }
}))(TDInput);