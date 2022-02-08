import { FC } from 'react'
import { motion, MotionProps } from 'framer-motion'

type Props = {
  as?: keyof typeof motion
} & MotionProps

export const MotionWrapper: FC<Props> = (props) => {
  const { as = 'div', children, ...restProps } = props

  const Wrapper = motion[as]

  return <Wrapper {...restProps}>{children}</Wrapper>
}

export const TransitionWrapper: FC<Props> = (props) => {
  return (
    <MotionWrapper
      initial="pageInitial"
      animate="pageAnimate"
      variants={{
        pageInitial: {
          opacity: 0,
        },
        pageAnimate: {
          opacity: 1,
        },
      }}
      transition={{ duration: 0.2 }}
      {...props}
    />
  )
}
