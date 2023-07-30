const { Cart } = require('../model/cartSchema');

exports.fetchCartByUser = async (req, res) => {

    const { user } = req.query;

    try {
        const cartItems = await Cart.find({ user: user }).populate('user').populate('product'); // (populate) method gives the whole object of the given refernce id //
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(400).json(error);
    }
}

// Creating the cart //
exports.createCart = async (req, res) => {
    const cart = new Cart(req.body)

    try {
        const savedcart = await cart.save();
        const result = await savedcart.populate('product')
        res.status(201).json(result);

    } catch (error) {
        res.status(401).json(error);
    }

}

exports.updateCart= async(req,res)=>{
    const {id} = req.params;
    
  
    try {
      const updatedCart = await Cart.findByIdAndUpdate(id, req.body, {new: true}).populate('product');
      res.status(200).json(updatedCart);
  
  } catch (error) {
      res.status(400).json(error);
  }
  
  }

  exports.deleteFromCart= async(req,res)=>{
    const {id} = req.params;
    
  
    try {
      const deleteItem = await Cart.findByIdAndDelete(id, req.body, {new: true});
      res.status(200).json(deleteItem);
  
  } catch (error) {
      res.status(400).json(error);
  }
  
  }