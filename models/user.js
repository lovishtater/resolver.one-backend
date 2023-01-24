const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require("uuid").v1;

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    team : {
        type: String,
        default: 'none',
        enum: ['none', 'tech', 'business', 'ops', 'sales', 'finance']
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    salt: String,
}, {timestamps: true}); 

userSchema.virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.encryptedPassword = this.securePassword(password);
    })
    .get(function() {
        return this._password;
    }
);

userSchema.methods = {
    authenticate: function(plainText) {
        return this.securePassword(plainText) === this.encryptedPassword;
    },
    securePassword: function(plainText) {
        if (!plainText) return "";
        try {
            return crypto
                .createHmac('sha256', this.salt)
                .update(plainText)
                .digest('hex');
        } catch (err) {
            return "";
        }
    }
}

module.exports = mongoose.model("User", userSchema);

         
    
    
