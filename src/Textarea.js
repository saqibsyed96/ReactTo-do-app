import React, {Component} from 'react';
import "./App.css"

class Textarea extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			rows: 3,
			minRows: 3,
			maxRows: 12,
		};
	}
	
	handleChange = (event) => {
		const textareaLineHeight = 24;
		const { minRows, maxRows } = this.state;
		
		const previousRows = event.target.rows;
  	event.target.rows = minRows; // reset number of rows in textarea 
		
		const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);
    
    if (currentRows === previousRows) {
    	event.target.rows = currentRows;
    }
		
		if (currentRows >= maxRows) {
			event.target.rows = maxRows;
			event.target.scrollTop = event.target.scrollHeight;
		}
  	this.setState({
    	value: event.target.value,
      rows: currentRows < maxRows ? currentRows : maxRows,
    });
	this.props.onChange(event);
	};
	
	render() {
		return (
			<textarea
				rows={this.state.rows}
				value={this.state.value}
				placeholder={'Enter text'}
				className="textarea"
				onChange={this.handleChange}
				maxLength="150"
			/>
		);
	}
}

export default Textarea;