import { FormEventHandler, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uncontrolledFormActions } from '../slice';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { RootState } from '../store';

interface FormErrors {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  accept?: string;
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
  accept: yup.bool().oneOf([true], 'You must accept the terms and conditions'),
});

export const UncontrolledForm = () => {
  const nameRef = useRef<HTMLInputElement>(null); //validate for first uppercased letter)
  const ageRef = useRef<HTMLInputElement>(null); //should be number, no negative values
  const emailRef = useRef<HTMLInputElement>(null); //validate for email
  const passwordRef = useRef<HTMLInputElement>(null); //should match, display the password strength: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null); //you can use radio buttons or select control
  const acceptRef = useRef<HTMLInputElement>(null); //accept Terms and Conditions agreement (T&C, can be a checkbox)
  const uploadPictureRef = useRef<HTMLInputElement>(null); //validate size and extension, allow png jpeg, save in redux store as base64
  const countryRef = useRef<HTMLInputElement>(null); //all countries should be stored in the Redux store)
  //Form should contain labels, which should be connected with inputs(look at htmlFor)

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
      dispatch(uncontrolledFormActions.setUncontrolledFormData(formData));
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

  const onFileUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    const file = uploadPictureRef.current?.files?.[0];
    console.log('File', file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        //const base64 = reader.result;
        console.log('File as base64:', reader.result);
        setPictureBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPictureBase64(null);
      console.error('No file selected');
    }
  };

  const handleInputChange = () => {
    const inputValue = countryRef.current?.value || '';
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
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" ref={nameRef} />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input type="age" name="age" ref={ageRef} />
        {errors.age && <div className="error">{errors.age}</div>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" ref={emailRef} />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" ref={passwordRef} />
        {errors.password && <div className="error">{errors.password}</div>}
      </div>
      <div>
        <label htmlFor="confirmPassword">Confirm password:</label>
        <input
          type="confirmPassword"
          name="confirmPassword"
          ref={confirmPasswordRef}
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
      </div>
      <label>Gender:</label>
      <select name="gender" ref={genderRef}>
        <option value="">Select</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <div>
        <input type="checkbox" id="accept" name="accept" ref={acceptRef} />
        <label htmlFor="accept">Accept terms and conditions agreement</label>
        {errors.accept && <div className="error">{errors.accept}</div>}
      </div>
      <div>
        <label htmlFor="imageUpload">Upload Image:</label>
        <input
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
      <div className="autocomplete">
        <label htmlFor="country">Country:</label>
        <input
          type="text"
          name="country"
          ref={countryRef}
          onChange={handleInputChange}
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((country, index) => (
              <li key={index} onClick={() => handleSuggestionClick(country)}>
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
