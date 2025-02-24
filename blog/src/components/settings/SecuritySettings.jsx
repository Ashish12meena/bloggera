import React from 'react'

const SecuritySettings = () => {
    return (
        <>
            <div className="p-6">
                <h2 className="text-2xl font-semibold">Security Settings</h2>
                <p className="text-gray-600">Enable two-factor authentication and more.</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Update Security</button>
            </div>
        </>
    )
}

export default SecuritySettings