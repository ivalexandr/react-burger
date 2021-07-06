import React from 'react'
import ProfileNavBar from '../components/ProfileNavBar/ProfileNavBar'
import ProfileInfo from './profile-info'

const Profile:React.FC = () => {

return (
    <div className="container pt-25 df">
        <ProfileNavBar />
        <ProfileInfo />
    </div>
)

}
export default Profile