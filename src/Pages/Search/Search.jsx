import React from 'react'
import StockChart from '../../Components/StockChart/StockChart'
import { StockDataProvider } from '../../Components/StockDataContext'
import './Search.scss'


const Search = () => {
  return (
    <StockDataProvider>
        <StockChart />
    </StockDataProvider>
  )
}

export default Search