import React, { useState } from 'react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SettingsIcon from '@mui/icons-material/Settings';
import './Pricing.css'
import { Layout, Menu , Col, Row ,Button  ,Select } from 'antd';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';


const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;


const headerStyle = {
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: '#000',
  };
  

const Pricing = () => {

    const handleClick = e => {
        console.log('click ', e);
      };
    
      const handleChange = (value) => {
      console.log(`selected ${value}`);
    };

  return (
   

    <div className='col-md-8'>
    <Card className="py-2 my-2 p-4"> 
        <Typography className='p-3'  variant="h4" >
          Pricing
       </Typography>
       <hr />

       <div className='pricing-container'>

       <div className='pricing-header'>
      <Typography  variant="h6" >Course Price Tier</Typography>
      <p>Please select the price tier for your course below and click 'Save'. The list price that students will see in other currencies is determined using the price tier matrix.</p>

      </div>

  <table class="table table-striped text-center">
  <thead>
    <tr>
      <th scope="col">Continents</th>
      <th scope="col">Country</th>
      <th scope="col">Currency</th>
      <th scope="col">Min Price</th>
      <th scope="col">Max Price</th>
    </tr>
  </thead>
  <tbody>

    <tr>
      <td>Asia</td>
      <td><i title="Afghanistan,Armenia,Azerbaijan,Bahrain,Bangladesh,Bhutan,Brunei,Cambodia,China,Cyprus,Georgia,India,Indonesia,Iran,Iraq,Israel,Japan,Jordan,Kazakhstan,Kuwait,Kyrgyzstan,Laos,Lebanon,Malaysia,Maldives,Mongolia,Myanmar (Burma),Nepal,North Korea,Oman,Pakistan,Palestine,Philippines,Qatar,Saudi Arabia,Singapore,South Korea,Sri Lanka,Syria,Taiwan,Tajikistan,Thailand,Timor-Leste (East Timor),Turkey,Turkmenistan,United Arab Emirates,Uzbekistan,Vietnam,Yemen" class="fa-solid fa-circle-question"></i></td>
      <td>USD</td>
      <td><input type="text" class="form-control" value={4.99} /></td>
      <td><input type="text" class="form-control" value={4.99} /></td>
    </tr>

    <tr>
      <td>Africa</td>
      <td><i title="Algeria,Angola,Benin,Botswana,Burkina Faso,Burundi,Cameroon,Cape Verde,Central African Republic,Chad,Comoros,Democratic Republic of the Congo,Republic of the Congo,Djibouti,Egypt,Equatorial Guinea,Eritrea,Eswatini (formerly Swaziland),Ethiopia,Gabon,Gambia,Ghana,Guinea,Guinea-Bissau,Ivory Coast (Côte d'Ivoire),Kenya,Lesotho,Liberia,Libya,Madagascar,Malawi,Mali,Mauritania,Mauritius,Morocco,Mozambique,Namibia,Niger,Nigeria,Rwanda,Sao Tome and Principe,Senegal,Seychelles,Sierra Leone,Somalia,South Africa,South Sudan,Sudan,Tanzania,Togo,Tunisia,Uganda,Zambia,Zimbabwe" class="fa-solid fa-circle-question"></i></td>
      <td>USD</td>
      <td><input type="text" class="form-control" value={4.99} /></td>
      <td><input type="text" class="form-control" value={4.99} /></td>
    </tr>

    <tr>
      <td>North America</td>
      <td><i title="Canada,United States,Mexico,Belize,Costa Rica,El Salvador,Guatemala,Honduras,Nicaragua,Panama,South America:,Argentina,Bolivia,Brazil,Chile,Colombia,Ecuador,Guyana,Paraguay,Peru,Suriname,Uruguay,Venezuela" class="fa-solid fa-circle-question"></i></td>
      <td>USD</td>
      <td><input type="text" class="form-control" value={4.99} /></td>
      <td><input type="text" class="form-control" value={4.99} /></td>
    </tr>

    <tr>
      <td>South America</td>
      <td><i title="Argentina,Bolivia,Brazil,Chile,Colombia,Ecuador,Guyana,Paraguay,Peru,Suriname,Uruguay,Venezuela" class="fa-solid fa-circle-question"></i></td>
      <td>USD</td>
      <td><input type="text" class="form-control" value={4.99} /></td>
      <td><input type="text" class="form-control" value={4.99} /></td>
    </tr>

    <tr>
      <td>Europe</td>
      <td><i title="Albania,Andorra,Austria,Belarus,Belgium,Bosnia and Herzegovina,Bulgaria,Croatia,Cyprus,Czech Republic,Denmark,Estonia,Finland,France,Germany,Greece,Hungary,Iceland,Ireland,Italy,Kosovo,Latvia,Liechtenstein,Lithuania,Luxembourg,Malta,Moldova,Monaco,Montenegro,Netherlands,North Macedonia,Norway,Poland,Portugal,Romania,Russia,San Marino,Serbia,Slovakia,Slovenia,Spain,Sweden,Switzerland,Ukraine,United Kingdom,Vatican City (Holy See)" class="fa-solid fa-circle-question"></i></td>
      <td>USD</td>
      <td><input type="text" class="form-control" value={4.99} /></td>
      <td><input type="text" class="form-control" value={4.99} /></td>
    </tr>

    <tr>
      <td>Australia</td>
      <td><i title="Australia" class="fa-solid fa-circle-question"></i></td>
      <td>USD</td>
      <td><input type="text" class="form-control " value={4.99} /></td>
      <td><input type="text" class="form-control" value={4.99} /></td>
    </tr>

  </tbody>
</table>

       </div>

 

    </Card>
    
    </div>
  )
}

export default Pricing