import React, { useContext } from 'react';
import { StockDataContext } from '../StockDataContext';
import './StockCard.scss'

const StockCard = () => {  
    
    const { stockData, ticker, errorMessage } = useContext(StockDataContext);

    const get52Week_HighLow = () => {
        if (!Array.isArray(stockData)) {
            console.error('Invalid data: stockData should be an array.');
            return [null, null];
        }
    
        if (stockData.length === 0) {
            console.warn('Warning: stockData array is empty.');
            return [null, null];
        }
    
        // Get the date one year ago from today
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
        // Filter stockData to include only entries from the past year
        const recentData = stockData.filter(data => {
            const dataDate = new Date(data.datetime); // Assuming data.datetime is a valid date string
            return dataDate >= oneYearAgo;
        });
    
        // Extract and validate high values
        const highs = recentData.map(data => {
            const highValue = parseFloat(data.high);
            if (isNaN(highValue)) {
                console.error(`Invalid value for high: ${data.high}`);
                return null;
            }
            return highValue;
        }).filter(value => value !== null);
    
        // Extract and validate low values
        const lows = recentData.map(data => {
            const lowValue = parseFloat(data.low);
            if (isNaN(lowValue)) {
                console.error(`Invalid value for low: ${data.low}`);
                return null;
            }
            return lowValue;
        }).filter(value => value !== null);
    
        // Calculate maxHigh and minLow
        const maxHigh = highs.length > 0 ? Math.max(...highs).toFixed(2) : null;
        const minLow = lows.length > 0 ? Math.min(...lows).toFixed(2) : null;
    
        return [maxHigh, minLow];
    };

    const yearlyReturn = (time) => {
        let recentData; 

        if(time == '1year'){
            const oneYearAgo = new Date();
            oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
            // Filter stockData to include only entries from the past year
            recentData = stockData.filter(data => {
            const dataDate = new Date(data.datetime); // Assuming data.datetime is a valid date string
            return dataDate >= oneYearAgo;
        });
        }
        //Check 3 Years
        else if(time == '3years'){
            const threeYearAgo = new Date();
            threeYearAgo.setFullYear(threeYearAgo.getFullYear() - 3);
    
            // Filter stockData to include only entries from the past year
            recentData = stockData.filter(data => {
            const dataDate = new Date(data.datetime); // Assuming data.datetime is a valid date string
            return dataDate >= threeYearAgo;
        });
        }
        //Check 5 Years
        else if(time == '5years'){
            const fiveYearAgo = new Date();
            fiveYearAgo.setFullYear(fiveYearAgo.getFullYear() - 5);
    
            // Filter stockData to include only entries from the past year
            recentData = stockData.filter(data => {
            const dataDate = new Date(data.datetime); // Assuming data.datetime is a valid date string
            return dataDate >= fiveYearAgo;
        });
        }

        const curr_price = parseFloat(stockData[0].close);
        const start_price = parseFloat(recentData[recentData.length-1].close);
        console.log(curr_price, start_price);
        if (isNaN(curr_price) || isNaN(start_price)) {
            console.error('Invalid value for price.');
            return null;
        }
        let sign = curr_price > start_price ? '+' : '';

        if(sign == '+'){
            return <span style={{color:'green'}}>{sign + (((curr_price - start_price) / start_price) * 100).toFixed(2) + '%'}</span>;
        }
        else{
            return <span style={{color:'red'}}>{sign + (((curr_price - start_price) / start_price) * 100).toFixed(2) + '%'}</span>;
        }
    };
    

    const renderStockCard = () => {
        if (errorMessage !==  '') {
            return <p style={{color:'red'}}>{errorMessage}</p>;
        }

        let stockValues = get52Week_HighLow();

        return(
            <div className='card card-style'>
                <div className="card-body">
                    <h5 className="card-title">{ticker}</h5>
                    <p className="card-text-middle">Current Price: {parseFloat(stockData[0].close).toFixed(2)}</p>
                    <div className="row">
                        <div className="col-6">
                            <p className="card-text-left">1 year return: {yearlyReturn('1year')}</p>
                            <p className="card-text-left">3 year return: {yearlyReturn('3years')}</p>
                            <p className="card-text-left">5 year return: {yearlyReturn('5years')}</p>
                        </div>
                        <div className="col-6">
                            <p className="card-text-right">52 Week High: {stockValues[0]}</p>
                            <p className="card-text-right">52 Week Low: {stockValues[1]}</p>
                            <p className="card-text-right">Volume: {parseFloat(stockData[0].volume)}</p>
                        </div>
                    </div>
                    <span className='disclaimer'>*Yearly returns differ from each broker!</span>
                </div>
            </div>
        );
    }; 


  return (
    <div className='container'>{renderStockCard()}</div>
  )
}

export default StockCard