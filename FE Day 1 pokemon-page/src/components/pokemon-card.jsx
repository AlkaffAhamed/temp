


export function PokemonCard({img, name, desc})
{
  return(
    <div className="flex flex-col rounded-lg text-center bg-white rounded-lg shadow divide-y divide-gray-200">
      <img src={img} className="w-32 h-32 flex-shrink-0 mx-auto bg-gray-200 rounded-full" alt={name}/>
      <h3 className="mt-6 text-gray-900 text-sm font-medium">{name}</h3>
      <p className="mt-1 py-1 px-2 flex-grow flex flex-col justify-between text-gray-500 text-sm line-clamp-3">{desc}</p>
    </div>
  )
}