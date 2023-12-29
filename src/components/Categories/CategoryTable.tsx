'use client'

import { destroyCategory, updateCategory } from "@/app/categories/actions";
import { faCheck, faPencilAlt, faTimes, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Swal from "sweetalert2";
import Input from "../Form/Input";
import Switch from "../Form/Switch";
import { iCategory, iCategoryType } from "@/models/category";

type CategoryProps = {
  categories: {
    results: iCategory[] | any
  }
}

const CategoryTable = ({ categories }: CategoryProps) => {
  const router = useRouter()
  const [edit, setEdit] = useState<iCategory>({} as iCategory)
  const [errorName, setErrorName] = useState<string>('')

  const deleteCategory = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6e7881',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await destroyCategory(id)
          Swal.fire(
            'Deleted!',
            'Your item has been deleted.',
            'success',
          )
          router.refresh()
        } catch (error) {
          console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: CategoryTable.tsx:49 ~ deleteCategory ~ error:", error)
        }
      }
    })
  }

  const validateForm = (): boolean => {
    if (edit.name.trim().length < 4) {
      setErrorName('Name must be at least 4 characters')
    }

    return edit.name.trim().length >= 4
  }

  const handleUpdateCategory = async () => {
    if (validateForm()) {
      try {
        await updateCategory(edit.id, edit)
        router.refresh()
        setEdit({} as iCategory)
        setErrorName('')
      } catch (error) {
        console.log("%c%s", "background: #ff0000; color: #000000", "🚀 ~ file: CategoryTable.tsx:64 ~ updateCategory ~ error:", error)
      }
    }
  }

  return (
    <div className="mt-8 flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8"
                >
                  Status
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 lg:pr-8 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {categories?.results?.map((cate: iCategory) => (
                <tr key={cate.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6 lg:pl-8">
                    {edit.id === cate.id
                      ? <>
                        <Input size="sm" defaultValue={cate.name} onChange={(e: any) => setEdit({ ...edit, name: e.target.value })} />
                        {errorName && <p className='helper-error'>{errorName}</p>}
                      </>
                      : cate.name}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6 lg:pl-8">
                    {edit.id === cate.id
                      ? <>
                        <Switch
                          status={cate.is_active}
                          onChange={(newStatus: boolean) => setEdit({ ...edit, is_active: newStatus })} />
                      </>
                      : <>{cate.is_active ? <span className="text-green-500">Active</span> : "Inactive"}</>}
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 lg:pr-8 space-x-2">
                    {edit.id === cate.id ? (
                      <>
                        <span className="text-green-500 hover:text-green-800 cursor-pointer" onClick={() => handleUpdateCategory()}>
                          <FontAwesomeIcon icon={faCheck} />
                        </span>
                        <span className="text-red-500 hover:text-red-800 cursor-pointer" onClick={() => { setEdit({} as iCategory), setErrorName('') }}>
                          <FontAwesomeIcon icon={faTimes} />
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-yellow-500 hover:text-yellow-800 cursor-pointer" onClick={() => setEdit(cate)}>
                          <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                        {cate.type !== iCategoryType.SYSTEM && (
                          <span className="text-red-500 hover:text-red-800 cursor-pointer" onClick={() => deleteCategory(cate.id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </span>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default CategoryTable
