import PropTypes from 'prop-types';

const BookCard = (props) => {
  const  livres  = props.livre;

  return (
    <div className="bg-white relative">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-5xl lg:px-8">
        <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {livres.map((livre) => (
            <div key={livre.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  alt={livre.titre}
                  src={`/src/assets/books/book`+livre.id+`.jpg`}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {livre.titre}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{livre.categorie}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">69</p>
              </div>
            </div>
          ))}
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
  })).isRequired,
};

export default BookCard;
