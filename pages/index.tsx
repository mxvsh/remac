import type { NextPage } from 'next';
import { Box, Center, Text } from '@chakra-ui/react';

const Home: NextPage = () => {
	return (
		<Center h='100vh'>
			<Box textAlign={'center'}>
				<Text fontSize={'3xl'}>remac</Text>
				<Text>v0.0.1</Text>
			</Box>
		</Center>
	);
};

export default Home;
