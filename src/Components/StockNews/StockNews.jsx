import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { StockDataContext } from '../StockDataContext';
import getTop6RelevantTitles from './StockNewsFormatted';
import './StockNews.scss';

const StockNews = () => {
    const { ticker } = useContext(StockDataContext);
    const [newsData, setNewsData] = useState([]);

    const fetchStockNews = async (symbol) => {
        try {
            const response = await axios.get(`http://localhost:3000/news/${symbol}`);
            console.log('Fetched news data:', response.data);
            return response.data.feed || [];
        } catch (error) {
            console.error('Error fetching news data:', error);
            return [];
        }
    };

    useEffect(() => {
        fetchStockNews(ticker)
            .then(data => {
                console.log('Processed news data:', data);
                setNewsData(getTop6RelevantTitles(data, ticker));
            })
            .catch(error => console.error('Error fetching news data:', error));
    }, [ticker]);

    
    return (
      <div className="thecontainer">
        <h2 className="news-header">Stock News:</h2>
        <div className="row g-0">
          {newsData && newsData.length > 0 ? (
            newsData.map((newsItem, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card-container">
                  <div className="card card-custom mb-4">
                    <div className="card-front">
                      {newsItem.banner_image && (
                        <img src={newsItem.banner_image} className="card-img" alt="News banner" />
                      )}
                      <div className="card-body front">
                        <h6 className="news-title">
                          <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                            {newsItem.title}
                          </a>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-md-12">
              <p>No news available</p>
            </div>
          )}
        </div>
      </div>
    );
  };
    
    export default StockNews;