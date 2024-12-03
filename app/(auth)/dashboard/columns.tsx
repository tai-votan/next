'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/table-core';

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};

const columnHelper = createColumnHelper<Person>();

export const columns: ColumnDef<Person>[] = [
  columnHelper.group({
    id: 'merge',
    header: () => <div className="text-center">Merge row</div>,
    meta: { rowSpan: 2 },
    columns: [
      columnHelper.accessor('firstName', {
        meta: { hideHeader: true },
        cell: (info) => info.getValue(),
      }),
    ],
  }),
  columnHelper.group({
    id: 'hello',
    header: () => <div className="text-center">Hello</div>,
    columns: [
      columnHelper.accessor('status', {
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => row.lastName, {
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      }),
    ],
  }),
  columnHelper.group({
    id: 'info',
    header: () => <div className="text-center">Info</div>,
    columns: [
      columnHelper.accessor('age', {
        header: () => 'Age',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('visits', {
        header: () => <span>Visits</span>,
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('progress', {
        header: 'Profile Progress',
        footer: (props) => props.column.id,
      }),
    ],
  }),
];
