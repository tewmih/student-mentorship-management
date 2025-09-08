import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const role= localStorage.getItem('role');
    useEffect(() => {
        if (!role) {
            navigate('/login');
        }
    }, [role, navigate]);
    useEffect(() => {

    }, [location]);
    if (!role) {
        return <p>Redirecting to login...</p>;
    }


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('users');
        navigate('/login');
    };

    const getMenuItems = () => {
        switch (role) {
            case 'mentee':
                return ['Profile', 'My Mentor', 'Chat', 'Petition','session','AssignedTasks' ,'Change Password'];
            case 'mentor':
                return ['Profile', 'Chat', 'Apply', 'My Mentee','schedule', 'Add Task', 'Mentor Tasks','Change Password'];
            case 'student_union':
                return ['Profile',  'List of Students', 'Mentor Applications','List of Mentors', 'Assign Mentor','List of Petition','Change Mentor', 'Change Password'];
            case 'admin':
                return ['Profile', 'List of Students', 'List of Mentors', 'Assign Student Union', 'Change Password'];
            default:
                return [];
        }
    };

    const menuItems = getMenuItems();

    const handleMenuClick = (item) => {
        const path = item.toLowerCase().replace(/\s+/g, '-');
        navigate(path);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', backgroundColor: '#f0f0f0', padding: '20px' }}>
                <h3>{role.toUpperCase()} MENU</h3>
                <button
                    onClick={handleLogout}
                    style={{
                        marginBottom: '20px',
                        padding: '10px',
                        width: '100%',
                        backgroundColor: '#ff4d4d',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Logout
                </button>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {menuItems.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleMenuClick(item)}
                            style={{
                                padding: '10px',
                                marginBottom: '5px',
                                cursor: 'pointer',
                            }}
                        >
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '20px' }}>
                <Outlet />
            </div>
        </div>
    );
}

export default Home;
