import React, { useContext } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import getCategoriesAPI from '../../api/getCategoriesAPI';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';
import MySpinnerDottedOnCenter from '../../components/Spinners/MySpinnerDottedOnCenter';

const AddProduct = () => {
  const { currentUser } = useContext(FirebaseAuthContext);
  const {
    isLoading,
    error,
    data: categories,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategoriesAPI,
  });

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  const handleSubmission = data => {
    console.log('Form Data', data);
  };

  if (error) {
    return (
      <p className="text-center text-warning">
        PuranBoi cannot Retrieve Product Categories.
      </p>
    );
  }

  if (isLoading) {
    return <MySpinnerDottedOnCenter size={50} />;
  }

  return (
    <section>
      <h1 className="text-center text-3xl font-black text-primary my-6 lg:mb-6">
        Add a Product
      </h1>
      <form
        onSubmit={handleSubmit(handleSubmission)}
        className="block p-6 rounded-lg shadow-lg bg-white max-w-xl mx-auto"
      >
        {/* Category ID  */}
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Category
          </label>
          <select
            {...register('categoryID')}
            defaultValue={categories[0]['_id']}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            {categories.map(category => (
              <option key={category['_id']} value={category['_id']}>
                {category['title']}
              </option>
            ))}
          </select>
        </div>
        {/* Product Title  */}
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Product Title
          </label>
          <input
            {...register('productTitle')}
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Product Title"
          />
        </div>
        {/* Product Image  */}
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Product Image
          </label>
          <input
            {...register('productImage')}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
          />
        </div>
        {/* Years of Use  */}
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Years of Use
          </label>
          <input
            {...register('yearsOfUse', {
              valueAsNumber: true,
            })}
            type="number"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Used for not more than (in Years)"
          />
        </div>
        {/* Product Condition  */}
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Product Condition
          </label>
          <select
            {...register('productCondition')}
            defaultValue="Excellent"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          >
            {['Excellent', 'Good', 'Fair'].map(condition => (
              <option key={condition} value={condition}>
                {condition}
              </option>
            ))}
          </select>
        </div>
        {/* Product Description  */}
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Product Description
          </label>
          <textarea
            {...register('productDescription')}
            rows={3}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="In Maximum 300 Words"
          />
        </div>
        {/* Price in BDT  */}
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Price (in BDT)
          </label>
          <input
            {...register('priceInBDT', {
              valueAsNumber: true,
            })}
            type="number"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        {/* Original Price in BDT  */}
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Original Price (in BDT)
          </label>
          <input
            {...register('originalPriceInBDT', {
              valueAsNumber: true,
            })}
            type="number"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Seller's Buying Price"
          />
        </div>
        {/*Firebase UID */}
        <input
          {...register('sellerFirebaseID')}
          defaultValue={currentUser.uid}
          hidden
        />
        {/* Seller's Phone Number  */}
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Seller's Phone Number
          </label>
          <input
            {...register('sellerPhoneNumber')}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        {/* Seller's Location  */}
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Seller's Location
          </label>
          <input
            {...register('sellerLocation')}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
        </div>
        {/* Submit Button  */}
        <div className="mt-4">
          <input type="submit" className="btn btn-primary btn-block" />
        </div>
      </form>
    </section>
  );
};

export default AddProduct;

/*
categoryID: Dropdown, label category title **
productTitle
productImage
yearsOfUse (Label not more than)
productCondition Excellent, Good, Fair
productDescription
price
originalPrice
sellerUserID 
sellerPhone
sellerLocation
*/
