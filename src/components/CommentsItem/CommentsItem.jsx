import './CommentsItem.scss'

const CommentsItem = (props) => {
    return(
        <div className="comments__item">
            <div className="comments__author"></div>
            <div className="comments__btn">more</div>
            <div className="comments__text"></div>
        </div>
    )
}

export default CommentsItem