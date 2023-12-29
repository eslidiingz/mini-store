import CategoryTable from '@/components/Categories/CategoryTable'
import CategoryForm from '@/components/Categories/CategoryForm'
import { getCategories } from './actions';

const CategoryIndexPage = async () => {
  const categories = await getCategories();

  return (
    <div className='py-10 px-4 sm:px-6 lg:px-8'>
      <div className="flex justify-between">
        <h3 className='text-2xl font-bold'>Categories</h3>
        <CategoryForm />
      </div>

      { categories?.results  && (
        <CategoryTable categories={categories} />
      )}
    </div>
  )
}

export default CategoryIndexPage



