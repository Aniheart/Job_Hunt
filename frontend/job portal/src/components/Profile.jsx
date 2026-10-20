
import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText, UserRound } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs();

    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    const skills = user?.profile?.skills || [];
    const resume = user?.profile?.resume;
    const resumeName = user?.profile?.resumeOriginalName;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

                {/* Profile Card */}
                <section className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-8">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
                        <div className="flex items-center gap-4 min-w-0">
                            <Avatar className="h-20 w-20 sm:h-24 sm:w-24 shrink-0 border-2 border-gray-100">
                                <AvatarImage
                                    src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"}
                                    alt="Profile"
                                />
                            </Avatar>

                            <div className="min-w-0">
                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">
                                    {user?.fullname || "Your Name"}
                                </h1>
                                <p className="text-sm sm:text-base text-gray-500 mt-1 break-words">
                                    {user?.profile?.bio || "Add a short bio about yourself."}
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={() => setOpen(true)}
                            variant="outline"
                            className="self-start sm:self-center rounded-full h-10 w-10 p-0 shrink-0"
                            aria-label="Edit profile"
                        >
                            <Pen size={17} />
                        </Button>
                    </div>

                    <div className="border-t border-gray-100 my-7" />

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3 rounded-xl bg-gray-50 border border-gray-100 p-4 min-w-0">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-50 text-blue-600 shrink-0">
                                <Mail size={19} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-gray-500 mb-1">Email Address</p>
                                <p className="text-sm font-medium text-gray-800 break-all">
                                    {user?.email || "Not provided"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl bg-gray-50 border border-gray-100 p-4 min-w-0">
                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-50 text-green-600 shrink-0">
                                <Contact size={19} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                                <p className="text-sm font-medium text-gray-800 break-words">
                                    {user?.phoneNumber || "Not provided"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Skills */}
                    <div className="mt-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-3">
                            Skills
                        </h2>

                        <div className="flex flex-wrap gap-2">
                            {skills.length > 0 ? (
                                skills.map((item, index) => (
                                    <Badge
                                        key={`${item}-${index}`}
                                        variant="secondary"
                                        className="rounded-full px-4 py-1.5 text-sm font-medium"
                                    >
                                        {item}
                                    </Badge>
                                ))
                            ) : (
                                <span className="text-sm text-gray-500">
                                    No skills added yet.
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Resume */}
                    <div className="mt-8">
                        <Label className="text-lg font-semibold text-gray-900">
                            Resume
                        </Label>

                        <div className="mt-3">
                            {resume ? (
                                <a
                                    href={resume}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 max-w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors"
                                >
                                    <FileText size={20} className="shrink-0" />
                                    <span className="break-all">
                                        {resumeName || "View Resume"}
                                    </span>
                                </a>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    No resume uploaded yet.
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Applied Jobs */}
                <section className="mt-8 sm:mt-10">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                Applied Jobs
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Track the jobs you've applied for.
                            </p>
                        </div>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <AppliedJobTable />
                        </div>
                    </div>
                </section>
            </main>

            <UpdateProfileDialog
                open={open}
                setOpen={setOpen}
            />
        </div>
    )
}

export default Profile
