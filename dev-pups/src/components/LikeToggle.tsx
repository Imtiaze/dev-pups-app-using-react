import { Heart, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Puppy } from "../types";

export function LikeToggle({ 
        puppy
    }: {
        puppy: Puppy;     
    }) {

    const [isLoading, setIsLoading] = useState(false);

    return (
        <button 
            className="group" 
            onClick={() => {

                setIsLoading(true);
                // setTimeout(() => {
                //     if (liked.includes(id)) {
                //         setLiked(liked.filter((likedId) => likedId !== id))
                //     } else {
                //         setLiked([...liked, id])
                //     }
                //     setIsLoading(false);
                // }, 1500)

            }}
        >
            { 
                isLoading 
                    ? <LoaderCircle className="animate-spin stroke-slate-300" />
                    : (
                        <Heart 
                            className={
                                puppy.likedBy.includes(1)
                                    ? "fill-pink-500 stroke-none"
                                    : "stroke-slate-200 group-hover:stroke-slate-300"
                                }
                        />
                    )

            }
        </button>
    )
}