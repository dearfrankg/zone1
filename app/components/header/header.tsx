export default function Header({ title, description, tags }: any) {
  return (
    <header className="space-y-6 mb-32">
      <h1 className="text-2xl font-medium">{title}</h1>
      <div>{description}</div>
      <ul>
        {tags.map((tag: any) => (
          <li key={tag} className="inline mr-2 px-3 py-1 bg-indigo-100 rounded">
            {tag}
          </li>
        ))}
      </ul>
    </header>
  );
}
