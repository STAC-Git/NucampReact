
import React, { Component } from 'react';
import { Button, Card, CardImg, CardBody, CardText, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from'react-router-dom';

const required = val => val && val.length;
const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            rating: '',
            author: '',
            text: '',
            touched: {
                rating: false,
                author: false,
                text: false,
                isModalOpen: false
            }
        };
      
            this.handleSubmit = this.handleSubmit.bind(this);    
        }

        handleSubmit(values) {
            console.log("Current State is: " + JSON.stringify(values));
            alert("Current state is: " + JSON.stringify(values));
        }

     toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
        

    render() { 
        return ( <React.Fragment>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={values => this.handleSubmit(values)}>
                        <div className="form-group">
                            <label htmlFor="rating" md={2}>Rating</label>                           
                            <Control.select model=".rating" id="rating" name="rating"
                                    placeholder="Rating"
                                    className="form-control"> 
                                    <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                </Control.select>               
                        </div>
                        <div className="form-group">
                            <label htmlFor="author" md={2}>Your Name</label>                           
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required,
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />                           
                        </div>
                                
                        <div className="form-group">
                            <label htmlFor="text" md={2}>Comment</label>                           
                                <Control.textarea model=".text" id="text" name="text"
                                    rows="6"
                                    className="form-control"
                                />   
                                                     
                        </div>
                        <Button type="submit" value="submit" color="primary">Submit</Button>    
                </LocalForm>
                        
                </ModalBody>
            </Modal>
        <Button type="submit" value="submit" outline color="secondary" onClick={this.toggleModal}> <i className="fa fa-pencil fa-lg" /> Submit Comment</Button>
        </React.Fragment>     
        );
    };
}

function RenderCampsite({campsite}) {
              return (
                <div className="col-md-5 m-1">
                    <Card>
                        <CardImg top src={campsite.image} alt={campsite.name} />
                        <CardBody>
                            <CardText>{campsite.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        }

 function RenderComments({comments}) {
        if (comments) {
            return(
                <div className="col-md-5 m-1">
                    <h4>Comments</h4>
                    {comments.map(comment => {
                        return(
                            <div key={comment.id}>
                                <p>
                                {comment.text} <br />
                                -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                                </p>                             
                            </div>                        
                        );
                    })}
                    <CommentForm />
             </div>
             
            );
        }
        return <div />
    }    

function CampsiteInfo(props) {  
        if (props.campsite) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <h2>{props.campsite.name}</h2>
                            <hr />
                        </div>
                    </div>
                    <div className="row" >
                        <RenderCampsite campsite={props.campsite} />
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            );
        } 
        return<div />; 
        
   }
  


export default CampsiteInfo;