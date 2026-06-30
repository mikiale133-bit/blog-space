import React from "react";
import { ShoppingBag, Clock, Eye, Star, TrendingUp, ChevronRight, Heart } from "lucide-react";

const BestSelling = () => {
  // Best Sellers Products Data
  const bestSellers = [
    {
      id: 1,
      name: "iPhone 30 Pro Max",
      price: "$1,299",
      oldPrice: "$1,499",
      rating: 4.8,
      reviews: 234,
      image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=400&h=400&fit=crop",
      tag: "Best Seller",
    },
    {
      id: 2,
      name: "MacBook Pro M5",
      price: "$2,499",
      oldPrice: "$2,799",
      rating: 4.9,
      reviews: 189,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      tag: "Top Rated",
    },
    {
      id: 3,
      name: "Apple Watch Ultra 3",
      price: "$799",
      oldPrice: "$899",
      rating: 4.7,
      reviews: 456,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
      tag: "Trending",
    },
    {
      id: 4,
      name: "AirPods Pro 3",
      price: "$249",
      oldPrice: "$299",
      rating: 4.6,
      reviews: 892,
      image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop",
      tag: "Hot Deal",
    },
    {
      id: 5,
      name: "iPad Pro 2025",
      price: "$1,099",
      oldPrice: "$1,299",
      rating: 4.8,
      reviews: 567,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
      tag: "Best Seller",
    },
    {
      id: 6,
      name: "Samsung Galaxy S25",
      price: "$1,199",
      oldPrice: "$1,399",
      rating: 4.7,
      reviews: 345,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
      tag: "New",
    },
  ];

  // Browse History Items - exact structure as screenshot
  const browseHistory = [
    "iPhone 30 pro max",
    "iPhone 30 pro max",
    "iPhone 30 pro max",
    "iPhone 30 pro max",
    "iPhone 30 pro max",
    "iPhone 30 pro max",
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="prose">
        <p>First</p>
        <p>Second</p>
      </div>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">ShopHub</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden sm:block text-gray-600 hover:text-gray-900">My Orders</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Sign In</button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Best Sellers Section */}
        <div className="mb-12">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-8 h-8 text-red-500" />
                Best Sellers
              </h2>
              <p className="text-gray-500 mt-1">Most popular products this week</p>
            </div>
            <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium">
              View All
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Product Grid - Improved Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Image Container */}
                <div className="relative bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Tag Badge */}
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
                    {product.tag}
                  </span>
                  {/* Wishlist Button */}
                  <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-white shadow-md">
                    <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                  </button>
                  {/* Discount Badge */}
                  {product.oldPrice && (
                    <span className="absolute bottom-3 left-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">
                      Save {Math.round((1 - parseFloat(product.price.replace("$", "")) / parseFloat(product.oldPrice.replace("$", ""))) * 100)}%
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">({product.reviews})</span>
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                    <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium">
                    <ShoppingBag className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Your Browse History Section - EXACT structure from screenshot */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Your Browse History</h2>
          </div>

          {/* History Items - Stacked rows exactly like screenshot */}
          <div className="divide-y divide-gray-100">
            {browseHistory.map((item, index) => (
              <div key={index} className="px-6 py-3 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between">
                <span className="text-gray-700">{item}</span>
                <Eye className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Cosmetics Banner - from screenshot */}
        <div className="mt-6 bg-pink-50 rounded-lg p-4 flex justify-between items-center">
          <span className="text-gray-700 font-medium">Cosmetics</span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default BestSelling;
