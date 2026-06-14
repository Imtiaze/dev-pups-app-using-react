import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export function RemoveButton({ id, liked, setLiked }: { id: number; liked: number[]; setLiked: Dispatch<SetStateAction<number[]>> }) {
    return (

        <button 
          className="group h-full border-l border-slate-100 px-2 hover:bg-slate-100"
          onClick={() => setLiked(liked.filter((likeId) => likeId !== id))}
        >
        <X className=" size-4 stroke-slate-400 group-hover:stroke-red-400" />
      </button>

    )
}