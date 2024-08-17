import React, { useEffect, useState } from 'react';
import { GetAllApprovedPartner, deletePartner } from '../services/Admin';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function PartnerList() {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadPartnersList();
  }, []);

  const loadPartnersList = async () => {
    const result = await GetAllApprovedPartner();
    setPartners(result);
    setFilteredPartners(result);
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = partners.filter(partner =>
      partner.firstName.toLowerCase().includes(term) ||
      partner.lastName.toLowerCase().includes(term) ||
      partner.email.toLowerCase().includes(term) ||
      partner.serviceTitle.toLowerCase().includes(term)

    );
    setFilteredPartners(filtered);
  };

  const handleDeletePartner = async (partnerId) => {
    try {
      const result = await deletePartner(partnerId);
      if (result.status === 'success') {
        loadPartnersList(); // Reload partners list after deletion
      }
    } catch (error) {
      console.error('Error deleting partner:', error);
    }
  };

  return (
    <div className='content'>
      <h1 className='mb-4' style={{marginTop:'100px'}}>Partner List</h1>
      <Form className="mb-4">
        <Form.Group controlId="search">
          <Form.Control
            type="text"
            placeholder="Search partners..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Form.Group>
      </Form>
      <Row>
        {filteredPartners.map((partner, index) => (
          <Col key={index} md={4} className="mb-4">
             <Card>
               <Card.Body>
                 <Card.Title>{partner.firstName} {partner.lastName}</Card.Title>
                 <Card.Text>Email: {partner.email}</Card.Text>
                 <Card.Text>Mobile No: {partner.mobileNo}</Card.Text>
                 <Card.Text>Service Title: {partner.serviceTitle}</Card.Text>
                 <Card.Text>Card Number: {partner.card.cardNumber}</Card.Text>
                 <Card.Text>Card Type: {partner.card.cardType}</Card.Text>
                 <Card.Text>
                   Address: {partner.address.addressLineOne}, {partner.address.addressLineTwo}, {partner.address.city}, {partner.address.state}, {partner.address.country}, {partner.address.zipCode}, {partner.address.landmark}
                 </Card.Text>
                 <Button variant="danger" onClick={() => handleDeletePartner(partner.partnerId)}>Delete</Button>
               </Card.Body>
             </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default PartnerList;





// import React, { useEffect, useState } from 'react';
// import { GetAllApprovedPartner, deletePartner } from '../services/Admin';
// import { Card, Button, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// function PartnerList() {
//   const [partners, setPartners] = useState([]);

//   useEffect(() => {
//     loadPartnersList();
//   }, []);

//   const loadPartnersList = async () => {
//     const result = await GetAllApprovedPartner();
//     setPartners(result);
//   };

//   const handleDeletePartner = async (partnerId) => {
//     try {
//       const result = await deletePartner(partnerId);
//       if (result.status === 'success') {
//         loadPartnersList(); // Reload partners list after deletion
//       }
//     } catch (error) {
//       console.error('Error deleting partner:', error);
//       // Handle error as needed
//     }
//   };

//   return (
//     <div className='container my-4' style={{marginTop:'60px'}}>
//       <h1 className='mb-4' style={{marginTop:'80px'}}> Partner List</h1>
//       <Row>
//         {partners.map((partner) => (
//           <Col md={4} key={partner.partnerId} className='mb-4'>
//             <Card>
//               <Card.Body>
//                 <Card.Title>{partner.firstName} {partner.lastName}</Card.Title>
//                 <Card.Text>Email: {partner.email}</Card.Text>
//                 <Card.Text>Mobile No: {partner.mobileNo}</Card.Text>
//                 <Card.Text>Service Title: {partner.serviceTitle}</Card.Text>
//                 <Card.Text>Card Number: {partner.card.cardNumber}</Card.Text>
//                 <Card.Text>Card Type: {partner.card.cardType}</Card.Text>
//                 <Card.Text>
//                   Address: {partner.address.addressLineOne}, {partner.address.addressLineTwo}, {partner.address.city}, {partner.address.state}, {partner.address.country}, {partner.address.zipCode}, {partner.address.landmark}
//                 </Card.Text>
//                 <Button variant="danger" onClick={() => handleDeletePartner(partner.partnerId)}>Delete</Button>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// }

// export default PartnerList;



// import React, { useEffect, useState } from 'react';
// import { GetAllApprovedPartner, deletePartner } from '../services/Admin';
// import { table, Button } from 'react-bootstrap';

// function PartnerList() {
//   const [partners, setPartners] = useState([]);

//   useEffect(() => {
//     loadPartnersList();
//   }, []);

//   const loadPartnersList = async () => {
//     const result = await GetAllApprovedPartner();
//     setPartners(result); 
//   };

//     const handleDeletePartner = async (partnerId) => {
//       try {
//           const result = await deletePartner(partnerId);

//           if (result['status'] === 'success') {
//               loadPartnersList(); // Reload partners list after deletion
//           }
//       } catch (error) {
//           console.error('Error deleting partner:', error);
//           // Handle error as needed (e.g., show error message)
//       }
//   };


//   return (
//     <div className='table table-responsive'>
//       <h1 className='my-4'>Partner List</h1>
//       <table className="table stripped table-hover">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>First Name</th>
//             <th>Last Name</th>
//             <th>Email</th>
//             <th>Mobile No</th>
//             <th>Service Title</th>
//             <th>Card Number</th>
//             <th>Card Type</th>
//             <th>Address</th>
//             <th>Actions</th>

//           </tr>
//         </thead>
//         <tbody>
//           {partners.map((partner, index) => (
//             <tr key={index}>
//               <td>{partner.partnerId}</td>
//               <td>{partner.firstName}</td>
//               <td>{partner.lastName}</td>
//               <td>{partner.email}</td>
//               <td>{partner.mobileNo}</td>
//               <td>{partner.serviceTitle}</td>
//               <td>{partner.card.cardNumber}</td>
//               <td>{partner.card.cardType}</td>
//               <td>
//                 {partner.address.addressLineOne}, {partner.address.addressLineTwo}, {partner.address.city}, {partner.address.state}, {partner.address.country}, {partner.address.zipCode}, {partner.address.landmark}
//               </td>
//               <td>
//                 <Button variant="danger" onClick={() => handleDeletePartner(partner.partnerId)}>Delete</Button>
//                </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default PartnerList;