import Image from "next/image"
import React from "react"

type MeasurementsDTO = {
    elementMeasurements: { Width: number; Height: number; };
}
type DataDTO = {
    objectID?: number;
    primaryImage?: string;
    department?: string;
    title?: string;
    artistDisplayName?: string;
    artistDisplayBio?: string;
    medium?: string;
    measurements?: MeasurementsDTO[]
}

export default async function Page({ params }: { params: Promise<{ objectId: string }> }) {
    const resolvedParams = await params;

    const getData = async () => {
        const res = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${resolvedParams.objectId}`)  
        let data: DataDTO = await res.json();
        return data
    } 
    const data = await getData()
    console.log('data:',data);
    
    let imageW = 0;
    let imageH = 0;
    data?.measurements?.forEach((measurement) => {
        if(measurement.elementMeasurements) {
            imageW = measurement.elementMeasurements.Width;
            imageH = measurement.elementMeasurements.Height;
        }
    })

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                {/* {data.primaryImage  != '' ? <Image src={`${data.primaryImage}`} width={imageW} height={imageH} alt={`${data.title}`} /> : 'No Image to display'} */}
                {data.primaryImage  != '' ? <Image src={`${data.primaryImage}`} width={600} height={600} alt={`${data.title}`} /> : 'No Image to display'}
            </main>
            <div className="info py-4 px-8 bg-white rounded">
                <h2 className="font-bold text-black">{data.title} - {data.medium}</h2>
                <p className="text-black">{data.artistDisplayName} - {data.artistDisplayBio}</p>
            </div>
        </div>
    )
}