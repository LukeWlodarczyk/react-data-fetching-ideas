import Animation from '../Animation';
import Basic from '../Basic';

const AnimatedSearchInput = ({
  isLoading,
  isSuccess,
  isEmpty,
  isEmptyBooks,
  isError,
  ...props
}) => (
  <Animation
    isLoading={isLoading}
    isSuccess={isSuccess}
    isEmpty={isEmpty}
    isEmptyBooks={isEmptyBooks}
    isError={isError}
  >
    <Basic {...props} />
  </Animation>
);

export default AnimatedSearchInput;
