import React from "react";
import Column from "./column";
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';


class Board extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
	  isLoading: true
	};
  }

  componentDidMount() {
	
	return fetch("./dataColumns.json")
	  .then(res => res.json())
	  .then(response => {
		this.setState({
		  isLoading: false,
		  boardName: response.name,
		  columns: response.columns
		});
	  });
  }

	_handleChange = (event) => {
		this.setState({
			newColumnName: event.target.value
		})
	 
	}

	_addColumn = (event) => {
		event.preventDefault();
		var column = {
			"id": ++this.state.columns.length,
			"columnName": this.state.newColumnName
		}
		if (!column.columnName) return;
		this.state.columns.push(column);
		this.setState({
			columns: this.state.columns,
			newColumnName: ''
		})
	}

  render() {
	if (this.state.isLoading) {
	  return (
		<div>Loading</div>
	  );
	}
	return (
	  <div
		style={{
		  display: "flex",
		  flexDirection: "row",
		  alignItems: "flex-start",
		  paddingTop: 20,
		  paddingBottom: 20,
		  whiteSpace: 'nowrap'
		}}>
		<div style={{
			display: "flex",
			flexDirection: "row",
			alignItems: "flex-start"
		}}>
			{this.state.columns.map((column, idx) => {
				return <Column key={idx} name={column.columnName} posY={idx} />
			})}
		</div>

		<form>
			<div className="form-group">
			<label htmlFor="newColumn">New column</label>
			<input onChange={this._handleChange} value={this.state.newColumnName} id="newColumn" type="text" />
			<button onClick={this._addColumn} className="btn btn-primary">Submit</button>
			</div>
		</form>
	  </div>
	);
  }
}

export default DragDropContext(HTML5Backend)(Board);
