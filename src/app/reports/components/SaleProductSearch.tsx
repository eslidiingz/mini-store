'use client'
import Card from '@/components/Card'
import Input from '@/components/Form/Input'
import { faEraser, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter, useSearchParams } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

const SaleProductSearch = () => {
    const router = useRouter()
    const searchParams: any = useSearchParams()

    const [saleId, setSaleId] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")

    const onSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        router.push(`?sale_id=${saleId}&start_date=${startDate}&end_date=${endDate}`)
    }

    const onReset = () => {
        setSaleId("")
        setStartDate("")
        setEndDate("")
        router.push(`/reports`)
    }

    return (
        <section className="mb-4">
            <Card>
                <form onSubmit={onSearch}>
                    <div className="form-group">
                        <Input type="text" className="w-full" placeholder='Sale ID'
                            onChange={(e: ChangeEvent<HTMLFormElement>) => setSaleId(e.target.value)}
                            defaultValue={searchParams?.sale_id}
                        />
                    </div>
                    <div className="form-group">
                        <div className="flex justify-between space-x-4">
                            <Input type="date" className="w-full" placeholder='Start date'
                                onChange={(e: ChangeEvent<HTMLFormElement>) => setStartDate(e.target.value)} />
                            <Input type="date" className="w-full" placeholder='End date'
                                onChange={(e: ChangeEvent<HTMLFormElement>) => setEndDate(e.target.value)} />
                        </div>
                    </div>

                    <button className='btn btn-primary'><FontAwesomeIcon icon={faSearch} /> Search</button>
                    <button className='btn btn-secondary ml-2' type='reset' onClick={onReset}><FontAwesomeIcon icon={faEraser} /> Reset</button>
                </form>
            </Card>
        </section>
    )
}

export default SaleProductSearch