import {Route, Redirect} from 'react-router-dom'
import {useSelector} from "react-redux";

const ProtectRoute = ({children, ...props}) => {

return(
    <Route
        {...props}
        render={() => localStorage.getItem('successLogin') === 'true' ? (
            children
        )
            : <Redirect to="/login" />
        } />
)
}
export default ProtectRoute