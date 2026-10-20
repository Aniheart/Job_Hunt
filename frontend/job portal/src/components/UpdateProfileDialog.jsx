
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, UserRound, Mail, Phone, FileText, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(store => store.auth)
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        fullname: '',
        email: '',
        phoneNumber: '',
        bio: '',
        skills: '',
        file: null
    })

    // Refresh form values whenever the dialog opens
    useEffect(() => {
        if (open) {
            setInput({
                fullname: user?.fullname || '',
                email: user?.email || '',
                phoneNumber: user?.phoneNumber || '',
                bio: user?.profile?.bio || '',
                skills: user?.profile?.skills?.join(', ') || '',
                file: null
            })
        }
    }, [open, user])

    const changeEventHandler = (e) => {
        const { name, value } = e.target

        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0]

        if (!file) return

        if (file.type !== 'application/pdf') {
            toast.error('Please select a PDF file.')
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
        formData.append('fullname', input.fullname)
        formData.append('email', input.email)
        formData.append('phoneNumber', input.phoneNumber)
        formData.append('bio', input.bio)
        formData.append('skills', input.skills)

        if (input.file) {
            formData.append('file', input.file)
        }

        try {
            setLoading(true)

            const res = await axios.post(
                `${USER_API_END_POINT}/profile/update`,
                formData,
                { withCredentials: true }
            )

            if (res.data.success) {
                dispatch(setUser(res.data.user))
                toast.success(res.data.message || 'Profile updated successfully.')
                setOpen(false)
            }
        } catch (error) {
            console.error('Profile update error:', error)

            toast.error(
                error.response?.data?.message || 'Failed to update profile.'
            )
        } finally {
            setLoading(false)
        }
    }

    const closeDialog = () => {
        if (!loading) setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={(value) => !value && closeDialog()}>
            <DialogContent
                className="w-[95vw] sm:max-w-[520px] max-h-[85vh] overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-xl sm:p-7"
                onInteractOutside={(e) => {
                    if (loading) e.preventDefault()
                }}
            >
                <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900">
                        Update Profile
                    </DialogTitle>
                    <p className="text-sm text-gray-500">
                        Keep your personal information and resume up to date.
                    </p>
                </DialogHeader>

                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">

                        {/* Full Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="fullname" className="font-medium">
                                Full Name
                            </Label>
                            <div className="relative">
                                <UserRound
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <Input
                                    id="fullname"
                                    name="fullname"
                                    type="text"
                                    value={input.fullname}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your full name"
                                    className="pl-10 rounded-lg focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email" className="font-medium">
                                Email Address
                            </Label>
                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={input.email}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your email"
                                    className="pl-10 rounded-lg focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0"
                                    required
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="grid gap-2">
                            <Label htmlFor="phoneNumber" className="font-medium">
                                Phone Number
                            </Label>
                            <div className="relative">
                                <Phone
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                                />
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    value={input.phoneNumber}
                                    onChange={changeEventHandler}
                                    placeholder="Enter your phone number"
                                    className="pl-10 rounded-lg focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0"
                                    required
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="grid gap-2">
                            <Label htmlFor="bio" className="font-medium">
                                Bio
                            </Label>
                            <textarea
                                id="bio"
                                name="bio"
                                value={input.bio}
                                onChange={changeEventHandler}
                                placeholder="Write a short introduction..."
                                rows={3}
                                className="w-full min-w-0 px-4 py-2 border rounded-lg resize-y focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0"
                            />
                        </div>

                        {/* Skills */}
                        <div className="grid gap-2">
                            <Label htmlFor="skills" className="font-medium">
                                Skills
                            </Label>
                            <Input
                                id="skills"
                                name="skills"
                                value={input.skills}
                                onChange={changeEventHandler}
                                placeholder="React, JavaScript, Node.js"
                                className="min-w-0 rounded-lg focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0"
                            />
                            <p className="text-xs text-gray-500">
                                Separate each skill with a comma.
                            </p>
                        </div>

                        {/* Resume */}
                        <div className="grid gap-2">
                            <Label htmlFor="file" className="font-medium">
                                Resume (PDF)
                            </Label>
                            <div className="flex items-center gap-3 rounded-xl border border-dashed border-gray-300 p-4 hover:border-gray-400 transition-colors">
                                <FileText
                                    size={22}
                                    className="text-gray-500 shrink-0"
                                />
                                <div className="min-w-0 flex-1">
                                    <Input
                                        id="file"
                                        name="file"
                                        type="file"
                                        accept=".pdf,application/pdf"
                                        onChange={fileChangeHandler}
                                        className="w-full min-w-0 border-0 p-0 shadow-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-0"
                                    />
                                    <p className="text-xs text-gray-500 mt-2 break-words">
                                        {input.file
                                            ? input.file.name
                                            : user?.profile?.resumeOriginalName
                                                ? `Current: ${user.profile.resumeOriginalName}`
                                                : 'No resume selected'}
                                    </p>
                                </div>

                                {input.file && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setInput(prev => ({
                                            ...prev,
                                            file: null
                                        }))}
                                        aria-label="Remove selected file"
                                    >
                                        <X size={16} />
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex-col gap-2 pt-2 sm:flex-row">
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full sm:w-auto rounded-lg"
                            onClick={closeDialog}
                            disabled={loading}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            className="w-full sm:w-auto rounded-lg"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving changes...
                                </>
                            ) : (
                                'Save Changes'
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UpdateProfileDialog
