import React from "react";

export default function MyMentor() {
    return (
        <div id="mymentors" className="w-300 p-50 ml-40">
            <div className="border rounded-lg p-4 space-y-4 w-full bg-white shadow-sm">
                {/* Title */}
                <h2 className="text-lg font-semibold text-primary">
                    My Mentor
                </h2>

                {/* Mentor info card */}

                <div className="flex justify-between items-center border rounded-md p-3 bg-gray-50">
                    {/* Left side */}
                    <div>
                        <p className="font-medium text-primary">
                            Emily Johnson
                        </p>
                        <p className="text-sm text-primary">Year</p>
                        <p className="text-sm text-primary">Last contact</p>
                    </div>
                    {/* Right side */}
                    <div className="flex flex-col items-end">
                        <span className="text-xs  text-primary">Active</span>
                        {/* Placeholder for avatar/icon */}
                        <div className="mt-2 w-8 h-8 bg-purple-300 rounded-full"></div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button className="text-primary flex-1 flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-gray-100">
                        <div className="w-5 h-5 bg-purple-300 rounded-full "></div>
                        Message
                    </button>
                    <button className="flex-1 border rounded-md py-2 hover:bg-gray-100 text-primary">
                        Schedule
                    </button>
                </div>

                {/* Last Session */}
                <div className="border rounded-md p-3">
                    <p className="font-medium text-primary">Last Session</p>
                    <p className="text-sm mt-1 text-primary">
                        Study Strategies for finals - 3 days ago
                    </p>
                </div>
            </div>
        </div>
    );
}
