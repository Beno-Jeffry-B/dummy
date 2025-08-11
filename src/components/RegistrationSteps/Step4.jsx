import React from 'react';

export default function Step4({ data, handleChange }) {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-gray-700">Step 4: Awards & Collaborations</h3>

            <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-2">
                    Have you established foreign collaborations or maintain an international presence?
                </legend>
                <div className="flex items-center gap-x-6">
                    <div className="flex items-center">
                        <input id="foreignYes" name="hasForeign" type="radio" value="yes" required checked={data.hasForeign === 'yes'} onChange={handleChange} className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <label htmlFor="foreignYes" className="ml-2 block text-sm text-gray-900">Yes</label>
                    </div>
                    <div className="flex items-center">
                        <input id="foreignNo" name="hasForeign" type="radio" value="no" checked={data.hasForeign === 'no'} onChange={handleChange} className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <label htmlFor="foreignNo" className="ml-2 block text-sm text-gray-900">No</label>
                    </div>
                </div>
            </fieldset>

            {data.hasForeign === 'yes' && (
                <div className="space-y-4 pt-4 border-t border-gray-200 mt-6">
                    <label htmlFor="foreignDescription" className="block text-sm font-medium text-gray-700 mb-1">
                        Please describe the nature of your foreign collaborations or international presence:
                    </label>
                    <textarea id="foreignDescription" name="foreignDescription" value={data.foreignDescription || ''} onChange={handleChange} rows="4" className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300"></textarea>
                </div>
            )}

            <fieldset className="pt-4 border-t border-gray-200">
                <legend className="block text-sm font-medium text-gray-700 mb-2">
                    Has the company or the applicant received any notable awards, certifications, or recognitions?
                </legend>
                <div className="flex items-center gap-x-6">
                    <div className="flex items-center">
                        <input id="awardsYes" name="hasAwards" type="radio" value="yes" required checked={data.hasAwards === 'yes'} onChange={handleChange} className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <label htmlFor="awardsYes" className="ml-2 block text-sm text-gray-900">Yes</label>
                    </div>
                    <div className="flex items-center">
                        <input id="awardsNo" name="hasAwards" type="radio" value="no" checked={data.hasAwards === 'no'} onChange={handleChange} className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <label htmlFor="awardsNo" className="ml-2 block text-sm text-gray-900">No</label>
                    </div>
                </div>
            </fieldset>
        </div>
    );
}