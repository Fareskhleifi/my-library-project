import NavbarLogin from "../../components/navbar/navbarLogin";
import NavbarHome from "../../components/navbar/navbarHome";
import { request } from '../../axios_helper';
import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function DetailsCard({isLoggedIn}) {

    const [livre, setLivre] = useState([]);
    const [dateRetour, setDateRetour] = useState();
    const { idLivre } = useParams();
    const [isBorrowed, setIsBorrowed] = useState(false);
    const [numberJours, setNumberJours] = useState('');
    const [region, setRegion] = useState('');

    const handleNumberJoursChange = (e) => setNumberJours(e.target.value);
    const handleRegionChange = (e) => setRegion(e.target.value);
    
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
          window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
          });
        }
      };
      
  
      useEffect(() => {
        if (idLivre) {
          request('get', `/public/getLivre/${idLivre}`)
            .then(response => {
              setLivre(response.data);
            })
            .catch(error => {
              console.error('Error fetching livres:', error);
            });
            
        }
      }, [idLivre]);

      const handleReturnToCollection =()=>{
        window.location.href = `/collection`;
      }

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
      };

      useEffect(() => {
        const fetchDateRetour = async () => {
            try {
                const response = await request('get', `/public/livreDateRetour/${idLivre}`);
                if (response.data) {
                    const updatedDate = addDay(response.data);
                    const formattedDate = formatDate(updatedDate);
                    setDateRetour(formattedDate);
                }
            } catch (error) {
                console.error('Error fetching date retour:', error);
            }
        };

        fetchDateRetour();
    }, [idLivre]);

    const addDay = (dateString) => {
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1); 
        return date;
    };

    const handleisLoggedIn = ()=>{

        if(!isLoggedIn)
        {
            window.location.href = `/login`
        }
        else{
            setIsBorrowed(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        try {
          const token = localStorage.getItem('token'); 
          const requestBody = {
            livreId: idLivre,
            nombreJours: numberJours,
            token, 
          };
          const response = await request('POST', '/user/emprunter', requestBody, {
            Authorization: `Bearer ${token}`
          });
          console.log(response.data);
          alert("Book successfully borrowed");
          window.location.href = `/collection`;
        } catch (error) {
          console.error('Error:', error.response ? error.response.data : error.message);
        }
      };
      const handleCancel = () => {
        setNumberJours('');
        setRegion('');
        window.location.href = `/collection`
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
        {isLoggedIn ? (
        <NavbarLogin scrollToSection={scrollToSection} />
      ) : (
        <NavbarHome scrollToSection={scrollToSection} />
      )}
        </nav>
      </header>
    <main className="mt-40 animate-fade-up animate-once">
        <div>
            <div className="bg-gray-100  py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row -mx-4">
                        { isBorrowed && (
                        <div className=" block relative m-auto left-16  md:flex-1 px-4 ">
                                <div className="relative z-0 w-full mb-6 group">
                                    <input value={numberJours}
                                        onChange={handleNumberJoursChange}
                                        type="number" name="numberJours" 
                                        className="block py-2.5 px-0 w-3/4 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Number of Days</label>
                                </div>

                                <div className="relative z-0 w-full mb-6 group">
                                    <input type="text"
                                     name="region"
                                     value={region}
                                     onChange={handleRegionChange}  
                                     className="block py-2.5 px-0 w-3/4 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label  className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Region</label>
                                </div>
                                <div className=" flex  gap-6">
                                <button type="submit" onClick={handleSubmit} className="text-white  bg-gray-950 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
                                <button type="submit" onClick={handleCancel} className="text-white bg-gray-400 hover:bg-gray-300  focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Cancel</button>
                                </div>
                                
                        </div>)}
                        <div className={` md:flex-1 px-4`}>
                            <div className="h-[459px] rounded-lg bg-gray-300  mb-4">
                            <img className="w-full h-full object-fill " 
                             src={`/src/assets/books/book${livre.id}.jpg`} 
                             alt="Product Image"
                             />
                             </div>
                             <div className="hidden max-lg:flex -mx-2 mt-6 mb-4">
                                {livre?.disponibilite ? (
                                <>
                                    <div className="w-1/2 px-2">
                                    <button onClick={handleisLoggedIn}  className="w-full  bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">Borrow Now</button>
                                    </div>
                                    <div className="w-1/2 px-2">
                                    <button onClick={handleReturnToCollection} className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">Back to Collection</button>
                                    </div>
                                </>
                                ) : (
                                <div className="w-full px-2 text-gray-600">
                                    
                                    <button onClick={handleReturnToCollection} className="mt-4 mb-6 block mx-auto bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">Back to Collection</button>
                                    <p className="text-red-600">This book is currently borrowed. Available on {dateRetour}</p>
                                </div>
                                )}
                            </div>
                        </div>
                        { !isBorrowed && (
                        <div className=" md:flex-1 px-4 ">
                            <h2 className="text-2xl font-bold text-gray-800  mb-1.5">{livre.titre}</h2>
                            <p className="text-gray-600 text-md mb-6">
                                {livre.auteur}
                            </p>
                            <div className="flex mb-4">
                                <div className="mr-16">
                                    <span className="font-bold text-gray-700 d">ISBN : </span>
                                    <span className="text-gray-600 ">{livre.isbn}</span>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                <div className="mr-16">
                                    <span className="font-bold text-gray-700 d">Price :</span>
                                    <span className="text-gray-600 "> {livre.prixParJour} DT</span>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700">Availability : </span>
                                    <span className={livre.disponibilite ? "text-green-600" : "text-red-600"}>
                                        {livre.disponibilite ? "Available" : "Borrowed"}
                                    </span>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                <div className="mr-8">
                                    <span className="font-bold text-gray-700 d">Category :</span>
                                    <span className="text-gray-600 "> {livre.categorie}</span>
                                </div>
                                <div>
                                    <span className="font-bold text-gray-700 ">Genre :</span>
                                    <span className="text-gray-600"> {livre.genre}</span>
                                </div>
                            </div>
                            
                            <div>
                                <span className="font-bold text-gray-700 ">Book Description : </span>
                                <p className="text-gray-600  text-sm mt-2">
                                {livre.description}
                                </p>
                            </div>
                            <div className=" hidden lg:flex -mx-2 mt-6 mb-4">
                            {livre?.disponibilite ? (
                                <>
                                    <div className="w-1/2 px-2">
                                    <button  onClick={handleisLoggedIn} className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800">Borrow Now</button>
                                    </div>
                                    <div className="w-1/2 px-2">
                                    <button onClick={handleReturnToCollection} className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">Back to Collection</button>
                                    </div>
                                </>
                                ) : (
                                <div className="w-full flex justify-between px-2 text-gray-600">
                                     <p className="text-red-600">This book is currently borrowed. <br /> Available on {dateRetour}</p>
                                    <button onClick={handleReturnToCollection} className="  bg-gray-200 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">Back to Collection</button>
                                </div>
                                )}
                            </div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    </main>
    </>
  )
}
