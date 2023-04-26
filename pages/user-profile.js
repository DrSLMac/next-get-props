import React from 'react'


//this page cannot be pre-rendered statically because we need to know for which user it will be rendered. This would be a use-case for getServerSideProps
//getServerSideProps works because it executes on the server after deployment, not statically pre-generated
const UserProfilePage = (props) => {
  return (
    <h1>{props.username}</h1>
  )
}

export default UserProfilePage

export async function getServerSideProps(context) {
    const { params, req, res } = context;

    return {
        props: {
            username: 'Max'
        }
    }
}