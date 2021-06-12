import AuthForm from "../components/AuthForm/AuthForm";

const ResetPassword = () => {
    return <AuthForm
        type = "reset"
        headingText="Восстановление пароля"
        buttonText="Сохранить"
        passText="Введите новый пароль"
    />
}
export default ResetPassword