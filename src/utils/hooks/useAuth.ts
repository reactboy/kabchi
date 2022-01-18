export const useAuthChanged = () => {
  // set token on user signin
}
export const useSignin = () => {
  const signinWithGoogle = () => {}
  const signinAnnonymously = () => {}

  return {
    signinWithGoogle,
    signinAnnonymously,
  }
}
export const useSignout = () => {
  const signout = () => {}

  return {
    signout,
  }
}
