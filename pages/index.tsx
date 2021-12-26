import type { NextPage } from 'next'
import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import Card from '../components/common/card'

const Home: NextPage = () => {
  return (
    <Box>
      <Box mb={8} textAlign={'center'}>
        <Text fontSize={'3xl'}>remac</Text>
      </Box>
      <SimpleGrid
        p={4}
        maxW='4xl'
        m='0 auto'
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={4}
      >
        <Card
          label='botmate'
          description='run git pull and restart botmate server'
          onClick={() => {}}
        />
      </SimpleGrid>
    </Box>
  )
}

export default Home
