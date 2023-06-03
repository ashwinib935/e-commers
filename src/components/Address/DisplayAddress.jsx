import React from "react";
import { useAddress } from "../../context/AddressContextProvider";
import "./AddressForm.css";
function DisplayAddress({ addresses, setIsFormOpen }) {
  const {
    userDetails,
    setUserDetails,
    newAddress,
    setNewAddress,
    setSelected,
  } = useAddress();
  const { _id, name, address, number, landmark } = addresses;
  const handleEditClick = (addressId) => {
    setIsFormOpen((isFormOpen) => !isFormOpen);
    setUserDetails({ ...userDetails, name, address, number, landmark });
    setNewAddress(newAddress.filter(({ _id }) => _id !== addressId));
  };

  const handleDeleteClick = (addressId) => {
    newAddress.find((address) =>
      address._id === addressId ? setSelected(false) : address
    );
    setNewAddress(newAddress.filter(({ _id }) => _id !== addressId));
  };

  const handleChange = (event, addressId) => {
    if (event.target.checked) {
      const updatedAddressess = newAddress.map((newAdd) =>
        newAdd._id === addressId
          ? { ...newAdd, isChecked: !newAdd.isChecked }
          : { ...newAdd, isChecked: false }
      );
      setNewAddress(updatedAddressess);
      setSelected(true);
    } else {
      setSelected(false);
    }
  };
  const isAddressSelected = (newAddress, selectedAddressId) =>
    newAddress.some(
      ({ _id, isChecked }) => selectedAddressId === _id && isChecked === true
    );
  return (
    <div className="address-display-container">
      <div className="user-details">
        <input
          id={_id}
          type="radio"
          name="select"
          className="check-box"
          checked={isAddressSelected(newAddress, _id)}
          onChange={(event) => handleChange(event, _id)}
        />
        <span>Name - {name}</span>
        <span> | </span>
        <span>Ph No - +91 {number}</span>
      </div>
      <div className="address-details">
        <span>Address - {address}</span>
        <span>Landmaark - {landmark}</span>
      </div>
      <div className="update-btn-container">
        <button className="btn success" onClick={() => handleEditClick(_id)}>
          <span className="material-icons-outlined">Edit</span>
        </button>
        <button className="btn danger" onClick={() => handleDeleteClick(_id)}>
          <span className="material-icons-outlined">Delete</span>
        </button>
      </div>
    </div>
  );
}

export default DisplayAddress;
