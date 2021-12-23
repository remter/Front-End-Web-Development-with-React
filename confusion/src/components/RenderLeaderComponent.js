import React from 'react';
import { Media } from 'reactstrap';

function RenderLeader(props){
return(
<div key={props.leader.id} className="col-12">
                    <Media tag="li">
                        <Media left middle>
                            <Media object src={props.leader.image} alt={props.name} />
                        </Media>
                        <Media body className="ml-5 text-left">
                            <Media heading>{props.leader.name}</Media>
                            <p> {props.leader.designation}</p>

                            <p >{props.leader.description}</p>
                        </Media>
                    </Media>
</div>
)
}
export default RenderLeader;