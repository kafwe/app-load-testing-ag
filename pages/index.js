import Head from 'next/head'
import Navbar from '../components/Navbar'
import Histogram from '../components/Histogram'
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  StatHelpText,
  Heading
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
      <Box spacing={8}>
        <Navbar />
        <Heading as='h2' size='2xl' color={'gray.700'} px={8}>Load test for google.com</Heading>
        <StatGroup gap={4} p={8}>
              <Stat variant={'statPurple'}>
                <StatLabel fontSize={'md'}>Total Time</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>seconds</StatHelpText>
              </Stat>

              <Stat variant={'statPurple'}>
                <StatLabel fontSize={'md'}>Slowest Time</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>seconds</StatHelpText>
              </Stat>

              <Stat variant={'statPurple'}>
                <StatLabel fontSize={'md'}>Fastest Time</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>seconds</StatHelpText>
              </Stat>

              <Stat variant={'statPurple'}>
                <StatLabel fontSize={'md'}>Average Time</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>seconds</StatHelpText>
              </Stat>

              <Stat variant={'statPurple'}>
                <StatLabel fontSize={'md'}>Requests</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>per second</StatHelpText>
              </Stat>

              <Stat variant={'statPurple'}>
                <StatLabel fontSize={'md'}>Throughput</StatLabel>
                <StatNumber>345,670</StatNumber>
                <StatHelpText>bytes</StatHelpText>
              </Stat>
            </StatGroup>
      </Box>
      <Histogram />
    </>
  )
}