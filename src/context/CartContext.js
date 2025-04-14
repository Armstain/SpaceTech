'use client'

import { createContext, useContext, useReducer, useEffect } from 'react'

// Cart context with initial empty state
const CartContext = createContext(null)

// Cart reducer to handle different actions
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      )

      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const newItems = [...state.items]
        newItems[existingItemIndex].quantity += action.payload.quantity || 1
        
        return {
          ...state,
          items: newItems,
        }
      }
      
      // Add new item
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: action.payload.quantity || 1 }],
      }
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
      
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      }
      
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
      }
      
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

// Cart provider component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  
  // Calculate cart totals
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  
  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        // Replace the entire state with the saved cart
        parsedCart.items.forEach(item => {
          dispatch({ type: 'ADD_ITEM', payload: item })
        })
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error)
    }
  }, [])
  
  // Save cart to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
  }, [state])
  
  // Cart actions
  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item })
  const removeItem = (itemId) => dispatch({ type: 'REMOVE_ITEM', payload: itemId })
  const updateQuantity = (itemId, quantity) => 
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: itemId, quantity } })
  const clearCart = () => dispatch({ type: 'CLEAR_CART' })
  
  return (
    <CartContext.Provider
      value={{
        items: state.items,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext)
  if (context === null) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}