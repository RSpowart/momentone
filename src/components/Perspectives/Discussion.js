import React from "react";
import likeIcon from "../../imageAssets/Icons/General/likeIcon.png"
const Discussion = (props) => {

    return (
        <div className="discussionContent">
            <div className="icon"/>
            <div className="textWrap">
                <h2 className = "title">{props.title}</h2>
                <h3 className = "subTitle">{props.username} &#8226; {props.date} </h3>
                <p className = "textContent">{props.content}</p>
            </div>
            <div className="infoWrap">
                <div className = "category">
                    <p>{props.category}</p>
                </div>
                <div className = "likes">
                    <img src={likeIcon}/>
                    <p>{props.likes} Like it</p>
                </div>
            </div>
        </div>
        )
    
}

export default Discussion;