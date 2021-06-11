const getRecipientEmail = (users,userLoggedIn) => (
    users?.filter(userToFilter => userToFilter !== userLoggedIn?.email)[0]
    
)

export default getRecipientEmail

// export const getRec = (users,user)=>{
//     const rec = users?.filter(userfil => userfil !== user);
//     return rec;

// }