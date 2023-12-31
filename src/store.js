'use client'

import { create } from 'zustand'


export const useAppStore = create((set) => ({
  loggedUser: null,
  setLoggedUser: (newVal) => set(() => ({ loggedUser: newVal })),
  token: null,
  setToken: (newVal) => set(() => ({ token: newVal })),
  showCreatePostModal: false,
  setShowCreatePostModal: (newVal) => set(() => ({ showCreatePostModal: newVal })),
  alertMessage: '',
  setAlertMessage: (newVal) => set(() => ({ alertMessage: newVal })),
  showAlertBanner: '',
  setShowAlertBanner: (newVal) => set(() => ({ showAlertBanner: newVal })),
  showLoadingBar: false,
  setShowLoadingBar: (newVal) => set(() => ({ showLoadingBar: newVal })),
}))