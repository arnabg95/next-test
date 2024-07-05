export default function CatrgoryUlSkeleton() {
  const category = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
  ];
  return (
    <ul>
      {category?.map((value) => {
        return (
          <li className="skeleton" key={value.id}>
            <div className="category-icon im-g"></div>
            <p className="ms-2 text-line"></p>
          </li>
        );
      })}
    </ul>
  );
}
