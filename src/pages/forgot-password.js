import { useDispatch, useSelector } from "react-redux";
import { resetPasswordSearch } from "../redux/actions";
import AuthForm from "../components/AuthForm/AuthForm";

const ForgotPassword = () => {
const email = useSelector(store => store.AUTH.email)
const dispatch = useDispatch()
const submitHandler = (e) => {
    e.preventDefault()
    dispatch(resetPasswordSearch(email))
}
    return(
        <AuthForm
        type = "forgot"
        headingText="Восстановление пароля"
        buttonText="Восстановить"
        emailText = "Укажите e-mail"
        onSubmitHandler={submitHandler}
        />
    )
}
export default ForgotPassword