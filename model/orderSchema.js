const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    product:{
        type:[Schema.Types.Mixed]
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    totalAmount:{
        type:Number,
        required: true
    }, 
    totalQuantity:{
        type:Number,
        required: true
    }, 
    paymentMethod:{
        type:String,
        required:true
    }, 
    selectedAddress:{
        type:[Schema.Types.Mixed]
    }

});

const virtual = orderSchema.virtual('id');

virtual.get(function(){
    return this._id;
})

orderSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) { delete ret._id}
});

 exports.Order = mongoose.model('Order', orderSchema);
