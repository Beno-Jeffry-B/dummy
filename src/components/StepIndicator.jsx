import React from 'react';

export default function StepIndicator({ currentStep, totalSteps, onStepClick, completedStep }) {
    const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="step-indicator-container w-full px-8">
                <div className="flex justify-between w-full">
                    {steps.map((step) => {
                        let stepClass = '';
                        if (step < currentStep) {
                            stepClass = 'completed';
                        } else if (step === currentStep) {
                            stepClass = 'active';
                        }

                        return (
                            <div
                                key={step}
                                className={`step ${stepClass}`}
                                onClick={() => (step <= completedStep ? onStepClick(step) : null)}
                                style={{ cursor: step <= completedStep ? 'pointer' : 'default' }}
                            >
                                <div className="step-line"></div>
                                <div className="step-circle">{step}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}