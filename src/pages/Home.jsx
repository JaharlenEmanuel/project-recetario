export default function Home() {
    return (
        <div className="max-w-4xl mx-auto p-6 text-center">
            <div className="py-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Descubre Recetas Deliciosas
                </h2>
                <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
                    Busca por nombre de receta o explora sugerencias. Encuentra ingredientes, instrucciones y más.
                </p>

                <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
                    <div className="p-6 bg-white rounded-lg shadow-md border border-orange-100">
                        <div className="text-3xl mb-3">🔍</div>
                        <h3 className="font-semibold mb-2">Busca</h3>
                        <p className="text-sm text-gray-600">Escribe en la barra superior</p>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow-md border border-orange-100">
                        <div className="text-3xl mb-3">📖</div>
                        <h3 className="font-semibold mb-2">Selecciona</h3>
                        <p className="text-sm text-gray-600">Elige de la lista</p>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow-md border border-orange-100">
                        <div className="text-3xl mb-3">👨‍🍳</div>
                        <h3 className="font-semibold mb-2">Cocina</h3>
                        <p className="text-sm text-gray-600">Sigue las instrucciones</p>
                    </div>
                </div>
            </div>
        </div>
    );
}