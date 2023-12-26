import dbConnect from "../../lib/dbConnect";
import Link from "next/link";
import Orden from "../../models/Orden";
import Sales from "../../models/Sales";
import { format } from "date-fns";
import SaleTarjet from "../../models/SaleTarjet";
import SaleCheq from "../../models/SaleCheq";
import OrderTicketSale from "../../components/Print/OrderTicketSale";
import Company from "../../models/Company";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BookOnlineIcon from "@mui/icons-material/BookOnline";

function registerOrderPay({
  orden,
  sales,
  salesTarjets,
  salesCheqs,
  companys,
}) {
  // Filter sales by the matching identifier format
  const filteredSales = sales.filter(
    (sale) => sale.product === `Orden N: ${orden.identifier}`
  );
  const filtereSalesTarjets = salesTarjets.filter(
    (salesTarjet) => salesTarjet.product === `Orden N: ${orden.identifier}`
  );
  const filtereSalesCheqs = salesCheqs.filter(
    (salesCheq) => salesCheq.product === `Orden N: ${orden.identifier}`
  );

  const sumOfSalesPrices = filteredSales.reduce(
    (total, sale) => total + sale.price,
    0
  );
  const sumOfSalesTarjetsPrices = filtereSalesTarjets.reduce(
    (total, salesTarjet) => total + salesTarjet.price,
    0
  );
  const sumOfSalesCheqsPrices = filtereSalesCheqs.reduce(
    (total, salesCheq) => total + salesCheq.price,
    0
  );

  const sumaTotal =
    sumOfSalesPrices + sumOfSalesTarjetsPrices + sumOfSalesCheqsPrices;

  const handlePrintTicket = () => {
    const printTicket = window.open("", "_blank");

    if (printTicket) {
      const ticketContent =
        document.getElementById("ticket-pay-order").innerHTML;
      printTicket.document.open();
      printTicket.document.write(`
     
        ${ticketContent}
    
    `);
      printTicket.document.close();
      printTicket.print();
    } else {
      alert(
        "¡El bloqueo de ventanas emergentes puede estar activado en tu navegador!"
      );
    }
  };

  return (
    <div>
      <div>
        <h1>Registro de pagos de la orden: {orden.identifier} </h1>
      </div>
      <hr></hr>

      <div>
        <div style={{ display: "flex", marginBottom: "5px" }}>
          <div style={{ width: "4%" }}>
            <button
              className="btn btn-secondary float-start"
              style={{ marginRight: "5%", marginTop: "1px" }}
            >
              <Link
                href="/ordenes"
                style={{ textDecoration: "none", color: "white" }}
              >
                <ArrowBackIcon />
              </Link>
            </button>
          </div>

          <div style={{ marginLeft: "auto", marginRight: "3%" }}>
            <h4>
              Total de Pagado :{" "}
              <MonetizationOnIcon
                style={{ width: "28px", height: "28px", color: "#dc3545" }}
              />
              {sumaTotal}
            </h4>
          </div>
          <div>
            <button className="btn btn-secondary" onClick={handlePrintTicket}>
              <BookOnlineIcon />
            </button>
          </div>
        </div>
        <hr></hr>
        <div>
          <div style={{ display: "flex", widows: "95%" }}>
            <div
              style={{
                width: "45%",
                marginRight: "3%",
                borderRight: "1px solid",
              }}
            >
              <div>
                <h4>Pago Efectivo</h4>
              </div>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Fecha</th>

                      <th scope="col">Precio</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSales.map((sale, index) => (
                      <tr key={sale._id}>
                        <td>{index + 1}</td>
                        <td>
                          {format(
                            new Date(sale.createdAt),
                            "dd/MM/yyyy HH:mm:ss"
                          )}
                        </td>

                        <td>${sale.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ width: "40%", marginRight: "3%" }}>
              <div>
                <h4>Pago Tarjeta</h4>
              </div>
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Fecha</th>

                      <th scope="col">tipo</th>
                      <th scope="col">Precio</th>
                      <th scope="col">cuotas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtereSalesTarjets.map((salesTarjet, index) => (
                      <tr key={salesTarjet._id}>
                        <td>{index + 1}</td>
                        <td>
                          {format(
                            new Date(salesTarjet.createdAt),
                            "dd/MM/yyyy HH:mm:ss"
                          )}
                        </td>

                        <td>{salesTarjet.formaPago}</td>
                        <td>${salesTarjet.price}</td>
                        <td>{salesTarjet.cuote}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <hr></hr>

        <div>
          <div>
            <h4>Pago Cheques</h4>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Fecha</th>
                <th scope="col">Titular</th>
                <th scope="col">Dador</th>
                <th scope="col">Producto</th>
                <th scope="col">Precio</th>
                <th scope="col">N* Cheque</th>
              </tr>
            </thead>
            <tbody>
              {filtereSalesCheqs.map((salesCheq, index) => (
                <tr key={salesCheq._id}>
                  <td>{index + 1}</td>
                  <td>{format(new Date(salesCheq.createdAt), "dd/MM/yyyy")}</td>

                  <td>{salesCheq.nombre}</td>
                  <td>{salesCheq.dador}</td>
                  <td>{salesCheq.product}</td>
                  <td>${salesCheq.price}</td>
                  <td>{salesCheq.NumCheq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <OrderTicketSale
        orden={orden}
        companys={companys}
        filteredSales={filteredSales}
        filtereSalesTarjets={filtereSalesTarjets}
        filtereSalesCheqs={filtereSalesCheqs}
        image="/logo.png"
        sumaTotal={sumaTotal}
      />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  await dbConnect();

  const resultCompany = await Company.find({});
  const companys = resultCompany.map((doc) => {
    const company = doc.toObject();
    company._id = company._id.toString();
    return company;
  });
  const resultSalesCheq = await SaleCheq.find({});
  const salesCheqs = resultSalesCheq.map((doc) => {
    const salesCheq = doc.toObject();
    salesCheq._id = salesCheq._id.toString();
    salesCheq.createdAt = salesCheq.createdAt.toISOString();
    return salesCheq;
  });

  const resultSalesTarjets = await SaleTarjet.find({});
  const salesTarjets = resultSalesTarjets.map((doc) => {
    const salesTarjet = doc.toObject();
    salesTarjet._id = doc._id.toString();
    salesTarjet.createdAt = salesTarjet.createdAt.toISOString();
    return salesTarjet;
  });

  const result = await Sales.find({});
  const sales = result.map((doc) => {
    const sale = doc.toObject();
    sale._id = sale._id.toString();
    sale.createdAt = sale.createdAt.toISOString(); // Convertir la fecha a una cadena ISO
    return sale;
  });

  const orden = await Orden.findById(params.id).lean();
  if (!orden) {
    return {
      notFound: true,
    };
  }

  orden._id = orden._id.toString();
  orden.createdAt = orden.createdAt.toISOString();
  const exitAt = new Date(orden.exitAt);
  const exitYear = exitAt.getFullYear();
  const exitMonth = exitAt.getMonth() + 1; // Los meses en JavaScript son indexados desde 0
  const exitDay = exitAt.getDate(); // Convierte la fecha en una cadena ISO

  orden.exitAt = `${exitDay}-${exitMonth}-${exitYear}`;

  return { props: { orden, sales, salesTarjets, salesCheqs, companys } };
}

export default registerOrderPay;
