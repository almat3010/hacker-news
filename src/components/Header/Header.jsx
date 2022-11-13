import icon from '../../icons/icon.svg'
import './Header.scss'

const Header = (props) => {
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
                    >
                    update
                </button>
            </div>
        </header>
    )
}
export default Header