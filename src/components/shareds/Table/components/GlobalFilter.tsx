import React from 'react';
import { Form, Row, Col, Badge } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';

export default function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  globalFilteredRows,
  toggleAllRowsExpanded,
  useAsyncDebounce,
}: any) {
  const count = preGlobalFilteredRows.length;
  const countFiltered = globalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
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
