'use client'

import { create } from 'zustand'


export const useStore = create((set) => ({
  loggedUser: null,
  setLoggedUser: (newVal) => set(() => ({ loggedUser: newVal })),
  token: null,
  setToken: (newVal) => set(() => ({ token: newVal })),
  showSignInModal: false,
  setShowSignInModal: (newVal) => set(() => ({ showSignInModal: newVal })),
  showSignUpModal: false,
  setShowSignUpModal: (newVal) => set(() => ({ showSignUpModal: newVal })),
  showCreatePostModal: false,
  setShowCreatePostModal: (newVal) => set(() => ({ showCreatePostModal: newVal })),
  alertMessage: '',
  setAlertMessage: (newVal) => set(() => ({ alertMessage: newVal })),
  showAlertBanner: '',
  setShowAlertBanner: (newVal) => set(() => ({ showAlertBanner: newVal })),
}))