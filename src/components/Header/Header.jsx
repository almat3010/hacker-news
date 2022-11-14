import { useSelector } from 'react-redux'

import icon from '../../icons/icon.svg'
import './Header.scss'

const Header = (props) => {
    const updatingNews = useSelector(state => state.news.newsUpdate);
    const loadingComments = useSelector(state => state.news.commentsLoading);
    const loadingNews = useSelector(state => state.news.newsLoading)
    return(
        <header>
            <div className="container font-face-gm">
                <div className='header__block'>
                    <img src={`${icon}`} alt="icon" />
                    <h1>
                        Hacker News
                    </h1>
                </div>
                <button 
                    className = 'header__btn font-face-gm'
                    disabled = {updatingNews || loadingComments || loadingNews ? true : false}
                    onClick = {props.onClick}>
                    update
                </button>
            </div>
        </header>
    )
}
export default Header