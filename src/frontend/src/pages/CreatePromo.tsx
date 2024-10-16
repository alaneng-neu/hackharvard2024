import { useState } from "react";
import { ArrowLeft, Percent, Tag } from "lucide-react";
import Navbar from "../components/Navbar";
import { useAuthenticatedView } from "../hooks/useAuthenticatedView";
import { PromotionType } from "../../../shared";
import { useParams } from "react-router-dom";
import { useAuthenticatedResource } from "../hooks/useAuthenticatedResource";

const CreatePromoPage = () => {
  useAuthenticatedView();

  const [formData, setFormData] = useState({
    type: PromotionType.PERCENT_DISCOUNT,
    value: "",
    quantity: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { id } = useParams();

  useAuthenticatedResource(id as string);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.value) newErrors.value = "Value is required";
    if (!formData.quantity) newErrors.quantity = "Quantity is required";
    if (
      formData.type === PromotionType.PERCENT_DISCOUNT &&
      (parseFloat(formData.value) <= 0 || parseFloat(formData.value) > 100)
    ) {
      newErrors.value = "Percent discount must be between 0 and 100";
    }
    if (
      formData.type === PromotionType.VALUE_DISCOUNT &&
      parseFloat(formData.value) <= 0
    ) {
      newErrors.value = "Value discount must be greater than 0";
    }
    if (parseInt(formData.quantity) <= 0) {
      newErrors.quantity = "Quantity must be greater than 0";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      fetch(`http://localhost:7071/business/${id}/promos/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then(() => {
          setSuccessMessage(
            `Successfully created coupon for business ID: ${id}`
          );
          window.history.back();
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred. Please try again.");
        });
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-6">
              <button
                onClick={() => window.history.back()}
                className="text-green-600 hover:text-green-800 mr-4">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">
                Create a Promo
              </h1>
            </div>
            {successMessage && (
              <div className="mb-4 text-green-600">{successMessage}</div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700">
                  Discount Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md">
                  <option value={PromotionType.PERCENT_DISCOUNT}>
                    Percent Discount
                  </option>
                  <option value={PromotionType.VALUE_DISCOUNT}>
                    Value Discount
                  </option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="value"
                  className="block text-sm font-medium text-gray-700">
                  {formData.type === PromotionType.PERCENT_DISCOUNT
                    ? "Discount Percentage"
                    : "Discount Amount"}
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {formData.type === PromotionType.PERCENT_DISCOUNT ? (
                      <Percent
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <Tag
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <input
                    type="number"
                    name="value"
                    id="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    className="block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="0"
                    step="0.01"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">
                      {formData.type === PromotionType.PERCENT_DISCOUNT
                        ? "%"
                        : "$"}
                    </span>
                  </div>
                </div>
                {errors.value && (
                  <p className="mt-2 text-sm text-red-600">{errors.value}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter quantity"
                />
                {errors.quantity && (
                  <p className="mt-2 text-sm text-red-600">{errors.quantity}</p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                  Create Promo
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePromoPage;
