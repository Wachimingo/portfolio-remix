
const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El platillo tiene que tener un nombre'],
      unique: [true, 'El platillo ya existe'],
    },
    price: {
      type: Number,
      required: [true, 'El platillo tiene que tener un precio'],
    },
    ingredients: {},
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: 'stockDishImg.png'
    },
    favoriteQuantity: {
      type: Number,
      default: 0
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    forToday: {
      type: Boolean,
      default: true,
      require: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category'
    },
    externalId: {
      type: String
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate
dishSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'dish',
  localField: '_id',
});

// Virtual populate
dishSchema.virtual('favoriteDish', {
  ref: 'FavoriteDish',
  foreignField: 'dish',
  localField: '_id',
});

export default mongoose.models.Dish || mongoose.model('Dish', dishSchema);

