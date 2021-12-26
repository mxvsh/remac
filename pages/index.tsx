import type { NextPage } from 'next'
import { useState } from 'react'
import ConfigStore from 'configstore'
import {
  Box,
  SimpleGrid,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from '@chakra-ui/react'
import ActionCard from '../components/common/action-card'
import { Action } from '../types'

const configstore = new ConfigStore('remac')

type Props = {
  actions: Action[]
}

const Home: NextPage<Props> = ({ actions }) => {
  const log_modal = useDisclosure()
  const [logs, setLogs] = useState('')

  return (
    <Box>
      <Box mb={8} textAlign={'center'}>
        <Text fontSize={'3xl'}>remac</Text>
      </Box>
      {actions.length === 0 && (
        <Text textAlign={'center'}>no actions found</Text>
      )}
      <SimpleGrid
        p={4}
        maxW='4xl'
        m='0 auto'
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={4}
      >
        {actions.map((action, idx) => (
          <ActionCard
            key={idx}
            action={action}
            onShowLog={(logs) => {
              setLogs(logs)
              log_modal.onOpen()
            }}
          />
        ))}
      </SimpleGrid>

      <Modal isOpen={log_modal.isOpen} onClose={log_modal.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Logs</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{logs}</ModalBody>

          <ModalFooter>
            <Button onClick={log_modal.onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export const getServerSideProps = async () => {
  const actions = configstore.get('actions')

  return {
    props: {
      actions: actions || [],
    },
  }
}

export default Home
