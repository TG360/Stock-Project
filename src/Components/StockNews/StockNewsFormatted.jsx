export function getTop6RelevantTitles(data, ticker) {
    // Array to store all the relevant items for the specified ticker
    let relevantItems = [];

    // Loop through each item in the data
    data.forEach(item => {
        // Check if the item has ticker_sentiment data
        if (item.ticker_sentiment && item.ticker_sentiment.length > 0) {
            // Find the sentiment data for the specified ticker
            let tickerData = item.ticker_sentiment.find(t => t.ticker === ticker);

            // If found, push it to the relevantItems array along with the item's title and relevance score
            if (tickerData) {
                relevantItems.push({
                    ...item,
                    relevance_score: parseFloat(tickerData.relevance_score)
                });
            }
        }
    });

    // Sort the relevant items by relevance score in descending order
    relevantItems.sort((a, b) => b.relevance_score - a.relevance_score);

    // Get the top 6 items
    let top6Items = relevantItems.slice(0, 6);

    // Return the titles of the top 10 items
    return top6Items;
}

export default getTop6RelevantTitles;

