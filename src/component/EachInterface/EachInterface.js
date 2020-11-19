import React from 'react';
import Filter from "../EachInterface/Filter/Filter";
import ProtocolsTable from "./ProtocolsTable/ProtocolsTable";

function Page() {
    const [filters, setFilters] = React.useState({});
    const handleFiltersChanged = (filter) => {
        setFilters(filter)
    }
    return (
        <div>
            <Filter setParentState={(filter) => handleFiltersChanged(filter)}/>
            <ProtocolsTable filters={filters}/>
        </div>
    );
}

export default Page;
