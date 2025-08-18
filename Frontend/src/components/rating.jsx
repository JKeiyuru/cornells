// components/rating.jsx
import StarRating from "react-star-ratings";

export const showAverage = (p) => {
  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    
    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    let highest = length * 5;
    let result = (totalReduced * 5) / highest;
    
    return (
      <div className="flex items-center justify-center space-x-3 my-3">
        <div className="flex items-center space-x-2">
          <StarRating
            starSpacing="1px"
            starRatedColor="#F59E0B"
            starEmptyColor="#374151"
            starHoverColor="#FBBF24"
            starDimension="16px"
            rating={result}
            editing={false}
            numberOfStars={5}
          />
          <span className="text-white/60 text-sm font-light">
            ({length} {length === 1 ? 'review' : 'reviews'})
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <span className="text-amber-400 text-sm font-medium">
            {result.toFixed(1)}
          </span>
          <div className="w-1 h-1 bg-amber-400/60 rounded-full"></div>
          <span className="text-white/40 text-xs">
            5.0
          </span>
        </div>
      </div>
    );
  }
};