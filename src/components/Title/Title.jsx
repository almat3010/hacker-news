import Header from '../Header/Header'
import time from '../../icons/time-icon.svg'
import back from '../../icons/back-icon.svg'
import './Title.scss'

const Article = () => {
    return (
        <>
            <Header></Header>
            <div  className="title">
                <div 
                    className="title__btn-back"
                    >
                    <img src={back} alt="back-icon" />
                    back
                </div>
                <a 
                    target="_blank" rel="noopener noreferrer"
                    className='title__link' 
                    href='#'>
                    <div className="title__header">
                        
                    </div>
                </a>
                <div className="title__author">
                    by 
                </div>
                <div className="title__date">
                    <img src={time} alt="icon-time" />
                    
                </div>
                <div className="title__comments">
                    Comments: 
                </div>
            </div>
        </>
    )
}
export default Article