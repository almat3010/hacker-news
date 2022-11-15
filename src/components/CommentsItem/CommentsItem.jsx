import cleanHtml from '../../helpers/helpers';
import { useState } from 'react';
import SubCommentList from '../SubCommentList/SubCommentList'

import './CommentsItem.scss'

const CommentsItem = (props) => {
    const [showSubComments, setShowSubComments] = useState(false);
    const style = props.class || '';
    return(
        <div style={props.style} className={`comments__item ${style}`}>
            <div className="comments__author">
                {props.dead || props.deleted ? 'sorry comment was deleted or dead' : `by ${props.by}`}
            </div>
            <div 
                dangerouslySetInnerHTML={{ __html: cleanHtml(props.text) }} 
                className="comments__text">
            </div>
            {
                props.kids &&
                    <div 
                    className="comments__btn"
                    onClick={()=>{
                        setShowSubComments(!showSubComments)
                    }}
                    >more</div>
                
            }
            {
                props.kids && showSubComments &&
                    <SubCommentList id={props.id} kids={props.kids}/>
            }
        </div>
    )
}

export default CommentsItem