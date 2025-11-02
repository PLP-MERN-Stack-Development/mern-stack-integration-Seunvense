const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide category name"],
      trim: true,
      unique: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      maxlength: [200, "Description cannot exceed 200 characters"],
    },
  },
  { timestamps: true }
);

// Auto-generate slug
CategorySchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();
  this.slug = this.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  next();
});

module.exports = mongoose.model("Category", CategorySchema);
