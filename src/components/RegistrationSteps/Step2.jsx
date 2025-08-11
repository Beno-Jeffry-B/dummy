import React from 'react';

export default function Step2({ data, handleChange }) {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-center text-gray-700">Step 2: Innovation & IP</h3>

            <div>
                <label htmlFor="innovations" className="block text-sm font-medium text-gray-700 mb-1">
                    Briefly describe the key innovations introduced by your company:
                </label>
                <textarea
                    id="innovations"
                    name="innovations"
                    rows="4"
                    required
                    value={data.innovations || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-white border border-gray-300"
                ></textarea>
            </div>

            <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-2">
                    Have you filed or been granted any Intellectual Property Rights (IPRs)?
                </legend>
                <div className="flex items-center gap-x-6">
                    <div className="flex items-center">
                        <input id="iprYes" name="hasIpr" type="radio" value="yes" required checked={data.hasIpr === 'yes'} onChange={handleChange} className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <label htmlFor="iprYes" className="ml-2 block text-sm text-gray-900">Yes</label>
                    </div>
                    <div className="flex items-center">
                        <input id="iprNo" name="hasIpr" type="radio" value="no" checked={data.hasIpr === 'no'} onChange={handleChange} className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <label htmlFor="iprNo" className="ml-2 block text-sm text-gray-900">No</label>
                    </div>
                </div>
            </fieldset>

            {/* Conditionally render IPR details if user selects 'yes' */}
            {data.hasIpr === 'yes' && (
                <div className="space-y-6 pt-4 border-t border-gray-200 mt-6">
                    <p className="text-sm font-medium text-gray-700">If yes, please specify the type of IPR and provide details:</p>
                    {/* Add specific IPR type fields here */}
                    <div>
                        <label htmlFor="iprUpload" className="block text-sm font-medium text-gray-700 mb-1">
                            Upload copies of IPR certificates or application acknowledgements:
                        </label>
                        <input type="file" id="iprUpload" name="iprUpload" multiple className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                    </div>
                </div>
            )}
        </div>
    );
}