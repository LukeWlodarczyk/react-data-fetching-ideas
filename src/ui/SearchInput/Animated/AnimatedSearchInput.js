import Animation from '../Animation';
import Basic from '../Basic';

const AnimatedSearchInput = ({
  isLoading,
  isSuccess,
  isEmpty,
  isEmptySuccess,
  isError,
  ...props
}) => (
  <Animation
    isLoading={isLoading}
    isSuccess={isSuccess}
    isEmpty={isEmpty}
    isEmptySuccess={isEmptySuccess}
    isError={isError}
  >
    <Basic {...props} />
  </Animation>
);

export default AnimatedSearchInput;
