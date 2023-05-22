import {
    Box,
    Flex,
    Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  const handleNewTestClick = () => {
    router.push({
      pathname: '/',
    })
  }

  return (
    <>
      <Box bg={'gray.50'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'end'}>
          <Button
            onClick={handleNewTestClick}
            colorScheme={'purple'}>
              New Test
          </Button>
        </Flex>
      </Box>
    </>
  );
}