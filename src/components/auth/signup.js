import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component{

  handleFormSubmit(formProps){
    this.props.signupUser(formProps);
  }

  renderAlert(){
    if(this.props.errorMessage){
      return(
          <div className="alert alert-danger">
            <strong>{this.props.errorMessage}</strong>
          </div>
      );
    }
  }
  render(){
    const { handleSubmit, fields: {email, password, passwordconfirm}} = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email</label>
          <input className="form-control" {...email}/>
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" {...password}/>
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password</label>
          <input type="password" className="form-control" {...passwordconfirm}/>
          {passwordconfirm.touched && passwordconfirm.error && <div className="error">{passwordconfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up</button>
      </form>
    );
  }
}

function validate(formProps){
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter email';
  }
  if (!formProps.password) {
    errors.password = 'Please enter password';
  }
  if (!formProps.passwordconfirm) {
    errors.passwordconfirm = 'Please enter password confirmation';
  }
  //xconsole.log(formProps);
  if(formProps.password !== formProps.passwordconfirm){
    errors.password = 'Password must be matching!';
  }
  return errors;
}

function mapStateToProps(state){
  return {errorMessage: state.auth.error};
}

export default reduxForm({
  form:'signup',
  fields: ['email','password','passwordconfirm'],
  validate
},mapStateToProps,actions)(Signup);
