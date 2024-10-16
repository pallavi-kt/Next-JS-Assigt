'use client'; // Client component declaration
import { useRouter } from 'next/navigation'; // Import useRouter
import { AboutDatas } from '../aboutData';

const AboutPage = () => {
  const router = useRouter(); // Initialize router

  // Function to handle navigation
  const handleOptionClick = (id) => {
    router.push(`/about/${id}`); // Navigate to the dynamic route
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">About Page</h1>
        
        <ul className="space-y-6">
          {AboutDatas.options.map((option) => (
            <li key={option.id}>
              <p
                className="block px-6 py-4 bg-gray-100 hover:bg-blue-100 hover:text-white rounded-lg transition-all duration-300 cursor-pointer"
                onClick={() => handleOptionClick(option.id)} // Add click handler
              >
                <span className="text-xl font-semibold">{option.name}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
