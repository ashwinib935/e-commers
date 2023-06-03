import React, { useState, useContext } from "react";
import "./Checkout.css";
import { CartContext } from "../../context/CartContextProvider";
import { useAddress } from "../../context/AddressContextProvider";
import { useNavigate } from "react-router-dom";
import AddressForm from "../../components/Address/AddressForm";
import DisplayAddress from "../../components/Address/DisplayAddress";
import { toast } from "react-toastify";
function Checkout() {
  const {
    cart,
    totalOnNewPrice,
    totalOnOldPrice,
    discount,
    setCart,
    handlecheckoutCart,
  } = useContext(CartContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleNewAddressClick = () => {
    setIsFormOpen((isFormOpen) => !isFormOpen);
  };
  const { newAddress, selected, setSelected } = useAddress();
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    if (newAddress.length > 0 && selected) {
      toast.success("Order Place Successful!!");
      handlecheckoutCart(cart);
      navigate("/");
    } else {
      toast.info("Please select address for delivery!");
    }
  };

  return (
    <div className="checkout-main-container">
      <div className="checkout-container">
        <h3>Checkout</h3>
        <div className="address-and-orderdetails">
          <div className="address-details-container">
            <h2>Address Details</h2>
            {isFormOpen && (
              <AddressForm
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
              />
            )}
            {newAddress &&
              newAddress.length > 0 &&
              newAddress.map((addresses, index) => (
                <DisplayAddress
                  addresses={addresses}
                  key={index}
                  isFormOpen={isFormOpen}
                  setIsFormOpen={setIsFormOpen}
                />
              ))}
            <button className="btn-add-address" onClick={handleNewAddressClick}>
              Add New Address
            </button>
          </div>
          <div className="order-details-container">
            <h2>Order Summary</h2>
            <div className="checkout-details">
              <h4 className="text-center border-header">ORDER DETAILS</h4>
              <div>
                <li>
                  <ul className="order-header">
                    <p>Item</p>
                    <p>Qty</p>
                  </ul>
                </li>
                <li>
                  {cart.map((item) => (
                    <ul key={item._id}>
                      <p>{item.name}</p>
                      <p>{item.qty}</p>
                    </ul>
                  ))}
                </li>
              </div>
              <h4 className="text-center border-header">PRICE DETAILS</h4>
              <div className="checkout-calculate">
                <li>
                  <ul>
                    <p>Price ({cart.length})</p>
                    <p>₹ {totalOnOldPrice}</p>
                  </ul>
                  <ul>
                    <p>Discount</p>
                    <p>-₹ {discount}</p>
                  </ul>
                  <ul>
                    <p>Delivery Charges</p>
                    <p>FREE</p>
                  </ul>
                </li>
              </div>
              <ul>
                <h4>Total Amount</h4>
                <h4>₹ {totalOnNewPrice}</h4>
              </ul>
              {/* <h4 className="text-center border-header">DELIVER TO</h4>
              <div className="deliver-container ">
                <div>
                  <p className="paragraph-md ">Rutvik Umak</p>
                  <p className="paragraph-sm">
                    #1/4 , 100ft Ring Road, Karve Nagar, Bangalore , Maharashtra
                    ,India. 452412
                  </p>
                  <p className="paragraph-sm">Phone Number : 123456789</p>
                </div>
              </div> */}
              <div className="primary-btn text-center">
                <button
                  className="link-btn checkout-btn"
                  fdprocessedid="ucn5ya"
                  onClick={handleCheckoutClick}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
