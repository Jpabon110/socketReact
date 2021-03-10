import React, { Component }  from 'react';
import logo from './logo.svg';
// import configuration from './configuration.json';
import {
  // FormGroup,
  Input,
  // Label,
  // TextField,
} from 'reactstrap';
import io from 'socket.io-client';
import './App.css';

/* SI NO ENTIENDES ESTO MIRA ESTE VIDE: https://www.youtube.com/watch?v=CgV8omlWq2o*/

const socket = io.connect('http://localhost:7000');

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      message: '',
      chat:[],
    }
  }

  componentDidMount() {
    // configuration.app.map((items) => {
    //   console.log('items', items);
    // })  
    this.useEffect();
  }

  onChangeInput = key => (e) => {
    if ((key === 'name') || (key === 'message')) {
      this.setState({ [key]: e.target.value });
    }
  }

  renderChat = () => {
    const { chat } = this.state;
    console.log('le chat', chat);
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ))
  }
  
  useEffect = () => {
    const { chat } = this.state;
    console.log('the chat', chat);
    socket.on('message', ({ name, message }) => {
      chat.push({ name, message });
      this.setState({ chat });
      // setChat([...chat, { name, message }])
    })
  };

  onMessageSubmit = () => e => {
    e.preventDefault()
    const { name, message } = this.state;
    socket.emit('message', { name, message });
    this.setState({ message: '', name });
    // this.useEffect();
  }

  render() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <br />
        <br />
        <div style={{ width: '100%', display: 'flex' }}>
        <div style={{ width: '40rem', display: 'flex', flexDirection: 'column' }}>
            <h1>Name</h1>
            <div className="name-field">
              <Input
                name="name"
                onChange={this.onChangeInput('name')}
                value={this.state.name}
                label="Name"
              />
            </div>
            <h1>Messanger</h1>
            <div className="name-field">
              <Input
                type="textarea"
                name="Message"
                onChange={this.onChangeInput('message')}
                value={this.state.message}
                id="exampleText"
              />
            </div>
            <button onClick={this.onMessageSubmit()}>Send Message</button>
        </div>
        <div style={{ width: '40rem', display: 'flex', flexDirection: 'column' }}>
          <div className="render-chat">
            <h1>Chat Log</h1>
            {this.renderChat()}
          </div>
        </div>
        </div>
      </header>
    </div>
  );
 }
}

export default App;
// export default App;
