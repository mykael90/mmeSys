import { Col, Button } from 'react-bootstrap';
import { FaSortAlphaDown, FaSortAlphaUp, FaSort } from 'react-icons/fa';

export default function SortBy({ column: { isSorted, isSortedDesc, toggleSortBy } }: any) {
  return (
    <Col xs="auto" className="pe-0">
      <span>
        {' '}
        {isSorted ? (
          isSortedDesc ? (
            <Button
              title="Ordenado decrescente"
              size="sm"
              variant="outline-primary"
              className="border-0"
              onClick={() => toggleSortBy(!isSortedDesc)}
            >
              <FaSortAlphaUp />
            </Button>
          ) : (
            <Button
              title="Ordenado crescente"
              size="sm"
              variant="outline-primary"
              className="border-0 "
              onClick={() => toggleSortBy(!isSortedDesc)}
            >
              <FaSortAlphaDown />
            </Button>
          )
        ) : (
          <Button
            title="Clique para ordenar"
            size="sm"
            variant="outline-primary"
            className="border-0 "
            onClick={() => toggleSortBy(false)}
          >
            <FaSort />
          </Button>
        )}
      </span>
    </Col>
  );
}
