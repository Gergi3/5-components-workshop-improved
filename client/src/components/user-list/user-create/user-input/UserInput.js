import { useState, useEffect } from 'react';

import { validateUserField } from '../../../../services/userServices';

import './UserInput.css'

export const UserInput = ({
    text,
    name,
    value,
    onChange,
    className,
    icon,
}) => {
    const [isFocused, setIsFocused] = useState(true)
    const [error, setError] = useState();
    
    useEffect(() => {
        setError(validateUserField(name, value));
    }, [isFocused]);
    
    return (
        <div className={`form-group ${className || ''}`}>
            <label htmlFor={name}>{text}</label>
            <div className="input-wrapper">
                <span><i className={`fa-solid ${icon}`}></i></span>
                <input
                    id={name}
                    name={name}
                    type="text"
                    value={value}
                    onChange={onChange}
                    onBlur={setIsFocused.bind(null, false)}
                    onFocus={setIsFocused.bind(null, true)}
                />
            </div>
            {!isFocused && error && error !== 'required' &&
                <p className="form-error">{error}</p>
            }
        </div>
    );
};
