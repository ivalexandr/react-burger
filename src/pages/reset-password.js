import {useDispatch, useSelector} from "react-redux";
import AuthForm from "../components/AuthForm/AuthForm";
import {resetPassword} from "../redux/actions";

const ResetPassword = () => {
    const dispatch = useDispatch()
    const { password, token } = useSelector(store => ({
        password:store.AUTH.password,
        token:store.AUTH.token
    }))
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(resetPassword({password,token}))
    }
    return <AuthForm
        type = "reset"
        headingText="Восстановление пароля"
        buttonText="Сохранить"
        passText="Введите новый пароль"
        onSubmitHandler={submitHandler}
    />
}
export default ResetPassword