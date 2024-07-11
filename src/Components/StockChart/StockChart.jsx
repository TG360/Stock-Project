import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { StockDataContext } from '../StockDataContext';
import StockCard from '../StockCard/StockCard';
import TradingViewChart from '../TradingViewChart/TradingViewChart';
import StockNews from '../StockNews/StockNews';
import './StockChart.scss';
import StockSearch from '../StockSearch/StockSearch';


function StockChart() {
    const { setStockData, ticker, setTicker, errorMessage, setErrorMessage } = useContext(StockDataContext);
    const [inputTicker, setInputTicker] = useState('');
    const [formSubmitted, setFormSubmitted] = useState(false);
    // redux

    const fetchStockData = async (symbol) => {
        try {
            const response = await axios.get(`http://localhost:3000/stock/${symbol}`);
            console.log('Fetched data:', response.data);
            if(response.data.status === 'error') {
                setErrorMessage("Invalid ticker symbol, please try again.");
                return [];
            }
            setErrorMessage(''); // Clear any previous error messages
            return response.data.values || [];
        } catch (error) {
            console.error('Error fetching stock data:', error);
            setErrorMessage('Error fetching stock data. Please try again.');
            return [];
        }
    };

    useEffect(() => {
        if (ticker) {
            fetchStockData(ticker)
                .then(data => {
                    console.log('Processed data:', data);
                    setStockData(data);
                    setFormSubmitted(true);
                })
                .catch(error => console.error('Error fetching stock data:', error));
        }
    }, [ticker]);

    const handleInputChange = (event) => {
        setInputTicker(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setTicker(inputTicker.toUpperCase());
    };

    

    return (
        <div className='container'>
        <StockSearch query={inputTicker} onInputChange={handleInputChange} onSubmit={handleSubmit} />
        {formSubmitted && <StockCard />}
        {errorMessage === '' && formSubmitted && <TradingViewChart />}
        {errorMessage === '' && formSubmitted && <StockNews />}
      </div>
    );
}

export default StockChart;
