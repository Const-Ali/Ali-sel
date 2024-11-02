import React from "react";
import Container from "../../Components/Container/Container";

function Pro4itemsOne() {
  return (
    <div className="mx-40 my-16 shadow-2xl shadow-gray-500 rounded-3xl">
      <Container>
        <div className="py-10 px-5 text-right ">
          <h1 className="text-2xl ">روش‌ها و هزینه‌های ارسال</h1>
          <p className="py-4">
            ­­همراهان عزیز تکنوسنتر تمام تلاشمان این است که بتوانیم سفارشات شما
            را در سریع‌ترین زمان به دست‌تان برسانیم. به‌همین منظور در تکنوسنتر
            چند روش برای ارسال سفارش‌ها در نظر گرفته‌ایم که شما می توانید با
            توجه به موقعیت مکانی خود، یکی از این روش‌‌ها را حین ثبت سفارش انتخاب
            نمایید
          </p>
          <ul className="list-none text-sm text-gray-700 font-bold">
            <li className="flex flex-row-reverse py-2">
              <h1 className="pl-2 text-xl">-</h1>
              ارسال سریع تکنوسنتر (برای مناطق 22 گانه شهر تهران)
            </li>
            <li className="flex flex-row-reverse py-2">
              <h1 className="pl-2 text-xl">-</h1> ارسال عادی تکنوسنتر (برای
              مناطق 22 گانه شهر تهران)
            </li>
            <li className="flex flex-row-reverse py-2">
              <h1 className="pl-2 text-xl">-</h1>پست پیشتاز (برای سراسر کشور)
            </li>
            <li className="flex flex-row-reverse py-2">
              <h1 className="pl-2 text-xl">-</h1>ماهکس (برای شهرهای تحت پوشش
              ماهکس)
            </li>
            <li className="flex flex-row-reverse py-2">
              <h1 className="pl-2 text-xl">-</h1>تیپاکس (سراسر کشور به غیر از
              کیش و قشم)
            </li>
            <li className="flex flex-row-reverse py-2">
              <h1 className="pl-2 text-xl">-</h1>باربری{" "}
            </li>
          </ul>
          <div className="space-y-4 py-5">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex flex-row-reverse cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-200 p-4 text-gray-900">
                <h2 className="font-medium">
                  ارسال سریع تکنوسنتر (برای مناطق 22 گانه شهر تهران)
                </h2>

                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
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
              </summary>

              <p className="mt-4 px-6 py-4 leading-relaxed text-gray-700 text-right bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
                سرویس ارسال سریع تکنولایف شامل مشتریان ساکن تهران و مناطق ۲۲
                گانه است. شما می‌توانید حین ثبت سفارش بازه زمانی تحویل سفارش را
                انتخاب نمایید تا کالا مطابق با زمان انتخابی به شما تحویل گردد.
                درصورت ثبت سفارش تا قبل از ساعت ۱۷:۰۰ کالا همان روز به شما تحویل
                خواهد شد. همچنین ممکن است در برخی از روزهای تعطیل، امکان ارسال
                سفارشات ثبت شده در همان روز میسر نباشد
              </p>
            </details>

            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex  flex-row-reverse cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-200 p-4 text-gray-900">
                <h2 className="font-medium">
                  ارسال عادی تکنولایف (برای مناطق 22 گانه شهر تهران){" "}
                </h2>

                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
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
              </summary>

              <p className="mt-4 px-6 py-4 leading-relaxed text-gray-700 text-right bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
                {" "}
                سرویس ارسال عادی تکنولایف شامل مشتریان تهران و مناطق 22 گانه
                است. با انتخاب این روش شما سفارش خود را تا ۲۴ ساعت بعد از ثبت،
                دریافت خواهید کرد.این وضعیت ممکن است در روزهای تعطیل دستخوش
                تغییرات شود
              </p>
            </details>
          </div>{" "}
          <div className="space-y-4 pb-5">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex flex-row-reverse cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-200 p-4 text-gray-900">
                <h2 className="font-medium">ماهکس (برای سراسر کشور) </h2>

                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
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
              </summary>

              <p className="mt-4 px-6 py-4 leading-relaxed text-gray-700 text-right bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
                {" "}
                ماهکس یک سرویس حمل سریع در کشور است که در ۵۵۰ شهر ایران دارای
                نمایندگی بوده و با توجه به ارسال مستقیم به اکثر این شهرها روشی
                سریع جهت ارسال مرسوله به حساب می‌آید. در روزهای کاری، چنانچه تا
                ساعت 16:30 ( پنج شنبه ها تا ساعت ۱3:۰۰) سفارش خود را نهایی کنید،
                سفارش شما همان روز تحویل ماهکس خواهد شد. همچنین در هنگام ثبت
                سفارش می‌توانید زمان و ساعتی که سفارش شما تحویل شرکت ماهکس
                می‌شود را مشاهده فرمایید. کد پیگیری مرسوله در قسمت جزئیات سفارش
                در حساب کاربری شما درج می‌شود. همچنین کد پیگیری مرسوله از طریق
                پیامک نیز به دست شما خواهد رسید. با استفاده از کد پیگیری ماهکس
                می‌توانید وضعیت مرسوله خود را از{" "}
                <a
                  className="text-blue-600"
                  href="https://ecourier.mahex.com/tr/"
                >
                  سامانه رهگیری ماهکس
                </a>
                پیگیری نمایید
              </p>
            </details>

            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex  flex-row-reverse cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-200 p-4 text-gray-900">
                <h2 className="font-medium">
                  ارسال توسط پست پیشتاز (برای سراسر کشور){" "}
                </h2>

                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
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
              </summary>

              <p className="mt-4 px-6 py-4 leading-relaxed text-gray-700 text-right bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
                {" "}
                در روزهای کاری، چنانچه تا ساعت 13:30 (پنج‌شنبه‌ها تا ساعت 11:00)
                سفارش خود را نهایی کنید، سفارش شما همان روز تحویل مرکز پست خواهد
                شد. همچنین در هنگام ثبت سفارش می‌توانید زمان و ساعتی که سفارش
                شما تحویل شرکت پست می‌شود را مشاهده فرمایید. کد پیگیری مرسوله در
                قسمت جزئیات سفارش در حساب کاربری شما درج می‌شود. همچنین کد
                پیگیری مرسوله از طریق پیامک نیز به دست شما خواهد رسید. با
                استفاده از کد پیگیری پست پیشتاز می‌توانید وضعیت مرسوله خود را از
                <a className="text-blue-600" href="https://tracking.post.ir/">
                  سامانه رهگیری ماهکس
                </a>{" "}
                پیگیری نمایید
              </p>
            </details>
          </div>{" "}
          <div className="space-y-4 ">
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex flex-row-reverse cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-200 p-4 text-gray-900">
                <h2 className="font-medium">
                  تیپاکس (سراسر کشور به غیر از کیش و قشم){" "}
                </h2>

                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
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
              </summary>

              <p className="mt-4 px-6 py-4 leading-relaxed text-gray-700 text-right bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
                {" "}
                شما می‌توانید برای دریافت سفارش‌تان از روش ارسال با تیپاکس نیز
                استفاده نمایید. این روش برای تمامی شهرهای کشور به غیر از کیش و
                قشم فعال است. طبق قوانین تیپاکس درصورت انتخاب این روش، سفارش شما
                طی ۲۴ تا ۷۲ ساعت تحویل خواهد شد
              </p>
            </details>

            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex  flex-row-reverse cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-200 p-4 text-gray-900">
                <h2 className="font-medium">ارسال با باربری </h2>

                <svg
                  className="size-5 shrink-0 transition duration-300 group-open:-rotate-180"
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
              </summary>

              <p className="mt-4 px-6 py-4 leading-relaxed text-gray-700 text-right bg-gray-100 border border-gray-300 rounded-lg shadow-sm">
                ارسال با باربری یکی دیگر از روش‌های ارسال است که شامل کالاهای
                بزرگ و حجیم می‌شود. برای مثال می‌توانید برای کالاهایی مثل یخچال
                با ابعاد بالاتر از ۷ فوت و تلویزیون‌های با ابعاد بالاتر از ۶۵
                اینچ از روش ارسال باربری استفاده کنید.{" "}
                <p className="font-bold pt-2">
                  {" "}
                  پس از تحویل سفارش شما به باربری، هماهنگی‌های لازم جهت تحویل
                  کالا در شهر مقصد با شما انجام خواهد شد
                </p>
              </p>
            </details>
          </div>
          <div className="pt-10 ">
            <h1 className="font-bold pb-3">: هزینه‌های بسته‌بندی و ارسال</h1>
            <ul className="text-gray-500 ">
              <li className="pb-4">
                هزینه بسته‌بندی و ارسال سریع با روش تکنولایف: برای مناطق ۲۲ گانه
                شهر تهران حداقل 65000 تومان است
              </li>
              <li className="pb-4">
                هزینه بسته بندی و ارسال عادی با روش تکنولایف: برای مناطق ۲۲گانه
                شهر تهران حداقل ۴۵۰۰۰ تومان است
              </li>
              <li className="pb-4">
                هزینه بسته‌بندی و ارسال با روش پست پیشتاز : این هزینه باتوجه‌به
                وزن کالا محاسبه می‌شود؛ حداقل هزینه 70.800 تومان است
              </li>
              <li className="pb-4">
                هزینه بسته‌بندی و ارسال با روش ماهکس: این هزینه باتوجه‌به وزن
                کالا محاسبه می‌شود؛ حداقل هزینه 132000 تومان است
              </li>
              <li className="pb-4">
                هزینه بسته‌بندی و ارسال با روش باربری: هزینه‌ای که به‌صورت
                آنلاین پرداخت می‌کنید هزینه اولیه ارسال کالا است، مابقی هزینه
                حین دریافت کالا از محل باربری لازم است پرداخت گردد
              </li>
              <li className="pb-4">
                هزینه بسته‌بندی و ارسال با روش تیپاکس: این هزینه باتوجه‌به وزن
                کالا محاسبه می‌شود؛ حداقل هزینه 132000 تومان است
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Pro4itemsOne;
