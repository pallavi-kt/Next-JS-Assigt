
'use client'; 
import { useRouter } from 'next/navigation'; 
import { AboutDatas } from '@/app/aboutData'; 
const FinalDetailsPage = ({ params }) => {
  const router = useRouter(); 
  const { idX ,idY} = params; 

  const selectedOption = AboutDatas.options.find(option => option.id === idX);
  const isValidIdY = selectedOption.info.some(info => info.id === idY);
  if (!isValidIdY) {
    
    router.push(`/about/${idX}`);
    return null; 
  }
  
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
                className={`block px-6 py-4 rounded-lg transition-all duration-300 cursor-pointer ${
                  info.id === idY ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-blue-100 hover:text-white'
                }`}
              >
                <span className="text-xl font-semibold">{info.name}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
        <h4 className="text-2xl font-semibold text-gray-800 mb-4">Details</h4>
        <p className="text-lg text-gray-700">
          <span className="font-bold">Details</span> {idX} | {idY}
        </p>
      </div>
    </div>
  );
  
};

export default FinalDetailsPage;
