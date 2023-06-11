export default function Header({ title, description }: any) {
  return (
    <header className="space-y-6 mb-32">
      <h1 className="text-2xl font-medium">{title}</h1>
      <div>{description}</div>
    </header>
  );
}
