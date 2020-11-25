import React from 'react';
import Filters from "./filter/Filters";
import StyledPacketsTable from "./packetstable/PacketsTable";

function Page() {
    const [filters, setFilters] = React.useState({
        layer: "All",
        protocol: "All",
        ipVersion: 4,
        sourceIp: "",
        destinationIp: "",
        sourcePort: "",
        destinationPort: ""
    });
    const handleFiltersChanged = (filter) => {
        setFilters(filter)
    }

    return (
        <div>
            <Filters setParentState={handleFiltersChanged}/>
            <StyledPacketsTable filters={filters}/>
        </div>
    );
}

export default Page;
