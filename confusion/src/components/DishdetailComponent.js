import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle  } from 'reactstrap';


class DishDetail extends Component{
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    
    renderDish(dish) {
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
    renderComments(comments){
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
            </div>
        )
        }
        else
            return(
                <div></div>
            );

    } 
    render (){
        if(this.props.dish != null){
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish.comments)}
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

}
export default DishDetail;