export default function CategoryButtons({
  data,
  loading,
  error,
  onSelect,
  selectedCategory
}) {
  if (loading) return <p className="text-gray-400">Cargando categorías...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {data.map((cat) => (
        <button
          key={cat.idCategory}
          onClick={() => onSelect(cat.strCategory)}
          className={`px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition active:scale-95 ${selectedCategory === cat.strCategory
            ? "bg-blue-800 text-white"
            : "bg-blue-600 text-white"
            }`}
        >
          {cat.strCategory}
        </button>
      ))}
    </div>
  );
}