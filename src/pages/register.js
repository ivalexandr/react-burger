import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../redux/actions";
import AuthForm from "../components/AuthForm/AuthForm";

const Register = () => {
    const dispatch = useDispatch()
    const { email, password, name } = useSelector(store => ({
        email:store.AUTH.email,
        password:store.AUTH.password,
        name:store.AUTH.name
    }))
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(registerUser({email,password,name}))
    }
return <AuthForm
    type = "register"
    headingText="Регистрация"
    buttonText="Регистрация"
    onSubmitHandler={submitHandler}
/>
}
export default Register