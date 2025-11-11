export default function CategoryButtons({
  categories,
  loading,
  error,
  onSelect,
}) {
  if (loading) return <p className="text-gray-400">Cargando categorías...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((cat) => (
        <button
          key={cat.idCategory}
          onClick={() => onSelect(cat.strCategory)}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition active:scale-95"
        >
          {cat.strCategory}
        </button>
      ))}
    </div>
  );
}
