import { ObjectId } from "mongodb";

class Comment {
  static validate({ user, review, like, dislike, comment }) {
    if (!(user instanceof ObjectId)) {
      throw new TypeError("user must be a valid MongoDB ObjectId");
    }
    if (!(review instanceof ObjectId)) {
      throw new TypeError("review must be a valid MongoDB ObjectId");
    }
    if (typeof like !== "number") {
      throw new TypeError("like must be a number");
    }
    if (typeof dislike !== "number") {
      throw new TypeError("dislike must be a number");
    }
    if (typeof comment !== "string") {
      throw new TypeError("comment must be a string");
    }

    return { user, review, like, dislike, comment };
  }

  constructor({ user, review, like, dislike, comment }) {
    
    const validData = Comment.validate({
      user,
      review,
      like,
      dislike,
      comment,
    });
    Object.assign(this, {
      ...validData,
      createdAt: new Date().toISOString(),
    });
  }
}

export default Comment;

// console.log(
//   new Comment({
//     user: new ObjectId("67e12159b08d6a9c0b597c10"),
//     review: new ObjectId("67e12159b08d6a9c0b597c10"),
//     like: 12,
//     dislike: 10,
//     comment: "Hello mao",
//   })
// );
