import {Route, Redirect} from 'react-router-dom'
import {useSelector} from "react-redux";

const ProtectRoute = ({children, ...props}) => {
const dataUser = useSelector(store => store.AUTH.dataUser)
return(
    <Route
        {...props}
        render={() => dataUser?.success ? (
            children
        )
            : <Redirect to="/login" />
        } />
)
}
export default ProtectRoute