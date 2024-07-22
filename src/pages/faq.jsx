import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FAQ() {
    const navigate = useNavigate();
    const [openIndex, setOpenIndex] = useState(null);

    const handleReturnHome = () => {
        navigate('/');
    };

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            <button
                onClick={handleReturnHome}
                className="absolute left-16 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full hover:bg-gray-700 transition-colors duration-300 z-10 flex items-center justify-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>
            <section className="py-14 bg-gray-50 sm:py-16 lg:py-12 animate-fade-up animate-once">
                <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                            Frequently Asked Questions
                        </h2>
                        <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
                        {faqData.map((faq, index) => (
                            <div
                                key={index}
                                className={`transition-all duration-200 bg-white border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-50 ${
                                    openIndex === index ? 'bg-gray-50' : ''
                                }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleToggle(index)}
                                    className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
                                >
                                    <span className="flex text-lg font-semibold text-black">
                                        {faq.question}
                                    </span>
                                    <svg
                                        className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${
                                            openIndex === index ? 'rotate-180' : ''
                                        }`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                <div
                                    className={`px-4 pb-5 sm:px-6 sm:pb-6 ${
                                        openIndex === index ? 'block' : 'hidden'
                                    }`}
                                >
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-center text-gray-600 text-base mt-9">
                        Didn’t find the answer you are looking for?{' '}
                        <a
                            href="/contact"
                            className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 focus:text-blue-700 hover:underline"
                        >
                            Contact our support
                        </a>
                    </p>
                </div>
            </section>
        </div>
    );
}

// Example FAQ data
const faqData = [
    {
        question: 'How to create an account?',
        answer: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
    },
    {
        question: 'How can I make payment using Paypal?',
        answer: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
    },
    {
        question: 'Can I cancel my plan?',
        answer: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
    },
    {
        question: 'How can I reach support?',
        answer: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.'
    }
];
