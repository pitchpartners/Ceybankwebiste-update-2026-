import Image from "next/image"

const trustedBy:string[] = [
    'boc.png',
    'sli.png',
    'c.png',
    'suuti.jpeg',
    'nsb.png',
]

export default function TrustedBy(){
    return(
        <div className="relative overflow-hidden flex flex-col justify-between w-full ms-auto pointer-events-none">
            <div className="flex my-16 lg:my-24">
                <div className="flex items-center whitespace-nowrap animate-[trusted-by_30s_linear_infinite]">
                    {trustedBy.map((icon,index)=>(
                        <div key={index} className="h-[85px] lg:h-[102px] w-full min-w-[120px] lg:min-w-[224px] bg-background shadow-lg lg:shadow-xl rounded-2xl lg:rounded-lg relative mx-[5vw] py-2 px-4">
                            <div className="relative w-full h-full">
                                {icon == "nsb.png" && <p className="text-md font-bold text-black absolute z-10 -bottom-2 text-center w-full">NSB Trustee Services</p>}
                                <Image priority fill className="object-contain hover:grayscale" src={`/images/trusted-by/${icon}`} alt={icon}/>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex items-center whitespace-nowrap animate-[trusted-by_30s_linear_infinite]">
                    {trustedBy.map((icon,index)=>(
                        <div key={index} className="h-[85px] lg:h-[102px] w-full min-w-[120px] lg:min-w-[224px] bg-background shadow-lg lg:shadow-xl rounded-2xl lg:rounded-lg relative mx-[5vw] py-2 px-4">
                            <div className="relative w-full h-full">
                                <Image priority fill className="object-contain" src={`/images/trusted-by/${icon}`} alt={icon}/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}