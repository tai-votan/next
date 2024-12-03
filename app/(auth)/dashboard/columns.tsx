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
    header: () => (
      <div className="text-center font-bold text-lg">Merge row</div>
    ),
    meta: { rowSpan: 2, backgroundColor: '#fef3c7' },
    columns: [
      columnHelper.accessor('firstName', {
        meta: { hideHeader: true },
        cell: (info) => info.getValue(),
      }),
    ],
  }),
  columnHelper.group({
    id: 'hello',
    header: () => <div className="text-center font-bold text-lg">Hello</div>,
    meta: { backgroundColor: '#ecfccb' },
    columns: [
      columnHelper.accessor('status', {
        meta: { backgroundColor: '#ecfccb' },
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => row.lastName, {
        id: 'lastName',
        meta: { backgroundColor: '#ecfccb' },
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      }),
    ],
  }),
  columnHelper.group({
    id: 'info',
    header: () => <div className="text-center font-bold text-lg">Info</div>,
    meta: { backgroundColor: '#e0f2fe' },
    columns: [
      columnHelper.accessor('age', {
        header: () => 'Age',
        meta: { backgroundColor: '#e0f2fe' },
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('visits', {
        header: () => <span>Visits</span>,
        meta: { backgroundColor: '#e0f2fe' },
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('status', {
        header: 'Status',
        meta: { backgroundColor: '#e0f2fe' },
        footer: (props) => props.column.id,
      }),
      columnHelper.accessor('progress', {
        header: 'Profile Progress',
        meta: { backgroundColor: '#e0f2fe' },
        footer: (props) => props.column.id,
      }),
    ],
  }),
];
