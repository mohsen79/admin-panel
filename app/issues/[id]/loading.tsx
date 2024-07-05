import { Box, Card, Flex, Skeleton } from '@radix-ui/themes'

const loading = async () => {

    return (
        <Box className='max-w-xl'>
            <Skeleton />
            <Flex className='space-x-3' my="3">
                <Skeleton />
                <Skeleton />
            </Flex>
            <Card className='prose'>
                <Skeleton />
                <Skeleton />
            </Card>
        </Box>
    )
}

export default loading