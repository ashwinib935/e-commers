import React, { useState } from "react";
import "./AddressForm.css";
import { useAddress } from "../../context/AddressContextProvider";
import { v4 as uuid } from "uuid";
function AddressForm({ setIsFormOpen }) {
  const { userDetails, setUserDetails, newAddress, setNewAddress } =
    useAddress();
  const { name, number, address, landmark } = userDetails;
  const [shouldShow, setShouldShow] = useState(true);

  const handleDummyAddress = () => {
    setUserDetails({
      ...userDetails,
      name: "Pratiksha Shinde",
      number: "9888856789",
      address: "A-68, Anna Nagar East, Anna Nagar East",
      landmark: "Bhavani Nagar",
      isChecked: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNewAddress([
      ...newAddress,
      {
        _id: uuid(),
        name,
        number,
        address,
        landmark,
        isChecked: false,
      },
    ]);

    setUserDetails({
      ...userDetails,
      name: "",
      number: "",
      address: "",
      landmark: "",
    });

    setIsFormOpen((isFormOpen) => !isFormOpen);
  };
  const handleCancel = () => {
    setShouldShow(false);
  };
  return (
    <div>
      {shouldShow && (
        <div className="modal">
          <form className="addressFormContainer" onSubmit={handleSubmit}>
            <label>
              Name
              <input
                className="text-input"
                required
                value={name}
                placeholder="Name"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
              />
            </label>
            <label>
              Contact No
              <input
                className="number-input"
                required
                type="text"
                value={number}
                pattern="[0-9]*"
                maxLength="10"
                placeholder="10 digit number"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, number: e.target.value })
                }
              />
            </label>
            <label>
              Address
              <textarea
                className="textarea-input"
                required
                value={address}
                placeholder="Address"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, address: e.target.value })
                }
              />
            </label>
            <label>
              Landmark
              <input
                className="text-input"
                value={landmark}
                placeholder="Landmark"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, landmark: e.target.value })
                }
              />
            </label>
            <div className="btn-actions">
              <button
                className="btn-address btn-secondary"
                onClick={handleDummyAddress}
              >
                Add Dummy Address
              </button>
              <button className="btn-address btn-secondary">Add Address</button>
              <button
                className="btn-cancel btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddressForm;
