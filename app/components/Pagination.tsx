'use client';

import { DoubleArrowRightIcon, DoubleArrowLeftIcon, ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

interface Props {
    currentPage: number,
    itemCount: number,
    pageSize: number
}

const Pagination = ({ currentPage, itemCount }: Props) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push('?' + params.toString());
    }

    if (itemCount <= 1) return null;

    return (
        <Flex align='center' gap='3'>
            <Text>Page {currentPage} of {Math.ceil(itemCount / 10)}</Text>
            <Button color='gray' variant='soft' disabled={currentPage === 1}
                onClick={() => changePage(1)}>
                <DoubleArrowLeftIcon />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}>
                <ChevronLeftIcon />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage === itemCount}
                onClick={() => changePage(currentPage + 1)}>
                <ChevronRightIcon />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage === itemCount}
                onClick={() => changePage(currentPage)}>
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}

export default Pagination