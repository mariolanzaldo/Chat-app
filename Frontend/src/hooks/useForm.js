import { useState, useEffect } from "react";

const useForm = ({ initState, callback, validator }) => {
    const [state, setState] = useState(initState);
    const [errors, setErrors] = useState({});
    const [isSubmited, setIsSubmited] = useState(false);

    useEffect(() => {
        const isValidErrors = () =>
            Object.values(errors).filter(error => typeof error !== "undefined")
                .length > 0;
        if (isSubmited && !isValidErrors()) callback(state);
    });

    const handleChange = event => {
        event.preventDefault();
        const { name, value } = event.target;
        setState(() => ({
            ...state,
            [name]: value
        }));
    };

    const handleBlur = event => {
        event.preventDefault();
        const { name: fieldName } = event.target;
        const faildFields = validator(state, fieldName);
        return setErrors(() => ({
            ...errors,
            [fieldName]: Object.values(faildFields)[0]
        }));
    };

    const handleSubmit = event => {
        event.preventDefault();
        const { name: fieldName } = event.target;
        const faildFields = validator(state, fieldName);
        setErrors(() => ({
            ...errors,
            [fieldName]: Object.values(faildFields)[0]
        }));
        setIsSubmited(true);
    };

    return {
        handleChange,
        handleSubmit,
        handleBlur,
        state,
        errors,
    };
};

export default useForm;
