import { useRef } from 'react'
import {
    Box,
    Flex,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    useDisclosure,
} from '@chakra-ui/react';

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    const initialRef = useRef(null)

  return (
    <>
      <Box bg={'gray.50'} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'end'}>
                <Button
                    onClick={onOpen}
                    colorScheme={'purple'}>
                    New Test
                </Button>
        </Flex>
        
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Enter HTTP endpoint</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>URL</FormLabel>
                <Input ref={initialRef} placeholder='E.g. www.google.com' />
              </FormControl>
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='purple' mr={3}>
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}