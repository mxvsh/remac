import React, { useState } from 'react'
import { Box, Button, ButtonGroup, Text } from '@chakra-ui/react'
import useFetch from 'use-http'
import { Action } from '../../types'

type Props = {
  action: Action
  onShowLog: (log: string) => void
}

const ActionCard: React.FC<Props> = ({ action, onShowLog }) => {
  const { label, description } = action
  const api = useFetch('/api/action')

  const [status, setStatus] = useState({
    loading: false,
  })

  const run_action = async () => {
    setStatus({ loading: true })
    api.post('/run', { action }).then((res) => {
      setStatus({ loading: false })
      onShowLog(res.logs || 'No logs')
    })
  }

  return (
    <Box
      p={4}
      borderWidth={'1px'}
      rounded='xl'
      _hover={{ shadow: 'md' }}
      transition='all 0.2s'
      willChange={'contents'}
    >
      <Text>{label}</Text>
      <Text color='gray'>{description}</Text>
      <ButtonGroup mt={3} size='sm'>
        <Button
          colorScheme={'purple'}
          isLoading={status.loading}
          onClick={run_action}
        >
          Run Action
        </Button>
        <Button colorScheme={'red'} variant={'outline'}>
          Delete
        </Button>
      </ButtonGroup>
    </Box>
  )
}

export default ActionCard
