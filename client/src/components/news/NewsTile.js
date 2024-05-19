import React from "react";
import { Button } from "@mui/material";
import { Data } from "./NewsImages"

const NewsTile = ({ view, data }) => {
    return (
        <div className="flex flex-col p-6 bg-zinc-900 text-zinc-100 rounded-lg space-y-4">
            <div className="line-clamp-2 min-h-12">
                <div className="text-lg leading-snug">{data.headline}</div>
            </div>
            {view === "primary" ?
                <div className="flex flex-col space-y-4 justify-between flex-1">
                    <div className="line-clamp-3">
                        <div className="text-zinc-300">{data.short_description}</div>
                    </div>
                    <Button variant="contained" color="success" sx={{ fontSize: 16 }} href={data.link}>Read News</Button>
                </div> :
                <img className="rounded-md w-full h-auto" src={Data[data.category]} alt="IMG" />
            }
        </div>
    )
}

export default NewsTile;