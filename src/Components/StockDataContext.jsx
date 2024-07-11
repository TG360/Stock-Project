import React, { createContext, useState } from 'react';

export const StockDataContext = createContext();

export const StockDataProvider = ({ children }) => {
    const [stockData, setStockData] = useState([]);
    const [ticker, setTicker] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    return (
        <StockDataContext.Provider value={{ stockData, setStockData, ticker, setTicker, errorMessage, setErrorMessage }}>
            {children}
        </StockDataContext.Provider>
    );
};
