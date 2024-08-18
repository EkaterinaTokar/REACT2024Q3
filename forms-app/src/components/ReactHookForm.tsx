import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reactHookFormActions } from '../hookSlice';
import styles from './UncontrolledForm.module.css';
import { RootState } from '../store';
import { useState } from 'react';

interface FormInput {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  accept: boolean;
  gender: string;
  picture: string;
  country: string;
}

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'Name must start with an uppercase letter'),
  age: yup.number().positive('Age must be a positive number').required(),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Ppassword is required')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])\w+/,
      'Password ahould contain at least one uppercase and lowercase character',
    )
    .matches(/\d/, 'Password should contain at least one number')
    .matches(
      /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
      'Password should contain at least one special character',
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  accept: yup
    .bool()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
  gender: yup.string().required('Gender is required'),
  picture: yup.string().required('Picture is required'),
  country: yup.string().required('Country is required'),
});

export const ReactHookForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormInput>({
    mode: 'onChange',
    resolver: yupResolver(validationSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [pictureBase64, setPictureBase64] = useState<string | null>(null);

  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );

  const onSubmit = (data: FormInput) => {
    dispatch(
      reactHookFormActions.setReactHookFormData({ ...data, isNew: true }),
    );
    navigate(`/`, { replace: true });
  };

  const validateFile = (file: File) => {
    const validTypes = ['image/png', 'image/jpeg'];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      return 'Invalid file type. Only PNG and JPEG are allowed.';
    }

    if (file.size > maxSize) {
      return 'File size exceeds the limit of 5MB.';
    }

    return '';
  };

  const onFileUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (file) {
      const errorMessage = validateFile(file);
      if (errorMessage) {
        alert(errorMessage);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setValue('picture', base64String);
        setPictureBase64(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const filteredSuggestions = countries.filter((country) =>
      country.toLowerCase().startsWith(inputValue.toLowerCase()),
    );
    setSuggestions(filteredSuggestions);
    setShowSuggestions(true);
  };
  const handleSuggestionClick = (country: string) => {
    setValue('country', country);
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${styles.form}`}>
      <div className={`${styles.formRow}`}>
        <label className={`${styles.formLabel}`} htmlFor="name">
          Name
        </label>
        <input
          className={`${styles.formInput}`}
          type="text"
          {...register('name')}
        />
        {errors.name && (
          <p className={`${styles.error}`}>{errors.name.message}</p>
        )}
      </div>
      <div className={`${styles.formRow}`}>
        <label className={`${styles.formLabel}`} htmlFor="age">
          Age
        </label>
        <input
          className={`${styles.formInput}`}
          type="number"
          {...register('age')}
        />
        {errors.age && (
          <p className={`${styles.error}`}>{errors.age.message}</p>
        )}
      </div>
      <div className={`${styles.formRow}`}>
        <label className={`${styles.formLabel}`} htmlFor="email">
          Email
        </label>
        <input
          className={`${styles.formInput}`}
          type="text"
          {...register('email')}
        />
        {errors.email && (
          <p className={`${styles.error}`}>{errors.email.message}</p>
        )}
      </div>
      <div className={`${styles.formRow}`}>
        <label className={`${styles.formLabel}`} htmlFor="password">
          Password
        </label>
        <input
          className={`${styles.formInput}`}
          type="password"
          {...register('password')}
        />
        {errors.password && (
          <p className={`${styles.error}`}>{errors.password.message}</p>
        )}
      </div>
      <div className={`${styles.formRow}`}>
        <label className={`${styles.formLabel}`} htmlFor="confirmPassword">
          Confirm password
        </label>
        <input
          className={`${styles.formInput}`}
          type="password"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <p className={`${styles.error}`}>{errors.confirmPassword.message}</p>
        )}
      </div>
      <div className={`${styles.formRow}`}>
        <label className={`${styles.formLabel}`} htmlFor="gender">
          Gender:
        </label>
        <select {...register('gender')}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className={`${styles.formRow}`}>
        <input
          className={`${styles.formInput}`}
          type="checkbox"
          {...register('accept')}
        />
        <label className={`${styles.formLabel}`} htmlFor="accept">
          Accept terms and conditions agreement
        </label>
        {errors.accept && (
          <p className={`${styles.error}`}>{errors.accept.message}</p>
        )}
      </div>
      <div className={`${styles.formRow}`}>
        <label className={`${styles.formLabel}`} htmlFor="imageUpload">
          Upload Image
        </label>
        <input
          type="file"
          {...register('picture')}
          accept="image/jpeg, image/png"
          onChange={onFileUpload}
        />
        {pictureBase64 && (
          <img src={pictureBase64} alt="Uploaded" width="100" height="100" />
        )}
      </div>
      <div>
        <div className={`${styles.formRow} ${styles.autocomplete}`}>
          <label className={`${styles.formLabel}`} htmlFor="country">
            Country
          </label>
          <input
            className={`${styles.formInput}`}
            type="text"
            {...register('country')}
            onChange={handleInputChange}
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className={`${styles.suggestionsList}`}>
              {suggestions.map((country, index) => (
                <li
                  className={`${styles.suggestionsListItem}`}
                  key={index}
                  onClick={() => handleSuggestionClick(country)}
                >
                  {country}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </div>
    </form>
  );
};
