import React, { useState, useEffect } from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  useGlobalFilter,
  useFlexLayout,
  useResizeColumns,
  useExpanded,
  usePagination,
  Column,
  TableState,
  useAsyncDebounce,
} from 'react-table';
import { Form, Table, Row, Col, Button, Badge } from 'react-bootstrap';
import styled from 'styled-components';
import { FaFilter } from 'react-icons/fa';

import SortBy from './components/SortBy';

export function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  globalFilteredRows,
  toggleAllRowsExpanded,
}: any) {
  const count = preGlobalFilteredRows.length;
  const countFiltered = globalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  // eslint-disable-next-line no-shadow
  const onChange = useAsyncDebounce((valueNew) => {
    setGlobalFilter(valueNew || undefined);
  }, 200);

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Row>
        <Form.Group as={Col} className="d-flex align-items-center" controlId="searchForm">
          <Form.Label column xs="auto" className="pe-2">
            <FaFilter className="text-dark" />
          </Form.Label>
          <Form.Control
            size="sm"
            type="text"
            value={value || ''}
            onChange={(e) => {
              setValue(e.target.value.toUpperCase());
              onChange(e.target.value);
            }}
            onFocus={() => toggleAllRowsExpanded(false)} // tirando a expansao antes de filtrar, evita bugs
            placeholder="Digite aqui sua consulta..."
            className="border-0"
            autoComplete="off"
            autoFocus
          />
        </Form.Group>
      </Row>
      <Row className="d-flex justify-content-end">
        <Col sm="auto">
          <Badge bg="ligth" text="dark" className="mt-1">
            {countFiltered} registros encontrados de {count}
          </Badge>
        </Col>
      </Row>
    </Form>
  );
}

const Styles = styled.div`
  table {
    table {
      background-color: #fff;
    }
  }
`;

type PropsType = {
  columns: Array<Column>;
  data: Array<any>;
  defaultColumn?: Partial<Column> | undefined;
  filterTypes?: any;
  initialState?: Partial<TableState> | undefined;
  renderRowSubComponent?: CallableFunction | undefined;
  updateMyData?: CallableFunction | undefined;
  updateMyDataDatabase?: CallableFunction | undefined;
  skipPageReset?: CallableFunction | undefined;
  doGlobalFilter?: boolean;
};

export default function ReactTabble({
  columns,
  data,
  defaultColumn = undefined,
  filterTypes = undefined,
  initialState = undefined,
  renderRowSubComponent,
  updateMyData = undefined,
  updateMyDataDatabase = undefined,
  skipPageReset = undefined,
  doGlobalFilter = false,
}: PropsType) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    prepareRow,
    visibleColumns,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilteredRows,
    toggleAllRowsExpanded,
  } = useTable<any>(
    {
      columns,
      data,
      defaultColumn,
      globalFilter: 'text',
      filterTypes,
      autoResetFilters: !skipPageReset,
      autoResetGlobalFilter: !skipPageReset,
      autoResetSortBy: !skipPageReset,
      initialState,
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
      updateMyDataDatabase,
    } as any, // depois pode ver o que melhor se encaixa aqui
    useFilters,
    useGlobalFilter,
    useSortBy,
    useFlexLayout,
    useResizeColumns,
    useExpanded,
    usePagination,
  ) as any; // aqui depois posso tentar uma concatenação

  return (
    <Styles>
      {doGlobalFilter ? (
        <Row className="justify-content-center">
          <Col xs={10} sm={8} md={6} className="bg-light py-3 px-3 border rounded">
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
              globalFilteredRows={globalFilteredRows}
              toggleAllRowsExpanded={toggleAllRowsExpanded}
            />
          </Col>
        </Row>
      ) : null}

      <Row className="py-3">
        <Table striped bordered size="sm" {...getTableProps()} responsive="md">
          <thead>
            {headerGroups.map((headerGroup: any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => (
                  <th className="text-center align-middle" {...column.getHeaderProps()}>
                    {column.render('Header')}
                    <Row className="text-center">
                      {column.canSort ? <SortBy column={column} /> : null}
                      {column.canFilter ? column.render('Filter') : null}
                    </Row>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <>
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell: any) => (
                      <td
                        className={`text-center py-3 ${
                          row.isExpanded ? 'bg-info text-white' : 'fw-normal'
                        }`}
                        style={{
                          verticalAlign: 'middle',
                        }}
                        {...cell.getCellProps()}
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                  {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
                  {row.isExpanded ? (
                    <tr {...row.getRowProps()} className="border-0">
                      <td
                        colSpan={visibleColumns.length}
                        className="bg-info"
                        style={{
                          width: '100%',
                          borderColor: 'rgb(222,226,230)',
                          // background: '#FFF',
                        }}
                      >
                        {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                        {renderRowSubComponent({ row })}
                      </td>
                    </tr>
                  ) : null}
                </>
              );
            })}
          </tbody>
        </Table>
      </Row>

      <Row className="d-flex align-items-center py-2">
        <Col xs="12" sm="auto" className="d-flex py-1">
          <div>
            <Button
              variant="dark"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className="me-1"
            >
              {'<<'}
            </Button>{' '}
            <Button
              variant="dark"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="me-1"
            >
              {'<'}
            </Button>{' '}
            <Button
              variant="dark"
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="me-1"
            >
              {'>'}
            </Button>{' '}
            <Button
              variant="dark"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className="me-1"
            >
              {'>>'}
            </Button>{' '}
          </div>
        </Col>
        <Col xs="12" sm="auto" className="d-flex py-1">
          <span>
            Página{' '}
            <strong>
              {state.pageIndex + 1} de {pageOptions.length}
            </strong>
          </span>
        </Col>
        <Col xs="auto" className="d-none d-sm-flex align-items-center py-1">
          <span>Ir para página: </span>

          <Form.Group as={Col} className="d-flex">
            <Form.Control
              size="sm"
              type="number"
              defaultValue={state.pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: '60px' }}
              className="text-center"
            />
          </Form.Group>
        </Col>
        <Form.Group as={Col} xs="auto" className="d-flex py-1">
          <Form.Select
            size="sm"
            value={state.pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50, 100].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Mostrar {pageSize}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Row>
    </Styles>
  );
}
