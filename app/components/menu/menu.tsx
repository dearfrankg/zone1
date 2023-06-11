export default function Menu({ collection, handleMenuClick }: any) {
  return (
    <ul>
      {collection.map((item: any, index: number) => (
        <li
          key={item.title}
          className="bg-indigo-200 mb-1 p-2 text-large font-medium cursor-pointer select-none"
          onClick={() => handleMenuClick(index)}
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
}
