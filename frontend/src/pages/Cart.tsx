import { useEffect, useState } from "react";
import { VscError } from "react-icons/vsc";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

const cartItem = [
  {
    productId: "dfsre",
    photo: "https://m.media-amazon.com/images/I/71TPda7cwUL._SX679_.jpg",
    name: "Macbook",
    price: 4000,
    quantity: 4,
    stock: 102
  }
];
const subtotal = 4000;
const tax = Math.round(subtotal * 0.18);
const shippingCharges = 200;
const total = subtotal + tax + shippingCharges;
const discount = 400;

const Cart = () => {
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

  useEffect(() => {
    
    const timeOutID = setTimeout(()=>{
      if(Math.random() > 0.5) setIsValidCouponCode(true);
      else setIsValidCouponCode(false);
    },1000)
    return () => {
      clearTimeout(timeOutID);
      setIsValidCouponCode(false);
    }
  }, [couponCode])
  

  return (
    <div className="cart">
      <main>
        {
          cartItem.length > 0 ? (cartItem.map((i,index)=><CartItem key={index} cartItem={i} />)) : (<h1>No Items added</h1>)
        }
      </main>
      <aside>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Subtotal: ₹{subtotal}</p>
        <p>
          Discount: <em> - ₹{discount}</em>
        </p>
        <p>
          <b>Total: ₹{total}</b>
        </p>

        <input
          type="text"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {
          couponCode && (isValidCouponCode ? (
            <>
              <span className="green">
                ₹{discount} off using the <code>{couponCode}</code>
              </span>
            </>
          ) : (
            <>
              <span className="red">
                Invalid Coupon <VscError />
              </span>
            </>
          ))
        }

        {
          cartItem.length > 0 && <Link to="/shipping">Checkout</Link>
        }
      </aside>
    </div>
  );
};

export default Cart;
