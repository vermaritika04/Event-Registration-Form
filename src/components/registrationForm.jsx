import React, { useState } from 'react';
import database from '../firebase'; // Adjust the path based on your project structure
import { ref, push, update } from 'firebase/database';
import './style.css';

function RegistrationForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [attendingWithGuest, setAttendingWithGuest] = useState(false);
    const [guestName, setGuestName] = useState('');
    const [errors, setErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === "name") {
            setName(value);
        } else if (id === "email") {
            setEmail(value);
        } else if (id === "age") {
            setAge(value);
        } else if (id === "attendingWithGuest") {
            setAttendingWithGuest(e.target.checked);
            if (!e.target.checked) {
                setGuestName('');
            }
        } else if (id === "guestName") {
            setGuestName(value);
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Name is required';
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!age) {
            newErrors.age = 'Age is required';
        } else if (isNaN(age) || age <= 0) {
            newErrors.age = 'Age must be a number greater than 0';
        }
        if (attendingWithGuest && !guestName) {
            newErrors.guestName = 'Guest name is required if attending with a guest';
        }
        return newErrors;
    };

    const handleSubmit = () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length === 0) {
            const userObj = {
                name: name,
                email: email,
                age: age,
                attendingWithGuest: attendingWithGuest,
                guestName: attendingWithGuest ? guestName : ''
            };

            const newPostKey = push(ref(database, 'users')).key; // Ensure 'users' is correct for your database structure
            const updates = {};
            updates['/' + newPostKey] = userObj;

            update(ref(database), updates)
                .then(() => {
                    setFormSubmitted(true);
                })
                .catch((error) => {
                    console.error("Error adding document: ", error);
                    setFormSubmitted(false);
                });
        } else {
            setErrors(validationErrors);
            setFormSubmitted(false);
        }
    };

    return (
        <div className="form">
            <div className="form-body">
                <div className="name">
                    <label className="form__label" htmlFor="name">Name</label>
                    <input className="form__input" type="text" id="name" value={name} onChange={handleInputChange} placeholder="Name" />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="email">
                    <label className="form__label" htmlFor="email">Email</label>
                    <input className="form__input" type="email" id="email" value={email} onChange={handleInputChange} placeholder="Email" />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="age">
                    <label className="form__label" htmlFor="age">Age</label>
                    <input className="form__input" type="number" id="age" value={age} onChange={handleInputChange} placeholder="Age" />
                    {errors.age && <span className="error">{errors.age}</span>}
                </div>
                <div className="attendingWithGuest">
                    <label className="form__label" htmlFor="attendingWithGuest">Are you attending with a guest?</label>
                    <input className="form__input" type="checkbox" id="attendingWithGuest" checked={attendingWithGuest} onChange={handleInputChange} />
                </div>
                {attendingWithGuest && (
                    <div className="guestName">
                        <label className="form__label" htmlFor="guestName">Guest Name</label>
                        <input className="form__input" type="text" id="guestName" value={guestName} onChange={handleInputChange} placeholder="Guest Name" />
                        {errors.guestName && <span className="error">{errors.guestName}</span>}
                    </div>
                )}
            </div>
            <div className="footer">
                <button onClick={handleSubmit} type="submit" className="btn">Register</button>
            </div>
            {formSubmitted && (
                <div className="summary">
                    <h3>Form Summary</h3>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Age:</strong> {age}</p>
                    <p><strong>Attending with a guest:</strong> {attendingWithGuest ? 'Yes' : 'No'}</p>
                    {attendingWithGuest && <p><strong>Guest Name:</strong> {guestName}</p>}
                </div>
            )}
        </div>
    );
}

export default RegistrationForm;
