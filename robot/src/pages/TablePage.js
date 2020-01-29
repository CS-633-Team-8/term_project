import React, { Component } from 'react';
import MainSection from '../components/MainSection';
import ContentWrapper from '../components/ContentWrapper';
import PageTitle from '../components/PageTitle';
import DynamicTable from '@atlaskit/dynamic-table';
import { caption, head, rows } from '../content/sample-data';

export default class TablePage extends Component {
  render() {
    return (
      <ContentWrapper>
        <PageTitle>Test Database 1</PageTitle>
        <MainSection />
        <DynamicTable
          caption={caption}
          head={head}
          rows={rows}
          rowsPerPage={10}
          defaultPage={1}
          loadingSpinnerSize="large"
          isLoading={false}
          //isFixedSize
          defaultSortKey="term"
          defaultSortOrder="ASC"
          onSort={() => console.log('onSort')}
          onSetPage={() => console.log('onSetPage')}
        />
      </ContentWrapper>
    );
  }
}