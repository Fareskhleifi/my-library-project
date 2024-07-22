import Contact from '../Contact/contact';

export default function Footer() {
  return (
    <div className="relative">
      <Contact />
      <div className='absolute z-10 bottom-0 left-0 w-full'>
        <div className='m-auto max-w-5xl max-lg:max-w-3xl py-36'>
          <section className=""> 
            <div className="relative h-0 overflow-hidden mb-6" style={{ paddingBottom: '30%' }}>
              <iframe
                title="Google Map"
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.096656292789!2d-122.08217698485344!3d37.42205787981786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fbc7b4be10725%3A0xf59d178a87b32f52!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1610035984427!5m2!1sen!2sus"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              ></iframe>
            </div>
          </section>
        </div>
      </div>
      <div className='w-11/12 m-auto mt-44 relative bg-yellow-900'>
        <div className="h-64 flex items-center justify-center">
          <p className="text-white text-2xl font-bold">Your Content Here</p>
        </div>
      </div>
      <div className='w-11/12 m-auto  relative '>
        <div className="h-20 flex items-center  justify-center">
          <p className="text-black   text-lg font-normal" style={{ fontFamily: "Baskervville " }} >  &copy; 2024 Fares Khleifi. All rights reserved. </p>
        </div>
      </div>
    </div>
  );
}
