


const GuideFile = () => {
    const downloadImage = () => {
        const link = document.createElement('a');
        link.href = '/images/setup-process.png'; // Update with the actual path to your image
        link.download = 'AJ-Workspace-setup-guide.png';
        link.click();

      };
  return (
    <div className="flex flex-col    p-6 rounded-lg dark:bg-dark dark:text-white  max-w-md bg-box">
    <h2 className="text-2xl font-semibold mb-6">Steps to setup AJ WorkSpace</h2>
    <div className="w-full space-y-6">
      <div className="flex items-center">
        <div className="flex-none w-6 h-6 bg-gray-700 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
        <div className="ml-4">Login <span className="text-gray-500 dark:text-gray-300">(1 minute)</span></div>
      </div>
      <div className="flex items-center">
        <div className="flex-none w-6 h-6 bg-gray-700 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
        <div className="ml-4">Create Yearly Session <span className="text-gray-500 dark:text-gray-300">(2 minutes)</span></div>
      </div>
      <div className="flex items-center">
        <div className="flex-none w-6 h-6 bg-gray-700 text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
        <div className="ml-4">Register Teachers <span className="text-gray-500 dark:text-gray-300">(10-12 minutes)</span></div>
      </div>
      <div className="flex items-center">
        <div className="flex-none w-6 h-6 bg-gray-700 text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
        <div className="ml-4">Register Classes <span className="text-gray-500 dark:text-gray-300">(10-12 minutes)</span></div>
      </div>
      <div className="flex items-center">
        <div className="flex-none w-6 h-6 bg-gray-700 text-white rounded-full flex items-center justify-center text-xs font-bold">5</div>
        <div className="ml-4">Register Payment Configs <span className="text-gray-500 dark:text-gray-300">(8-10 minutes)</span></div>
      </div>
      <div className="flex items-center">
        <div className="flex-none w-6 h-6 bg-gray-700 text-white rounded-full flex items-center justify-center text-xs font-bold">6</div>
        <div className="ml-4">Register Students <span className="text-gray-500 dark:text-gray-300">(max time)</span></div>
      </div>
    </div>
    <p className="mt-6 text-lg font-semibold">That's it</p>
    <button
        onClick={downloadImage}
        className="mt-4 px-4 py-2 bg-dark dark:bg-darker hover:bg-darker text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Download PNG
      </button>
  </div>
    
  )
}

export default GuideFile