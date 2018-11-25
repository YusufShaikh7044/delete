import React from 'react';
import axios from 'axios';
import NavbBar from './components/navbar';
class TodoList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			act: 0,
			index: '',
			datas: []
		};
	}

	componentDidMount() {
		axios
			.get(`http://localhost:4000/api/tasks/`)
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
			datas,
			task: ''
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
			datas
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
				<NavbBar />
				<form id="create-course-form" ref="myform" className="Form1">
					<input className="btn btn-light m-2 btn-sm" type="text" ref="task" placeholder="Enter Task" />
					<button onClick={this.fSubmit} className="btn btn-dark btn-sm">
						add task
					</button>
				</form>
				<pre>
					{datas.map((data, i) => (
						<li key={i} className="myList">
							{i + 1}. {data.task}
							<button onClick={() => this.fRemove(data)} className="btn btn-dark btn-sm m-2">
								Remove
							</button>
							<button onClick={() => this.fEdit(i)} className="btn btn-dark btn-sm m-2">
								Edit
							</button>
						</li>
					))}
				</pre>
			</div>
		);
	}
}

export default TodoList;
