'use client';

import * as React from 'react';
import { columns, Payment } from './columns';
import { DataTable } from '@/components/data-table';
import { useSearchParams } from 'next/navigation';

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    amount: 316,
    status: 'success',
    email: 'ken99@yahoo.com',
  },
  {
    id: '3u1reuv4',
    amount: 242,
    status: 'success',
    email: 'Abe45@gmail.com',
  },
  {
    id: 'derv1ws0',
    amount: 837,
    status: 'processing',
    email: 'Monserrat44@gmail.com',
  },
  {
    id: '5kma53ae',
    amount: 874,
    status: 'success',
    email: 'Silas22@gmail.com',
  },
  {
    id: 'bhqecj4p',
    amount: 721,
    status: 'failed',
    email: 'carmella@hotmail.com',
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
