
import Head from 'next/head'
import React from 'react'
import SuccessCompIndex from "@/components/success/ui"; 

const Success = () => {
  return (
    <div>
    <Head>
      <title>Donate Next App - Success</title>
      <meta name="description" content="Donate Next App crated by ...." />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <SuccessCompIndex />
  </div>
  )
}

export default Success