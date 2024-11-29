'use client';

import * as React from 'react';
import { columns, Person } from './columns';
import { DataTable } from '@/components/data-table';
import { useSearchParams } from 'next/navigation';

const data: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'In Relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

export function Table() {
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';

  return (
    <div className="w-full">
      <DataTable
        columns={columns}
        data={data}
        pagination={{
          page: Number(page),
          total: 20,
        }}
      />
    </div>
  );
}
