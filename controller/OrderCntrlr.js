const { Order } = require("../model/orderSchema")

exports.createOrder = async(req, res)=>{

    const newOrder = new Order(req.body)

    try {
        
        const orderCreated = await newOrder.save();

        res.status(200).json(orderCreated);

    } catch (error) {
        res.status(400).json({err:error, msg:"order not placed"})
    }
}



exports.fetchOrderByUser = async (req, res) => {

    const { id } = req.user;

    try {
        const ordersPlaced = await Order.find({ user: id }).populate('user').populate('product') // (populate) method gives the whole object of the given refernce id //
        res.status(200).json(ordersPlaced);
    } catch (error) {
        res.status(400).json(error);
    }
}

exports.updateOrder= async(req,res)=>{
    const {id} = req.params;
    
  
    try {
      const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {new: true}).populate('product');
      res.status(200).json(updatedOrder);
  
  } catch (error) {
      res.status(400).json(error);
  }
  
  }

  exports.deleteOrder= async(req,res)=>{
    const {id} = req.params;
    
  
    try {
      const deletedOrder = await Order.findByIdAndDelete(id, req.body, {new: true});
      res.status(200).json(deletedOrder);
  
  } catch (error) {
      res.status(400).json(error);
  }
  
  }