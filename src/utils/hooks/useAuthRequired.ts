import { useEffect } from 'react'
import { useRouter } from 'next/router'

import { selectAuth } from 'redux/feature'

export const useAuthRequired = () => {
  const { uid, isLoading } = selectAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !uid) router.push('/')
  }, [uid, isLoading])
}
