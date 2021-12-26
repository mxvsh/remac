import type { NextPage } from 'next'
import ConfigStore from 'configstore'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import ActionCard from '../components/common/action-card'
import { Action } from '../types'

const packageJson = require('../package.json')
const configstore = new ConfigStore('remac')

type Props = {
  version: string
  actions: Action[]
}

const Home: NextPage<Props> = ({ version, actions }) => {
  return (
    <Box>
      <Box mb={8} textAlign={'center'}>
        <Text fontSize={'3xl'}>remac</Text>
        <Text mt={-1} fontSize={'sm'} color='gray.400'>
          v{version}
        </Text>
      </Box>
      <SimpleGrid
        p={4}
        maxW='4xl'
        m='0 auto'
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={4}
      >
        {actions.map((action, idx) => (
          <ActionCard key={idx} {...action} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export const getServerSideProps = async () => {
  const actions = configstore.get('actions')

  return {
    props: {
      actions,
      version: packageJson.version,
    },
  }
}

export default Home
