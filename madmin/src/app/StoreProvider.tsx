// src/app/StoreProvider.tsx
'use client' // <--- This directive is crucial

import { Provider } from 'react-redux'
import  store  from '../contextapi/store' // Update this path to where your Redux store is defined
import React from 'react'

export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>
}