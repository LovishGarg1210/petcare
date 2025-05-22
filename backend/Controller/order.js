
const Stripe = require('stripe');
const stripe = Stripe('sk_test_51PIxspSIBLFcktov62qmDnejYKo37Pptmp8XdI5qpJ3cVWwTFHv7hSpY5dWPN5ROfJMUrLIIPcpXE2ZvB0eWCz0V00wJogjGrc');
const Order = require('../Model/order'); // Mongoose model for Order


const Payment = async (req, res) => {
    const { emailId, items, address } = req.body;

    try {
        // Create a Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: 'usd',  // Or the appropriate currency
                    product_data: {
                        name: item.productName,
                    },
                    unit_amount: item.productPrice * 100, // Stripe expects the price in cents
                },
                quantity: item.productQuantity,
            })),
            mode: 'payment',
            success_url: `https://petcare99.netlify.app/Order/Success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:5173/cancel`,
            customer_email: emailId,
            // Handle address collection
             // Add the countries you want to support
            
        });

        // Return session ID
        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session", error);
        res.status(500).send("Error creating checkout session");
    }
};
const Success = async (req, res) => {
    const sessionId = req.query.session_id;
  
    if (!sessionId) {
      return res.status(400).json({ success: false, message: "No session ID found." });
    }
  
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
      
      // Ensure the session contains the necessary information
      if (!session) {
        return res.status(400).json({ success: false, message: "Session not found." });
      }
  
      const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, { limit: 100 });
  
      const order = new Order({
        userEmail: session.customer_email,
        items: lineItems.data.map(item => ({
          productId: item.price.product,
          productName: item.description,
          productPrice: item.price.unit_amount / 100,  // Price in dollars
          productQuantity: item.quantity,
        })),
        totalAmount: session.amount_total / 100,  // Convert amount from cents to dollars
        paymentStatus: session.payment_status,
        stripePaymentIntentId: session.payment_intent,
      });
  
      await order.save();
  // Backend: Encoding items before sending
const serializedItems = encodeURIComponent(JSON.stringify(order.items)); // Stringify and encode
const successUrl = `https://petcare99.netlify.app/success?orderId=${order._id}&email=${session.customer_email}&totalAmount=${order.totalAmount}&items=${serializedItems}`;
res.redirect(successUrl);

      // Redirect to the success page with order details as URL parameters
     
  
    } catch (error) {
      console.error("Error retrieving session", error);
      res.status(500).json({ success: false, message: "Payment verification failed." });
    }
};

const fetchOrdersbyemail = async (req, res) => {
    const { email } = req.query; // Destructure email from the request body
    try {
        if (!email) {
            // If no email is provided, return an error message
            return res.status(400).json({ message: 'Email is required' });
        }

        // Fetch orders for the given email address
        const userOrders = await Order.find({ userEmail: email });

        if (!userOrders.length) {
            // If no orders are found for the given email, return a 404 error
            return res.status(404).json({ message: 'No orders found for this email' });
        }

        // If there are orders, return them in the response
        return res.status(200).json(userOrders);

    } catch (error) {
        console.error(error);
        // Return a server error if something goes wrong
        return res.status(500).json({ message: "Server error" });
    }
};
const fetchAllorders=async(req,res)=>{
  try{
    const response=await Order.find({});
    if(!response)
      res.status(404).json("no order found");
    res.status(201).json({message:"order found", data:response})
  }catch(error){
    res.status(500).json(error.message)
  }
};


module.exports = {
    Payment,
  fetchOrdersbyemail,
    Success,
    fetchAllorders
};
