import { ObjectId } from "mongodb";

class User {
  static validate({ name, email, image }) {
    const data = {
      name: typeof name === "string" ? name.trim() : name,
      email: typeof email === "string" ? email.trim() : email,
      image: typeof image === "string" ? image.trim() : image,
    };

    if (typeof data.name !== "string") {
      throw new TypeError("name must be a string");
    }
    if (data.name.length === 0) {
      throw new TypeError("name string must be one or above words");
    }

    if (typeof data.email !== "string" || !data.email) {
      throw new TypeError("email must be a string");
    }
    if (typeof data.image !== "string" || !data.image) {
      throw new TypeError("image must be a string");
    }

    return data;
  }

  constructor({ name, email, image }) {
    const validData = User.validate({
      name,
      email,
      image,
    });
    Object.assign(this, {
      ...validData,
      lovedReviews: [],
      createdAt: new Date().toISOString(),
    });
  }
  addLovedReviews(reviews) {
    if (!(reviews instanceof ObjectId)) {
      throw new TypeError("reviews must be a valid MongoDB ObjectId");
    }
    if (!this.lovedReviews.find((u) => u.equals(reviews))) {
      this.lovedReviews.push(reviews);
    }
  }

  removeLovedReviews(lovedReviews) {
    if (!(lovedReviews instanceof ObjectId)) {
      throw new TypeError("favorite user must be a valid MongoDB ObjectId");
    }
    this.lovedReviews = this.lovedReviews.filter((u) => !u.equals(reviews));
  }
}

export default User;

// console.log(
//   new User({
//     name: "dd",
//     email: "example@domain",
//     image: "Hello mao",
//   })
// );
