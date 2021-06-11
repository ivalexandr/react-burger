import {Route, Redirect} from 'react-router-dom'
import { useSelector } from "react-redux";

const ProtectRoute = ({children, ...props}) => {
const status = useSelector(store => store.PROFILE.status)
return(
    <Route
        {...props}
        render={() => status === 'success' || status === 'loading' ? (
            children
        )
            : <Redirect to="/login" exact/>
        } />
)
}

export default ProtectRoute