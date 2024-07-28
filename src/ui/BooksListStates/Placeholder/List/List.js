import Card from '../Card';

const List = ({ coverImgClass = '', isLoading = false, onReset, count = 3 }) =>
  Array.from({ length: count }).map((_, i) => (
    <Card
      key={i}
      onReset={onReset}
      isLoading={isLoading}
      coverImgClass={coverImgClass}
    />
  ));

export default List;
