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

import { useToast } from '.'

const HASURA_TOKEN_KEY = 'https://hasura.io/jwt/claims'
let unsubUserMeta: null | (() => void) = null

const cookie = new Cookie()

export const useAuthChanged = () => {
  const { closeToast } = useToast()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
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
              store.dispatch(setUid(user.uid))
              closeToast()
            }
          )
          return
        }

        cookie.set('token', token, { path: '/' })
        store.dispatch(setUid(user.uid))
        closeToast()
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
  const { showErrorToast, showInfoToast, closeToast } = useToast()
  const signinWithGoogle = async () => {
    const infoTosatId = showInfoToast({
      title: 'signning in',
      description: 'please wait this may take a few moments...',
      duration: null,
    })
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
    } catch (e) {
      closeToast(infoTosatId)
      console.log('google login error', e)
      showErrorToast({ title: 'sign in cancelled...' })
    }
  }
  const signinAnnonymously = async () => {
    const infoTosatId = showInfoToast({
      title: 'signning in',
      description: 'please wait this may take a few moments...',
      duration: null,
    })
    try {
      await signInAnonymously(auth)
    } catch (e) {
      closeToast(infoTosatId)
      showErrorToast({ title: 'sign in cancelled...' })
    }
  }

  return {
    signinWithGoogle,
    signinAnnonymously,
  }
}

export const useSignout = () => {
  const { showInfoToast } = useToast()
  const router = useRouter()
  const signout = async () => {
    await signOut(auth)
    typeof unsubUserMeta === 'function' && unsubUserMeta()
    unsubUserMeta = null
    router.push('/')
    showInfoToast({ title: 'signed out!' })
  }

  return {
    signout,
  }
}
