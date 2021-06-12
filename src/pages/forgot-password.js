import AuthForm from "../components/AuthForm/AuthForm";

const ForgotPassword = () => {

    return(
        <AuthForm
        type = "forgot"
        headingText="Восстановление пароля"
        buttonText="Восстановить"
        emailText = "Укажите e-mail"
        />
    )
}
export default ForgotPassword