import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import EditProject from './EditProject';

class ProjectDetails extends Component {
  constructor(props){
      super(props);
      this.state = {};
  }


  componentDidMount(){
      this.getSingleProject();
  }

  getSingleProject = () => {
      const { params } = this.props.match;
      axios.get(`/api/projects/${params.id}`)
      .then( responseFromApi =>{
          const theProject = responseFromApi.data;
          this.setState(theProject);
      })
      .catch((err)=>{
          console.log(err)
      })
  }

  renderEditForm = () => {
    if(!this.state.title){
      this.getSingleProject();
    } else {
    //  {...props} => so we can have 'this.props.history' in Edit.js
      return <EditProject theProject={this.state} getTheProject={this.getSingleProject} {...this.props} />

    }
  }

  // DELETE PROJECT:
  deleteProject = () => {
    const { params } = this.props.match;
    axios.delete(`/api/projects/${params.id}`)
    .then( () =>{
        this.props.history.push('/projects'); // !!!         
    })
    .catch((err)=>{
        console.log(err)
    })
  }


  render(){
    return(
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <div>{this.renderEditForm()} </div> 
        <button onClick={() => this.deleteProject()}>Delete project</button> 
        <br/>
        <Link to={'/projects'}>Back to projects</Link>
      </div>
    )
  }
}

export default ProjectDetails;