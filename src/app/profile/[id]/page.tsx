export default function UserProfile({ params }: any) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-500 to-blue-600 py-8 text-white">
        {/* Header */}
        <h1 className="text-5xl font-bold mb-6">User Profile</h1>
        
        <hr className="w-1/3 border-white mb-8" />
  
        {/* Profile Information */}
        <p className="text-2xl mb-4">
          Welcome to the profile page for
          <span className="bg-orange-600 text-black rounded-lg px-4 py-2 ml-3 text-3xl">
            {params.id}
          </span>
        </p>
        
        <p className="text-lg max-w-md text-center">
          This page provides details and actions for the user with ID: 
          <span className="text-yellow-200 ml-2 font-semibold">{params.id}</span>. 
          Explore the profile and take actions as necessary.
        </p>
      </div>
    );
  }
  