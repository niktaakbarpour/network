import React from 'react';
import Filter from "../EachInterface/Filter/Filter";
import ProtocolsTable from "./ProtocolsTable/ProtocolsTable";

function Page(){
    return(
        <div>
            <Filter />
            <ProtocolsTable />
        </div>
    );
}

export default Page;