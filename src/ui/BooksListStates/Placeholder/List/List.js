import Card from '../Card';

const List = ({ coverImgClass = '', isLoading = false, onRetry, count = 3 }) =>
  Array.from({ length: count }).map((_, i) => (
    <Card
      key={i}
      onRetry={onRetry}
      isLoading={isLoading}
      coverImgClass={coverImgClass}
    />
  ));

export default List;
