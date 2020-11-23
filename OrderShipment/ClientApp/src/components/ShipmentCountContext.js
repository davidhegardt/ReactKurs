import { createContext } from 'react';

const ShipmentCountContext = createContext({
    countInformation: { shipments : 0, orders : 0 },
    updated : true,    
    setShipmentCount: () => {},
    setUpdated: () => {}
  });

export default ShipmentCountContext;