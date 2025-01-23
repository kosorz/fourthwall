import {SearchParams} from "@/lib/types/search-params";

type Props = { searchParams: SearchParams }

export default async function CustomResults({searchParams}: Props) {
    const {q} = searchParams
    return <div>{q}</div>;
}