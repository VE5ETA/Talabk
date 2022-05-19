import React, { useState } from "react";

const CustomerContext = React.createContext([{}, () => {}]);

let initialState = {
  // businessID: "",
  // items: [],
};

const CustomerProvider = (props) => {
  const [state, setState] = useState(initialState);

  return (
    <CustomerContext.Provider value={[state, setState]}>
      {props.children}
    </CustomerContext.Provider>
  );
};

export { CustomerContext, CustomerProvider };
