import { useDispatch, useSelector } from "react-redux";
import {loginUser} from "../redux/actions";
import AuthForm from "../components/AuthForm/AuthForm";

const Login = () => {

    const dispatch = useDispatch()
    const {email, password} = useSelector(store => ({
        email:store.AUTH.email,
        password:store.AUTH.password
    }))
    const submitHandler = e => {
        e.preventDefault()
        dispatch(loginUser({email,password}))
    }
    return <AuthForm
        type = "login"
        headingText="Вход"
        buttonText="Войти"
        onSubmitHandler={submitHandler}
    />
}
export default Login