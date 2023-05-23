import { formatDate, useAppSelector } from "../hooks/hooks"


export const 
Home = () => {
    const user = useAppSelector((state) => state.user.content);

    return (
        <>
            <h1>Hi ${user?.username}</h1>
            <h1>Hi ${user?.email}</h1>
            <h1>Hi ${user?.surname}</h1>
            <h1>Hi ${user?.name}</h1>
            <h1>Hi ${user?.registration_date ? formatDate(user?.registration_date) : ""}</h1>
            {/* <h1>Hi ${user?.accessToken}</h1> */}
        </>
    )
}