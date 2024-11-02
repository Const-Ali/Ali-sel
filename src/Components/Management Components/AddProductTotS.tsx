import TextTitle from "../Text/TextTitle";

function AddProductTotS() {
  return (
    <div className="container mx-auto">
      <div className="pb-7">
        <TextTitle value="سفارشات در حال پیگیری" />
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">عملیات</th>
            <th className="border border-gray-300 p-2">موجودی</th>

            <th className="border border-gray-300 p-2">گروهبندی</th>
            <th className="border border-gray-300 p-2">عنوان محصول</th>
            <th className="border border-gray-300 p-2">آیدی</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-center">
            <td className="border border-gray-300 p-2">
              <button className="bg-blue-500 text-white px-4 py-2 rounded mx-1">
                ویرایش
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded mx-1">
                حذف
              </button>
            </td>
            <td className="border border-gray-300 p-2"></td>
            <td className="border border-gray-300 p-2"></td>
            <td className="border border-gray-300 p-2"></td>
            <td className="border border-gray-300 p-2"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AddProductTotS;
