import React, { Component } from 'react'

export default class ConfirmRequest extends Component {
    constructor(props){
        super(props);
        this.state={
            requestName:"",
            status:"",
            minSupport:0,
            minConfidence:0,
        }
    }

    confirmRequest(){

    }

    render() {
        return (<>
            <form>
                <label>Request Name</label>
                <input type="text" value={this.state.requestName} onChange={(event)=>this.setState({requestName:event.target.value})} required/>
                <br/>
                <label>Minimum Support</label>
                <input type="text" value={this.state.requestName} onChange={(event)=>this.setState({requestName:event.target.value})} required/>%
                <br/>
                <label>Minimum Confidence</label>
                <input type="text" value={this.state.requestName} onChange={(event)=>this.setState({requestName:event.target.value})} required/>%
                <br/>
                <label>Status</label>
                <select>
                    <option value="Draft" selected>Draft</option>
                    <option value="Start Now">Start Now</option>
                </select>
                <br/>
                <label>Consider Disocunts</label>
                <input type="checkbox" value="true"/>
                <br/>
                <button type= "submit" onClick={()=>this.confirmRequest()}>Confirm Request</button>
            </form>
        </>);
  }
}
