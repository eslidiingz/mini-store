import { allProductPaginate } from "./actions"
import ProductForm from "./components/ProductForm"
import ProductTable from "./components/ProductTable"

export default async function ProductPage() {
  const products = await allProductPaginate()

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the products in your system
            {/* A list of all the users in your account including their name, title, email and role. */}
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-12">
              {products?.results && ( <ProductTable products={products} /> )}

              <ProductForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
