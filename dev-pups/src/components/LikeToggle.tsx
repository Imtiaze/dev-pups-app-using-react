import { Heart, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Puppy } from "../types";
import { toggleLikedStatus } from "../queries";

export function LikeToggle({ 
        puppy
    }: {
        puppy: Puppy;     
    }) {

    const [isLoading, setIsLoading] = useState(false);

    return (
        <button 
            className="group" 
            onClick={ async () => {

                setIsLoading(true);

                const updatedPuppy = await toggleLikedStatus(puppy.id);

                console.log(updatedPuppy);

                setIsLoading(false);

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