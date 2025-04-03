import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD": {
      const existingItemIndex = state.findIndex(
        (item) => item.id === action.id && item.size === action.size
      );

      if (existingItemIndex >= 0) {
        // ✅ Increase quantity instead of replacing
        return state.map((item, index) =>
          index === existingItemIndex
            ? { ...item, qty: item.qty + action.qty } // ✅ Add new quantity to previous
            : item
        );
      } else {
        // Add as a new item
        return [...state, { ...action }];
      }
    }

    case "REMOVE":
      return state.filter((_, index) => index !== action.index);

    case "UPDATE": {
      return state.map((item, index) =>
        index === action.index
          ? { ...item, qty: action.newQty } // ✅ Update quantity correctly
          : item
      );
    }
    case "DROP": {
      let empArray = []
      return empArray
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hooks to use the cart state and dispatch
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
