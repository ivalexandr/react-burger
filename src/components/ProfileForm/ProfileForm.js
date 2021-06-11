import { useDispatch, useSelector }  from "react-redux";
import { Input } from '@ya.praktikum/react-developer-burger-ui-components'
import {setForm} from "../../redux/profileForm/profileFormSlice";
import {setUserData} from "../../redux/actions";
const ProfileForm = () => {
    const dispatch = useDispatch()
    const profileValue = useSelector(store => store.PROFILE)
    const changeHandler = (e) => {
        dispatch(setForm({name:e.target.name, value:e.target.value}))
    }
    const clickNameHandler = () => {
        dispatch(setUserData({name:profileValue.name}))
    }
    const clickEmailHandler = () => {
        dispatch(setUserData({email:profileValue.email}))
    }
    return (
        <form action="#" className="ml-15">
            <div className="mb-6">
                <Input value={profileValue.name} onChange={changeHandler} type = "text" name = "name" placeholder="Имя" icon="EditIcon" onIconClick={clickNameHandler}/>
            </div>
            <div className="mb-6">
                <Input value={profileValue.email} onChange={changeHandler} type = "email" name = "email" placeholder="Логин" icon="EditIcon" onIconClick={clickEmailHandler}/>
            </div>
            <div className="mb-6">
                <Input value={profileValue.password} onChange={changeHandler} type = "password" name = "password" placeholder="Пароль" icon="EditIcon"/>
            </div>
        </form>
    )
}
export default ProfileForm