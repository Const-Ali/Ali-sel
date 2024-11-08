import React, { useState } from "react";

const Aboute: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div className="font-sans bg-gray-100 px-4 py-12 h-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:max-w-6xl max-w-2xl mx-auto">
          <div className="text-left">
            <h2 className="text-gray-800 text-3xl font-bold mb-6">
              Discover the Future of Innovation
            </h2>
            <p className="mb-4 text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
              aliquam, ipsum vel iaculis bibendum, justo turpis ullamcorper
              mauris, non aliquam nisi purus vel nisl. Integer efficitur turpis
              in bibendum tincidunt.
            </p>
            <p className="mb-4 text-sm text-gray-500">
              Nulla facilisi. Vestibulum fringilla leo et purus consectetur, vel
              tincidunt dolor rhoncus. In hac habitasse platea dictumst. Fusce
              vel sodales elit. Suspendisse potenti. Sed eget consequat nisi.
            </p>
            <p className="text-sm text-gray-500">
              consectetur adipiscing elit. Duis accumsan, nunc et tempus
              blandit, metus mi consectetur felis turpis vitae ligula. nunc et
              tempus blandit, metus mi consectetur felis turpis vitae ligula.
            </p>
            <p className="text-sm text-gray-500">
              consectetur adipiscing elit. Duis accumsan, nunc et tempus
              blandit, metus mi consectetur felis turpis vitae ligula. nunc et
              tempus blandit, metus mi consectetur felis turpis vitae ligula.
            </p>
          </div>
          <div>
            <img
              src="https://readymadeui.com/management-img.webp"
              alt="Placeholder Image"
              className="rounded-lg object-contain w-full h-full"
            />
          </div>
        </div>
      </div>
      <div className="font-[sans-serif] space-y-4 max-w-4xl mx-auto mt-10">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8">FAQS</h2>
        {faqData.map((faq, index) => (
          <div
            key={index}
            className={`accordion rounded-lg ${
              activeIndex === index ? "bg-blue-50" : "hover:bg-blue-50"
            } transition-all`}
          >
            <button
              type="button"
              className="toggle-button w-full text-base text-left py-5 px-6 text-gray-800 flex items-center"
              onClick={() => toggleAccordion(index)}
            >
              <span className="mr-4">{faq.question}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`arrow transition-all w-3 fill-current ml-auto shrink-0 ${
                  activeIndex === index ? "-rotate-180" : "-rotate-90"
                }`}
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                  clipRule="evenodd"
                  data-original="#000000"
                ></path>
              </svg>
            </button>
            <div
              className={`content px-6 overflow-hidden transition-all duration-300 ${
                activeIndex === index
                  ? "max-h-screen pb-5"
                  : "max-h-0 invisible"
              }`}
            >
              <p className="text-sm text-gray-600">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const faqData = [
  {
    question:
      "Are there any special discounts or promotions available during the event?",
    answer:
      "Auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in efficitur consequat. Fusce et tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in.",
  },
  {
    question: "What are the dates and locations for the product launch events?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed auctor auctor arcu, at fermentum dui. Maecenas vestibulum a turpis in lacinia. Proin aliquam turpis at erat venenatis malesuada.",
  },
  {
    question: "Can I bring a guest with me to the product launch event?",
    answer:
      "Auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in efficitur consequat. Fusce et tincidunt arcu. Curabitur ac lacus lectus.",
  },
  {
    question: "How can I contact the event organizers?",
    answer:
      "Auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in efficitur consequat. Fusce et tincidunt arcu. Curabitur ac lacus lectus.",
  },
  {
    question: "Is there parking available at the venue?",
    answer:
      "Auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in efficitur consequat. Fusce et tincidunt arcu. Curabitur ac lacus lectus.",
  },
];

export default Aboute;
