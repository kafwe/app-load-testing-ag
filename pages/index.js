import Head from 'next/head'
import Navbar from '../components/Navbar'
import {
  Box,
} from '@chakra-ui/react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Load Tester - Test</title>
        <meta name="description" content="Results page for HTTP load tester" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Navbar />
      </Box>
    </>
  )
}
