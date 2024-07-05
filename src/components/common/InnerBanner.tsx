import React from 'react'

interface Props { title: string; }
export default function InnerBanner(props: Props) {
  const { title } = props;
  return (
    <div className='innerbanner-wrap'>
      <div className='container'>
        <h1>{title}</h1>
      </div>

    </div>
  )
}
