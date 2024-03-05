import { Restaurants } from "ts-models";

const ACCESS_TOKEN = process.env.YELP_ACCESS_TOKEN;
const API_URL = "https://api.yelp.com/v3";

function searchYelp(location: string): Promise<Restaurants> {
  return fetch(
    `${API_URL}/businesses/search?location=${encodeURIComponent(
      location
    )}&is_closed=false&term=restaurant&radius=20000&categories=&sort_by=best_match&limit=50`,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        accept: "application/json",
      },
    }
  )
    .then((response: Response) => {
      if (response.status === 200) return response.json();
    })
    .then((data) => {
      return {
        location,
        restaurants: data.businesses.map((business: any) => {
          return {
            name: business.name,
            photo: business.image_url,
            url: business.url,
            ratings: business.rating,
            delivery: business.transactions.includes("delivery"),
            price: business.price,
            location: business.location.display_address.join(", "),
            phone: business.display_phone,
            distance: business.distance,
            categories: business.categories.map(
              (category: any) => category.title
            ),
          };
        }),
      };
    });
}

export default searchYelp;
