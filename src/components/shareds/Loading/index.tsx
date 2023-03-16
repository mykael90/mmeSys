import { ReactElement } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';

type PropsType = {
  isLoading: boolean;
  title?: string;
};

const index = ({ isLoading = false, title = 'Carregando' }: PropsType): ReactElement | null => {
  if (!isLoading) return null;

  return (
    <Container style={{ height: '100%', position: 'fixed' }}>
      <div />
      <span>{title}&nbsp;&nbsp;</span>
      <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
    </Container>
  );
};

export default index;
