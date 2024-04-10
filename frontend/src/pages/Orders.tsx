import { ReactElement, useState } from "react";
import TableHOC from "../components/admin/TableHOC"
import { Column, useAbsoluteLayout } from "react-table";
import { Link } from "react-router-dom";

type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement;
}

const column: Column<DataType>[] = [
    {
        Header: "ID",
        accessor: "_id"
    },
    {
        Header: "Amount",
        accessor: "amount"
    },
    {
        Header: "Quantity",
        accessor: "quantity"
    },
    {
        Header: "Discount",
        accessor: "discount"
    },
    {
        Header: "Status",
        accessor: "status"
    },
    {
        Header: "Action",
        accessor: "action"
    }
]

const Orders = () => {

    const [rows] = useState<DataType[]>([
        {
            _id: "df4dfsdlfk",
            amount: 52322,
            quantity: 5,
            discount: 3434,
            status: <span className="red">Processing</span>,
            action: <Link to={`/order/dfsdeirsdfj`}>View</Link>,
        }
    ]);

    const Table = TableHOC<DataType>(column,rows,"dashboard-product-box","Orders",true)();

  return (
    <div className="container">
        <h1>My Orders</h1>
        {
            Table
        }
    </div>
  )
}

export default Orders