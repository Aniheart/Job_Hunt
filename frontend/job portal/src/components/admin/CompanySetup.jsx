
import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2, Building2, Globe, MapPin, FileText } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    useGetCompanyById(id)

    const { singleCompany } = useSelector(store => store.company)

    const [loading, setLoading] = useState(false)
    const [input, setInput] = useState({
        name: '',
        description: '',
        website: '',
        location: '',
        file: null
    })

    // Populate form only when company data is available
    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || '',
                description: singleCompany.description || '',
                website: singleCompany.website || '',
                location: singleCompany.location || '',
                file: null
            })
        }
    }, [singleCompany])

    const changeEventHandler = (e) => {
        const { name, value } = e.target

        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0]

        if (!file) return

        if (!file.type.startsWith('image/')) {
            toast.error('Please select a valid image file.')
            e.target.value = ''
            return
        }

        setInput(prev => ({
            ...prev,
            file
        }))
    }

    const submitHandler = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name', input.name)
        formData.append('description', input.description)
        formData.append('website', input.website)
        formData.append('location', input.location)

        if (input.file) {
            formData.append('file', input.file)
        }

        try {
            setLoading(true)

            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${id}`,
                formData,
                { withCredentials: true }
            )

            if (res.data.success) {
                toast.success(res.data.message || 'Company updated successfully.')
                navigate('/admin/companies')
            }
        } catch (error) {
            console.error('Update company error:', error)

            toast.error(
                error.response?.data?.message ||
                'Failed to update company. Please try again.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/admin/companies')}
                        className="rounded-full h-10 w-10 p-0 shrink-0"
                        aria-label="Back to companies"
                    >
                        <ArrowLeft size={18} />
                    </Button>

                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                            Company Setup
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Update your company information.
                        </p>
                    </div>
                </div>

                {/* Form Card */}
                <form
                    onSubmit={submitHandler}
                    className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-8"
                >
                    <div className="flex items-center gap-3 mb-7">
                        <div className="h-12 w-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                            <Building2 size={24} />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">
                                Company Information
                            </h2>
                            <p className="text-sm text-gray-500">
                                Keep your details accurate and up to date.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        {/* Company Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">Company Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                placeholder="Enter company name"
                                className="rounded-lg"
                                required
                            />
                        </div>

                        {/* Website */}
                        <div className="grid gap-2">
                            <Label htmlFor="website">Website</Label>
                            <div className="relative">
                                <Globe
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <Input
                                    id="website"
                                    type="url"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    placeholder="https://example.com"
                                    className="pl-9 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Location */}
                        <div className="grid gap-2">
                            <Label htmlFor="location">Location</Label>
                            <div className="relative">
                                <MapPin
                                    size={17}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <Input
                                    id="location"
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    placeholder="City, State"
                                    className="pl-9 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Logo */}
                        <div className="grid gap-2">
                            <Label htmlFor="file">Company Logo</Label>
                            <Input
                                id="file"
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="rounded-lg cursor-pointer"
                            />
                            {input.file && (
                                <p className="text-xs text-gray-500 break-all">
                                    Selected: {input.file.name}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="grid gap-2 sm:col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                placeholder="Describe your company..."
                                rows={5}
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    {/* Current logo */}
                    {singleCompany?.logo && (
                        <div className="mt-6">
                            <Label>Current Company Logo</Label>
                            <div className="mt-2">
                                <img
                                    src={singleCompany.logo}
                                    alt="Current company logo"
                                    className="h-20 w-20 rounded-xl border border-gray-200 object-contain bg-white p-2"
                                />
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-8 pt-6 border-t border-gray-100">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate('/admin/companies')}
                            disabled={loading}
                            className="rounded-lg"
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-[#6A38C2] hover:bg-[#5528A8] text-white"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving Changes...
                                </>
                            ) : (
                                <>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    )
}

export default CompanySetup
