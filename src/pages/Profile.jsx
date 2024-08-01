import { useEffect, useState } from 'react';
import NavbarLogin from "../components/navbar/navbarLogin";
import axios from 'axios';

export default function Profile() {

    const [user, setUser] = useState({
        nom: '',
        prenom: '',
        email: '',
        username: '',
        adresse: '',
        telephone: '',
      });

      const [psswordChangeForm, setPsswordChangeForm] = useState({
        newPassword: '',
        currentPassword: '',
        confirmPassword: '',
      });

      useEffect(() => {
        const fetchUserDetails = async () => {
          try {
            const token = localStorage.getItem('token');
            if (!token) {
              console.error('No token found');
              return;
            }
            const response = await axios.get('/user/getUserDetails', {
              params: { token }, 
              headers: {
                Authorization: `Bearer ${token}` 
              }
            });
      
            const userData = response.data;
            setUser({
              nom: userData.nom,
              prenom: userData.prenom,
              email: userData.email,
              username: userData.username,
              adresse: userData.adresse,
              telephone: userData.telephone
            });
          } catch (error) {
            console.error('Error fetching user details:', error.response ? error.response.data : error.message);
          }
        };
      
        fetchUserDetails();
      }, []);
      
    
    

      const handleUpdateUser = async () => {
        const token = localStorage.getItem('token');
        try {
          await axios.put('/adminuser/updateUserDetails', user, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          alert('User information updated successfully!');
        } catch (error) {
          console.error('Error updating user information:', error);
        }
      };

      const handleChangePassword = async () => {
        if (psswordChangeForm.newPassword !== psswordChangeForm.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        try {
          const token = localStorage.getItem('token');      
          await axios.put('/adminuser/changePassword', {
            currentPassword: psswordChangeForm.currentPassword,
            newPassword: psswordChangeForm.newPassword,
            email: user.email
          }, {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          });
          
          alert('Password changed successfully!');
          setPsswordChangeForm({
            newPassword: '',
            currentPassword: '',
            confirmPassword: '',
          });
        } catch (error) {
            alert('the current password not valid!');
          console.error('Error changing password:', error.response ? error.response.data : error.message);
        }
      };
      
      

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <style>
        {`
          html {
            background-color: #f3f4f6;
          }
        `}
      </style>
      <header>
        <nav>
          <NavbarLogin scrollToSection={scrollToSection} />
        </nav>
      </header>
      <main className="mt-6 max-lg:mt-32 ">
        <div className="min-h-screen w-4/5 m-auto p-6 gap-10 bg-[#f3f4f6] lg:flex max-sm:block items-center justify-center">
          <div className="container max-w-full-lg mx-auto">
            <div>
              <h2 className="font-semibold text-xl text-gray-600">
                Personal Details
              </h2>
              <p className="text-gray-500 mb-6">
                Please fill out all the fields.
              </p>

              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5 flex gap-6">
                        <div className="w-full">
                          <label htmlFor="first_name" className="block">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="first_name"
                            value={user.nom}
                            onChange={(e) => setUser({ ...user, nom: e.target.value })}
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>
                        <div className="w-full">
                          <label htmlFor="last_name" className="block">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="last_name"
                            value={user.prenom}
                            onChange={(e) => setUser({ ...user, prenom: e.target.value })}
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-5 flex gap-6">
                        <div className="w-full">
                          <label htmlFor="email" className="block">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            placeholder="email@domain.com"
                          />
                        </div>
                        <div className="w-full">
                          <label htmlFor="username" className="block">
                            Username
                          </label>
                          <input
                            type="text"
                            name="username"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="address" className="block">
                          Address / Street
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={user.adresse}
                          onChange={(e) => setUser({ ...user, adresse: e.target.value })}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        />
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="phone" className="block">
                          Phone
                        </label>
                        <input
                          type="number"
                          name="phone"
                          value={user.telephone}
                          onChange={(e) => setUser({ ...user, telephone: e.target.value })}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder=""
                        />
                      </div>
                      <div className="md:col-span-5 mt-4 text-left">
                        <div className="inline-flex items-end">
                          <button  onClick={handleUpdateUser} className="bg-gray-950 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container w-7/12 max-lg:w-full mx-auto">
            <div>
              <h2 className="font-semibold text-xl text-gray-600">
                Change Password
              </h2>
              <p className="text-gray-500 mb-6">
                Please fill out all the fields.
              </p>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-1">
                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5 flex gap-6">
                        <div className="w-full">
                          <label htmlFor="first_name" className="block">
                            Current password
                          </label>
                          <input
                            type="password"
                            name="CurrentPassword"
                            value={psswordChangeForm.currentPassword}
                            onChange={(e) => setPsswordChangeForm({ ...psswordChangeForm, currentPassword: e.target.value })}
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            placeholder="Current password"
                          />
                        </div>
                      </div>
                      <div className="md:col-span-5 flex gap-6">
                        <div className="w-full">
                          <label  className="block">
                            New password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="newPassword"
                            value={psswordChangeForm.newPassword}
                            onChange={(e) => setPsswordChangeForm({ ...psswordChangeForm, newPassword: e.target.value })}
                            className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                            placeholder="Enter a new password"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="address" className="block">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          name="ConfirmPassword"
                          value={psswordChangeForm.confirmPassword}
                          onChange={(e) => setPsswordChangeForm({ ...psswordChangeForm, confirmPassword: e.target.value })}
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          placeholder="Confirm the new password"
                        />
                      </div>
                      <div className="md:col-span-5 mt-4 text-left">
                        <div className="inline-flex items-start">
                          <button onClick={handleChangePassword} className="bg-gray-950 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
