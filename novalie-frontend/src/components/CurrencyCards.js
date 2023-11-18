import React from 'react';
import Card from './Card';

const CurrencyCards = (props) => {
    const { formatNumber } = props;
    return (
        <div className='card-box'>
            <Card formatNumber={formatNumber} title={"Pesos"} currency={"mxn"}/>
            <Card formatNumber={formatNumber} title={"Dólares"} currency={"usd"}/>
            <Card formatNumber={formatNumber} title={"Euros"} currency={"eur"}/>
        </div>
    );
};

export default CurrencyCards;