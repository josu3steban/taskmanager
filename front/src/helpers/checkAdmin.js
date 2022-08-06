import { useSelector } from "react-redux"



export const checkAdmin = () => {

    const { uid } = useSelector( state => state.auth );
    const { project } = useSelector( state => state.project );

    return uid === project?.creator._id;
    
}