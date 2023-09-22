import { useDispatch, useSelector } from "react-redux";
import Order from "../../pages/order";
import OrdersList from "../orders-list/orders-list";
import { useEffect } from "react";
import { WS_AUTH_CONNECTION_START, WS_AUTH_CONNECTION_CLOSED } from "../../services/actions/ws-action";

const ProfileOrder = ({path}) => {
    const dispatch = useDispatch()
    const wsAuthOrders = useSelector((store) => store.wsAuth)
    useEffect(() => {
        dispatch({type: WS_AUTH_CONNECTION_START})
        return () => dispatch({type: WS_AUTH_CONNECTION_CLOSED})
    }, [dispatch])

    return (
        <OrdersList path={path} dataOrder={wsAuthOrders}/>
    )
};

export default ProfileOrder
