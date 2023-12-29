'use client'

import { Stock, iStock } from "@/models/stock"
import { faCalendar, faCalendarAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import dayjs from "dayjs"

type StockHistoryProps = {
  histories: any
}

const StockHistory = ({ histories }: StockHistoryProps) => {

  return (
    <>
      {histories && histories?.map((history: iStock) => (
        <div className="border-b border-gray-200" key={history.id}>
          <div 
            key={history.id}
            className="flex justify-between p-4"
          >
            <div className="text-gray-400 text-sm"><FontAwesomeIcon icon={faCalendarAlt} /> { dayjs(history.created_at).format("YYYY-MM-DD HH:mm:ss") }</div>
            <div>{ history.amount > 0 ? <span className="text-green-500">{`+${history.amount}`}</span> : history.amount }</div>
          </div>
        </div>
      ))}
    </>
  )
}


export default StockHistory
