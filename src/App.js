import React from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			title: 'react simple crud app',
			act: 0,
			index: '',
			datas: []
		};
	}

	componentDidMount() {
		axios
			.get(`http://localhost:4000/api/tasks/` + this.state.datas)
			.then(res => {
				console.log(res);
				this.setState({ datas: res.data });
			})
			.catch(function(error) {
				console.log(error);
			});
		this.refs.task.focus();
	}

	fSubmit = e => {
		e.preventDefault();
		console.log('try');

		let datas = this.state.datas;
		let task = this.refs.task.value;

		if (this.state.act === 0) {
			//new
			let data = {
				task
			};
			datas.push(data);
		} else {
			//update
			let index = this.state.index;
			datas[index].task = task;
		}

		this.setState({
			datas: datas,
			act: 0
		});
		this.refs.myform.reset();
		this.refs.task.focus();
		let reqPayload = { taskstring: task };
		console.log("I'm sending: ", reqPayload);
		axios.post(`http://localhost:4000/api/tasks`, reqPayload).then(res => {
			console.log(res);
			console.log(res.task);
		});
	};

	fRemove = i => {
		document.getElementById('create-course-form').reset();
		let datas = this.state.datas;
		datas.splice(i, 1);
		this.setState({
			datas: datas
		});

		this.refs.myform.reset();
		this.refs.task.focus();
		let reqPay = { taskstring: i };
		console.log("I'm deleting: ", reqPay);
		axios.delete(`http://localhost:4000/api/tasks/${i._id}`).then(res => {
			console.log(res);
			console.log(res.data);
		});
	};

	fEdit = i => {
		let data = this.state.datas[i];
		this.refs.task.value = data.task;

		this.setState({
			act: 1,
			index: i
		});
		console.log("I'm updating ");
		this.refs.task.focus();
	};

	render() {
		let datas = this.state.datas;
		return (
			<div className="App">
				<h1>{this.state.title}</h1>
				<form id="create-course-form" ref="myform" className="Form1">
					<input type="text" ref="task" placeholder="your task" className="formField" />
					<button onClick={this.fSubmit} className="myButton">
						add task
					</button>
				</form>
				<pre>
					{datas.map((data, i) => (
						<li key={i} className="myList">
							{i + 1}. {data.task}
							<button onClick={() => this.fRemove(data)} className="myButton">
								remove
							</button>
							<button onClick={() => this.fEdit(i)} className="myButton">
								Edit
							</button>
						</li>
					))}
				</pre>
			</div>
		);
	}
}

export default App;

ReactDOM.render(<App />, document.getElementById('root'));
