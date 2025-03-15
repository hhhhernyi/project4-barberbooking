const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/reviews`;

// create a new review
async function createReview(formData) {
    try {
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(formData),
          });
          return  res.json();
    } catch (err) {
        console.log(err);
    }
}

// View all reviews
async function getReviews() {
    try {
        const res = await fetch(BASE_URL, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
         },
          });
          return  res.json();
    } catch (err) {
        console.log(err);
    }
}

export {
    createReview,
    getReviews   
  };