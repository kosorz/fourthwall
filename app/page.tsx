import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Form from 'next/form'
import {SearchParams} from "@/lib/types/search-params";

type Props = { searchParams: SearchParams }

export default async function Home({searchParams}: Props) {
    const {q} = searchParams

    return <Form action={'/'} className='flex gap-1 items-center'>
        <Input defaultValue={q} name='q'/>
        <Button type='submit' size={'lg'}>test</Button>
    </Form>
}
