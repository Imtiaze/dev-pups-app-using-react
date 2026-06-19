import { Dispatch, SetStateAction, useState } from "react";
import { Puppy } from "../types";
import { useFormStatus } from "react-dom";

export function NewPuppyForm({ 
  puppies,  
  setPuppies

  }: { 
    puppies: Puppy[],
    setPuppies: Dispatch<SetStateAction<Puppy[]>> 
  }) {

    const [name, setName] = useState('');
    const [trait, setTrait] = useState('');

    return (
        <div className="mt-12 flex items-center justify-between bg-white p-8 shadow ring ring-black/5">
        <form 
          action={ async (formData: FormData) => {

            await new Promise((resolve) => setTimeout(resolve, 1500))

            const newPuppy: Puppy = {
              id: puppies.length + 1,
              name: formData.get('name')  as string,
              vibe: formData.get('trait') as string,
              imagePath: `images/${puppies.length + 1}.jpg` 
            }
            setPuppies([...puppies, newPuppy]);
          }}
          className="mt-4 flex w-full flex-col items-start gap-4"
        >
          <div className="grid w-full gap-6 md:grid-cols-3">
            <fieldset className="flex w-full flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input
                required
                className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                id="name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </fieldset>
            <fieldset className="flex w-full flex-col gap-1">
              <label htmlFor="trait">Personality trait</label>
              <input
                required
                className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                id="trait"
                type="text"
                name="trait"
                value={trait}
                onChange={(e) => setTrait(e.target.value)}
              />
            </fieldset>
            <fieldset
              disabled
              className="col-span-2 flex w-full cursor-not-allowed flex-col gap-1 opacity-50"
            >
              <label htmlFor="avatar_url">Profile pic</label>
              <input
                className="max-w-96 rounded-sm bg-white px-2 py-1 ring ring-black/20 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                id="avatar_url"
                type="file"
                name="avatar_url"
              />
            </fieldset>
          </div>
          <SubmitButton />
        </form>
      </div>
    )
}


function SubmitButton() {

  const status = useFormStatus();

  return (
    <button
      disabled:bg-slate-200
      disabled:cursor-not-allowed
      disabled={status.pending}
      className="mt-4 inline-block rounded bg-cyan-300 px-4 py-2 font-medium text-cyan-900 hover:bg-cyan-200 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
      type="submit"
    >
    {status.pending ? `Adding ${status?.data?.get('name') || 'puppy' }...` : "Add puppy"}
    </button>
  )
}