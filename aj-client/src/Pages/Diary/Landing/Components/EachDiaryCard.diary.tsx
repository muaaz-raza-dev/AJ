import { Idiary } from "@/app/Types/Idiary";
import moment from "moment";
import { Link } from "react-router-dom";

export default function EachDiaryCard({ data }: { data: Idiary }) {
  return (
    <div className="bg-box rounded-lg shadow-md p-4 w-[32%] max-md:w-full  my-4">
      {/* Title */}
      <Link to={`${data._id}`}>
      <h2 className="text-xl font-bold text-gray-800 mb-2">{data.title}</h2>
      </Link>

      {/* Content Preview */}
      <p className="text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: data.content.slice(0,80) }}></p>

      {/* Images (if available) */}
      {(data.images && data.images.length)? (
          <Link to={`${data._id}`}>
        <div className="mb-4">
          <img
            src={data.images[0]}
            alt="Diary"
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
            </Link>
      ):null}

      {/* Tags */}

      {(data.tags && data.tags.length) ? (
        <div className="mb-4">
          {data.tags.map((tag) => {
            return (
              <span className="text-sm bg-blue-100 text-blue-800 rounded-md px-2 py-1 mr-2">
                {tag}
              </span>
            );
          })}
        </div> 
      ):null}

      {/* Date and Published By */}
      <div className="flex justify-between items-center">
        <span className="text-gray-500 text-sm">{moment(data.date).format("dddd, DD-MMMM-YYYY")}</span>
        <span className="text-gray-700 font-medium text-sm">
          {data?.publishedBy?.Name}
        </span>
      </div>
    </div>
  );
}
