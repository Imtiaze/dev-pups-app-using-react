import { Heart } from "lucide-react";
import { type Puppy } from "../types";
import { Dispatch, SetStateAction } from "react";
import { RemoveButton } from "./RemoveButton";

export function Shortlist({
  puppies,
  liked,
  setLiked
}: {
  puppies: Puppy[];
  liked: Puppy['id'][];
  setLiked: Dispatch<SetStateAction<Puppy['id'][]>>;
}) {

  return (
    <div>
      <h2 className="flex items-center gap-2 font-medium">
        <span>Your shortlist</span>
        <Heart className="inline-block size-6 fill-pink-500 stroke-pink-500" />
      </h2>
      <ul className="mt-4 flex flex-wrap gap-4">
        {puppies.filter((pup) => liked.includes(pup.id)).map((puppy) => {
          return <ShortPuppyCard key={puppy.id} id={puppy.id} puppy={puppy} liked={liked} setLiked={setLiked} />
        })}
      </ul>
    </div>
  );
}

type ShortPuppyCardProps = {
  id: Puppy['id'];
  puppy: Puppy;
  liked: Puppy['id'][];
  setLiked: Dispatch<SetStateAction<Puppy['id'][]>>;
}

function ShortPuppyCard({ id, puppy, liked, setLiked }: ShortPuppyCardProps) {
  return(
    <li key={puppy.id} className="relative flex items-center overflow-clip rounded-md bg-white shadow-sm ring ring-black/5 transition duration-100 starting:scale-0 starting:opacity-0">
      <img
        height={32}
        width={32}
        alt={puppy.name}
        className="aspect-square w-8 object-cover"
        src={puppy.imageUrl}
      />
      <p className="px-3 text-sm text-slate-800">{puppy.name}</p>
      <RemoveButton id={id} liked={liked} setLiked={setLiked} />
    </li>
  )
}