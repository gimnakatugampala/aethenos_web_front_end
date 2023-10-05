import React, { useState } from "react";
import Card from "@mui/material/Card";
import Form from "react-bootstrap/Form";
import Typography from "@mui/material/Typography";
import MouseOverPopover from "./MouseOverPopover";
import { Select, Checkbox, Radio } from "antd";

const countries = [
  { country: "America", currency: "USD" },
  { country: "Australia", currency: "AUD" },
  { country: "Brazil", currency: "BRL" },
  { country: "Canada", currency: "CAD" },
  { country: "Chile", currency: "CLP" },
  { country: "Colombia", currency: "COP" },
  { country: "Egypt", currency: "EGP" },
  { country: "Great Britain", currency: "GBP" },
  { country: "India", currency: "INR" },
  { country: "Indonesia", currency: "IDR" },
  { country: "Israel", currency: "ILS" },
  { country: "Japan", currency: "JPY" },
  { country: "Malaysia", currency: "MYR" },
  { country: "Mexico", currency: "MXN" },
  { country: "Nigeria", currency: "NGN" },
  { country: "Norway", currency: "NOK" },
  { country: "Peru", currency: "PEN" },
  { country: "Philippines", currency: "PHP" },
  { country: "Poland", currency: "PLN" },
  { country: "Romania", currency: "RON" },
  { country: "Russia", currency: "RUB" },
  { country: "Singapore", currency: "SGD" },
  { country: "South Africa", currency: "ZAR" },
  { country: "South Korea", currency: "KRW" },
  { country: "Taiwan", currency: "TWD" },
  { country: "Thailand", currency: "THB" },
  { country: "Turkey", currency: "TRY" },
  { country: "Vietnam", currency: "VND" },
  { country: "European Union", currency: "EUR" },
  { country: "Other Countries", currency: "Unknown" },
];

const Pricing = () => {
  const [customPrices, setCustomPrices] = useState(false);
  const [selectedDiscountType, setSelectedDiscountType] = useState({});

  const handleCustomPricesChange = (event) => {
    setCustomPrices(event.target.checked);
  };

  const handleDiscountTypeChange = (value, currency) => {
    setSelectedDiscountType({
      ...selectedDiscountType,
      [currency]: value,
    });
  };

  return (
    <div className="col-md-8">
      <Card className="py-2 my-2 p-4">
        <Typography className="p-3" variant="h4">
          Pricing
        </Typography>
        <hr />

        <div className="pricing-container">
          {/* Add a div for custom prices and discount type */}
          <div className="custom-prices-container">
            <Checkbox
              onChange={handleCustomPricesChange}
              checked={customPrices}
              style={{ marginRight: "10px" }}
            >
              Set Custom Prices
            </Checkbox>
            <Radio.Group
              value={selectedDiscountType} // Use selectedDiscountType here
              style={{ marginLeft: "220px" }}
            >
              <Radio value="No Discount">No Discount</Radio>
              <Radio value="Percentage">Percentage</Radio>
              <Radio value="Fixed Discount">Fixed Discount</Radio>
            </Radio.Group>
          </div>

          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th scope="col">Country</th>
                <th scope="col">Currency</th>
                <th scope="col">Price</th>
                <th scope="col">View Price Range</th>
                <th scope="col">Discount Type</th>
                <th scope="col">Discount Amount</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((countryData, index) => (
                <tr key={index}>
                  <td>{countryData.country}</td>
                  <td>{countryData.currency}</td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder="Enter Price"
                      disabled={!customPrices}
                    />
                  </td>
                  <td>
                    <MouseOverPopover value={countryData.currency} />
                  </td>
                  <td>
                    <Select
                      defaultValue="No Discount"
                      value={
                        selectedDiscountType[countryData.currency] ||
                        "No Discount"
                      }
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        handleDiscountTypeChange(value, countryData.currency)
                      }
                      disabled={!customPrices}
                    >
                      <Select.Option value="No Discount">
                        --- NO DISCOUNT ---
                      </Select.Option>
                      <Select.Option value="By Percentage">
                        By Percentage
                      </Select.Option>
                      <Select.Option value="By Value">By Value</Select.Option>
                    </Select>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      placeholder="Enter Discount Amount"
                      disabled={!customPrices}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Pricing;
