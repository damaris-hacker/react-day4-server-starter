import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import ProjectList from './components/projects/ProjectList';
import ProjectDetails from './components/projects/ProjectDetails';
import TaskDetails from './components/tasks/TaskDetails'; // <== import the TaskDetails component
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';




class App extends Component {
 
  constructor(props){
    super(props)
    this.state = { loggedInUser: this.props.user }; 
  }

  updateTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }


  render() {
    return (
      <div className="App">
<Navbar userInSession={this.state.loggedInUser} updateUser={this.updateTheUser} />
      <Switch>
      <Route exact path='/signup' render={() => <Signup updateUser={this.updateTheUser}/>}/>
      <Route exact path='/' render={() => <Login updateUser={this.updateTheUser}/>}/>
      <Route exact path="/projects" render={() => {
    if (this.state.loggedInUser) {
      return <ProjectList />
    } else {
      // if the user is not logged in, redirects to `/`
      return <Redirect to={{pathname: '/'}}/> 
    }
  }} />
      <Route exact path="/projects/:id" component={ProjectDetails} />
      <Route exact path="/tasks/:taskId" component={TaskDetails} /> {/* <== !!! */}
      </Switch>
      </div>
    );
  }
}

export default App;