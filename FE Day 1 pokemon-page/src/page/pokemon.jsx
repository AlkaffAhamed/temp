import { data } from "./data"
import { PokemonCard } from "../components/pokemon-card"

export function PokemonPage ()
{
  return(
    <div className="grid grid-cols-4 gap-6">
      {data.map((pm) => (
        <PokemonCard img={pm.thumbnail} name={pm.name.english} desc={pm.description} key={pm.id} />
      ))}
    </div>
  )
}