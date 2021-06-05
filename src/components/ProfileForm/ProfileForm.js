import { useDispatch, useSelector }  from "react-redux";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import {setForm} from "../../redux/profileForm/profileFormSlice";
const ProfileForm = () => {
    const dispatch = useDispatch()
    const profileValue = useSelector(store => store.PROFILE)
    const changeHandler = (e) => {
        dispatch(setForm({name:e.target.name, value:e.target.value}))
    }
    return (
        <form action="#" className="ml-15">
            <div className="mb-6">
                <Input value={profileValue.name} onChange={changeHandler} type = "text" name = "name" placeholder="Имя" icon="EditIcon"/>
            </div>
            <div className="mb-6">
                <Input value={profileValue.email} onChange={changeHandler} type = "email" name = "email" placeholder="Логин" icon="EditIcon"/>
            </div>
            <div className="mb-6">
                <Input value={profileValue.password} onChange={changeHandler} type = "password" name = "password" placeholder="Пароль" icon="EditIcon"/>
            </div>
        </form>
    )
}
export default ProfileForm