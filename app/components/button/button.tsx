export default function Button(props: any) {
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
      {...props}
    >
      {props.children}
    </button>
  );
}
