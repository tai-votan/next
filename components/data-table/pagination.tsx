'use client';

import {
  Pagination as RCPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { usePathname } from 'next/navigation';
import React from 'react';

interface PaginationProps {
  currentPage?: number;
  totalPage?: number;
}

export function DataTablePagination({
  currentPage = 1,
  totalPage = 1,
}: PaginationProps) {
  const pathname = usePathname();

  const pagerList: React.ReactElement[] = [];
  const pageBufferSize = 1;

  if (totalPage <= 3 + pageBufferSize * 2) {
    if (!totalPage) {
      pagerList.push(
        <PaginationItem>
          <PaginationPage isActive>1</PaginationPage>
        </PaginationItem>,
      );
    }

    for (let i = 1; i <= totalPage; i += 1) {
      pagerList.push(
        <PaginationItem key={i}>
          {currentPage === i ? (
            <PaginationPage isActive>{i}</PaginationPage>
          ) : (
            <PaginationLink href={pathname + `?page=${i}`}>{i}</PaginationLink>
          )}
        </PaginationItem>,
      );
    }
  } else {
    let left = Math.max(1, currentPage - pageBufferSize);
    let right = Math.min(currentPage + pageBufferSize, totalPage);

    if (currentPage - 1 <= pageBufferSize) {
      right = 1 + pageBufferSize * 2;
    }
    if (totalPage - currentPage <= pageBufferSize) {
      left = totalPage - pageBufferSize * 2;
    }

    for (let i = left; i <= right; i += 1) {
      pagerList.push(
        <PaginationItem key={i}>
          {currentPage === i ? (
            <PaginationPage isActive>{i}</PaginationPage>
          ) : (
            <PaginationLink href={pathname + `?page=${i}`}>{i}</PaginationLink>
          )}
        </PaginationItem>,
      );
    }

    if (currentPage - 1 >= pageBufferSize * 2 && currentPage !== 1 + 2) {
      pagerList[0] = React.cloneElement(pagerList[0]);

      pagerList.unshift(
        <PaginationItem key="ellipsis_prev">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    if (
      totalPage - currentPage >= pageBufferSize * 2 &&
      currentPage !== totalPage - 2
    ) {
      const lastOne = pagerList[pagerList.length - 1];
      pagerList[pagerList.length - 1] = React.cloneElement(lastOne);

      pagerList.push(
        <PaginationItem key="ellipsis_next">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    if (left !== 1) {
      pagerList.unshift(
        <PaginationItem key={1}>
          <PaginationLink href={pathname + `?page=1`}>1</PaginationLink>
        </PaginationItem>,
      );
    }
    if (right !== totalPage) {
      pagerList.push(
        <PaginationItem key={totalPage}>
          <PaginationLink href={pathname + `?page=${totalPage}`}>
            {totalPage}
          </PaginationLink>
        </PaginationItem>,
      );
    }
  }

  return (
    <RCPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={pathname + `?page=${Math.max(currentPage - 1, 1)}`}
          />
        </PaginationItem>
        {pagerList}
        <PaginationItem>
          <PaginationNext
            href={pathname + `?page=${Math.min(currentPage + 1, totalPage)}`}
          />
        </PaginationItem>
      </PaginationContent>
    </RCPagination>
  );
}
