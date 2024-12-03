'use client';

import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Pagination } from '@/types/common';
import { DataTablePagination } from '@/components/data-table/pagination';
import React from 'react';
import { PAGINATION } from '@/constants/pagination';
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  pagination?: Pagination;
  pageSizeOptions?: number[];
  onClickExpendedRow?: boolean;
  onRowClick?: (row: TData) => void;
  getSubRows?: (row: TData) => any;
  expandedRowModel?: (row: TData) => React.ReactNode;
}

interface CustomColumnMeta {
  hideHeader?: boolean;
  rowSpan?: number;
  backgroundColor?: string;
}

export function DataTable<TData, TValue>({
  data,
  columns,
  isLoading,
  pagination,
  onRowClick,
  getSubRows,
  onClickExpendedRow,
  expandedRowModel,
}: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const { page = 1, total = 0 } = pagination || {};

  const table = useReactTable({
    defaultColumn: {
      maxSize: 500,
      minSize: 0,
    },
    state: {
      expanded,
    },
    manualExpanding: true,
    onExpandedChange: setExpanded,
    getSubRows,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <>
      <div className="mb-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(
                    ({
                      id,
                      getSize,
                      column,
                      colSpan,
                      isPlaceholder,
                      getContext,
                    }) => {
                      const { meta = {}, header } = column.columnDef;
                      const headerSize = getSize();
                      const { hideHeader, rowSpan, backgroundColor } =
                        meta as CustomColumnMeta;

                      if (hideHeader) return null;

                      return (
                        <TableHead
                          key={id}
                          style={{
                            width: headerSize === 150 ? 'auto' : headerSize,
                            backgroundColor,
                          }}
                          colSpan={colSpan}
                          rowSpan={rowSpan}
                        >
                          {isPlaceholder
                            ? null
                            : flexRender(header, getContext())}
                        </TableHead>
                      );
                    },
                  )}
                </TableRow>
              );
            })}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <React.Fragment key={row.id}>
                    <TableRow
                      data-state={row.getIsSelected() && 'selected'}
                      className={cn({
                        'cursor-pointer': onRowClick || onClickExpendedRow,
                      })}
                      onClick={() => {
                        onRowClick?.(row.original);
                        if (onClickExpendedRow) {
                          row.toggleExpanded();
                        }
                      }}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                    {row.getIsExpanded() && (
                      <TableRow>
                        <TableCell colSpan={row.getVisibleCells().length}>
                          {expandedRowModel?.(row.original)}
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            ) : isLoading ? (
              Array.from({ length: PAGINATION.LIMIT }, (_, i) => (
                <TableRow key={`loading-row-${i}`}>
                  {Array.from({ length: columns.length }, (_, i) => (
                    <TableCell key={`loading-cell-${i}`}>
                      <Skeleton className="h-[22px] w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có kết quả.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pagination && (
        <DataTablePagination currentPage={page} totalPage={total} />
      )}
    </>
  );
}
