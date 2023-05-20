import {
  Box,
  Flex,
  Button
} from '@chakra-ui/react';

export default function Navbar() {

  return (
    <>
      <Box bg={'white'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'end'}>
                <Button
                    as={'a'}
                    fontSize={'sm'}
                    fontWeight={600}
                    color={'white'}
                    bg={'purple.500'}
                    href={'#'}
                    _hover={{
                    bg: 'purple.400',
                    }}>
                    New Test
                </Button>
        </Flex>
      </Box>
    </>
  );
}
