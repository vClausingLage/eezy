import { IFreq } from "../types/IMetar";

type Props = {
    frequencies: IFreq[]
}

export default function AerodromeFrequencies({ frequencies }: Props) {
    return (
        <div>
            <h1>AerodromeFrequencies</h1>
        </div>
    )
}