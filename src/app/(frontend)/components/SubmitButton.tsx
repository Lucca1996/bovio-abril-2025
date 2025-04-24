import { Button } from "@/components/ui/button";
import React, { ReactElement } from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai"

export default function SubmitButton({loading, text}: {loading: boolean, text: string}): ReactElement {
    return <Button type="submit" className="w-full text-white bg-slate-700 hover:bg-black" disabled={loading}>
            {text}{" "}
            <AiOutlineLoading3Quarters className={`animate-spin ${loading ? "block" : "hidden"}`} />
            </Button>
}