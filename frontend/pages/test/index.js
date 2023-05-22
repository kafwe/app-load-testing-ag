import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Histogram from '../../components/Histogram'
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  StatHelpText,
  Heading,
  Center,
  Spinner,
  VStack
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Error from 'next/error'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  const router = useRouter()
  const [url, setUrl] = useState('https://www.google.co.za')

  useEffect(() => {
    if (!router.isReady) return;

    if (router.query.url) {
      console.log(router.query.url)
      setUrl(router.query.url)
    }
  }, [router.isReady])


  const { data, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_AWS_API_GATEWAY_URL}/?url=${url}`, fetcher)

  if (isLoading) {
    return (
      <Box h="100vh">
        <Center h="100%">
          <VStack spacing={8}>
            <Heading as='h1' size='lg' color={'gray.700'} px={8}>Loadtesting your endpoint. Please be patient</Heading>
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='purple.500'
              size='xl'
            />
          </VStack>
        </Center>
      </Box>
    )
  }

  if (error) {
    return <Error statusCode={error.status} />
  }

  const { domain, summary, response_times } = data

  return (
    <>
      <Head>
        <title>Load Tester</title>
        <meta name="description" content="Results page for HTTP load tester" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box spacing={8}>
        <Navbar />
        <Heading as='h2' size='2xl' color={'gray.700'} px={8}>Load test for {domain}</Heading>
        <StatGroup gap={4} p={8}>
              <Stat variant={'statPurple'}>
                <StatLabel fontSize={'md'}>Total Time</StatLabel>
                <StatNumber>{summary.total_time.toFixed(3)}</StatNumber>
                <StatHelpText>seconds</StatHelpText>
              </Stat>

              <Stat variant={'statPurple'}>
                <StatLabel fontSize={'md'}>Slowest Time</StatLabel>
                <StatNumber>{summary.slowest_time.toFixed(3)}</StatNumber>
                <StatHelpText>seconds</StatHelpText>
              </Stat>

              <Stat variant={'statPurple'}>
                <StatLabel fontSize={'md'}>Fastest Time</StatLabel>
                <StatNumber>{summary.fastest_time.toFixed(3)}</StatNumber>
                <StatHelpText>seconds</StatHelpText>
              </Stat>

              <Stat variant={'statPurple'}>
                <StatLabel fontSize={'md'}>Average Time</StatLabel>
                <StatNumber>{summary.average_time.toFixed(3)}</StatNumber>
                <StatHelpText>seconds</StatHelpText>
              </Stat>

              <Stat variant={'statPurple'}>
                <StatLabel fontSize={'md'}>Requests</StatLabel>
                <StatNumber>{summary.requests_per_second.toFixed(2)}</StatNumber>
                <StatHelpText>per second</StatHelpText>
              </Stat>

              <Stat variant={'statPurple'}>
                <StatLabel fontSize={'md'}>Throughput</StatLabel>
                <StatNumber>{summary.throughput_bytes}</StatNumber>
                <StatHelpText>bytes</StatHelpText>
              </Stat>
            </StatGroup>
      </Box>
      <Histogram data={response_times} />
    </>
  )
}