import { FormEventHandler, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uncontrolledFormActions } from '../slice';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { RootState } from '../store';
import styles from './UncontrolledForm.module.css';

interface FormErrors {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  accept?: string;
  gender?: string;
  picture?: string;
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
    .required('Password is required')
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
  accept: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
  gender: yup.string().required('Gender is required'),
});

export const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const uploadPictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();
  const [pictureBase64, setPictureBase64] = useState<string | null>(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const countries = useSelector(
    (state: RootState) => state.countries.countries,
  );

  const onSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      age: isNaN(Number(ageRef.current?.value))
        ? 0
        : Number(ageRef.current?.value),
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      gender: genderRef.current?.value,
      accept: acceptRef.current?.checked,
      picture: pictureBase64,
      country: countryRef.current?.value,
    };
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      dispatch(
        uncontrolledFormActions.setUncontrolledFormData({
          ...formData,
          isNew: true,
        }),
      );
      navigate(`/`, { replace: true });
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: FormErrors = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path as keyof FormErrors] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
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
    const file = uploadPictureRef.current?.files?.[0];
    if (file) {
      const errorMessage = validateFile(file);
      if (errorMessage) {
        setErrors((prevErrors) => ({ ...prevErrors, picture: errorMessage }));
        setPictureBase64(null);
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPictureBase64(reader.result as string);
          setErrors((prevErrors) => ({ ...prevErrors, picture: '' }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setPictureBase64(null);
      console.error('No file selected');
      setErrors((prevErrors) => ({
        ...prevErrors,
        picture: 'No file selected',
      }));
    }
  };

  const handleInputChange = () => {
    const inputValue = countryRef.current?.value ?? '';
    if (inputValue) {
      const filteredCountries = countries.filter((country) =>
        country.toLowerCase().startsWith(inputValue.toLowerCase()),
      );
      setSuggestions(filteredCountries);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (country: string) => {
    if (countryRef.current) {
      countryRef.current.value = country;
    }
    setShowSuggestions(false);
  };

  return (
    <form onSubmit={onSubmit} className={`${styles.form}`}>
      <div className={`${styles.formRow}`}>
        <label className={`${styles.formLabel}`} htmlFor="name">
          Name
        </label>
        <input
          className={`${styles.formInput}`}
          type="text"
          id="name"
          name="name"
          ref={nameRef}
        />
        {errors.name && <div className={`${styles.error}`}>{errors.name}</div>}
      </div>
      <div className={`${styles.formRow}`}>
        <label className={`${styles.formLabel}`} htmlFor="age">
          Age
        </label>
        <input
          className={`${styles.formInput}`}
          type="age"
          name="age"
          ref={ageRef}
        />
        {errors.age && <div className={`${styles.error}`}>{errors.age}</div>}
      </div>
      <div className={`${styles.formRow}`}>
        <label className={`${styles.formLabel}`} htmlFor="email">
          Email
        </label>
        <input
          className={`${styles.formInput}`}
          type="email"
          name="email"
          ref={emailRef}
        />
        {errors.email && (
          <div className={`${styles.error}`}>{errors.email}</div>
        )}
      </div>
      <div className={`${styles.formRow}`}>
        <label className={`${styles.formLabel}`} htmlFor="password">
          Password
        </label>
        <input
          className={`${styles.formInput}`}
          type="password"
          name="password"
          ref={passwordRef}
        />
        {errors.password && (
          <div className={`${styles.error}`}>{errors.password}</div>
        )}
      </div>
      <div className={`${styles.formRow}`}>
        <label className={`${styles.formLabel}`} htmlFor="confirmPassword">
          Confirm password
        </label>
        <input
          className={`${styles.formInput}`}
          type="password"
          name="confirmPassword"
          ref={confirmPasswordRef}
        />
        {errors.confirmPassword && (
          <div className={`${styles.error}`}>{errors.confirmPassword}</div>
        )}
      </div>
      <div className={`${styles.formRow}`}>
        <label className={`${styles.formLabel}`} htmlFor="gender">
          Gender
        </label>
        <select name="gender" ref={genderRef}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <div className={`${styles.error}`}>{errors.gender}</div>
        )}
      </div>
      <div className={`${styles.formRow}`}>
        <input
          className={`${styles.formInput}`}
          type="checkbox"
          id="accept"
          name="accept"
          ref={acceptRef}
        />
        <label className={`${styles.formLabel}`} htmlFor="accept">
          Accept terms and conditions agreement
        </label>
        {errors.accept && (
          <div className={`${styles.error}`}>{errors.accept}</div>
        )}
      </div>
      <div className={`${styles.formRow}`}>
        <label className={`${styles.formLabel}`} htmlFor="imageUpload">
          Upload Image
        </label>
        <input
          className={`${styles.formInputPicture}`}
          type="file"
          name="file"
          id="imageUpload"
          ref={uploadPictureRef}
          accept="image/jpeg, image/png"
          onChange={onFileUpload}
        />
        {pictureBase64 && (
          <img src={pictureBase64} alt="Uploaded" width="100" height="100" />
        )}
      </div>
      <div className={`${styles.formRow} ${styles.autocomplete}`}>
        <label className={`${styles.formLabel}`} htmlFor="country">
          Country
        </label>
        <input
          className={`${styles.formInput}`}
          type="text"
          name="country"
          ref={countryRef}
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

      <button type="submit">Submit</button>
    </form>
  );
};
