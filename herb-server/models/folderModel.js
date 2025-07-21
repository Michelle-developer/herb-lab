const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, '請提供資料夾名稱'],
    },
    source: {
      type: String,
      enum: ['user', 'system'],
      default: 'user',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    isProtected: {
      type: Boolean,
      default: false,
    },
    items: [
      {
        herbId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Herb',
          required: true,
        },
        isProtected: {
          type: Boolean,
          default: false,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

const Folder = mongoose.model('Folder', folderSchema);
module.exports = Folder;
