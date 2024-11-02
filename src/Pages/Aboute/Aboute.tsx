import React, { useState } from "react";

const Aboute: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const questions = [
    {
      title: "How do I know if a product is available in boutiques?",
      answer:
        "You can check product availability in boutiques by visiting the store locator on the website.",
    },
    {
      title:
        "How can I find the prices or get other information about Chanel products?",
      answer:
        "Information about Chanel products is available on the official website and selected stores.",
    },
    {
      title: "How many collections come out every year?",
      answer:
        "Several collections are released each year, including seasonal and limited editions.",
    },
    {
      title: "Are all of the fashion collections featured on the website?",
      answer:
        "Not all collections are available online; some are exclusive to stores.",
    },
    {
      title:
        "Where do I find products that I have seen in magazines or Social Media?",
      answer:
        "Visit the website or your nearest store for details on popular products featured in media.",
    },
  ];

  return (
    <div className="lg:container lg:mx-auto lg:py-16 md:py-12 md:px-6 py-12 px-4">
      <h1 className="text-center dark:text-white lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 font-semibold">
        FAQ's
      </h1>

      <div className="lg:mt-12 bg-gray-100 dark:bg-gray-800 md:mt-10 mt-8 lg:py-7 lg:px-6 md:p-6 py-6 px-4 lg:w-8/12 w-full mx-auto">
        <div className="flex justify-between md:flex-row flex-col">
          <div className="md:mb-0 mb-8 md:text-left text-center">
            <h2 className="font-medium dark:text-white text-xl leading-5 text-gray-800 lg:mb-2 mb-4">
              Questions
            </h2>
            <p className="font-normal dark:text-gray-300 text-sm leading-5 text-gray-600 md:w-8/12 md:ml-0 w-11/12 mx-auto">
              If you don’t find your answer, Please contact us or leave a
              message; we’ll be more than happy to assist you.
            </p>
          </div>

          <div className="flex justify-center items-center">
            <div className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 flex bg-white md:justify-center justify-between items-center px-4 py-3 w-full">
              <input
                className="focus:outline-none bg-white"
                type="text"
                placeholder="Search"
              />
              <img
                src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg1.svg"
                alt="search"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-8/12 w-full mx-auto">
        {questions.map((question, index) => (
          <div key={index}>
            <hr className="w-full lg:mt-10 md:mt-12 md:mb-8 my-8" />
            <div className="w-full md:px-6">
              <div className="flex justify-between items-center w-full">
                <p
                  className={`flex justify-center items-center dark:text-white font-medium text-base leading-6 text-gray-800 ${openIndex === index ? "font-semibold" : ""}`}
                >
                  <span className="lg:mr-6 mr-4 dark:text-white lg:text-2xl md:text-xl text-lg leading-6 font-semibold text-gray-800">
                    Q{index + 1}.
                  </span>
                  {question.title}
                </p>
                <button
                  aria-label="toggler"
                  className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800"
                  onClick={() => toggleFAQ(index)}
                >
                  <img
                    className={`transform ${openIndex === index ? "rotate-180" : ""} dark:hidden`}
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg2.svg"
                    alt="toggler"
                  />
                  <img
                    className={`transform ${openIndex === index ? "rotate-180" : ""} dark:block hidden`}
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/faq-8-svg2dark.svg"
                    alt="toggler"
                  />
                </button>
              </div>
              {openIndex === index && (
                <div className="mt-6 w-full">
                  <p className="text-base leading-6 text-gray-600 dark:text-gray-300 font-normal">
                    {question.answer}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Aboute;
