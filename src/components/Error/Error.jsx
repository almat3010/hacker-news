import { Link } from 'react-router-dom';
import './Error.scss';

const ErrorComponent = () => {
    return(
        <>
            <div className="wrapper">
                <div className="error font-face-gm">
                    404 - Not Found
                </div>
                <Link to='/'>
                    <div className="back font-face-gm">
                        go back
                    </div>
                </Link>
            </div>
        </>
    )
}
export default ErrorComponent