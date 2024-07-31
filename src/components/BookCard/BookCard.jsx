import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const BookCard = (props) => {
  const livres = props.livre;

  return (
    <div className="bg-white  relative">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-6xl lg:px-8">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {livres.map((livre) => (
              <div key={livre.id} className="bg-gray-200 h-auto relative rounded-lg shadow-md w-full xl:w-56">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-64">
                  <img
                    alt={livre.titre}
                    src={`/src/assets/books/book${livre.id}.jpg`}
                    className="h-full w-full object-fill lg:h-full lg:w-full"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-sm text-gray-700">
                  <Link to={`/DetailsCard/${livre.id}`} >
                      <span aria-hidden="true" className="absolute inset-0" />
                      {livre.titre}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{livre.categorie}</p>
                  <p className="mt-2 text-sm font-medium text-gray-900">{livre.prixParJour} DT</p>

                  {/* Availability Status */}
                  <p className={`mt-2 text-sm font-medium ${livre.disponibilite ? 'text-green-600' : 'text-red-600'}`}>
                    {livre.disponibilite ? 'Available' : 'Borrowed'}
                  </p>

                  {/* Rating Section */}
                  <div className="mt-3 flex relative -mb-7 bottom-8 items-center justify-end">
                    <span className="flex items-center text-yellow-500">
                      {/* Display 4 stars */}
                      {Array.from({ length: 4 }).map((_, index) => (
                        <svg
                          key={index}
                          className={`h-5 w-5 ${livre.rating > index ? 'fill-current' : 'text-gray-300'}`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 13.97 5.82 21z"/>
                        </svg>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

BookCard.propTypes = {
  livre: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    titre: PropTypes.string.isRequired,
    categorie: PropTypes.string.isRequired,
    prixParJour: PropTypes.number.isRequired,
    disponibilite: PropTypes.bool.isRequired, 
    rating: PropTypes.number,                  
  })).isRequired,
};

export default BookCard;
