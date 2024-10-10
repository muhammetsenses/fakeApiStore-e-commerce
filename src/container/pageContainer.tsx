import { Container } from '@mui/material';
import { ReactNode } from 'react';

interface PageContainerProps {
    children: ReactNode;
  }

const PageContainer: React.FC<PageContainerProps> = ({children}) => {
  return (
    <Container>{children}</Container>
  )
}

export default PageContainer