import Header from '@/ui/Header';
import Icon from '@/ui/Icon';
import Page from '@/ui/Page';
import PageHeading from '@/ui/PageHeading';

import {
  Article,
  Paragraph,
  Quote,
  ExternalLink,
  Highlight,
  Author,
  Magician,
} from '@/ui/Article';

const Home = () => (
  <Page>
    <Article>
      <Header>
        <PageHeading level="2">What is this? Why?</PageHeading>
        <Icon name="podium" size="large" />
      </Header>

      <Paragraph>
        In the rapidly evolving world of web development, efficiently managing
        data fetching in React applications has become a crucial skill for
        developers. With the rise of complex and dynamic web apps, handling data
        retrieval and state management in a seamless manner can significantly
        enhance user experience and performance. This application delves into
        the techniques for data fetching in React, exploring various tools and
        strategies to simplify this essential task. Whether you're a seasoned
        developer or new to React, mastering{' '}
        <Highlight>data fetching</Highlight> will empower you to build
        responsive and robust applications that meet modern web standards.
      </Paragraph>

      <section style={{ display: 'flex' }}>
        <Magician />
        <Quote author={<Highlight>Albert Einstein</Highlight>}>
          <Highlight>"</Highlight>Mastering data fetching in React is like being
          a wizard. You’ve got to know when to cast spells (or make API calls)
          and when to just let the magic (or cache) do its thing.
          <Highlight>"</Highlight>
        </Quote>
      </section>

      <Paragraph>
        TanStack Query (formerly known as React Query) and SWR are powerful
        tools that have revolutionized data fetching in React applications.
        TanStack Query provides a comprehensive set of hooks that manage server
        state with features like caching, synchronization, and background
        updates, making it easier to handle complex data fetching scenarios. Its
        declarative API and automatic retry mechanisms enhance the reliability
        and performance of applications. On the other hand, SWR
        (stale-while-revalidate) focuses on optimizing data fetching by
        leveraging caching and revalidation strategies. SWR ensures that data is
        always fresh by revalidating it in the background while serving stale
        data from the cache, resulting in a fast and responsive user experience.
        Both libraries significantly reduce boilerplate code, streamline data
        management, and enhance the overall efficiency of React applications.
      </Paragraph>

      <Paragraph>
        In conclusion, effective data fetching in React involves more than just
        API calls; it requires employing strategies and tools like{' '}
        <ExternalLink href="https://tanstack.com/query/latest">
          React Query
        </ExternalLink>{' '}
        and <ExternalLink href="https://swr.vercel.app/">SWR</ExternalLink> to
        enhance performance and user experience. By adopting best practices for
        state management and error handling, you ensure your applications are
        responsive, efficient, and scalable.
      </Paragraph>

      <footer>
        <address>
          <Paragraph>
            Posted on <time dateTime="2024-08-28 20:00">02.08.2024</time> by{' '}
            <Author coAuthor="ChatGPT">
              <ExternalLink href="https://github.com/LukeWlodarczyk">
                Luke Wlodarczyk
              </ExternalLink>
            </Author>
          </Paragraph>
        </address>
      </footer>
    </Article>
  </Page>
);

export default Home;
