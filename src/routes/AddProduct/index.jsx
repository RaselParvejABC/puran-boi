import React, { useContext } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import getCategoriesAPI from '../../api/getCategoriesAPI';
import postProductAPI from '../../api/postProductAPI';
import { FirebaseAuthContext } from '../../contexts/FirebaseAuthContextProvider';
import WaitDialog from '../../components/Dialogs/WaitDialog';
import MySpinnerDottedOnCenter from '../../components/Spinners/MySpinnerDottedOnCenter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const showErrorMessage = error => {
  if (error) {
    return <p className="mt-2 text-red-500 font-bold">{error.message}</p>;
  }
  return null;
};

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
    reset,
    formState: { errors: formErrors },
  } = useForm();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: postProductAPI,
    onSuccess: () => {
      reset();
      toast('Your Product Added!');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleSubmission = async data => {
    mutation.mutate(data);
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
            {...register('productTitle', {
              required: 'Your Product does have a name, right?',
              minLength: {
                value: 5,
                message: 'Minimum 5 Characters!',
              },
              maxLength: {
                value: 25,
                message: '25 Characters at most!',
              },
            })}
            type="text"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Product Title"
          />
          {showErrorMessage(formErrors.productTitle)}
        </div>
        {/* Product Image  */}
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Product Image
          </label>
          <input
            {...register('productImage', {
              required: 'You must upload a clear photo of your product.',
            })}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            accept="image/png, image/jpeg"
          />
          {showErrorMessage(formErrors.productImage)}
        </div>
        {/* Years of Use  */}
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Years of Use
          </label>
          <input
            {...register('yearsOfUse', {
              valueAsNumber: true,
              required: 'Years of use is required.',
              min: {
                value: 1,
                message: '1 is the minimum option',
              },
            })}
            type="number"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Used for not more than (in Years)"
          />
          {showErrorMessage(formErrors.yearsOfUse)}
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
            {...register('productDescription', {
              required: 'Product Description is required.',
              minLength: {
                value: 30,
                message: 'At least 30 characters.',
              },
              maxLength: {
                value: 300,
                message: 'At most 300 characters.',
              },
            })}
            rows={3}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="30-300 Characters"
          />
          {showErrorMessage(formErrors.productDescription)}
        </div>
        {/* Price in BDT  */}
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Price (in BDT)
          </label>
          <input
            {...register('priceInBDT', {
              valueAsNumber: true,
              required: 'Price (in BDT) is required.',
              min: {
                value: 0,
                message: 'Must be equal to or greater than 0.',
              },
            })}
            type="number"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          {showErrorMessage(formErrors.priceInBDT)}
        </div>
        {/* Original Price in BDT  */}
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Original Price (in BDT)
          </label>
          <input
            {...register('originalPriceInBDT', {
              valueAsNumber: true,
              required: 'Original Price (in BDT) is required.',
              min: {
                value: 0,
                message: 'Must be equal to or greater than 0.',
              },
            })}
            type="number"
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            placeholder="Seller's Buying Price"
          />
          {showErrorMessage(formErrors.originalPriceInBDT)}
        </div>
        {/*Product's Status on PuranBoi Site; Hidden Input*/}
        <input
          {...register('productPBStatus')}
          defaultValue="notAdvertising"
          hidden
        />
        {/*Firebase UID Hidden Input*/}
        <input
          {...register('sellerFirebaseUID')}
          defaultValue={currentUser.uid}
          hidden
        />
        {/* Seller's Phone Number  */}
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Seller's Phone Number
          </label>
          <input
            {...register('sellerPhoneNumber', {
              required: 'Your Phone Number is required.',
            })}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          {showErrorMessage(formErrors.sellerPhoneNumber)}
        </div>
        {/* Seller's Location  */}
        <div className="mt-4">
          <label className="form-label inline-block mb-2 text-gray-700">
            Seller's Location
          </label>
          <input
            {...register('sellerLocation', {
              required: 'Your location is required.',
              maxLength: {
                value: 60,
                message: 'Not more than 60 characters are allowed.',
              },
            })}
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          />
          {showErrorMessage(formErrors.sellerLocation)}
        </div>
        {/* Submit Button  */}
        <div className="mt-4">
          <input type="submit" className="btn btn-primary btn-block" />
        </div>
      </form>
      {mutation.isLoading && <WaitDialog />}
      <ToastContainer autoClose={5000} />
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
