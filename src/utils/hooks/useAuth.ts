import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import { onSnapshot, doc } from 'firebase/firestore'
import Cookie from 'universal-cookie'

import { store } from 'redux/app'
import { setUid, setAuthLoading } from 'redux/feature'
import { auth, db } from 'utils/firebase'

const HASURA_TOKEN_KEY = 'https://hasura.io/jwt/claims'
let unsubUserMeta: null | (() => void) = null

export const useAuthChanged = () => {
  const cookie = new Cookie()

  //TODO(eastasian) manage auth checking state in global.

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user)
        store.dispatch(setUid(user.uid))
        const token = await user.getIdToken(true)
        const idTokenResult = await user.getIdTokenResult()
        const hasuraClaims = idTokenResult.claims[HASURA_TOKEN_KEY]

        if (!hasuraClaims) {
          unsubUserMeta = onSnapshot(
            doc(db, 'user_meta', user.uid),
            async () => {
              const tokenSnap = await user.getIdToken(true)
              const idTokenResultSnap = await user.getIdTokenResult()
              const hasuraClaimsSnap =
                idTokenResultSnap.claims[HASURA_TOKEN_KEY]

              if (!hasuraClaimsSnap) return
              cookie.set('token', tokenSnap, { path: '/' })
            }
          )
        }
        cookie.set('token', token, { path: '/' })
      } else {
        //NOTE(eastasian) reset cache for every unauthenticated user.
        //TODO(eastasian) clear reqct query cache
        store.dispatch(setUid(null))
        cookie.remove('token')
      }
      store.dispatch(setAuthLoading(false))
    })

    return () => {
      unsubscribe()
      typeof unsubUserMeta === 'function' && unsubUserMeta()
      unsubUserMeta = null
    }
  }, [])
}

export const useSignin = () => {
  const router = useRouter()

  const signinWithGoogle = async () => {
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      router.push('/dashboard')
    } catch (e) {
      alert('popup closed')
      console.log('google login error')
    }
  }
  const signinAnnonymously = async () => {
    await signInAnonymously(auth)
    router.push('/dashboard')
  }

  return {
    signinWithGoogle,
    signinAnnonymously,
  }
}

export const useSignout = () => {
  const router = useRouter()
  const signout = async () => {
    await signOut(auth)
    typeof unsubUserMeta === 'function' && unsubUserMeta()
    unsubUserMeta = null
    router.push('/')
  }

  return {
    signout,
  }
}
