
import React, { useEffect, useState } from 'react'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
    {
        filterType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        filterType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        filterType: "Salary",
        array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
    },
]

const FilterCard = () => {
    const [selectedValues, setSelectedValues] = useState([])
    const dispatch = useDispatch()

    const changeHandler = (filterType, value, checked) => {
        const selectedKey = `${filterType}::${value}`

        setSelectedValues(prev =>
            checked
                ? prev.includes(selectedKey)
                    ? prev
                    : [...prev, selectedKey]
                : prev.filter(item => item !== selectedKey)
        )
    }

    useEffect(() => {
        dispatch(
            setSearchedQuery(
                selectedValues.map(value => value.split('::')[1])
            )
        )
    }, [selectedValues, dispatch])

    return (
        <div className="w-full bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <h1 className="font-bold text-lg text-gray-900">
                Filter Jobs
            </h1>

            <hr className="my-3" />

            <div className="space-y-5">
                {filterData.map((data) => (
                    <div key={data.filterType}>
                        <h2 className="font-semibold text-base mb-3">
                            {data.filterType}
                        </h2>

                        <div className="space-y-3">
                            {data.array.map((item) => {
                                const itemId = `${data.filterType}-${item}`
                                const selectedKey = `${data.filterType}::${item}`

                                return (
                                    <div
                                        key={itemId}
                                        className="flex items-center gap-2"
                                    >
                                        <Checkbox
                                            id={itemId}
                                            checked={selectedValues.includes(selectedKey)}
                                            onCheckedChange={(checked) =>
                                                changeHandler(data.filterType, item, checked === true)
                                            }
                                        />

                                        <Label
                                            htmlFor={itemId}
                                            className="text-sm font-normal cursor-pointer"
                                        >
                                            {item}
                                        </Label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FilterCard
