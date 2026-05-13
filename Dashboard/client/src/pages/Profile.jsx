import React from 'react';
import './Profile.css';

const Profile = () => {
    const userName = localStorage.getItem('loggedInUser') || 'Swayam Satapathy';
    const email = 'swayam@example.com';

    const personalInfo = [
        { label: 'First Name', value: 'Swayam' },
        { label: 'Last Name', value: 'Satapathy' },
        { label: 'Gender', value: 'Male' },
        { label: 'Email Address', value: email },
        { label: 'Mobile Number', value: '9692058359' }
    ];

    return (
        <div className="profile-wrapper">
            <div className="profile-container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {userName.charAt(0).toUpperCase()}
                    </div>
                    <h2>{userName}</h2>
                    <p>{email}</p>
                </div>

                <div className="profile-content">
                    <div className="profile-section">
                        <h3>Personal Information</h3>
                        <div className="info-grid">
                            {personalInfo.map((info, idx) => (
                                <div key={idx} className="info-item">
                                    <label>{info.label}</label>
                                    <p>{info.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="profile-section">
                        <h3>My Addresses</h3>
                        <div className="info-grid">
                            <div className="info-item">
                                <label>Default Address</label>
                                <p>Plot No-264, Lane-C, Santoshi Vihar, Laxmisagar, Bhubaneswar 751006</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="logout-section">
                    <button className="logout-btn-full" onClick={() => {
                        localStorage.clear();
                        window.location.href = '/logout-success';
                    }}>
                        Logout from Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
