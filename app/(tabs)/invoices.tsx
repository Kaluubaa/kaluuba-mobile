import React from 'react';
import { InvoiceList } from '~/components/invoice/InvoiceList';
import { Container } from '~/components/reusbales/Container';

const invoices = () => {
  return (
    <Container className='py-4'>
      <InvoiceList />;
    </Container>
  );
};

export default invoices;
