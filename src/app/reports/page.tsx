import { getSaleProducts, getSaleProductMiniBoxes } from "./actions"
import SaleProductMiniboxes from "./components/SaleProductMiniboxes"
import SaleProductSearch from "./components/SaleProductSearch"
import SaleProductTable from "./components/SaleProductTable"

const ReportPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {

    const page = (searchParams?.page != undefined) ? parseInt(searchParams?.page.toLocaleString()) : 1
    const sale_products = await getSaleProducts(page, searchParams)
    const mini_boxes = await getSaleProductMiniBoxes()
    return (
        <div className="py-10 px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center mb-4">
                <div className="sm:flex-auto">
                    <h1 className="text-base font-semibold leading-6 text-gray-900">Report</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        Sale history report
                        {/* A list of all the users in your account including their name, title, email and role. */}
                    </p>
                </div>
            </div>

            <div className="">
                <SaleProductMiniboxes list={mini_boxes} />

                <SaleProductSearch />

                {sale_products?.results && (<SaleProductTable sale_products={sale_products} />)}
            </div>
        </div>
    )
}

export default ReportPage