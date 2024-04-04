import { IFreq } from "../types/IMetar";

type Props = {
    frequencies: IFreq[]
}

export default function AerodromeFrequencies({ frequencies }: Props) {
    return (
        <div>
            <h1>AerodromeFrequencies</h1>
            {
                frequencies.map((freq: IFreq) => {
                    return (
                        <div key={freq.type}>
                            <h2>{freq.type}</h2>
                        </div>
                    )
                })
            }
        </div>
    )
}