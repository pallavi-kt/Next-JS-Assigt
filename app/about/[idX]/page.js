
'use client'; 
import { useRouter } from 'next/navigation'; 
import { AboutDatas } from '../../aboutData'; 
const OptionDetailPage = ({ params }) => {
  const router = useRouter(); 
  const { idX } = params; 

  
  const selectedOption = AboutDatas.options.find(option => option.id === idX);
const isValidIdX = AboutDatas.options.some(option => option.id === idX);
if (!isValidIdX) {

    router.push(`/about`);
    return null; 
  }
  if (!selectedOption) {
    return <div>Option not found</div>; 
  }
  
  const handleInfoClick = (idY) => {
    router.push(`/about/${idX}/${idY}`); 
  };
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">About Page</h1>
        
        <ul className="space-y-6">
          {AboutDatas.options.map((option) => (
            <li key={option.id}>
             <p
                className={`block px-6 py-4 rounded-lg transition-all duration-300 cursor-pointer ${
                  option.id === selectedOption.id ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-blue-100 hover:text-white'
                }`}
              >
                <span className="text-xl font-semibold">{option.name}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-8">
       
        
        <ul className="space-y-6">
        {selectedOption.info.map(info => (
            <li key={info.id}>
               <p
                className="block px-6 py-4 bg-gray-100 hover:bg-blue-100 hover:text-white rounded-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleInfoClick(info.id)}
              >
                <span className="text-xl font-semibold">{info.name}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default OptionDetailPage;
