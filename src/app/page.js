'use client';

import { Button } from 'react-bootstrap';
import { signOut } from '@/utils/auth';
import { useAuth } from '@/utils/context/authContext';
import getAllItems from '@/api/expenseData';
import { useState, useEffect } from 'react';

function Home() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    getAllItems().then((data) => {
      const itemList = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setItems(itemList);
    });
  }, []);

  return (
    <div
      className="text-center d-flex flex-column"
      style={{
        height: '90vh',
        maxWidth: '80%',
        margin: '0 auto',
      }}
    >
      <h3 style={{ marginTop: '20px' }}>Welcome to your expense tracker, {user.displayName}</h3>
      <p style={{ marginBottom: '40px' }}>Use this program to keep track of your items and total expenses.</p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <label>
          ITEM NAME: <input placeholder="Item name" name="item" style={{ margin: '10px' }} />
        </label>
        <label>
          COST: <input name="cost" placeholder="Cost" style={{ margin: '10px' }} />
        </label>
        <Button size="sm" variant="success" style={{ height: '30px', margin: '10px' }}>
          Submit
        </Button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h5>Item Names</h5>
          {items.map((item) => (
            <p key={item.id} style={{ border: 'solid 2px white', margin: '10px', width: '100%', paddingLeft: '10px' }}>
              {item.name}
            </p>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h5>Costs</h5>
          {items.map((item) => (
            <p key={item.id} style={{ border: 'solid 2px white', margin: '10px', width: '100%' }}>
              ${item.cost}
            </p>
          ))}
        </div>
      </div>
      <Button style={{ width: '24%', marginTop: '500px' }} variant="danger" type="button" size="sm" className="copy-btn" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Home;
