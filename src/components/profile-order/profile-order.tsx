import OrdersList from "../orders-list/orders-list";
import { FC, useEffect } from "react";
import { WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_CLOSED } from "../../services/actions/ws-action";
import { useDispatch, useSelector } from "../../types/hooks";
import Loader from "../UI/loader/loader";
type TOrder = {
    path: string
}
const ProfileOrder:FC<TOrder> = ({path}) => {
    const dispatch = useDispatch()
    const wsAuthOrders = useSelector((store) => store.wsAuth.orders)
    useEffect(() => {
        dispatch({type: WS_AUTH_CONNECTION_START})
        return () => dispatch({type: WS_AUTH_CONNECTION_CLOSED})
    }, [dispatch])

    return (
        <>
        {!wsAuthOrders ? <Loader/> :
        <OrdersList path={path} dataOrder={wsAuthOrders}/>
        }
        </>
    )
};

export default ProfileOrder
