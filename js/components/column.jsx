import React from "react";
import Card from "./card";

class Column extends React.Component {
  constructor(props) {
	super(props);
	this.state = {
		posY: this.props.posY,
		isLoading: true,
		name: this.props.name
	};
  }
  componentDidMount = () => {
	return fetch("./dataCards.json")
	  .then(res => res.json())
	  .then(response => {
		this.setState({
		  isLoading: false,
		  cards: response.cards
		});
		});
  };

	_handleChange = (event) => {
		console.log(event.target.value);
		this.setState({
			newCardName: event.target.value
		})
	}

	_addCard = (event) => {
		event.preventDefault();
		var card = {
			"cardDescr": this.state.newCardName,
			"columnId": this.state.posY
		}
		if (!card.cardDescr) return;
		this.state.cards.push(card);
		console.log(this.state.cards)
		this.setState({
			columns: this.state.cards,
			newCardName: ''
		})
		
	}

  render() {
	if (this.state.isLoading) {
		return <div className="jumbotron" style={{ padding: 20, backgroundColor: "#eee", marginRight: 20 }}>
			<div>Loading</div>
		</div>
	}

	return (
	  <div className="jumbotron" style={{ padding: 20, backgroundColor: "#eee", marginRight: 20 }}>
		<h3>{this.state.name}</h3>
		<div className="cards">
			{this.state.cards.map((card, idx) => {
				if (this.state.posY == card.columnId) {
					return (<Card key={idx} descr={card.cardDescr} cardY={card.posY} cardX={idx} />)
				}
			})}
		</div>
		<form>
			<div className="form-group">
				<label htmlFor="newColumn">New card</label>
				<input onChange={this._handleChange} value={this.state.newCardName} className="form-control" id="newColumn" type="text" />
				<button onClick={this._addCard} className="btn btn-outline-primary btn-sm">Submit</button>
			</div>
		</form>
	  </div>
	);
  }
}

export default Column;
