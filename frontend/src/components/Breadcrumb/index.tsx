import { Link } from "react-router-dom";

function Breadcrumb({location}: { location: string }) {
    return (
        <div className="text-md w-full flex justify-end">
            <Link className="text-red-500 font-bold hover:underline" to="/">Dashboard</Link>&nbsp;/&nbsp;
            <span>{location}</span>
        </div>
    );
}

export default Breadcrumb;