import { useDispatch, useSelector } from "react-redux";
import {loginUser, refreshToken} from "../redux/actions";
import AuthForm from "../components/AuthForm/AuthForm";
import { Redirect } from 'react-router-dom'

const Login = () => {
    const dispatch = useDispatch()
    const {email, password, dataLogin} = useSelector(store => ({
        email:store.AUTH.email,
        password:store.AUTH.password,
        dataLogin:store.AUTH.dataLogin
    }))
    const submitHandler = e => {
        e.preventDefault()
        dispatch(loginUser({email,password}))
        if(localStorage.getItem('successLogin') === 'true'){
            setInterval(() => {
                dispatch(refreshToken(
                    {token:localStorage.getItem('refreshToken'), success:localStorage.getItem('successLogin')}
                ))
            }, 15*60*1000)
        }
    }
    const render = () => {
        if(dataLogin?.success){
            return <Redirect to="/" exact/>
        }else{
            return (<AuthForm
                type="login"
                headingText="Вход"
                buttonText="Войти"
                onSubmitHandler={submitHandler}
            />)
        }
    }
    return render()
}
export default Login