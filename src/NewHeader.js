import {connect} from 'react-redux'
import React from 'react'
const NewHeader = ({userData}) => (
    <div>{userData && userData.firstname}</div>
)
export default connect((state) => ({
    userData: state.userData.userData
}))(NewHeader)