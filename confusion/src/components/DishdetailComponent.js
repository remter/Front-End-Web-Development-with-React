import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

    
    function RenderDish({dish}) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                      <CardTitle>{dish.name}</CardTitle>
                      <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
        
    }
    function RenderComments({comments, addComment, dishId}) {
        if(comments !=null){
        const com = comments.map((comment) =>{
            return (
                <li key={comment.id} >
                    <div >
                        <div className="text-left mt-2">
                            {comment.comment}
                        </div>
                        <div className="text-left mt-2">
                            <span> -- </span>{comment.author} 
                            <span>, </span> <span>{new Intl.DateTimeFormat('en-US', {year:'numeric', month:"short", day:'2-digit'}).format(new Date(Date.parse(comment.date))) }</span>
                            
                            
                        </div>
                    </div>

                </li>
            )
        })
        return(
            <div>
                <h4 className="text-left">
                    Comments
                </h4>
                <ul className = "list-unstyled">
                    {com}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )
        }
        else
            return(
                <div></div>
            );

    } 
    class CommentForm extends Component{
        constructor(props) {
            super(props);
    
            this.toggleNav = this.toggleNav.bind(this);
            this.state = {
                isNavOpen: false,
                isModalOpen: false
            };
            this.toggleModal = this.toggleModal.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
    
            
        }
        toggleNav() {
            this.setState({
              isNavOpen: !this.state.isNavOpen
            });
        }
        toggleModal() {
            this.setState({
              isModalOpen: !this.state.isModalOpen
            });
        }
        handleSubmit(values) {
            this.toggleModal()

            this.props.addComment(this.props.dishId, values.rating, values.author, values.comment)
             
        }
        render(){
            return(
                <div>
                    <div className="text-left">
                        <Button outline  onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                    </div>
                    <div>
                        
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                        <ModalBody>
                            <div>
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <div className="form-group">
                                        <div>
                                            <Label className="font-weight-bold" htmlFor="rating" >Rating</Label>
                                        </div>
                                        <div>
                                            <Control.select  model=".rating" id="rating" name="rating"
                                                rows="12"
                                                className="form-control">
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>

                                            </Control.select>
                                        
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div>
                                            <Label className="font-weight-bold" htmlFor="author" >Your Name</Label>
                                        </div>
                                        <div>
                                            <Control.text model=".author" id="author" name="author"
                                            placeholder="Your Name"
                                            className="form-control"
                                            validators={{
                                                minLength: minLength(3), maxLength: maxLength(15)
                                            }}
                                            />
                                            <Errors
                                                className="text-danger"
                                                model=".author"
                                                show="touched"
                                                messages={{
                                                    minLength: 'Must be greater than 2 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                            />
                                        
                                        </div>
                                    </div>
                                    
                                    
                                    
                                    <div className="form-group">
                                        <div>
                                            <Label className="font-weight-bold" htmlFor="comment" >Comment</Label>
                                        </div>
                                        <div>
                                            <Control.textarea model=".comment" id="comment" name="comment"
                                                rows="12"
                                                className="form-control" />
                                        
                                        </div>
                                    </div>
                                    
                                    <div className="form-group">
                                        <div md={{size:10, offset: 2}}>
                                            <Button type="submit" color="primary">
                                            Submit
                                            </Button>
                                        </div>
                                    </div>
                                </LocalForm>
                            </div>
                        </ModalBody>
                        </Modal>
                    </div>
                </div>
            )
        }
    }


    const DishDetail = (props) => {
        if(props.dish != null){
            return (
                <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                        addComment={props.addComment}
                        dishId={props.dish.id}
                    />
                        
                    </div>
                </div>
                </div>
            );
        }
        else{
            return(
                <div></div>
            )
        }
        
    }

export default DishDetail;