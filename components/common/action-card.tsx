import React from 'react'
import { Box, Button, ButtonGroup, Text } from '@chakra-ui/react'
import { Action } from '../../types'

const ActionCard: React.FC<Action> = ({ label, description }) => {
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
        <Button colorScheme={'purple'}>Run Action</Button>
        <Button colorScheme={'red'} variant={'outline'}>
          Delete
        </Button>
      </ButtonGroup>
    </Box>
  )
}

export default ActionCard
