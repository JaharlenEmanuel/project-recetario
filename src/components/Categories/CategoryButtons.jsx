export default function CategoryButtons({ data, loading, error, onSelect }) {
  if (loading) return <p className="text-gray-400">Cargando categorías...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  if (!data || data.length === 0)
    return <p className="text-gray-500">No hay categorías disponibles.</p>;

  return (
    <div className="flex flex-wrap gap-2 mb-6 justify-center">
      {data.map((cat) => (
        <button
          key={cat.idCategory}
          onClick={() => onSelect(cat.strCategory)}
          className="px-4 py-2 bg-orange-500 text-white rounded-xl shadow hover:bg-orange-600 transition active:scale-95"
        >
          {cat.strCategory}
        </button>
      ))}
    </div>
  );
}