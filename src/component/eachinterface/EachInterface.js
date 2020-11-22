import React from 'react';
import Filters from "./filter/Filters";
import PacketsTable from "./packetstable/PacketsTable";

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
            <PacketsTable filters={filters}/>
        </div>
    );
}

export default Page;
