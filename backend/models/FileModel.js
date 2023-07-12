const mongoose = require('mongoose');


const UserPermissionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    write: { type: Boolean, default: false },
    edit: { type: Boolean, default: false },
});

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  permissions: [UserPermissionSchema],
  URL: { type: String, required: true },
});

module.exports = mongoose.model('File', fileSchema);
