/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
// import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { signOut } from '../utils/auth';

const Profile = () => {
  const { user } = useAuth(); // retrieves user object from the useAuth hook
  const router = useRouter();
  //   const [sellerProducts, setSellerProducts] = useState([]);

  //   const displayProducts = () => {
  //     getProductsBySellerId(user.sellerId).then((data) => setSellerProducts(data));
  //   };

  //   useEffect(() => {
  //     displayProducts();
  //   }, [user]);

  return (
    <div
      className="text-center d-flex flex-column align-content-center"
      id="creator-page"
      style={{
        height: '90vh',
        padding: '20px',
        maxWidth: '350px',
        margin: '0 auto',
      }}
    >
      <div>
        <img
          src={user.profile_image_url}
          alt={user.name}
          style={{
            width: '300px', borderRadius: '50%', marginBottom: '20px', marginTop: '20px',
          }}
        />
      </div>

      <div style={{ marginTop: '5px' }}>
        <h1>{user.name}</h1>
        <h4>{user.username}</h4>
        <p>{user.bio}</p>
        {/* <Button
          onClick={() => {
            router.push(`/profile/${user.id}`);
          }}
          style={{
            marginRight: '10px', backgroundColor: '#6699CC', fontSize: '10px', width: '90px',
          }}
        >
          Edit Profile
        </Button> */}
        <Button
          onClick={() => {
            router.push('/products/new');
          }}
          style={{
            backgroundColor: '#6699CC', fontSize: '10px', width: '100px',
          }}
        >
          Create Event
        </Button>
      </div>
      <div>
        <Button variant="danger" onClick={signOut} style={{ fontSize: '10px', marginTop: '20px' }}>
          Sign Out
        </Button>
      </div>

      <div>
        <h2 style={{ marginTop: '20px' }}>Your Events</h2>
      </div>

      {/* <div className="text-center my-4" id="products-section">
        {sellerProducts.map((product) => (
          <section key={`product--${product.id}`} className="product">
            <ProductCard
              id={product.id}
              sellerId={product.seller_id}
              title={product.title}
              description={product.description}
              image_url={product.image_url}
              price={product.price}
              createdOn={product.createdOn}
              onUpdate={displayProducts}
            />
          </section>
        ))}
      </div> */}

    </div>
  );
};

export default Profile;
