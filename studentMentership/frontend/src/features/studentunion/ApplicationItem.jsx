import { NavLink } from "react-router-dom";

function ApplicationItem({ item }) {
  const statusClasses =
    item.status.toLowerCase() === "active"
      ? "bg-green-400 text-green-800"
      : "bg-red-400 text-red-800";

  return (
    <NavLink to={`/applicationlist/${item.id}`} className="w-full">
      <li className="flex w-full items-center px-6 py-4 hover:bg-gray-100 border-b-2 transition-colors">
        <div className="w-1/6 text-gray-500">{item.id}</div>
        <div className="w-1/6 text-gray-900 font-medium">{item.name}</div>
        <div className="w-1/6 flex justify-end">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${statusClasses}`}
          >
            {item.status}
          </span>
        </div>
        <div className="w-1/6 flex justify-end">
          <button className="bg-green-300 cursor-pointer text-xs font-semibold px-2 py-1 rounded-full ">
            {" "}
            Accept
          </button>
        </div>
        <div className="w-1/6 flex justify-end">
          <button className="bg-red-500 text-xs cursor-pointer font-semibold px-2 py-1 rounded-full">
            {" "}
            Reject
          </button>
        </div>
      </li>
    </NavLink>
  );
}

export default ApplicationItem;
