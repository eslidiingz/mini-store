'use client'

import { Fragment, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { classNames } from '@/misc'

type SelectBoxProps = {
  options: any;
  optionsSelected: any;
  label: string;
  isRequired?: boolean;
  // isInvalid: boolean;
  errorMessage?: string;
  onChange: (value: any) => void;
  isReset?: boolean;
  onReset?: () => void;
}

type OptionSelected = {
  id: string | number;
  name: string;
}

export default function SelectBox({ options, optionsSelected, label = "", isRequired = false, errorMessage = "", onChange, isReset = false, onReset }: SelectBoxProps) {
  const [selected, setSelected] = useState<any>(optionsSelected)
  
  const handleSelected = (item: any) => {
      setSelected(item)
      onChange && onChange(item)
  }

  useEffect(() => {
    if ( isReset ) {
      setSelected(options[0])
      onReset && onReset()
    }
  }, [isReset])

  useEffect(() => {
    if ( optionsSelected ) {
      setSelected(optionsSelected)
    }
  }, [optionsSelected])

  return (
    <Listbox value={selected} onChange={handleSelected}>
      {({ open }) => (
        <>
          <Listbox.Label className="label">
            {label}
            {isRequired && (
              <span className="text-red-600">*<span className="helper-error">{errorMessage}</span></span>
            )}
          </Listbox.Label>
          <div className="relative mt-2">
            <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] sm:text-sm sm:leading-6 pl-4 pr-10 py-2.5">
              <span className="block truncate">{selected?.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((item: any) => (
                  <Listbox.Option
                    key={item.id}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-[var(--primary-color)] text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-8 pr-4'
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {item.name}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-[var(--primary-color)]',
                              'absolute inset-y-0 left-0 flex items-center pl-1.5'
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
