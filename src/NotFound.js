import Page from '@/ui/Page';
import Header from '@/ui/Header';
import PageHeading from '@/ui/PageHeading';
import Icon from '@/ui/Icon';

const NotFound = () => (
  <Page>
    <Header>
      <Icon name="cleaningMan" size="large" />
      <PageHeading level="2">Page Not Found</PageHeading>
    </Header>
  </Page>
);

export default NotFound;
