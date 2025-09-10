// components/rating.jsx - Star rating display component
import { FaStar } from "react-icons/fa";

// Display average rating as stars
export const showAverage = (product) => {
  if (!product.ratings || product.ratings.length === 0) {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="text-sm text-gray-500 ml-2">No reviews</span>
      </div>
    );
  }
  
  const average = product.ratings.reduce((sum, rating) => sum + rating.star, 0) / product.ratings.length;
  const roundedAverage = Math.round(average * 2) / 2; // Round to nearest 0.5
  
  return (
    <div className="flex items-center space-x-1">
      <div className="flex items-center space-x-0.5">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={`w-3 h-3 ${
              i < Math.floor(average) ? 'text-yellow-400' : 'text-gray-300'
            }`} 
          />
        ))}
      </div>
      <span className="text-xs font-medium text-gray-600">{average.toFixed(1)}</span>
      {showCount && (
        <span className="text-xs text-gray-400">({product.ratings.length})</span>
      )}
    </div>
  );
};

// Rating distribution component for detailed product view
export const RatingDistribution = ({ ratings }) => {
  if (!ratings || ratings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No ratings yet</p>
      </div>
    );
  }

  // Calculate distribution
  const distribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: ratings.filter(rating => rating.star === star).length,
    percentage: (ratings.filter(rating => rating.star === star).length / ratings.length) * 100
  }));

  const average = ratings.reduce((sum, rating) => sum + rating.star, 0) / ratings.length;

  return (
    <div className="space-y-4">
      {/* Overall Rating */}
      <div className="text-center pb-6 border-b border-gray-200">
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {average.toFixed(1)}
        </div>
        <div className="flex items-center justify-center mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              className={`w-5 h-5 ${
                i < Math.floor(average) ? 'text-yellow-400' : 'text-gray-300'
              }`} 
            />
          ))}
        </div>
        <p className="text-gray-600">
          Based on {ratings.length} review{ratings.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Distribution Bars */}
      <div className="space-y-2">
        {distribution.map(({ star, count, percentage }) => (
          <div key={star} className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 w-16">
              <span className="text-sm text-gray-600">{star}</span>
              <FaStar className="w-3 h-3 text-yellow-400" />
            </div>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 w-10">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default {
  showAverage,
  StarRating,
  CompactRating,
  RatingDistribution
};center space-x-1">
      {[...Array(5)].map((_, i) => {
        const filled = i + 1 <= Math.floor(roundedAverage);
        const halfFilled = i + 1 === Math.ceil(roundedAverage) && roundedAverage % 1 !== 0;
        
        return (
          <div key={i} className="relative">
            <FaStar className="w-4 h-4 text-gray-300" />
            {filled && (
              <FaStar className="w-4 h-4 text-yellow-400 absolute inset-0" />
            )}
            {halfFilled && (
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <FaStar className="w-4 h-4 text-yellow-400" />
              </div>
            )}
          </div>
        );
      })}
      <span className="text-sm text-gray-600 ml-2 font-medium">
        {average.toFixed(1)} ({product.ratings.length} review{product.ratings.length !== 1 ? 's' : ''})
      </span>
    </div>
  );
};

// Interactive star rating component for reviews
export const StarRating = ({ rating, setRating, size = "w-6 h-6", readonly = false }) => {
  const handleStarClick = (starValue) => {
    if (!readonly && setRating) {
      setRating(starValue);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => handleStarClick(i + 1)}
          disabled={readonly}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'} transition-transform duration-200`}
        >
          <FaStar 
            className={`${size} ${
              i + 1 <= rating 
                ? 'text-yellow-400' 
                : 'text-gray-300 hover:text-yellow-200'
            } transition-colors duration-200`} 
          />
        </button>
      ))}
      {!readonly && (
        <span className="text-sm text-gray-600 ml-2">
          {rating > 0 ? `${rating} star${rating !== 1 ? 's' : ''}` : 'Rate this product'}
        </span>
      )}
    </div>
  );
};

// Compact rating display for product cards
export const CompactRating = ({ product, showCount = true }) => {
  if (!product.ratings || product.ratings.length === 0) {
    return (
      <div className="flex items-center space-x-1">
        <div className="flex items-center space-x-0.5">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="w-3 h-3 text-gray-300" />
          ))}
        </div>
        {showCount && <span className="text-xs text-gray-400">(0)</span>}
      </div>
    );
  }
  
  const average = product.ratings.reduce((sum, rating) => sum + rating.star, 0) / product.ratings.length;
  
  return (
    <div className="flex items-