import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, Title, featuredImage }) { 
  const getImageUrl = () => {
    if (!featuredImage) return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA2MEgxMjVWMTAwSDc1VjYwWiIgZmlsbD0iI0Q5RDlEOSIvPgo8cGF0aCBkPSJNODcuNSA3NUgxMTIuNVY4NUg4Ny41Vjc1WiIgZmlsbD0iI0YzRjRGNiIvPgo8L3N2Zz4K';
    try {
      return appwriteService.getFileView(featuredImage);
    } catch (error) {
      console.error('Error getting image view:', error);
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA2MEgxMjVWMTAwSDc1VjYwWiIgZmlsbD0iI0Q5RDlEOSIvPgo8cGF0aCBkPSJNODcuNSA3NUgxMTIuNVY4NUg4Ny41Vjc1WiIgZmlsbD0iI0YzRjRGNiIvPgo8L3N2Zz4K';
    }
  };

  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4 border border-gray-700 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl hover:shadow-blue-50-500/20 hover:bg-gray-700/50 cursor-pointer'>
            <div className='w-full justify-center mb-4 overflow-hidden rounded-xl'>
                <img 
                  src={getImageUrl()} 
                  alt={Title || 'Post image'} 
                  className='rounded-xl transition-trasnform duration-500 hover:scale-110 w-full h-48 object-cover'
                  onError={(e) => {
                    console.error('Image failed to load:', featuredImage);
                    e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik03NSA2MEgxMjVWMTAwSDc1VjYwWiIgZmlsbD0iI0Q5RDlEOSIvPgo8cGF0aCBkPSJNODcuNSA3NUgxMTIuNVY4NUg4Ny41Vjc1WiIgZmlsbD0iI0YzRjRGNiIvPgo8L3N2Zz4K';
                  }}
                />
            </div>
            <h2 className='text-xl font-bold text-slate-900 transition-colors duration-300 hover:text-blue-400'>{Title || 'Untitled'}</h2> 
        </div>
    </Link>
  )
}

export default PostCard