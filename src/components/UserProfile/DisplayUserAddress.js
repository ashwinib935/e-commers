import React, { useState } from "react";

import { useAddress } from "../../context/AddressContextProvider";
import "./UserProfile.css";
import AddressForm from "../Address/AddressForm";
import DisplayAddress from "../Address/DisplayAddress";
function DisplayUserAddress() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleNewAddressClick = () => {
    setIsFormOpen((isFormOpen) => !isFormOpen);
  };
  const { newAddress } = useAddress();

  return (
    <div className="user-profile-address">
      <div className="address-details-container">
        <h2>Address Details</h2>
        {isFormOpen && (
          <AddressForm isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
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
    </div>
  );
}

export default DisplayUserAddress;
