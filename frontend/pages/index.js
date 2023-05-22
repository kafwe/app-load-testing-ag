import Head from 'next/head'
import { useState } from 'react'
import { 
  Box, 
  Center, 
  Input, 
  Button, 
  Heading, 
  FormControl, 
  FormErrorMessage,
  VStack
} from '@chakra-ui/react'
import { useRouter } from 'next/router';

const formatUrl = (url) => {
  // Add fallback scheme if URL does not have a scheme 
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`
  }

  return url
}

export default function Home() {
  const [url, setUrl] = useState('')
  const [isError, setIsError] = useState(false)
  const router = useRouter()

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleButtonClick = () => {
    if (validateUrl(url)) {
      const formattedUrl = formatUrl(url)
      router.push({
        pathname: '/test',
        query: { 'url': formattedUrl },
      })
    } else {
      setIsError(true)
    }
  }

  const validateUrl = (value) => {
    const formattedUrl = formatUrl(url)

    try {
      new URL(formattedUrl)
      return true
    } catch (error) {
      return false
    }
  }


  return (
    <>
      <Head>
        <title>Load Tester</title>
        <meta name="description" content="Entry page for HTTP load tester" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box bg="white" h="100vh" p={4}>
        <Center h="100%" flexDir="column">
          <Box w="500px" h="60%">
            <Center>
              <Heading as="h1" size="4xl" color="gray.700" mb={12}>
                Load Tester
              </Heading>
            </Center>

              <FormControl colorScheme="purple" isInvalid={isError} display="flex" justifyContent="center" mt={-4}>
                <VStack>
                  <Input colorScheme="purple" placeholder="Enter your URL" size="lg" onChange={handleUrlChange} width={'lg'} />
                  {isError && <FormErrorMessage>Not a valid URL.</FormErrorMessage>}
                </VStack>
                <Button colorScheme="purple" size="lg" ml={4} px={12} onClick={handleButtonClick}>
                  Test
                </Button>
              </FormControl>
          </Box>
        </Center>
      </Box>
    </>
  );
}
