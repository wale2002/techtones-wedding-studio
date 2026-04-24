// // const mongoose = require('mongoose');
// // const slugify = require('slugify');

// // const EventSchema = new mongoose.Schema(
// //   {
// //     couple: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //     title: { type: String, required: true },
// //     slug: { type: String, unique: true },
// //     date: { type: Date, required: true },
// //     location: { type: String },
// //     description: { type: String },
// //     settings: {
// //       allowGuestMedia: { type: Boolean, default: true },
// //       isPublic: { type: Boolean, default: true },
// //     },
// //   },
// //   { timestamps: true }
// // );

// // EventSchema.pre('save', function (next) {
// //   if (!this.slug) {
// //     this.slug = slugify(this.title, { lower: true, strict: true });
// //   }
// //   next();
// // });

// // module.exports = mongoose.model('Event', EventSchema);

// const mongoose = require("mongoose");
// const slugify = require("slugify");

// const EventSchema = new mongoose.Schema(
//   {
//     couple: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     slug: {
//       type: String,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     date: {
//       type: Date,
//       required: true,
//     },
//     location: {
//       type: String,
//       trim: true,
//     },
//     description: {
//       type: String,
//       trim: true,
//     },
//     settings: {
//       allowGuestMedia: { type: Boolean, default: true },
//       isPublic: { type: Boolean, default: true },
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// // ✅ Correct pre-save hook (use regular function + next)
// EventSchema.pre("save", function (next) {
//   if (!this.slug && this.title) {
//     this.slug = slugify(this.title, {
//       lower: true,
//       strict: true,
//       trim: true,
//     });
//   }
//   next();
// });

// // ✅ Correct pre-findOneAndUpdate hook
// EventSchema.pre("findOneAndUpdate", function (next) {
//   const update = this.getUpdate();
//   if (update && update.title) {
//     update.slug = slugify(update.title, {
//       lower: true,
//       strict: true,
//       trim: true,
//     });
//   }
//   next();
// });

// module.exports = mongoose.model("Event", EventSchema);

const mongoose = require("mongoose");
const slugify = require("slugify");

const EventSchema = new mongoose.Schema(
  {
    couple: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    date: {
      type: Date,
      required: true,
    },

    location: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    settings: {
      allowGuestMedia: { type: Boolean, default: true },
      isPublic: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  },
);

/**
 * 🌍 AUTO-GENERATE SLUG ON CREATE
 * Public wedding URLs depend on this
 */
EventSchema.pre("save", function () {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
});

/**
 * ✏️ HANDLE SLUG UPDATE ON EVENT EDIT
 * Keeps URL consistent when title changes
 */
EventSchema.pre("findOneAndUpdate", function () {
  const update = this.getUpdate();

  if (update?.title) {
    const newSlug = slugify(update.title, {
      lower: true,
      strict: true,
      trim: true,
    });

    update.slug = newSlug;

    this.setUpdate(update);
  }
});

/**
 * 🔒 OPTIONAL: ensure slug uniqueness fallback
 * (prevents duplicate wedding URLs)
 */
EventSchema.pre("validate", async function () {
  if (!this.slug && this.title) {
    let baseSlug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true,
    });

    let slug = baseSlug;
    let count = 1;

    while (await mongoose.models.Event.findOne({ slug })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }

    this.slug = slug;
  }
});

module.exports = mongoose.model("Event", EventSchema);
