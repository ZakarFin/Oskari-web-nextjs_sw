import React from 'react'

type ContainerProps = {
  children: React.ReactNode
  props?: never
}

const Container = ({ children, ...props }: ContainerProps) => (
  <div className='container--content' {...props}>
    {children}
  </div>
)

export default Container
