// pages/redirect.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectPage = () => {
  const router = useRouter();

  const productId = router.query.productId;
  useEffect(() => {
    console.log(productId);
    router.push(`/product/${productId}`);
  }, [productId, router]);

  // This component doesn't render anything since it's just for redirection
  return null;
};

export default RedirectPage;