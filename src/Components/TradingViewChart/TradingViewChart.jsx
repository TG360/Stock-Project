import React, { useEffect, useRef, useContext } from 'react';
import { createChart, CrosshairMode} from 'lightweight-charts';
import { StockDataContext } from '../StockDataContext';
import './TradingViewChart.scss';

const TradingViewChart = () => {
  const chartContainerRef = useRef();
  const { stockData } = useContext(StockDataContext);

  useEffect(() => {
    console.log('Container width:', chartContainerRef.current.clientWidth);
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        fontFamily: 'Poppins', // Font family of the chart
        background: { color : '#1a1a1a' }, // Background color of the chart
        textColor: '#DDD', // Text color for labels
      },  
      grid: {
        vertLines: {
          color: '#363c4e', // Color of vertical grid lines
        },
        horzLines: {
          color: '#363c4e', // Color of horizontal grid lines
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal, // Crosshair mode
      },
      timeScale: {
        borderColor: '#00bfff', // Border color of the time scale
      },
    });



    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#4caf50',
      downColor: '#f44336',
      borderUpColor: '#4caf50',
      borderDownColor: '#f44336',
      wickUpColor: '#4caf50',
      wickDownColor: '#f44336',
    });

    const volumeSeries = chart.addHistogramSeries({
        priceFormat: {
            type: 'volume',
        },
        priceScaleId: '', // set as an overlay by setting a blank priceScaleId
    });

    volumeSeries.priceScale().applyOptions({
        // set the positioning of the volume series
        scaleMargins: {
            top: 0.7, // highest point of the series will be 70% away from the top
            bottom: 0,
        },
    });

    volumeSeries.setData(stockData.map(item => ({
        time: new Date(item.datetime).getTime() / 1000, // Convert to UNIX timestamp
        value: parseFloat(item.volume),
        color: item.open > item.close ? '#f44336' : '#4caf50',
    }))
    .sort((a, b) => a.time - b.time));
    
    const transformedData = stockData
    .map(item => ({
      time: new Date(item.datetime).getTime() / 1000, // Convert to UNIX timestamp
      open: parseFloat(item.open),
      high: parseFloat(item.high),
      low: parseFloat(item.low),
      close: parseFloat(item.close)
    }))
    .sort((a, b) => a.time - b.time);

    console.log('Transformed data:', transformedData);

    candlestickSeries.setData(transformedData);

    chart.priceScale('right').applyOptions({
        borderColor: '#00bfff', // Border color of the price scale
        autoScale: false, // disables auto scaling based on visible content
        scaleMargins: {
            top: 0.1,
            bottom: 0.4,
        },
    });
    // Resize chart on window resize
    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth });
    };

    window.addEventListener('resize', handleResize);
    
    // Clean up chart and event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [stockData]);

  return (
    <div className='trading-view'>
      <div className='trading-view-box'>
        <div ref={chartContainerRef} className="trading-view-chart" />
        <div className="lw-attribution">
          <a href="https://tradingview.github.io/lightweight-charts/" target="_blank" rel="noopener noreferrer">Powered by Lightweight Charts™</a>
        </div>
      </div>
    </div>
  );
};

export default TradingViewChart;
