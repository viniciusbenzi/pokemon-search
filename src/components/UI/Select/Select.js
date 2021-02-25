import React, { Component } from 'react'
// import { Visibility, VisibilityOff } from '@material-ui/icons'
import './style.css'

export default class Select extends Component {
    constructor() {
        super();

        this.state = {
            value: '',
            focus: 'untouched',
            type: '',
            mask: ''
        }
    }

    componentDidMount() {
        if(this.props.value) {
            this.setState({
                focus: 'focus'
            });
        }

        this.setState({
            type: this.props.type
        });
    }

    focus() {
        this.setState({
            focus: 'focus'
        });
    }

    blur(e) {
        const inputValue = e.target.value;

        if (inputValue.length <= 0) {
            this.setState({
                focus: 'untouched'
            });
        }

        if (this.props.onBlur) {
            this.props.onBlur(this.state.value);
        }
    }

    onChange(e) {
        let selectValue = e.target.value;
        
        this.props.onChange(selectValue);
    }

    render() {
        return (
            <div className={`select-container ${this.props.className}`}>
                <select className="select-css" onChange={this.onChange.bind(this)} value={this.props.value} >
                    <option>{this.props.label}</option>
                    {this.props.options.map(option => {
                        return <option key={option.url} value={option.url}>{option.name}</option>
                    })}
                </select>
            </div>
        )
    }
}