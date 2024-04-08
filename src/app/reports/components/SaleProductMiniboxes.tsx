'use client'
import { numberFormat } from "@/misc"
import styled from "styled-components"

type SummaryBox = { _sum: { amount: number, total_balance: number } }
type SaleProductMiniboxesProps = {
    list: any
    // list: {
    //     today: SummaryBox
    //     monthly: SummaryBox
    //     yearly: SummaryBox
    // }
}
const SaleProductMiniboxes = ({ list }: SaleProductMiniboxesProps) => {

    return (
        <>
            <section className="sale-product-report mb-4">
                <div className="mini-boxes gap-8">
                    {Object.entries(list).map((box: any,) => (
                        <CardMiniBox key={box[0]}>
                            <div className="font-bold capitalize">{box[0]}</div>
                            <div>{numberFormat(box[1]._sum.amount, 0)} items</div>
                            <div>{numberFormat(box[1]._sum.total_balance)} Baht</div>
                        </CardMiniBox>
                    ))}
                </div>
            </section>
        </>
    )
}

export default SaleProductMiniboxes

const CardMiniBox = styled.div`
    background: white;
    padding: 0.25rem;
    border-radius: 1rem;
    text-align: center;
    cursor: default;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    max-width: 100%;
    padding: 2rem;
    width: 100%;
`