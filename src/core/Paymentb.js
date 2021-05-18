import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import { cartEmpty, loadCart } from './helper/cardHelper';
import { getMeToken, processPayment } from './helper/paymentbhelper';
import {createOrder} from './helper/orderHelper'
import { isAuthenticated } from '../auth/helper';
import DropIn from 'braintree-web-drop-in-react'

const Paymentb = ({products, setreload = f => f, reload=undefined}) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance:{}
    });

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token

    const getToken = (userId, token)=>{
        getMeToken(userId, token).then(info=>{
            if(info.error){
                setInfo({...info, error:info.error})
            }else{
                const clientToken = info.clientToken
                setInfo({clientToken});
            }
        })
    }

    const showbtdropIn = () => {
        return (
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn options={{authorization: info.clientToken}}
                        onInstance={instance=>(info.instance=instance)}/>
                        <button className="btn btn-outline-success col-12" onClick={onPurchase}>Buy</button>
                    </div>
                ):(
                    <h3>Please log in or add something to cart</h3>
                )}
            </div>
        )
    }

    const onPurchase = ()=>{
        setInfo({...info, loading:true})
        let nonce=null;
        console.log(info)
        let getNonce = info?.instance?.requestPaymentMethod()
        .then(data=>{
            nonce=data?.nonce
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()
            };
            processPayment(userId, token, paymentData)
            .then(response=>{
                setInfo({...info, success:response?.success, loading:false})
                console.log("PAYMENT SUCCESS")
                const orderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount
                }
                createOrder(userId, token, orderData)
                cartEmpty(()=>{
                    console.log("Did we get a crash?")
                    setreload(!reload)
                })
            })
            .catch(err=>{
                setInfo({loading:false, success:false})
                console.log("PAYMENT FAILED")
            })
        })
    }

    const getAmount = () =>{
        let amount = 0;
        products.map(p => {
            amount=amount+p.price
        })
        return amount;
    }

    useEffect(() => {
        getToken(userId, token)
    }, [])
    return (
        <div>
            <h3>Your bill is Rs.{getAmount()}</h3>
            {showbtdropIn()}
        </div>
    )
}

export default Paymentb;