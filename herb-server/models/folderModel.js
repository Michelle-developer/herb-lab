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
      enum: ['user', 'default'],
      default: 'user',
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Herb',
      },
    ],
  },
  { timestamps: true }
);

const Folder = mongoose.model('Folder', folderSchema);
module.exports = Folder;
