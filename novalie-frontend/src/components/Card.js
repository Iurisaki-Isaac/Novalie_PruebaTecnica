import React, { useState, useEffect } from 'react';
import { FcApproval, FcHighPriority } from "react-icons/fc";

const Card = (props) => {
    const { title, currency, formatNumber } = props;
    const [paymentValue, setPaymentValue] = useState(null);    

    const getPaymentsData = async (currency) => {
        try {
            const response = await fetch(`http://localhost:3001/pending-payments?currency=${currency}`);
            const data = await response.json();

            if (response.ok) {
                return data.value;
            } else {
                console.error(`Error: ${data.error}`);
                return null;
            }
        } catch (error) {
            console.error(`Error: ${error}`);
            return null;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            const value = await getPaymentsData(currency);
            setPaymentValue(value);
        };

        fetchData();
    }, [currency]);

    return (
        <div className='card'>
            <h2>{title}</h2>
            <span className='total-payment'>{`${formatNumber(paymentValue)}`}</span>
            <div className='percentage-row'>
                <div className='percentage green'>
                    <div className='info-label'>                        
                        <FcApproval className='info-icon' />
                        <span>70%</span>
                    </div>
                    <span>{`${formatNumber(paymentValue*0.70)}`}</span>
                </div>
                <div className='percentage red'>
                    <div className='info-label'>
                        <FcHighPriority className='info-icon' />
                        <span>30%</span>
                    </div>
                    <span>{`${formatNumber(paymentValue*0.30)}`}</span>
                </div>
            </div>
        </div>
    );
};

export default Card;
