import React, { createContext, useContext, useState } from "react";
export const AddressContext = createContext();
function AddressContextProvider({ children }) {
  const [userDetails, setUserDetails] = useState({
    name: "Komal Jagtap",
    number: "1234567892",
    address: "Kothroud,Pune",
    landmark: "Kothrud Depot",
    isChecked: false,
  });

  const [newAddress, setNewAddress] = useState([
    {
      name: "Komal Jagtap",
      number: "1234567892",
      address: "Kothroud,Pune",
      landmark: "Kothrud Depot",
      isChecked: false,
    },
  ]);
  const [selected, setSelected] = useState(false);
  return (
    <AddressContext.Provider
      value={{
        userDetails,
        setUserDetails,
        newAddress,
        setNewAddress,
        selected,
        setSelected,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export const useAddress = () => useContext(AddressContext);

export default AddressContextProvider;
