import React from 'react';

export default function Step3({ data, handleChange }) {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-gray-700">Step 3: Merger & Acquisition</h3>

            <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-2">
                    Has your company undergone any merger or acquisition involving a corporate or multinational company (MNC)?
                </legend>
                <div className="flex items-center gap-x-6">
                    <div className="flex items-center">
                        <input id="mergerYes" name="hasMerger" type="radio" value="yes" required checked={data.hasMerger === 'yes'} onChange={handleChange} className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <label htmlFor="mergerYes" className="ml-2 block text-sm text-gray-900">Yes</label>
                    </div>
                    <div className="flex items-center">
                        <input id="mergerNo" name="hasMerger" type="radio" value="no" checked={data.hasMerger === 'no'} onChange={handleChange} className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <label htmlFor="mergerNo" className="ml-2 block text-sm text-gray-900">No</label>
                    </div>
                </div>
            </fieldset>

            {/* Conditionally render merger details if user selects 'yes' */}
            {data.hasMerger === 'yes' && (
                <div className="space-y-6 pt-4 border-t border-gray-200 mt-6">
                    {/* For simplicity, this shows one merger entry. A full implementation would map over an array of mergers in the state. */}
                    <div className="space-y-4 border p-4 rounded-lg relative">
                        <h4 className="font-semibold text-gray-700">Merger/Acquisition Details</h4>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name of the corporate/MNC involved:</label>
                            <input type="text" name="merger_companyName" value={data.merger_companyName || ''} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Brief description of the deal:</label>
                            <textarea name="merger_description" value={data.merger_description || ''} onChange={handleChange} rows="4" className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300"></textarea>
                        </div>
                    </div>
                    {/* An "Add Another" button would go here to add more entries to the state array. */}
                </div>
            )}
        </div>
    );
}