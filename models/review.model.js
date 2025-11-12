class Review {
  constructor(
    user,
    foodName,
    image,
    category,
    ratings,
    restaurantName,
    location,
    reviewText
  ) {
    this.user = user;
    this.foodName = foodName;
    this.image = image;
    this.category = category;
    this.ratings = ratings;
    this.restaurantName = restaurantName;
    this.location = location;
    this.reviewText = reviewText;
  }
}

export default Review;
