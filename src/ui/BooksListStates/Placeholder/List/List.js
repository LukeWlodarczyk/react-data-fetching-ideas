import Card from "../Card"

const List = ({ coverImgClass = '', isLoading = false, count = 3 }) => Array.from({ length: count }).map((_, i) => <Card key={i} isLoading={isLoading} coverImgClass={coverImgClass} />);

export default List;
